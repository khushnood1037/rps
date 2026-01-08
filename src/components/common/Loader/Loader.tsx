import { useSelector } from "react-redux";
import type { RootState } from "../../../Types/reduxStateType/RootState";
import "./style.scss";

/**LOADER COMPONENTS */
const Loader = () => {
  /**GET STATES FROM STORE */
  const isLoading = useSelector((state: RootState) => state?.loader?.isLoading);

  /**IF isLoading IS TRUE SHOW LOADER*/
  if (isLoading) {
    return (
      <div className="overlayloader">
        <div>
          <div className="loader--ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Loader;
