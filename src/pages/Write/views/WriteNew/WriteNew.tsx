import Editor from "../../components/Editor";
import Sidebar from "../../components/Sidebar";
import "./style.scss";
import { QuestionCircleOutlined } from "@ant-design/icons";
import ThemeSwitch from "@copydeck/components/ThemeSwitch";
import { axiosInstance } from "@copydeck/config";
import { useAuth } from "@copydeck/contexts/authContext";
import useNavigator from "@copydeck/hooks/useNavigator";
import { getCompletion } from "@copydeck/libs/openaiClient";
import useAutosizeTextArea from "@copydeck/utils/useAutosizeTextarea";
import { Button, FloatButton, message } from "antd";
import { CreateCompletionRequest } from "openai";
import React, { useEffect, useRef, useState } from "react";
import validator from "validator";

interface WriteNewProps {
  toggleShowPlanType: () => void;
}

const WriteNew: React.FC<WriteNewProps> = ({ toggleShowPlanType }) => {
  const { user, updateUserAccount } = useAuth();
  const navigate = useNavigator();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [
    ,
    // openaiRequest
    setOpenaiRequest
  ] = useState<CreateCompletionRequest | undefined>(undefined);
  const [onChange, setOnChange] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [btnText, setBtnText] = useState("Save for later");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const placeholder = "Start writing here...";
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [maxTokens, setMaxTokens] = useState("150");
  const [prompt, setPrompt] = useState("");
  const [credits, setCredits] = useState(0);

  const titleTextAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCredits(user.aiUsage.credits);
  }, [user]);
  useAutosizeTextArea(titleTextAreaRef.current, title);
  const [timer, setTimer] = useState(null);

  const saveOnChange = () => {
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      onSubmit();
    }, 2000);
    setTimer(newTimer);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    setDisabled(false);
  };

  const handleContentChange = plainText => {
    setContent(plainText);
    const words = plainText.split(" ");
    let wordCount = 0;
    words.forEach(word => {
      if (word.trim() !== "") {
        wordCount++;
      }
    });
    setWordCount(wordCount);
    setCharCount(plainText.length);
    setOnChange(true);
  };

  useEffect(() => {
    if (onChange) {
      saveOnChange();
    }
  }, [content]);

  function generatePrompt(): CreateCompletionRequest {
    const formTitlePrompt = `
	  Take the title of the blog post below and generate a blog post. Make it feel like a story. Don't just list the points. Go deep into each one. Explain why.

	  Title: ${title}
	  `;
    const formContentPrompt = `${content}[insert]`;

    const promptPrefix = `Write me a detailed blog post on a random topic, but don't include the topic`;

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
    // e.preventDefault();
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

  // generate string for slug
  const slug = Math.floor(Math.random() * 10000000 + 10000000);
  // const [writingData, setWritingData] = useState<string>(undefined);
  const createNewStory = async () => {
    const userId = user._id;
    const userFname = user.firstName;
    const userLname = user.lastName;
    const userAvatar = user.avatar;
    const payload = {
      title,
      content,
      aiSettings: {
        storyBackground: "",
        outputLength: parseInt(maxTokens, 10)
      },
      urlString: slug,
      authorId: userId,
      authorFname: userFname,
      authorLname: userLname,
      authorAvatar: userAvatar,
      charCount,
      wordCount
    };
    try {
      const result = await axiosInstance.post(`/story/store`, payload, {
        withCredentials: true
      });
      // setWritingData(result.config.data);
      return {
        status: "success",
        data: result.data
      };
    } catch (error) {
      const errorMessage = error.message;
      const status = "error";
      return {
        status,
        errorMessage
      };
    }
  };

  const onSubmit = async () => {
    setSubmitLoading(true);
    setErrors({});
    setBtnText("Saving");
    if (validator.isEmpty(content)) {
      message.error("Content cannot be empty");
      setDisabled(false);
      setBtnText("Save");
      setSubmitLoading(false);
      return;
    }
    await createNewStory().then(result => {
      if (result.status === "error") {
        setDisabled(false);
        setSubmitLoading(false);
        setBtnText("Save");
        message.error(result.errorMessage);
      } else {
        setDisabled(true);
        navigate(`/write/${slug}`);
        setBtnText("Saved");
        // message.success("Document saved");
        setSubmitLoading(false);
      }
    });
    return errors;
  };

  return (
    <div id="editorArea" className="sc-jdhwqr cChEAZ">
      <Sidebar
        checkPrompt={checkPrompt}
        loading={loading}
        setMaxTokens={setMaxTokens}
        setPrompt={setPrompt}
        prompt={prompt}
        credits={credits}
      />
      <div className="sc-fkJVfC fEWUPr">
        <div className="sc-cZMNgc jPRwbG">
          <div className="sc-jUosCB klZYnl">
            <div className="sc-jQrDum hcyzbe">
              <div className="sc-fvxzrP kqJoff">
                <Button
                  // htmlType="submit"
                  disabled={disabled}
                  className="btn btn-primary is-rounded"
                  loading={submitLoading}
                  onClick={onSubmit}
                >
                  {btnText}
                </Button>
              </div>
              <div className="me-24">
                <a className="btn is-disabled btn-link">Share</a>
              </div>
              <ThemeSwitch />
            </div>
          </div>
        </div>
        <div id="writing-container" className="sc-iuqRDJ cNKWom">
          <div className="sc-cCcXHH iNMoXE">
            <textarea
              placeholder="Your title here..."
              className="sc-bkkeKt sc-cidDSM zzEXs cznyrf"
              name="title"
              onChange={e => {
                handleTitleChange(e);
              }}
              ref={titleTextAreaRef}
              rows={1}
              value={title}
            ></textarea>
          </div>
          <div className="sc-ZOtfp bfLVSG">
            <Editor
              className="sc-eCImPb sc-ezbkAF ebKIPs A-dmbO mt-0"
              onChange={handleContentChange}
              checkPrompt={checkPrompt}
              id="contentArea"
              placeholder={placeholder}
              // value={result ? content : ""}
              // setContent={setContent}
            />
            <div></div>
          </div>
          <div className="writing-stats justify-content-start">
            <div className="sc-djWRfJ gpBwlP">
              <p className="sc-iCfMLu sc-gIBqdA hXricx lhUpfH">{wordCount}</p>
              <p className="sc-iCfMLu sc-fyrocj hXricx kWgNA">words</p>
            </div>
            <div className="sc-djWRfJ gpBwlP">
              <p className="sc-iCfMLu sc-gIBqdA hXricx lhUpfH">{charCount}</p>
              <p className="sc-iCfMLu sc-fyrocj hXricx kWgNA">characters</p>
            </div>
          </div>
          <FloatButton
            icon={<QuestionCircleOutlined />}
            type="default"
            style={{ right: 24 }}
          />
        </div>
      </div>
    </div>
  );
};

WriteNew.displayName = "WriteNew";
export default WriteNew;
