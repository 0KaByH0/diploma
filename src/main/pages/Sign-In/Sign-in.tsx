import React from 'react';
import { useNavigate } from 'react-router';
import { useField } from '../../../utils/hooks/useField';
import { getIsAuthed } from '../../../redux/selectors/user.selectors';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/redux';
import { signInAction } from '../../../redux/actions/sagaActions';

export const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthed = useAppSelector(getIsAuthed);
  const navigate = useNavigate();

  const [email, setEmail] = useField('');
  const [password, setPassword] = useField('');

  const onLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signInAction({ email, password }));
  };

  React.useEffect(() => {
    if (isAuthed) {
      navigate('/rooms');
    }
  }, [isAuthed]);

  return (
    <div>
      <form onSubmit={onLogin}>
        <input placeholder="UserName" type="text" value={email} onChange={setEmail}></input>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={setPassword}></input>
        <button>Login</button>
      </form>
    </div>
  );
};
