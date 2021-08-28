import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectChannels } from "../../store/selectors"
import styles from "./Channels.module.scss"
import { newChannel } from "../../store/chat"
import Input from "../tools/Input"
import Channel from "./Channel/Channel"

const Channels: React.FC = () => {
  const channels = useSelector(selectChannels)
  const [newChannelInEditMode, setNewChannelEditMode] = useState(false)
  const dispatch = useDispatch()

  return (
    <div className={styles.channel_wrapper}>
      {channels.map((channel) => (
        <Channel
          key={channel.id}
          name={channel.name}
          id={channel.id}
          removable={channel.removable}
        />
      ))}

      {newChannelInEditMode ? (
        <div
          className={styles.new_channel_edit}
          onBlur={() => setNewChannelEditMode(false)}
        >
          <Input
            autofocus
            width={400}
            placeholder="Название канала..."
            callback={(data: string) => {
              setNewChannelEditMode(false)
              dispatch(newChannel(data))
            }}
          />
        </div>
      ) : (
        <div
          className={styles.new_channel}
          onClick={() => {
            setNewChannelEditMode(true)
          }}
          role="button"
          onKeyPress={() => {}}
          tabIndex={-1}
        >
          Создать новый канал +
        </div>
      )}
    </div>
  )
}

export default Channels
