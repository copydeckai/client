import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { axiosInstance } from "@copydeck/config";
import {
  Button, //   Group,
  Card,
  Input,
  message,
  Space,
  Typography
} from "antd";
import React, { useState } from "react";

// import validator from "validator";

const PasswordSettings = () => {
  const { Text, Title } = Typography;
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function changePasswordAction() {
    setLoading(true);
    try {
      if (confirmPassword !== newPassword) {
        message.error("Passwords do not match");
        setLoading(false);
        return;
      }
      const payload = {
        password,
        newPassword,
        confirmPassword
      };
      await axiosInstance.post(`/auth/change-password`, payload, {
        withCredentials: true
      });
      setLoading(false);
      message.success("Password Updated");
    } catch (err) {
      setLoading(false);
      message.error(err.message);
      return [];
    }
  }

  const formDisabled = () => {
    if (password && newPassword && confirmPassword) {
      if (password.length !== 0 || newPassword !== confirmPassword) {
        return true;
      }
    }
    return false;
  };

  return (
    <Card>
      <div className="card-body">
        <div className="row align-items-center justify-content-between">
          <div className="col-12 col-md-6 hp-profile-content-list">
            <Title level={5}>Update Account Password</Title>
            <div className="hp-profile-content-list mt-16 pb-0 pb-sm-36">
              <form>
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ display: "flex" }}
                >
                  <div>
                    <Text>Current Password</Text>
                    <Input.Password
                      className="mt-4"
                      size="large"
                      placeholder="current password"
                      iconRender={visible =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <Text>New Password</Text>
                    <Input.Password
                      className="mt-4"
                      size="large"
                      placeholder="input password"
                      iconRender={visible =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <Text>Repeat Password</Text>
                    <Input.Password
                      className="mt-4"
                      size="large"
                      placeholder="repeat password"
                      iconRender={visible =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </Space>
              </form>
            </div>
            <div className="hp-profile-action-btn">
              <Button
                onClick={changePasswordAction}
                loading={loading}
                disabled={!formDisabled()}
                className="btn btn-primary is-rounded"
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
PasswordSettings.displayName = "PasswordSettings";
export default PasswordSettings;
