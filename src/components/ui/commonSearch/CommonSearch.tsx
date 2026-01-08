import InputField from "../formik/inputField/InputField";
import "./CommonSearch.scss";

interface CommonSearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const CommonSearch = ({ placeholder, value, onChange }: CommonSearchProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <>
      <div className="commonSearch">
        <InputField
          className="searchbar"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default CommonSearch;
