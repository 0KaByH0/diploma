import React from 'react';
import { useAppSelector } from '../../../utils/hooks/redux';

import { getCurrentRoom } from '../../../redux/selectors/rooms.selectors';
import './Chat.styles.scss';

export const Chat = () => {
  const room = useAppSelector(getCurrentRoom);

  return <section className="chat"></section>;
};
