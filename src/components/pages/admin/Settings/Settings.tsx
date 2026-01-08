import { Col, Row } from "react-bootstrap";
import CommonButton from "../../../common/button/CommonButton";
import InputField from "../../../ui/formik/inputField/InputField";
import "./Settings.scss";

const Settings = () => {
  // Static admin details
  const adminDetails = {
    icoOwner: "0x1234567890abcdef1234567890abcdef12345678",
    rockOwner: "0xabcdef1234567890abcdef1234567890abcdef12",
    vestingOwner: "0x9876543210fedcba9876543210fedcba98765432",
    icoReceiver: "0x1111111111111111111111111111111111111111",
    taxCollector: "0x2222222222222222222222222222222222222222",
  };

  const taxCollected = "1000000";

  return (
    <div className="settings">
      <Row className="setting_row">
        {/* ICO Owner */}
        <Col lg={6}>
          <div className="settings_inner">
            <Row>
              <Col lg={12}>
                <InputField
                  label="Current ICO Owner Address"
                  value={adminDetails.icoOwner}
                  disabled
                />
              </Col>
              <Col lg={12}>
                <InputField
                  label="New ICO Owner Address"
                  placeholder="Enter New ICO Owner Address"
                  value=""
                  disabled
                />
              </Col>
              <div className="setting_actions_btns">
                <CommonButton title="Submit" />
                <CommonButton title="View History" />
              </div>
            </Row>
          </div>
        </Col>

        {/* ICO Receiver */}
        <Col lg={6}>
          <div className="settings_inner">
            <Row>
              <Col lg={12}>
                <InputField
                  label="Current ICO Receiver Address"
                  value={adminDetails.icoReceiver}
                  disabled
                />
              </Col>
              <Col lg={12}>
                <InputField
                  label="New ICO Receiver Address"
                  placeholder="Enter New ICO Receiver Address"
                  value=""
                  disabled
                />
              </Col>
              <div className="setting_actions_btns">
                <CommonButton title="Submit" />
                <CommonButton title="View History" />
              </div>
            </Row>
          </div>
        </Col>

        {/* Rock Token Owner */}
        <Col lg={6}>
          <div className="settings_inner">
            <Row>
              <Col lg={12}>
                <InputField
                  label="Current Rock Token Owner Address"
                  value={adminDetails.rockOwner}
                  disabled
                />
              </Col>
              <Col lg={12}>
                <InputField
                  label="New Rock Token Owner Address"
                  placeholder="Enter New Rock Token Owner Address"
                  value=""
                  disabled
                />
              </Col>
              <div className="setting_actions_btns">
                <CommonButton title="Submit" />
                <CommonButton title="View History" />
              </div>
            </Row>
          </div>
        </Col>

        {/* Vesting Address */}
        <Col lg={6}>
          <div className="settings_inner">
            <Row>
              <Col lg={12}>
                <InputField
                  label="Current Rock Vesting Owner Address"
                  value={adminDetails.vestingOwner}
                  disabled
                />
              </Col>
              <Col lg={12}>
                <InputField
                  label="New Rock Vesting Address"
                  placeholder="Enter New Rock Vesting Address"
                  value=""
                  disabled
                />
              </Col>
              <div className="setting_actions_btns">
                <CommonButton title="Submit" />
                <CommonButton title="View History" />
              </div>
            </Row>
          </div>
        </Col>

        {/* Tax Collector */}
        <Col lg={6}>
          <div className="settings_inner">
            <Row>
              <Col lg={12}>
                <InputField
                  label="Current Rock Token's Tax Collector"
                  value={adminDetails.taxCollector}
                  disabled
                />
              </Col>
              <Col lg={12}>
                <InputField
                  label="New Rock Token's Tax Collector"
                  placeholder="Enter New Tax Collector Address"
                  value=""
                  disabled
                />
              </Col>
              <Col lg={12}>
                <InputField
                  label="Tax Collected"
                  value={` ${taxCollected} `}
                  disabled
                />
              </Col>
              <div className="setting_actions_btns">
                <CommonButton title="Submit" />
                <CommonButton title="View History" />
              </div>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Settings;
