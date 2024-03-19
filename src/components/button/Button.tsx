import { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  cancelButton?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ cancelButton, ...rProps }, ref) => {
    return (
      <button
        ref={ref}
        {...rProps}
        className={classNames(
          rProps.className,
          styles.button,
          cancelButton && styles["cancel-button"]
        )}
      >
        <span className={styles["button-text"]}>{rProps.children}</span>
      </button>
    );
  }
);

export default Button;
