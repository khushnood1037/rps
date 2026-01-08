import { useState } from "react";
import { Form } from "react-bootstrap";
import {
  CloseEyeIcon,
  OpenEyeIcon,
} from "../../../../assets/svgImgs/SvgImgs.tsx";
import ErrorComponent from "../errorComponent/ErrorComponent";
import "../FormControl.scss";
interface InputFieldProps {
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  maxLength?: number;
  value?: string | number;
  bottomTitle?: string | React.ReactNode;
  required?: boolean;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  restrictNumberInput?: boolean;
  disabled?: boolean;
}
const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  placeholder,
  error,
  className,
  maxLength,
  value,
  bottomTitle,
  onChange,
  onBlur,
  required,
  rightIcon,
  onClick,
  disabled,
  restrictNumberInput,
}) => {
  const [active, setActive] = useState(true);
  const handleTogglePassword = () => {
    setActive(!active);
  };
  const inputType =
    type === "password" ? (active ? "password" : "text") : type || "text";
  return (
    <div
      className={`input_group ${className} ${
        type === "password" ? "passfield" : ""
      }`}
    >
      {label && (
        <Form.Label htmlFor={name}>
          {label } 
          {required && <sup>*</sup>}
        </Form.Label>
      )}
      <div className="input_group_inner">
        <Form.Control
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={onChange}
          onBlur={onBlur}
          isInvalid={!!error}
          disabled={disabled}
          
          onKeyDown={(e) => {
            if (
              restrictNumberInput &&
              ["e", "E", "+", "-", "."].includes(e.key)
            ) {
              e.preventDefault();
            }
          }}
        />
        {type === "password" ? (
          <button
            type="button"
            className="input_group_passbtn"
            onClick={handleTogglePassword}
          >
            {active ? <CloseEyeIcon /> : <OpenEyeIcon />}
          </button>
        ) : (
          ""
        )}
        {rightIcon && (
          <button className="rightIcon" type="button" onClick={onClick}>
            {rightIcon}
          </button>
        )}
      </div>
      <ErrorComponent error={error} />
      {bottomTitle && (
        <div className="input_group_btm_title">{bottomTitle}</div>
      )}
    </div>
  );
};
export default InputField;
