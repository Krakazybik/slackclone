import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import cn from "classnames"
import { selectChannels, selectCurrentChannel } from "../../store/selectors"
import styles from "./Channels.module.scss"
import { newChannel, switchChannel } from "../../store/chat"
import Input from "../tools/Input"
import Channel from "./Channel/Channel"

const Channels: React.FC = () => {
  const channels = useSelector(selectChannels)
  const currentChannel = useSelector(selectCurrentChannel)

  const [newChannelInEditMode, setNewChannelEditMode] = useState(false)
  const dispatch = useDispatch()

  const handleClickChannel = (
    event: React.MouseEvent<HTMLElement>,
    channelId: number
  ) => {
    console.log(channelId)
    dispatch(switchChannel(channelId))
  }

  const handleDoubleClick = () => {}

  return (
    <div className={styles.channel_wrapper}>
      {channels.map((channel) => (
        <Channel name={channel.name} id={channel.id} />

        /* <div
          key={channel.id}
          className={cn(
            styles.channel,
            channel.id === currentChannel && styles.channel_selected
          )}
          onClick={(event) => handleClickChannel(event, channel.id)}
          onDoubleClick={handleDoubleClick}
          onKeyPress={() => {}}
          role="button"
          tabIndex={0}
        >
          {channel.name}
          <div>button</div>
        </div> */
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
