import React from 'react';
import AceEditor from 'react-ace';
import { useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/redux';
import { useScroll } from '../../../utils/hooks/useScroll';

import { RoomsActions } from '../../../redux/slices/rooms.slice';
import { codeAction, cursorAction, leaveAction } from '../../../redux/actions/sagaActions';
import {
  getCurrentRoom,
  getIsConnected,
  getRoomCode,
} from '../../../redux/selectors/rooms.selectors';

import { Languages } from '../../../utils/types/app.types';
import './Editor.style.scss';

import { Carets } from '../../components/Carets/Carets';
import { Console } from '../../components/Console/Console';
import { RoomInfo } from '../../components/RoomInfo/RoomInfo';
import { Chat } from '../../components/Chat/Chat';
import { LiveChat } from '../../components/LiveChat/LiveChat';

export const Editor: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isConnected = useAppSelector(getIsConnected);

  const room = useAppSelector(getCurrentRoom);
  const roomCode = useAppSelector(getRoomCode);

  const [code, setCode] = React.useState('');
  const [lang, setLang] = React.useState(Languages.JAVASCRIPT);
  // const [theme, setTheme] = React.useState('github');

  const { scrollX, scrollY, onScroll } = useScroll();

  React.useEffect(() => {
    setCode(room.code);
    setLang(room.language);
  }, [room.id]);

  React.useEffect(() => {
    setCode(roomCode);
  }, [roomCode]);

  React.useEffect(() => {
    const disconnect = () => dispatch(leaveAction());

    window.addEventListener('beforeunload', disconnect);
    window.addEventListener('popstate', disconnect);

    return () => {
      window.removeEventListener('beforeunload', disconnect);
      window.removeEventListener('popstate', disconnect);
      disconnect();
      dispatch(RoomsActions.clearRoom());
    };
  }, [location.pathname]);

  // React.useEffect(() => {
  //   return () => {
  //     dispatch(leaveAction());
  //     dispatch(RoomsActions.clearRoom());
  //   };
  // }, []);

  const onChange = (newValue: any) => {
    setCode(newValue);
    dispatch(codeAction(newValue));
  };

  const onCursorChange = (e: any) => {
    dispatch(cursorAction({ x: e.cursor.row, y: e.cursor.column }));
  };

  //Selecetion maybe will not be add
  const onSelectionChange = (v: any, e?: any) => {
    // console.log({ v, e });
    // dispatch(selectionAction({ start: e.cursor.row, end: e.cursor.column }));
  };

  return (
    <>
      {!isConnected ? (
        <div>Loading ...</div>
      ) : (
        <>
          <div className="editor">
            <section className="editor-field">
              <AceEditor
                focus
                placeholder="Placeholder Text"
                mode={lang}
                theme={'nord_dark'}
                height="745px"
                width="650px"
                name="editor"
                onChange={onChange}
                onSelectionChange={onSelectionChange}
                onCursorChange={onCursorChange}
                onScroll={onScroll}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={code}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
              />
              <Carets scrollX={scrollX} scrollY={scrollY} />
            </section>
            <main>
              <RoomInfo />
              <Console code={code} />
              <Chat />
              {room.isLiveChat && <LiveChat />}
            </main>
          </div>
        </>
      )}
    </>
  );
};
