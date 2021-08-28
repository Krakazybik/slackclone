import React from "react"
import styles from "./tools.module.scss"

interface IModalProps {
  answer: string
  primary: string
  secondary?: string
  closeCallback: () => void
  primaryCallback: () => void
  secondaryCallback?: () => void
}

const Modal: React.FC<IModalProps> = ({
  answer,
  primary,
  secondary,
  closeCallback,
  primaryCallback,
  secondaryCallback,
}) => {
  return (
    <div className={styles.modal_bg}>
      <div className={styles.modal_wrapper}>
        <div className={styles.modal_close}>
          <button type="button" onClick={closeCallback}>
            X
          </button>
        </div>
        <div className={styles.modal_answer}>{answer}</div>
        <div>
          <button
            type="submit"
            className={styles.modal_button}
            onClick={primaryCallback}
          >
            {primary}
          </button>
          {secondary && secondaryCallback && (
            <button
              type="submit"
              className={styles.modal_button}
              onClick={secondaryCallback}
            >
              {secondary}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal
