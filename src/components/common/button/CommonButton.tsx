import "./CommonButton.scss";

interface CommonButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  fluid?: boolean;
  transparent?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  buttonTitle?: string;
  onlyIcon?: React.ReactNode;
  svgIcon?: React.ReactNode;
  title?: string;
  rightIcon?: React.ReactNode;
  btnIcon?: string;
  preventDefault?: boolean;
}

/**COMMON BUTTON WITH DYNAMIC PROPS */
const CommonButton = (props: CommonButtonProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (props.preventDefault) {
      event.preventDefault();
    }
    props?.onClick?.(event);
  };
  return (
    <button
      onClick={handleClick}
      type={props.type || "button"}
      className={`btn-style ${props.className} ${props.fluid ? "w-100" : ""} ${
        props.transparent ? "transparent" : ""
      }`}
      disabled={props?.disabled}
      style={props?.style}
      title={props?.buttonTitle}
    >
      {props.onlyIcon && <span className="onlyIcon">{props.onlyIcon}</span>}
      {props.svgIcon && <span className="svgIcon">{props.svgIcon}</span>}
      {props.title}
      {props.rightIcon && <span className="rightIcon">{props.rightIcon}</span>}
      {props.btnIcon && <img src={props.btnIcon} alt="icon" className="" />}
    </button>
  );
};

export default CommonButton;
