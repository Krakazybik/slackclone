import React from "react"
import { Link } from "react-router-dom"
import styles from "./Header.module.scss"
import Contacts from "../../../assets/contacs.svg"
import Logo from "../../../assets/logo.svg"
import Messages from "../../../assets/messages.svg"
import Profile from "../../../assets/profile.svg"

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>
          <img src={Logo} alt="none" />
        </div>
      </Link>

      <Link to="/channels" style={{ textDecoration: "none" }}>
        <div className={styles.button}>
          <img src={Contacts} alt="none" />
          <span>Каналы</span>
        </div>
      </Link>

      <Link to="/profile" style={{ textDecoration: "none" }}>
        <div className={styles.button}>
          <img src={Profile} alt="none" />
          <span>Профиль</span>
        </div>
      </Link>
      <Link to="/channels" style={{ textDecoration: "none" }}>
        <div className={styles.button}>
          <img src={Messages} alt="none" />
          <span>Выход</span>
        </div>
      </Link>
    </div>
  )
}

export default Header
