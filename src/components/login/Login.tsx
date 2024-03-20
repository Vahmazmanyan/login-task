import { useForm } from "react-hook-form";
import Button from "../button/Button";
import Input from "../input/Input";
import styles from "./Login.module.scss";
import "../../sass/typography.scss";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import Layout from "../layout/Layout";
import GoogleButton from "../googleLogin/GoogleLoginButton";
import { useNavigate } from "react-router";
import { EMAIL_REGEX, PWD_REGEX } from "../../utils/shared";
import GithubLogin from "../githubLogin/GithubLogin";

const Login = () => {
  const [errorMsg, SetErrorMsg] = useState("");
  const [isEmailExists, setIsEmailExists] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async () => {
    if (getValues("password")) {
      try {
        const response: AxiosResponse = await axios.post(
          "/login",
          JSON.stringify({
            email: getValues("email"),
            password: getValues("password"),
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const accessToken = response?.data?.access_token;
        const refreshToken = response?.data?.refresh_token;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        navigate("/logged-in");
      } catch (err) {
        if (err) {
          SetErrorMsg("Login failed, wrong email or password");
        }
      }
    }
  };
  const watchEmailValue = watch("email");
  useEffect(() => {
    if (watchEmailValue && !isEmailExists) {
      setIsEmailExists(true);
    }
  }, [watchEmailValue]);

  return (
    <Layout>
      <img src="/Logo.png" alt="Qencode logo" />
      <form className={styles["login-form"]} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Log in to your account</h2>
        <div className={styles["signin-options"]}>
          <GoogleButton />
          <GithubLogin/>
          {/* <Button onClick={() => navigate("/logged-in")}>Github</Button> */}
        </div>
        <div className={styles.lines}>
          <img src="/Line.png" alt="line" />
          <span>OR</span>
          <img src="/Line.png" alt="line" />
        </div>

        <div className={styles["input-wrapper"]}>
          <Input
            placeholder="Work mail"
            {...register("email", { required: true, pattern: EMAIL_REGEX })}
            className={`${(errors.email || errorMsg) && "inputError"}`}
          />
          <p className={errors.email ? "text-error" : "hidden"}>
            {errors.email?.type === "pattern"
              ? "Invalid email"
              : "Email is required"}
          </p>
        </div>
        {isEmailExists && (
          <div className={styles["input-wrapper"]}>
            <Input
              placeholder="Password"
              type="password"
              {...register("password", {
                required: true,
                pattern: PWD_REGEX,
              })}
              className={`${(errors.password || errorMsg) && "inputError"}`}
            />
            <p className={errors.password ? "text-error" : "hidden"}>
              {errors.password?.type === "pattern"
                ? "Invalid password"
                : "Password is required"}
            </p>
            <a href="/forgot-password" className={styles.forgot}>
              Forgot your password?
            </a>
          </div>
        )}
        {errorMsg && <div className={styles["text-error"]}>{errorMsg}</div>}
        <Button type="submit">Log in to Qencode</Button>
        <p className={styles["sign-up"]}>
          Is your company new to Qencode? <a href="#">Sign up</a>
        </p>
      </form>
    </Layout>
  );
};

export default Login;
