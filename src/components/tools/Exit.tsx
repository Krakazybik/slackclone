import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { exitChat } from '../../store/chat';

const Exit: React.FC = () => {
  const dispatch = useDispatch();
  dispatch(exitChat());
  return <Redirect to="/login" />;
};

export default Exit;
