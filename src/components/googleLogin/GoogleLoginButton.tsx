import { useGoogleLogin } from "@react-oauth/google";
import styles from "./GoogleLogin.module.scss";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        navigate("/logged-in", { state: { userName: res.data.name } });
      } catch (err) {
        console.log(err);
        alert("failed to log in");
      }
    },
  });
  return (
    <button
      type="button"
      className={styles.google}
      onClick={() => googleLogin()}
    >
      <img src="/Google.png" />
      Google
    </button>
  );
};

export default GoogleLoginButton;
