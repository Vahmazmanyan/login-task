import { useLocation } from "react-router-dom";
import styles from "./LoggedIn.module.scss";

const LoggedIn = () => {
  const location = useLocation();
  return (
    <div className={styles.loggedIn}>
      {`${location.state?.userName || ""} Successfully logged in!`}
    </div>
  );
};

export default LoggedIn;
