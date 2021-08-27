import React, { useRef } from "react"
import { useDispatch } from "react-redux"
import styles from "./Send.module.scss"
import ellipse from "../../../../assets/Ellipse 2.svg"
import { newMessage } from "../../../../store/chat"
import Underline from "../../../tools/Underline"

const Send = () => {
  const dispatch = useDispatch()
  const textAreaRef = useRef<HTMLInputElement>(null)
  const handleClickSend = () => {
    if (textAreaRef.current && textAreaRef.current.value) {
      dispatch(newMessage(textAreaRef.current.value))
      textAreaRef.current.value = ""
    }
  }
  return (
    <div className={styles.send_wrapper}>
      <Underline />
      <input
        ref={textAreaRef}
        className={styles.text}
        placeholder="Напишите сообщение..."
        onKeyPress={(event) => {
          if (event.key === "Enter") handleClickSend()
        }}
      />
      <div
        className={styles.button}
        onClick={handleClickSend}
        role="button"
        tabIndex={0}
        onKeyPress={(event) => {
          if (event.key === "Enter") handleClickSend()
        }}
      >
        <img src={ellipse} alt={ellipse} />
      </div>
    </div>
  )
}

export default Send
