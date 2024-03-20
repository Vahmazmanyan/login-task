import styles from "./GithubLogin.module.scss";
import GithubIcon from "../../icons/GithubIcon";
const GithubLogin = () => {
  return (
    <button
      type="button"
      className={styles.github}
      onClick={() => {
        alert("feature to be added");
      }}
    >
      <GithubIcon />
      Github
    </button>
  );
};

export default GithubLogin;
