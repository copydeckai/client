// import SVG from "react-inlinesvg";
// import toast from "react-hot-toast";
import WritingCardInner from "./WritingCardInner";
import EmptyIcon from "@assets/icons/empty.svg";
// import { API_URL } from "@copydeck/config";
import { useSearch } from "@copydeck/contexts/searchContext";
import { useFetch } from "@copydeck/hooks/makeRequest";
// import useNavigator from "@copydeck/hooks/useNavigator";
import { Card, Col, Empty, message, Row, Skeleton } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const WritingCard: React.FC = () => {
  // const navigate = useNavigator();
  const { searchResults, loading: searchLoading } = useSearch();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { loading, error, data } = useFetch(`/story/stories`);
  const [list, setList] = useState(data);
  // useEffect(() => {
  //   setList(data);
  // }, [data]);
  useEffect(() => {
    if (searchResults) {
      // navigate("/");
      setList(searchResults);
    } else {
      setList(data);
    }
  }, [data, searchResults]);

  const handleDelete = async id => {
    setConfirmLoading(true);
    try {
      await axios.delete(`/story/${id}/delete`, {
        withCredentials: true
      });
      setList(list.filter(item => item._id !== id));
      message.success("Story successfully deleted");
      setConfirmLoading(false);
    } catch (err) {
      message.error(err);
    }
  };
  return (
    <Col span={24}>
      {error ? (
        "Something went wrong!"
      ) : loading || searchLoading ? (
        <div className="row g-32">
          <div className="col-lg-4">
            <Card className="writings p-0">
              <Skeleton active={!loading}></Skeleton>
            </Card>
          </div>
          <div className="col-lg-4">
            <Card className="writings p-0">
              <Skeleton active={!loading}></Skeleton>
            </Card>
          </div>
          <div className="col-lg-4">
            <Card className="writings p-0">
              <Skeleton active={!loading}></Skeleton>
            </Card>
          </div>
        </div>
      ) : list.length > 0 ? (
        <div className="row g-32">
          {list.map((_data, index) => (
            <WritingCardInner
              data={_data}
              key={index}
              confirmLoading={confirmLoading}
              deleteAction={handleDelete}
            />
          ))}
        </div>
      ) : (
        <Row gutter={16} className="g-32 d-block">
          <Empty image={EmptyIcon} description={false}>
            <h4 className="mt-42 hp-text-color-dark-30">No writing</h4>
            <p>Use the button to add a new story</p>
          </Empty>
        </Row>
      )}
    </Col>
  );
};

WritingCard.displayName = "WritingCard";
export default WritingCard;
