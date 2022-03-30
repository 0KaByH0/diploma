import React from 'react';
import { getRoomUsers } from '../../../redux/selectors/rooms.selectors';
import { getUserId } from '../../../redux/selectors/user.selectors';
import { useAppSelector } from '../../../utils/hooks/redux';
import { User } from '../../../utils/types/app.types';

import './Carets.styles.scss';

type CaretsProps = {
  scrollX: number;
  scrollY: number;
};

export const Carets: React.FC<CaretsProps> = ({ scrollX, scrollY }) => {
  const usersRaw = useAppSelector(getRoomUsers);
  const usersList = React.useMemo(() => usersRaw.map((user) => user.id), [usersRaw]);
  const userId = useAppSelector(getUserId);

  const [showUser, setShowUser] = React.useState<number>(-1);

  type UserWithColor = User & { editor?: { color?: string } };
  const [users, setUsers] = React.useState<UserWithColor[] | []>([]);

  React.useEffect(() => {
    setUsers(
      usersRaw.map((user) => ({
        ...user,
        // editor: { ...user.editor, color: `#${((Math.random() * 0xffffff) << 0).toString(16)}` },
      })),
    );
  }, [usersList]);

  //23 - 16px fontsize    ----- offset xz
  //20.01 - 14px fontsize ----- offset 74
  const getPosX = React.useCallback(
    ({ editor: { position } }: User, offset: number) =>
      `${20.01 * (position.x ?? 0) + offset - (position.x ?? 0) - scrollX}px`,
    [scrollX],
  );

  //?? - 16px fontsize
  //8.9 - 14px fontsize   ------ offset
  const getPosY = React.useCallback(
    ({ editor: { position } }: User, offset: number) =>
      `${8.9 * (position.y ?? 0) + offset - (position.y ?? 0) / 2 - scrollY}px`,
    [scrollY],
  );

  return (
    <div>
      {users?.map((user, index) => (
        <div key={index}>
          {user.id !== userId && (
            <>
              <div
                className="caret-name"
                style={{
                  //16px fontsize - 16 diff
                  //14px fontsize - 19 diff
                  top: getPosX(user, 55), //51.5
                  left: getPosY(user, 52),
                }}>
                {user.name}
              </div>
              <div
                className="caret"
                onMouseOver={() => setShowUser(user.id)}
                onMouseLeave={() => setShowUser(-1)}
                style={{
                  // background: user.editor.color,
                  top: getPosX(user, 74), //67.5
                  left: getPosY(user, 52),
                }}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};
