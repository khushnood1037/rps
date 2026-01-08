import NiceModal, { useModal } from "@ebay/nice-modal-react";
import CommonModal from "../CommonModal";
import './SuccessModal.scss'
import tickImg from '../../../../assets/images/tick-img.png'

const SuccessModal = NiceModal.create(() => {
    const modal = useModal();

    return (
        <CommonModal
            show={modal.visible}
            handleClose={modal.hide}
            className="success_modal"
            customCloseButton
        >
            <img src={tickImg} alt="" className="tick_img" />
            <h4>One of our team will email you. We appreciate the excitement, so we aim to contact you the same day.</h4>
        </CommonModal>
    );
});

export default SuccessModal;
