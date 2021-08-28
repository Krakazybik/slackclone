import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import cn from "classnames"
import { switchChannel } from "../../../store/chat"
import styles from "./Channel.module.scss"
import { selectCurrentChannel } from "../../../store/selectors"
import editIcon from "../../../assets/editBlack.png"
import deleteIcon from "../../../assets/delete.png"
import Input from "../../tools/Input"

interface IChannel {
  id: number
  name: string
}

const Channel: React.FC<IChannel> = ({ id, name }) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const dispatch = useDispatch()
  const currentChannel = useSelector(selectCurrentChannel)

  const handleClickChannel = (
    event: React.MouseEvent<HTMLElement>,
    channelId: number
  ) => {
    dispatch(switchChannel(channelId))
  }

  return (
    <div
      className={cn(
        styles.channel,
        id === currentChannel && styles.channel_selected
      )}
      onClick={(event) => handleClickChannel(event, id)}
      onDoubleClick={() => setEditMode(true)}
      onKeyPress={() => {}}
      role="button"
      tabIndex={0}
    >
      <span>{name}</span>
      {editMode && (
        <div className={styles.edit_wrapper}>
          <img src={editIcon} alt={editIcon} height={25} />
          <img src={deleteIcon} alt={deleteIcon} height={25} />
        </div>
      )}
    </div>
  )
}

export default Channel
