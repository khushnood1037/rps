import { Form } from "react-bootstrap";
import Select from "react-select";
import ErrorComponent from "../errorComponent/ErrorComponent";
import "./SelectField.scss";

interface SelectFieldProps {
  className?: string;
  menuIsOpen?: boolean;
  defaultValue?: unknown;
  onChange?: (selected: unknown) => void;
  options?: Array<{ value: unknown; label: string }>;
  name?: string;
  isMulti?: boolean;
  value?: unknown;
  isClearable?: boolean;
  onMenuScrollToBottom?: () => void;
  placeholder?: string;
  filterOption?: (option: { label: string; value: unknown }, inputValue: string) => boolean;
  closeMenuOnSelect?: boolean;
  label?: string;
  required?: boolean;
  error?: string | undefined;
  onBlur?: () => void;
}

const SelectField = ({
  className = "",
  menuIsOpen,
  defaultValue,
  onChange,
  options,
  name,
  isMulti,
  value,
  isClearable,
  onMenuScrollToBottom,
  placeholder,
  filterOption,
  // isSearchable,
  closeMenuOnSelect,
  label,
  required,
  error,
  onBlur,
}: SelectFieldProps) => {
  return (
    <div className="custom_select">
      {label && (
        <Form.Label htmlFor={name}>
          {label}
          {required && <sup>*</sup>}
        </Form.Label>
      )}
      <Select
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
        value={value}
        className={`select_control ${className}`}
        classNamePrefix="select"
        menuIsOpen={menuIsOpen}
        placeholder={placeholder}
        name={name}
        isMulti={isMulti}
        isClearable={isClearable}
        onMenuScrollToBottom={onMenuScrollToBottom}
        filterOption={filterOption}
        closeMenuOnSelect={closeMenuOnSelect}
        isSearchable={false}
        onBlur={onBlur}
      />
      {error && <ErrorComponent error={error} />}
    </div>
  );
};

export default SelectField;
