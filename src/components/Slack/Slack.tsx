import React from "react"
import { Route } from "react-router-dom"
import Header from "./Header/Header"
import styles from "./Slack.module.scss"
import Profile from "./Profile/Profile"

const Slack = () => {
  return (
    <div className={styles.slack}>
      <Header />
      <div className={styles.slack_main}>data</div>
    </div>
  )
}

export default Slack
