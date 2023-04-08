import { WindowTitle } from "@copydeck/components/WindowTitle";
import React from "react";

export interface ErrorPageProps {
  id?: string | null;
}

const ErrorPage: React.FC<ErrorPageProps> = props => {
  const { id } = props;

  return (
    <div className="utilities-section">
      <WindowTitle title={`That's an Error`} />
      <div className="utilities-form-column">
        <div className="utilities-form-wrap d-flex">
          <h1 className="l-margin">
            (<span className="text-primary">:</span>
          </h1>
          <div>
            <h4 className="h4-title xs-margin">That's an error!</h4>
            <p className="m-paragraph l-margin">
              Refresh the page to dismiss this message {id} or navigate to a
              different page.
            </p>
          </div>
          <div className="utilities-form w-form"></div>
        </div>
      </div>
    </div>
  );
};
ErrorPage.displayName = "ErrorPage";
export default ErrorPage;
