import React from "react";

interface NotFoundPageProps {
  onBack: () => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = props => {
  const { onBack } = props;

  return (
    <div className="section _100vh">
      <div className="text-container">
        <div className="_40rem l-margin">
          <h2 className="h2-title s-margin">
            Sorry, this page does not exist or has been moved
          </h2>
          <div>Please, consider going back to our homepage.</div>
        </div>
        <button onClick={onBack} className="btn btn-primary is-rounded">
          Go back home
        </button>
      </div>
    </div>
  );
};
NotFoundPage.displayName = "NotFoundPage";
export default NotFoundPage;
