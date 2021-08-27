import React from "react"
import { useSelector } from "react-redux"
import styles from "./Chat.module.scss"
import Send from "./Send/Send"
import selectMessages from "../../../store/messages-selector"
import Underline from "../../tools/Underline"

const Chat = () => {
  const messages = useSelector(selectMessages)
  return (
    <div className={styles.chat_wrapper}>
      <div className={styles.chat}>
        {messages.map((item) => (
          <div className={styles.chat_message}>
            <div className={styles.chat_message_text}>{item.message}</div>
            <Underline />
            <div className={styles.chat_message_name}>{item.name}</div>
          </div>
        ))}
      </div>
      <div className={styles.send}>
        <Send />
      </div>
    </div>
  )
}

export default Chat
