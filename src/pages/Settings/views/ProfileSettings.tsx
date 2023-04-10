// import { axiosInstance } from '@copydeck/config';
import { useAuth } from "@copydeck/contexts/authContext";
import {
  Button, //   Group,
  Card,
  Input,
  message,
  Space,
  Typography
} from "antd";
import React, { useState } from "react";

// import { Link } from "react-router-dom";

const ProfileSettings = () => {
  const { user, updateUserAccount } = useAuth();
  const { Title, Text } = Typography;
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone);

  async function updateProfileAction() {
    // e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        firstName,
        lastName,
        phone: phoneNumber
      };
      await updateUserAccount(payload);
      setLoading(false);
      message.success("Profile updated");
    } catch (err) {
      setLoading(false);
      message.error(err.message);
      return [];
    }
  }

  const formDisabled = () => {
    if (firstName && lastName && phoneNumber) {
      if (
        (phoneNumber.length >= 9 && firstName !== user?.firstName) ||
        lastName !== user?.lastName ||
        phoneNumber !== user?.phone
      ) {
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
            <Title level={5}>Update Profile</Title>
            <div className="hp-profile-content-list mt-16 pb-0 pb-sm-36">
              <form>
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ display: "flex" }}
                >
                  <div>
                    <Text>First Name</Text>
                    <Input
                      className="mt-4"
                      size="large"
                      placeholder="John"
                      disabled={loading}
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Text>Last Name</Text>
                    <Input
                      className="mt-4"
                      size="large"
                      placeholder="Doe"
                      disabled={loading}
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Text>Email Address</Text>
                    <Input
                      className="mt-4"
                      size="large"
                      placeholder="your@email.com"
                      value={user.email}
                      disabled
                    />
                  </div>
                  <div>
                    <Text>Phone Number</Text>
                    <Input
                      className="mt-4"
                      size="large"
                      placeholder="Phone"
                      disabled={loading}
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </Space>
              </form>
            </div>
            <div className="hp-profile-action-btn mt-16 mt-sm-0">
              <Button
                onClick={updateProfileAction}
                disabled={!formDisabled()}
                loading={loading}
                className="btn btn-primary is-rounded"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
ProfileSettings.displayName = "ProfileSettings";
export default ProfileSettings;
