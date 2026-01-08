import { useState } from "react";
import logo from "../../../assets/images/logo.png"; // replace with your logo
import CommonButton from "../../common/button/CommonButton";
import { CopyIcon, WalletIcon } from "../../../assets/svgImgs/SvgImgs";
import { Col, Row } from "react-bootstrap";
import "./LoginPage.scss";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {

  const [connected, setConnected] = useState(true);
  const navigate = useNavigate();
  return (
    <div className="login_page">
      <div className="login_container">
        <div className="login_logo">
          <img src={logo} alt="Logo" />
        <h4>ROCK ICO Admin</h4>
        </div>
        {connected ?
          <CommonButton
            title={"Connect Wallet"}
            className="wallet_btn mb-3"
            svgIcon={<WalletIcon />}
            onClick={() => {
              setConnected(false);
            }}
            fluid
          />
          :
          <Row className="gx-3 mb-3">
            <Col xs={8}>
              <CommonButton
                svgIcon={<WalletIcon />}
                title={"0xDbAa...33E85D"}
                className="login_btn"
                fluid
              />
            </Col>
            <Col xs={4}>
              <CommonButton
                onlyIcon={<CopyIcon />}
                className="copy_btn"
                fluid
              />
            </Col>
          </Row>
        }
        <Row>
          <Col>
            <CommonButton
              title={"Login"}
              className="login_btn"
              onClick={() => {
                navigate("/admin/dashboard");
              }}
              fluid
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LoginPage;
