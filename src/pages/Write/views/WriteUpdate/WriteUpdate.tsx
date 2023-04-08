// import { API_URL } from "@copydeck/config";
// import axios from "axios";
// import validator from 'validator';
import Editor from "../../components/Editor";
import Sidebar from "../../components/Sidebar";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Loader from "@components/Loader";
import ThemeSwitch from "@copydeck/components/ThemeSwitch";
import { axiosInstance } from "@copydeck/config";
import { useAuth } from "@copydeck/contexts/authContext";
import { useFetch } from "@copydeck/hooks/makeRequest";
import { getCompletion } from "@copydeck/libs/openaiClient";
import useAutosizeTextArea from "@copydeck/utils/useAutosizeTextarea";
// import { Button } from "@mantine/core";
// import GPTCompletion from "components/completion";
import { Button, FloatButton, Input, message, Switch } from "antd";
import { CreateCompletionRequest } from "openai";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

interface WriteUpdateProps {
  toggleShowPlanType: () => void;
}

const WriteUpdate: React.FC<WriteUpdateProps> = ({ toggleShowPlanType }) => {
  const { user, updateUserAccount } = useAuth();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { data } = useFetch(`/story/${id}`);
  const [errors, setErrors] = useState<any>({});
  const [submitLoading, setSubmitLoading] = useState(false);

  const [
    ,
    // openaiRequest
    setOpenaiRequest
  ] = useState<CreateCompletionRequest | undefined>(undefined);
  const [onChange, setOnChange] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const dropRef = useRef(null);
  useOnClickOutside(dropRef, () => setShowShare(false));
  const [disabled, setDisabled] = useState(true);
  const [btnText, setBtnText] = useState("Saved");
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [content, setContent] = useState("");
  const [credits, setCredits] = useState(0);
  const placeholder = "Start writing here...";
  const [copySuccess, setCopySuccess] = React.useState(false);
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [maxTokens, setMaxTokens] = useState("150");
  const [prompt, setPrompt] = useState("");
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

  useEffect(() => {
    setTitle(data[0]?.title);
    setContent(data[0]?.content);
    setIsPublic(data[0]?.isPublic);
    setWordCount(data[0]?.wordCount);
    setCharCount(data[0]?.charCount);
  }, [data]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    setDisabled(false);
    setBtnText("Save");
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
    setDisabled(false);
    setBtnText("Save");
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

  const formDisabled = () => {
    if ((charCount && content) || title) {
      if (
        (charCount !== 0 && charCount !== data[0]?.charCount) ||
        title.length > 0
      ) {
        return true;
      }
    }
    return false;
  };

  // if (formDisabled() || disabled) {
  //   setBtnText("Save");
  // } else {
  //   setBtnText("Saved");
  // }

  const updateStoryData = async () => {
    const payload = {
      title,
      content,
      charCount,
      wordCount
    };
    try {
      const result = await axiosInstance.put(
        `/story/${data[0]?._id}/update`,
        payload,
        {
          withCredentials: true
        }
      );
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
    // if (validator.isEmpty(content)) {
    //   message.error('Content cannot be empty');
    //   // setFormDisabled(false);
    //   setBtnText('Save');
    //   setSubmitLoading(false);
    //   return;
    // }
    if (formDisabled()) {
      setSubmitLoading(true);
      setErrors({});
      setBtnText("Saving...");
      setCharCount(charCount);
      await updateStoryData().then(result => {
        if (result.status === "error") {
          // setFormDisabled(false);
          setSubmitLoading(false);
          setBtnText("Save");
          message.error(result.errorMessage);
        } else {
          // setFormDisabled(true);
          setBtnText("Saved");
          // message.success("Document saved");
          setDisabled(true);
          setSubmitLoading(false);
        }
      });
    }
    return errors;
  };

  const toggleShare = () => {
    setShowShare(show => !show);
  };

  function useOnClickOutside(dropRef, handler) {
    useEffect(() => {
      const listener = event => {
        if (!dropRef.current || dropRef.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [dropRef, handler]);
  }

  const copyLink = () => {
    navigator.clipboard.writeText(
      `http://localhost:3001/read/${data[0]?.urlString}`
    );
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  const updateVisibilty = async value => {
    setSubmitLoading(true);
    setErrors({});
    setBtnText("Saving...");
    const payload = {
      title,
      content,
      charCount,
      wordCount,
      isPublic: value
    };
    await axiosInstance.put(`/story/${data[0]?._id}/update`, payload, {
      withCredentials: true
    });
    setSubmitLoading(false);
    // setFormDisabled(true);
    setBtnText("Saved");
  };

  const toggleVisibility = () => {
    setIsPublic(current => !current);
    updateVisibilty(!isPublic);
  };

  return (
    <div className="sc-jdhwqr cChEAZ">
      <Sidebar
        checkPrompt={checkPrompt}
        loading={loading}
        setMaxTokens={setMaxTokens}
        setPrompt={setPrompt}
        prompt={prompt}
        credits={credits}
      />
      <div className="sc-fkJVfC fEWUPr">
        {data.length ? (
          <>
            <div className="sc-cZMNgc jPRwbG">
              <div className="sc-jUosCB klZYnl">
                <div className="sc-jQrDum hcyzbe">
                  <div className="sc-fvxzrP kqJoff">
                    <Button
                      // htmlType="submit"
                      disabled={!formDisabled() || disabled}
                      className="btn btn-primary is-rounded"
                      loading={submitLoading}
                      onClick={onSubmit}
                    >
                      {btnText}
                    </Button>
                  </div>
                  <div className="me-24">
                    <a className="btn btn-link" onClick={toggleShare}>
                      Share
                    </a>
                  </div>
                  {showShare && (
                    <div ref={dropRef} className="sc-hmjpVf cfzVEv">
                      <div className="sc-bTfYFJ eRRBiT">
                        <p className="sc-furwcr sc-kHOZwM hDIoeL gGGBsj">
                          Make this public
                        </p>
                        <Switch
                          size="small"
                          loading={submitLoading}
                          onChange={toggleVisibility}
                          checked={isPublic}
                        />
                      </div>
                      {isPublic && (
                        <div className="sc-eLwHnm">
                          <p className="sc-jrQzAO sc-hOGkXu isybwh hTXGA-d">
                            Share this link with your friends
                          </p>
                          <Input
                            className="sc-ksdxgE sc-dtMgUX dLcLVX fmewbM"
                            value={`https://copydeck.ai/read/${data[0]?.urlString}/`}
                          />
                        </div>
                      )}
                      <Button
                        className="sc-hGPBjI btn btn-primary btn-sm"
                        disabled={!isPublic}
                        // loading={submitLoading}
                        onClick={copyLink}
                      >
                        {copySuccess ? "Link copied" : "Copy link"}
                      </Button>
                    </div>
                  )}

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
                  value={data[0]?.content}
                  // setContent={setContent}
                />
                <div></div>
              </div>
              <div className="writing-stats justify-content-start">
                <div className="sc-djWRfJ gpBwlP">
                  <p className="sc-iCfMLu sc-gIBqdA hXricx lhUpfH">
                    {wordCount}
                  </p>
                  <p className="sc-iCfMLu sc-fyrocj hXricx kWgNA">words</p>
                </div>
                <div className="sc-djWRfJ gpBwlP">
                  <p className="sc-iCfMLu sc-gIBqdA hXricx lhUpfH">
                    {charCount}
                  </p>
                  <p className="sc-iCfMLu sc-fyrocj hXricx kWgNA">characters</p>
                </div>
              </div>
              <FloatButton
                icon={<QuestionCircleOutlined />}
                type="default"
                style={{ right: 24 }}
              />
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

WriteUpdate.displayName = "WriteUpdate";
export default WriteUpdate;
