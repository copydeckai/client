// import { Link } from "react-router-dom";
import Membership from "./views/MembershipSettings";
import PasswordSettings from "./views/PasswordSettings";
import ProfileSettings from "./views/ProfileSettings";
import { IconCreditCard, IconKey, IconUser } from "@tabler/icons";
import { Tabs, TabsProps } from "antd";
import React from "react";

const Settings = () => {
  // const onChange = (key: string) => {
  //   console.log(key);
  // };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span>
          <IconUser />
          Profile
        </span>
      ),
      children: <ProfileSettings />
    },
    {
      key: "2",
      label: (
        <span>
          <IconCreditCard />
          Membership
        </span>
      ),
      children: <Membership />
    },
    {
      key: "3",
      label: (
        <span>
          <IconKey />
          Password
        </span>
      ),
      children: <PasswordSettings />
    }
  ];

  return (
    <div className="hp-main-layout-content">
      <div className="row mb-32 gy-32">
        <div className="col-12">
          <div className="row">
            <div className="col-12 col-md-6">
              <h3>My Account</h3>
            </div>
          </div>
        </div>

        <div className="col-12">
          <Tabs defaultActiveKey="1" items={items}></Tabs>
        </div>
      </div>
    </div>
  );
};

Settings.displayName = "Settings";
export default Settings;
