import { InputHTMLAttributes, forwardRef, useState } from "react";
import styles from "./Input.module.scss";
import ClosedEye from "../icons/ClosedEye";
import OpenEye from "../icons/OpenEye";
import classNames from "classnames";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const onPasswordShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.wrapper}>
      <input
        {...props}
        ref={ref}
        type={showPassword ? "text" : props.type}
        placeholder={props.placeholder}
        className={classNames(styles.input, props.className)}
      />
      {props.type === "password" && (
        <span
          className={styles["password-toggle-icon"]}
          onClick={onPasswordShow}
        >
          {showPassword ? <ClosedEye /> : <OpenEye />}
        </span>
      )}
    </div>
  );
});

export default Input;
