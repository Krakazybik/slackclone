import React from "react"
import styles from "./tools.module.scss"

interface IInputProps {
  width: number
  placeholder?: string
  type?: "text" | "password"
  src?: string
  label?: string
}

const Input: React.FC<IInputProps> = ({
  type = "text",
  width,
  placeholder = "",
  src,
  label,
}) => {
  return (
    <div className={styles.input_wrapper}>
      {label && (
        <div className={styles.label} style={{ width }}>
          {label}
        </div>
      )}
      {/* eslint-disable-next-line react/jsx-props-no-spreading,react/destructuring-assignment */}
      <input
        style={{ width: src ? width - 34 : width, color: label && "#343A40" }}
        className={styles.input}
        placeholder={placeholder}
        type={type}
        width={width}
      />
      {src && (
        <img
          className={styles.image}
          src={src}
          alt={src}
          height="16px"
          style={{ bottom: label && "10px" }}
        />
      )}
      <div className={styles.input_underline} style={{ width }} />
    </div>
  )
}

export default Input
