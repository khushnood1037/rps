import { Modal } from "react-bootstrap";
import "./CommonModal.scss";
import { CrossIcon1 } from "../../../assets/svgImgs/SvgImgs";

interface CommonModals {
  show?: boolean;
  handleClose?: () => void;
  heading?: React.ReactNode;
  style?: React.CSSProperties;
  backdropClassName?: string;
  className?: string;
  variant?: "small" | "large";
  backdrop?: boolean | "static";
  children?: React.ReactNode;
  customCloseButton?: React.ReactNode;
}

const CommonModal = (props: CommonModals) => {
  return (
    <>
      <Modal
        show={props?.show}
        onHide={props?.handleClose}
        style={props?.style}
        centered
        backdropClassName={props?.backdropClassName}
        className={`${props?.className} ${props?.variant} commonModal`}
        backdrop={props?.backdrop}
      >
        <Modal.Header closeButton={!props?.customCloseButton}>
          <Modal.Title>
            <h4>{props?.heading}</h4>
            {props?.customCloseButton && (
              <button className="custom_close_btn" onClick={props.handleClose}>
                <CrossIcon1 />
              </button>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{props?.children}</Modal.Body>
      </Modal>
    </>
  );
};

export default CommonModal;
