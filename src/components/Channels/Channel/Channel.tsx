import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { joinChannel, removeChannel } from '../../../store/chat';
import styles from './Channel.module.scss';
import { selectCurrentChannel } from '../../../store/selectors';
import editIcon from '../../../assets/editBlack.png';
import deleteIcon from '../../../assets/delete.png';
import Modal from '../../tools/Modal';

interface IChannel {
  id: number;
  name: string;
  removable: boolean;
}

const Channel: React.FC<IChannel> = ({ id, name, removable }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isDeleteWindowShown, showDeleteWindow] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentChannel = useSelector(selectCurrentChannel);

  const handleClickChannel = (
    event: React.MouseEvent<HTMLElement>,
    channelId: number
  ) => {
    dispatch(joinChannel(channelId));
  };

  return (
    <div className={styles.channel_wrapper}>
      {isDeleteWindowShown && (
        <Modal
          answer="Вы уверен, что хотите удалить канал?"
          primary="Да"
          secondary="Нет"
          closeCallback={() => showDeleteWindow(false)}
          primaryCallback={() => {
            dispatch(removeChannel(id));
            showDeleteWindow(false);
          }}
          secondaryCallback={() => showDeleteWindow(false)}
        />
      )}
      <div
        className={cn(
          styles.channel,
          id === currentChannel && styles.channel_selected
        )}
        onClick={(event) => handleClickChannel(event, id)}
        onDoubleClick={() => removable && setEditMode(true)}
        onKeyPress={() => {}}
        role="button"
        tabIndex={-1}
      >
        <span>{name}</span>
        {editMode && (
          <div className={styles.edit_wrapper}>
            <img src={editIcon} alt={editIcon} height={25} />
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <img
              src={deleteIcon}
              alt={deleteIcon}
              height={25}
              onClick={() => showDeleteWindow(true)}
              onKeyPress={(e) => e.key === 'Enter' && showDeleteWindow(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Channel;
