import { useAuth } from "@copydeck/contexts/authContext";
import { getCompletion } from "@copydeck/libs/openaiClient";
import { message } from "antd";
import { CreateCompletionRequest } from "openai";
import { useEffect, useState } from "react";

export const makePromptRequest = (
  setLoading,
  title,
  content,
  maxTokens,
  prompt,
  placeholder,
  handleContentChange,
  toggleShowPlanType
) => {
  const { user, updateUserAccount } = useAuth();
  const [, setOpenaiRequest] = useState<CreateCompletionRequest | undefined>(
    undefined
  );

  const [credits, setCredits] = useState(0);

  useEffect(() => {
    setCredits(user.aiUsage.credits);
  }, [user]);

  function generatePrompt(): CreateCompletionRequest {
    const formTitlePrompt = `
        Take the title of the blog post below and generate a blog post. Make it feel like a story. Don't just list the points. Go deep into each one. Explain why.

        Title: ${title}
        `;
    const formContentPrompt = `${content}[insert]`;

    const promptPrefix = `Write me a detailed blog post on a random topic but don't include the title`;

    const inputPrompt = prompt !== "" ? prompt : promptPrefix;
    const titlePrompt = title !== "" ? formTitlePrompt : inputPrompt;
    const finalPrompt =
      content !== ""
        ? formContentPrompt
        : titlePrompt !== ""
        ? titlePrompt
        : inputPrompt;

    return {
      model: "text-davinci-003",
      prompt: finalPrompt,
      max_tokens: parseInt(maxTokens, 10),
      top_p: 1,
      presence_penalty: 0,
      best_of: 1,
      // echo: true,
      // stream: true,
      frequency_penalty: 0,
      logprobs: 0,
      temperature: 0.7
    };
  }

  async function updateAiCredit(count) {
    try {
      const payload = {
        aiUsage: {
          credits: credits - 1,
          tokensUsed: +count
        }
      };
      await updateUserAccount(payload);
      // console.log("Response", response);
      setCredits(credits - 1);
    } catch (err) {
      message.error(err.message);
      return [];
    }
  }

  const checkPrompt = async () => {
    setLoading(true);
    if (credits > 0) {
      const request = generatePrompt();
      setOpenaiRequest(request);
      try {
        await getCompletion(request)
          .then(completion => {
            if (completion && completion.choices) {
              const result =
                completion.choices[0].text
                  // .replace(/^\n\n/, '')
                  .trim() + " ";
              handleContentChange(content + result);
              const editable = document.getElementById("contentArea");
              // let value = editable.innerHTML;
              if (editable.innerText === placeholder) {
                editable.innerText = "";
              }
              const speed = 15;
              let count = 0;
              //   const txt = "content";
              const typeWriter = () => {
                if (count < completion.choices[0].text.length) {
                  editable.innerHTML += result.charAt(count);
                  count++;
                  setTimeout(typeWriter, speed);
                }
              };
              typeWriter();
              if (completion.choices[0].text.length) {
                updateAiCredit(completion.choices[0].text.length);
              }
              // else {
              //   message.error('Supply the AI with additional information.');
              // }
            } else {
              message.error("something went wrong somewhere.");
            }
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (err) {
        message.error(err.message);
        //   console.log(err);
      }
    } else {
      setLoading(true);
      toggleShowPlanType();
    }
  };

  return {
    checkPrompt
  };
};
