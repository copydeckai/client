import { Card, Typography } from "antd";
// import { useForm } from "@mantine/form";
import React from "react";

// import { Link } from "react-router-dom";

const MembershipSettings = () => {
  const { Text } = Typography;
  return (
    <Card>
      <div className="card-body">
        <div className="row align-items-center justify-content-between">
          <div className="col-12 col-md-6">
            <Text>Membership</Text>
          </div>
        </div>
      </div>
    </Card>
  );
};
MembershipSettings.displayName = "MembershipSettings";
export default MembershipSettings;
