import React from "react"
import styles from "./Profile.module.scss"
import Avatar from "../../../assets/avatar.svg"
import World from "../../../assets/world.svg"
import Phone from "../../../assets/phone.svg"
import Email from "../../../assets/email.svg"
import Twitter from "../../../assets/twitter.svg"
import Input from "../../tools/Input"

const Profile: React.FC = () => {
  return (
    <div className={styles.profile}>
      <h2 className={styles.h2}>Профиль</h2>
      <img className={styles.avatar} src={Avatar} alt="none" />
      <div className={styles.name}>Домовёнок Кузя</div>
      <div className={styles.status}>
        Лавкает лавки и лавкаю по лавке лавкой.
      </div>
      <Input width={400} type="text" label="Страна" src={World} />
      <Input width={400} type="text" label="Телефон" src={Phone} />
      <Input width={400} type="text" label="Email" src={Email} />
      <Input width={400} type="text" label="Twitter" src={Twitter} />
    </div>
  )
}
export default Profile
