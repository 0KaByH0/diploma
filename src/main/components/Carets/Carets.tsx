import React from 'react';
import { getRoomUsers } from '../../../redux/selectors/rooms.selectors';
import { getUserId } from '../../../redux/selectors/user.selectors';
import { useAppSelector } from '../../../utils/hooks/redux';

export const Carets: React.FC = () => {
  const users = useAppSelector(getRoomUsers);
  const userId = useAppSelector(getUserId);

  const [showUser, setShowUser] = React.useState<number>(-1);
  return (
    <div>
      {users?.map((user, index) => (
        <div key={index}>
          {user.id !== userId && (
            <>
              {/* {showUser === user.id && ( */}
              <div
                className="caret-name"
                style={{
                  top: `${
                    20 * (user.editor.position.x ?? 0) + 50 - (user.editor.position.x ?? 0)
                  }px`,
                  left: `${
                    8.9 * (user.editor.position.y ?? 0) + 52 - (user.editor.position.y ?? 0) / 2
                  }px`,
                }}>
                {user.name}
              </div>
              {/* )} */}
              <div
                className="caret"
                onMouseOver={() => setShowUser(user.id)}
                onMouseLeave={() => setShowUser(-1)}
                style={{
                  // background: `#${((Math.random() * 0xffffff) << 0).toString(16)}`,
                  top: `${
                    20 * (user.editor.position.x ?? 0) + 69 - (user.editor.position.x ?? 0)
                  }px`,
                  left: `${
                    8.9 * (user.editor.position.y ?? 0) + 52 - (user.editor.position.y ?? 0) / 2
                  }px`,
                }}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};
