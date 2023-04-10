import { Button, Input, Typography } from "antd";
import React from "react";

// import { useAuth } from '@copydeck/contexts/authContext';

interface SidebarProps {
  checkPrompt: (e: any) => void;
  loading: boolean;
  prompt: string;
  setPrompt: (prompt) => void;
  setMaxTokens: any;
  credits?: any;
  showMobileSidebar?: boolean;
  wordCount?: number;
  charCount?: number;
  storyContext?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  storyContext,
  checkPrompt,
  loading,
  setMaxTokens,
  setPrompt,
  prompt,
  credits,
  wordCount,
  charCount,
  showMobileSidebar
}) => {
  React.useEffect(() => {
    document.body.classList.add("collapsed-active");
  }, []);
  const handlePromptChange = event => {
    setPrompt(event.target.value);
  };
  const handleTokenChange = event => {
    setMaxTokens(event.target.value);
  };

  const { Title, Text } = Typography;
  const { TextArea } = Input;

  return (
    <div
      className={`sc-gslxeA cBxktM border-end has-slimscroll has-slimscroll-sm ${
        showMobileSidebar ? "mobile-active" : ""
      }`}
    >
      <form>
        <div id="sidebar-inner" className="sc-avest jcvqub">
          <div id="article-brief">
            <div className="sc-kmQMED mb-8 jIsxzV">
              <Title level={5}>{storyContext === "ARTICLE_BLOG" ? "Article brief" : "Story background"}</Title>
            </div>
            
            {storyContext === "ARTICLE_BLOG" ? (
              <p className="sc-iCfMLu sc-iWVNaa hXricx eCsXSR mb-4">Provide the AI a summary of the topic you're writing about, explain it as if you're talking to a friend.</p>
            ) : (
              <p className="sc-iCfMLu sc-iWVNaa hXricx eCsXSR mb-4">Let the AI know the story's location and characters for improved output. Explain it as you would to a friend.</p>
            )}
            <TextArea
              maxLength={1000}
              rows={4}
              name="prompt"
              onChange={handlePromptChange}
              value={prompt}
            />
          </div>
          <div className="sc-kmQMED mb-8 jIsxzV">
            <Title level={5}>Output length</Title>
          </div>
          <p className="sc-iCfMLu sc-iWVNaa hXricx eCsXSR">
            How much should the AI write at a time?
          </p>
          <div className="sc-bUbRBg cARCsJ">
            <div className="row g-16 mb-16">
              <div className="col hp-flex-none w-auto">
                <input
                  type="radio"
                  className="btn-check"
                  name="tokens"
                  value={150}
                  id="aLittle"
                  onChange={handleTokenChange}
                  defaultChecked
                />
                <label className="btn btn-primary" htmlFor="aLittle">
                  A little
                </label>
              </div>
              <div className="col px-4 hp-flex-none w-auto">
                <input
                  type="radio"
                  className="btn-check"
                  name="tokens"
                  value={650}
                  id="somewhat"
                  onChange={handleTokenChange}
                />
                <label className="btn btn-primary" htmlFor="somewhat">
                  Somewhat
                </label>
              </div>
              <div className="col hp-flex-none w-auto">
                <input
                  type="radio"
                  className="btn-check"
                  name="tokens"
                  value={1200}
                  id="aLot"
                  onChange={handleTokenChange}
                />
                <label className="btn btn-primary" htmlFor="aLot">
                  A lot
                </label>
              </div>
            </div>
          </div>
          <div className="_stats">
            <div className="sc-kmQMED mb-8 jIsxzV">
              <Title level={5}>Writing Stats</Title>
            </div>
            <div className="writing-stats justify-content-start">
              <div className="sc-djWRfJ gpBwlP">
                <p className="sc-iCfMLu sc-gIBqdA hXricx lhUpfH">{wordCount}</p>
                <p className="sc-iCfMLu sc-fyrocj hXricx kWgNA">words</p>
              </div>
              <div className="sc-djWRfJ">
                <p className="sc-iCfMLu sc-gIBqdA hXricx lhUpfH">{charCount}</p>
                <p className="sc-iCfMLu sc-fyrocj hXricx kWgNA">characters</p>
              </div>
            </div>
          </div>
          <div className="sc-hZpJaK espFuE">
            <div id="write-for-me" className="sc-evcjhq igArTR">
              <Button
                htmlType="button"
                className="btn btn-primary is-rounded btn-md"
                loading={loading}
                onClick={checkPrompt}
                // disabled={loading || !hasChanged || formDisabled}
              >
                Write for me
              </Button>
            </div>
            <p className="sc-furwcr sc-JkixQ hDIoeL fgCFSm text-dark">
              <Text keyboard className="text-dark">
                ⌘
              </Text>{" "}
              +{" "}
              <Text keyboard className="text-dark">
                enter
              </Text>
            </p>
            <p className="sc-jrQzAO sc-cHzqoD isybwh dSZGnI">
              You have {credits} more use(s) left.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

Sidebar.displayName = "Sidebar";
export default Sidebar;
