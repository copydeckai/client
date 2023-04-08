// import { makeRequest } from "@copydeck/utils/makeRequest";
import { IconEdit, IconInfoCircle, IconTrash } from "@tabler/icons";
import { Card, Popconfirm } from "antd";
import { formatDistance, subDays } from "date-fns";
import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface WritingCardInnerProps {
  data: any;
  deleteAction: (id: any) => void;
  confirmLoading: boolean;
}

const WritingCardInner: React.FC<WritingCardInnerProps> = ({
  data,
  deleteAction,
  confirmLoading
}) => {
  const contentSnippet = data.content.substring(0, 250) + "...";

  const [visible, setVisible] = useState(false);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const CardActions = () => (
    <div className="card-footer sc-fpYaaq dgVbpZ">
      <div className="sc-lnDqNf knFRhQ">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="StyledIconBase-ea9ulj-0 fHrGFt sc-hUnA hTifgl"
        >
          <g data-name="Layer 2">
            <g data-name="clock">
              <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z"></path>
              <path d="M16 11h-3V8a1 1 0 00-2 0v4a1 1 0 001 1h4a1 1 0 000-2z"></path>
            </g>
          </g>
        </svg>
        <p className="sc-jrQzAO sc-cnTVOG isybwh gTHWVV">
          {/* {format(new Date(data.updatedAt), 'yyyy-MM-dd')} */}
          {formatDistance(subDays(new Date(data.updatedAt), 0), new Date(), {
            addSuffix: true
          })}
        </p>
      </div>
      <div className="sc-lnDqNf knFRhQ">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="StyledIconBase-ea9ulj-0 fHrGFt sc-hUnA hTifgl"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"></path>
        </svg>
        <p className="sc-jrQzAO sc-cnTVOG isybwh gTHWVV">
          {data.wordCount} words
        </p>
      </div>
      <div className="sc-hctura jmeNYp">
        <Link to={`/write/${data.urlString}`}>
          <IconEdit className="fHrGFt sc-jSYIrd" />
        </Link>
      </div>
      <div className="sc-hctura jmeMXd">
        <Popconfirm
          placement="bottomRight"
          title="Are you sure you want to delete this?"
          open={visible}
          onConfirm={() => {
            deleteAction(data._id);
            setVisible(false);
          }}
          okButtonProps={{ loading: confirmLoading }}
          okText="Delete"
          cancelText="Nope"
          onCancel={handleCancel}
          icon={<IconInfoCircle />}
        >
          <IconTrash className="fHrGFt sc-jSYIrd" onClick={showPopconfirm} />
        </Popconfirm>
      </div>
    </div>
  );

  return (
    <div className="col-lg-4">
      <Card className="writings mb-8" actions={[<CardActions />]}>
        <h6>{data.title}</h6>
        <p
          className="hp-p1-body hp-mb-0 sssjW"
          dangerouslySetInnerHTML={{ __html: contentSnippet }}
        ></p>
      </Card>
    </div>
  );
};

WritingCardInner.displayName = "WritingCardInner";
export default WritingCardInner;
