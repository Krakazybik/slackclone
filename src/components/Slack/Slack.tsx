import React from "react"
import Header from "./Header/Header"
import styles from "./Slack.module.scss"

const Slack = () => {
  return (
    <div className={styles.slack}>
      <Header />
      <div className={styles.slack_nav}>contacts</div>
      <div className={styles.slack_main}>data</div>
    </div>
  )
}

export default Slack
