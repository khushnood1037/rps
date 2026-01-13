import type { ChangeEvent } from "react";
import InputField from "../formik/inputField/InputField";
import "./CommonSearch.scss";

interface CommonSearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CommonSearch = ({ placeholder, value, onChange }: CommonSearchProps) => {
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   onChange?.(e.target.value);
  // };


  return (
    <>
      <div className="commonSearch">
        <InputField
          className="searchbar"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default CommonSearch;
