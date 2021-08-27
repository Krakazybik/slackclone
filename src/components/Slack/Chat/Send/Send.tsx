import React, { useRef } from "react"
import { useDispatch } from "react-redux"
import styles from "./Send.module.scss"
import ellipse from "../../../../assets/Ellipse 2.svg"
import { newMessage } from "../../../../store/chat"

const Send = () => {
  const dispatch = useDispatch()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const handleClickSend = () => {
    if (textAreaRef.current && textAreaRef.current.value) {
      dispatch(newMessage(textAreaRef.current.value))
      textAreaRef.current.value = ""
    }
  }
  return (
    <div className={styles.send_wrapper}>
      <textarea ref={textAreaRef} className={styles.text} />
      <div
        className={styles.button}
        onClick={handleClickSend}
        onKeyPress={() => {}}
        role="button"
        tabIndex={0}
      >
        <img src={ellipse} alt={ellipse} />
      </div>
    </div>
  )
}

export default Send
