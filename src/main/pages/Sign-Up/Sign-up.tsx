import React from 'react';
import { signUpAction } from '../../../redux/actions/sagaActions';
import { useAppDispatch } from '../../../utils/hooks/redux';
import { useField } from '../../../utils/hooks/useField';

export const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useField('');
  const [email, setEmail] = useField('');
  const [company, setCompany] = useField('');
  const [password, setPass] = useField('');
  const [confirmPass, setConfirmPass] = useField('');
  const [confirmPolicy, setConfirmPolicy] = React.useState<boolean>(false);

  const onSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.toLowerCase() === confirmPass.toLowerCase()) {
      dispatch(
        signUpAction({
          id: Date.now(),
          name,
          email,
          password,
          company,
          editor: { position: { x: 0, y: 0 } },
        }),
      );
    } else {
      alert('Passwords are different');
    }
  };

  return (
    <>
      <div>Sing-up</div>
      <form onSubmit={onSignUp}>
        <input type="text" value={name} onChange={setName} required />
        <input type="email" value={email} onChange={setEmail} required />
        <input type="password" value={password} onChange={setPass} required />
        <input type="password" value={confirmPass} onChange={setConfirmPass} required />
        <input type="text" value={company} onChange={setCompany} required />
        <input
          type="checkbox"
          checked={confirmPolicy}
          onChange={() => setConfirmPolicy(!confirmPolicy)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};
