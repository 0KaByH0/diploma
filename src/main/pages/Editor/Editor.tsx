import React from 'react';
import { useDebounce } from '../../../utils/hooks/useDebounce';

import AceEditor from 'react-ace';

import { TEMPLATES } from '../../../utils/consts/editor.consts';
import { Languages } from '../../../utils/types/app.types';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/redux';

import {
  getCurrentRoom,
  getIsConnected,
  getRoomUsers,
} from '../../../redux/selectors/rooms.selectors';

import './Editor.style.scss';
import { RoomsActions } from '../../../redux/slices/rooms.slice';
import { Carets } from '../../components/Carets/Carets';
import { getUser } from '../../../redux/selectors/user.selectors';
import { codeAction, cursorAction, leaveAction } from '../../../redux/actions/sagaActions';

export const Editor: React.FC = () => {
  const dispatch = useAppDispatch();
  const room = useAppSelector(getCurrentRoom);
  const isConnected = useAppSelector(getIsConnected);
  const users = useAppSelector(getRoomUsers);

  const [code, setCode] = React.useState('');
  const [lang, setLang] = React.useState(Languages.JAVASCRIPT);
  const [theme, setTheme] = React.useState('github');

  const [position, setPosition] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const debounce = useDebounce(code, 1500);

  React.useEffect(() => {
    setCode(room.code);
    setLang(room.language);
  }, [room]);

  // React.useEffect(() => {
  // try {
  // console.log(eval(code), 'asdfsdf');
  // } catch (error) {}
  // }, [debounce]);

  React.useEffect(() => {
    const disconnect = () => dispatch(leaveAction());

    window.addEventListener('beforeunload', disconnect);
    window.addEventListener('popstate', disconnect);

    return () => {
      window.removeEventListener('beforeunload', disconnect);
      window.removeEventListener('popstate', disconnect);
      dispatch(RoomsActions.clearRoom());
    };
  }, []);

  function onChange(newValue: any) {
    setCode(newValue);
    dispatch(codeAction(newValue));
  }

  const onCursorChange = (e: any) => {
    setPosition({
      x: e.cursor.row,
      y: e.cursor.column,
    });
    dispatch(cursorAction({ x: e.cursor.row, y: e.cursor.column }));
  };

  return (
    <>
      {!isConnected ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <div>
            Users:{' '}
            {users?.map((user, index) => (
              <span>{user.name} </span>
            ))}
          </div>
          <AceEditor
            placeholder="Placeholder Text"
            mode={lang}
            theme={theme}
            name="editor"
            onChange={onChange}
            onCursorChange={onCursorChange}
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
          <Carets />
        </div>
      )}
    </>
  );
};
