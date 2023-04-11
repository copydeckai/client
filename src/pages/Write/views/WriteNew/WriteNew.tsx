import Editor from "../../components/Editor";
import Sidebar from "../../components/Sidebar";
import "./style.scss";
import { CloseCircleFilled, RobotFilled } from "@ant-design/icons";
import ThemeSwitch from "@copydeck/components/ThemeSwitch";
import { axiosInstance } from "@copydeck/config";
import { useAuth } from "@copydeck/contexts/authContext";
// import useNavigator from "@copydeck/hooks/useNavigator";
// import { useNavigate } from 'react-router-dom';
import { getCompletion } from "@copydeck/libs/openaiClient";
import useAutosizeTextArea from "@copydeck/utils/useAutosizeTextarea";
import { Button, Input, message, Switch } from "antd";
import axios from "axios";
import { CreateCompletionRequest } from "openai";
import React, { useEffect, useRef, useState } from "react";

// import validator from "validator";

interface WriteNewProps {
  toggleShowPlanType: () => void;
  storyContext: string;
  // alterStoryLoader: () => void;
}
// generate string for slug
const slug = Math.random().toString(36).substring(2, 10);

const WriteNew: React.FC<WriteNewProps> = ({
  toggleShowPlanType,
  storyContext
}) => {
  const { user, updateUserAccount } = useAuth();
  // const navigate = useNavigate();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [
    ,
    // openaiRequest
    setOpenaiRequest
  ] = useState<CreateCompletionRequest | undefined>(undefined);
  const [onChange, setOnChange] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const dropRef = useRef(null);
  useOnClickOutside(dropRef, () => setShowShare(false));
  const [disabled, setDisabled] = useState(true);
  const [btnText, setBtnText] = useState("Save for later");
  // const [urlString, setUrlString] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const placeholder = "Start writing here...";
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [maxTokens, setMaxTokens] = useState("150");
  const [prompt, setPrompt] = useState("");
  const [copySuccess, setCopySuccess] = React.useState(false);
  const [credits, setCredits] = useState(0);
  const [story, setStory] = useState(null);
  // const [choiceCount, setChoiceCount] = useState(0);

  const titleTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(show => !show);
  };

  useEffect(() => {
    setCredits(user.aiUsage.credits);
  }, [user]);

  useAutosizeTextArea(titleTextAreaRef.current, title);
  const [timer, setTimer] = useState(null);

  const fetchStory = async () => {
    try {
      const { data } = await axios.get(`/story/${slug}`);

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const saveOnChange = () => {
    const currentUrl = window.location.href;
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      // Compare the current URL with a string
      if (currentUrl.includes(slug)) {
        updateSubmit();
      } else {
        window.history.pushState(null, "", `/write/${slug}`);
        submitClick();
      }
    }, 3000);
    setTimer(newTimer);
  };

  const saveOnClick = () => {
    const currentUrl = window.location.href;
    // Compare the current URL with a string
    if (currentUrl.includes(slug)) {
      updateSubmit();
    } else {
      submitClick();
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    setBtnText("Save");
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
    setBtnText("Save");
    setDisabled(false);
    setOnChange(true);
    setWordCount(wordCount);
    setCharCount(plainText.length);
  };

  useEffect(() => {
    if (onChange) {
      saveOnChange();
    }
  }, [content]);

  function generatePrompt(): CreateCompletionRequest {
    const formTitlePrompt =
      storyContext === "ARTICLE_BLOG"
        ? `
	  Generate a blog post by utilizing the topic below and crafting a story that delves into each point. Don't simply list the points; instead, provide in-depth explanations for each one, exploring the reasons behind them.

	  Topic: ${title}
	  `
        : `Craft a fictional story with a natural and captivating narrative that incorporates the given title as its central concept.
    Title: ${title}`;
    const formContentPrompt = `${content}[insert]`;

    const promptPrefix =
      storyContext === "ARTICLE_BLOG"
        ? `Compose a comprehensive blog article on a subject chosen at random, while abstaining from revealing the actual topic.`
        : `Craft a fictional story with a natural and captivating narrative using a random concept in the form of fiction.`;

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
          tokensUsed: ++count
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
              if (editable.innerText === placeholder) {
                editable.innerText = "";
              }
              const speed = 15;
              let count = 0;

              const typeWriter = () => {
                if (count < completion.choices[0].text.length) {
                  editable.innerText += result.charAt(count);
                  count++;
                  // setChoiceCount(characters);
                  setTimeout(typeWriter, speed);
                }
              };
              typeWriter();

              const countChoices = completion.choices[0].text.length;

              if (countChoices) {
                toggleMobileSidebar();
                updateAiCredit(countChoices);
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

  const createNewStory = async () => {
    const userId = user._id;
    const userFname = user.firstName;
    const userLname = user.lastName;
    const userAvatar = user.avatar;
    const payload = {
      title,
      content,
      aiSettings: {
        storyBackground: storyContext,
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
      // setUrlString(slug);
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

  const submitClick = async () => {
    setSubmitLoading(true);
    setErrors({});
    setBtnText("Saving");
    // if (validator.isEmpty(content)) {
    //   message.error("Content cannot be empty");
    //   setDisabled(false);
    //   setBtnText("Save");
    //   setSubmitLoading(false);
    //   return;
    // }
    await createNewStory().then(result => {
      if (result.status === "error") {
        setDisabled(false);
        setSubmitLoading(false);
        setBtnText("Save");
        message.error(result.errorMessage);
      } else {
        setDisabled(true);
        setBtnText("Saved");
        setSubmitLoading(false);
        fetchStory().then(result => {
          setStory(result);
        });
      }
    });
    return errors;
  };

  const updateStoryData = async () => {
    const payload = {
      title,
      content,
      charCount,
      wordCount
    };
    try {
      const result = await axiosInstance.put(
        `/story/${story[0]?._id}/update`,
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

  const updateSubmit = async () => {
    // if (formDisabled()) {
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
    // }
    return errors;
  };

  // const formDisabled = () => {
  //   if ((charCount && content) || title) {
  //     if (
  //       (charCount !== 0 && charCount !== story[0]?.charCount) ||
  //       title.length > 0
  //     ) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

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
      `https://copydeck.grayshapes.co/read/${story[0]?.urlString}`
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
    await axiosInstance.put(`/story/${story[0]?._id}/update`, payload, {
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
    <div id="editorArea" className="sc-jdhwqr cChEAZ">
      <Sidebar
        storyContext={storyContext}
        checkPrompt={checkPrompt}
        loading={loading}
        setMaxTokens={setMaxTokens}
        setPrompt={setPrompt}
        prompt={prompt}
        credits={credits}
        showMobileSidebar={showMobileSidebar}
        wordCount={wordCount}
        charCount={charCount}
      />
      <div className="sc-fkJVfC fEWUPr">
        <div className="sc-cZMNgc jPRwbG">
          <div className="sc-jUosCB klZYnl">
            <div className="jPwjWq" onClick={toggleMobileSidebar}>
              {showMobileSidebar ? (
                <CloseCircleFilled style={{ fontSize: 24, color: "#cdcdcd" }} />
              ) : (
                <RobotFilled style={{ fontSize: 24, color: "#cdcdcd" }} />
              )}
            </div>
            <div className="sc-jQrDum hcyzbe">
              <div className="sc-fvxzrP kqJoff">
                <Button
                  // htmlType="submit"
                  disabled={disabled}
                  className="btn btn-primary is-rounded"
                  loading={submitLoading}
                  onClick={saveOnClick}
                >
                  {btnText}
                </Button>
              </div>
              <div className="me-24">
                <a
                  className={`btn btn-link ${!story ? "is-disabled" : ""}`}
                  onClick={story ? toggleShare : undefined}
                >
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
                        value={`https://copydeck.ai/read/${story[0]?.urlString}/`}
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
          {/* <FloatButton
            icon={<QuestionCircleOutlined />}
            type="default"
            style={{ right: 24 }}
          /> */}
        </div>
      </div>
    </div>
  );
};

WriteNew.displayName = "WriteNew";
export default WriteNew;
