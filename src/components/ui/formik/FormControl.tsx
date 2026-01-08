import "./FormControl.scss";
import InputField from "./inputField/InputField";
import SelectField from "./selectField/SelectField";

interface FormControlProps {
  control?: string;
  error?: string | undefined;
  [key: string]: unknown;
}

const FormControl: React.FC<FormControlProps> = ({
  control,
  error,
  ...props
}) => {
  switch (control) {
    case "select":
      return <SelectField {...props} error={error} />;
    default:
      return <InputField {...props} error={error} />;
  }
};

export default FormControl;
