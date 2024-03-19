import styles from "./ResetPassword.module.scss";
import Layout from "../layout/Layout";
import Input from "../input/Input";
import Button from "../button/Button";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import { useState } from "react";
import { PWD_REGEX } from "../../utils/shared";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [result, setResult] = useState("");
  const onSubmit = async () => {
    const params = new URLSearchParams(document.location.search);
    const token = params.get("token");
    const secret = params.get("secret");
    try {
      await axios.post(
        "/password-set",
        {
          token,
          secret,
          password: getValues("password"),
          password_confirm: getValues("confirmPassword"),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setResult("Password Reseted");
    } catch {
      setResult("Failed to reset password");
    }
  };
  return (
    <Layout>
      <img src="../../../public/Logo.png" alt="Qencode logo" />
      {result || (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles["reset-form"]}
        >
          <h2 className={styles.title}>Create new Password?</h2>
          <div className={styles["input-wrapper"]}>
            <label htmlFor="pass" className={styles.label}>
              Password
            </label>
            <Input
              id="pass"
              placeholder="Password"
              type="password"
              {...register("password", {
                required: true,
                pattern: PWD_REGEX,
              })}
              className={`${errors.password && styles.inputError}`}
            />
            <p
              className={errors.password ? styles["text-error"] : styles.hidden}
            >
              {errors.password?.type === "pattern"
                ? "Invalid password"
                : "Password is required"}
            </p>
          </div>
          <div className={styles["input-wrapper"]}>
            <label htmlFor="repeatPass" className={styles.label}>
              Confirm Password
            </label>
            <Input
              id="repeatPass"
              placeholder="Confirm Password"
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: (fieldValue) => {
                  return fieldValue === getValues("password");
                },
              })}
              className={`${errors.confirmPassword && styles.inputError}`}
            />
            <p
              className={
                errors.confirmPassword ? styles["text-error"] : styles.hidden
              }
            >
              {errors.confirmPassword?.type === "validate"
                ? "Passwords don't match"
                : "Password is required"}
            </p>
          </div>
          <Button>Reset Password</Button>
        </form>
      )}
    </Layout>
  );
};

export default ResetPassword;
