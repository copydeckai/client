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
}

const Sidebar: React.FC<SidebarProps> = ({
  checkPrompt,
  loading,
  setMaxTokens,
  setPrompt,
  prompt,
  credits
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
    <div className="sc-gslxeA cBxktM border-end has-slimscroll has-slimscroll-sm">
      <form>
        <div id="sidebar-inner" className="sc-avest jcvqub">
          <div id="article-brief">
            <span
              id="collapsible-trigger-1672432628189"
              className="Collapsible__trigger is-closed"
              aria-expanded="false"
              aria-disabled="false"
              aria-controls="collapsible-content-1672432628189"
              role="button"
            >
              <div id="brief-trigger">
                <div className="sc-kmQMED mb-8 jIsxzV">
                  <Title level={5}>Article brief</Title>
                </div>
              </div>
            </span>
            <p className="sc-iCfMLu sc-iWVNaa hXricx eCsXSR mb-4">
              Provide the AI with a brief of what you are writing about,
              describe it like you are speaking to a friend.
            </p>
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
              <Text keyboard className="text-dark">⌘</Text> + <Text keyboard className="text-dark">enter</Text>
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
