import NiceModal from "@ebay/nice-modal-react";
import CommonButton from "../../../common/button/CommonButton";
import CommonModal from "../CommonModal";
import "./LogoutModal.scss";
import { useNavigate } from "react-router-dom";

const LogoutModal = NiceModal.create(
  ({ closeLogoutModal }: { closeLogoutModal: () => void }) => {
    const navigate = useNavigate();
   
    const handleLogoutApi = () => {
      navigate("/");
      closeLogoutModal();
    };
   
    return (
      <>
        <CommonModal
          show
          handleClose={closeLogoutModal}
          className="logout_modal"
          heading="Are you sure you want to Logout?"
        >
          <div className="logout_modal_btns">
            <CommonButton title="Yes" onClick={handleLogoutApi} />
            <CommonButton
              className="border-btn"
              title="Cancel"
              onClick={closeLogoutModal}
            />
          </div>
        </CommonModal>
      </>
    );
  }
);

export default LogoutModal;
