import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { getIsAuthed } from '../../../redux/selectors/user.selectors';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/redux';
import { signInAction } from '../../../redux/actions/sagaActions';

import './Sign.styles.scss';

export const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthed = useAppSelector(getIsAuthed);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onLogin = ({ email, password }: { [x: string]: string }) => {
    dispatch(signInAction({ email, password }));
  };

  React.useEffect(() => {
    if (isAuthed) {
      navigate('/rooms');
    }
  }, [isAuthed]);

  return (
    <div className="form-wrapper">
      <section className="info">
        <div>
          <h2>Online Editor</h2>
          <h2>Sign In</h2>
          <h3>
            Best online editor ever
            <br />
            Login or Register to start using
            <br />
            Some other information
          </h3>
        </div>
      </section>
      <section>
        <form className="sign-in" onSubmit={handleSubmit(onLogin)} autoComplete="off">
          {/* Email */}
          <label>Email</label>
          <input
            className={errors.email?.type === 'required' ? 'error' : ''}
            type="email"
            {...register('email', { required: true })}
          />
          {errors.email?.type === 'required' && <p>*Email is required</p>}
          {/* Password */}
          <label>Password</label>
          <input
            className={errors.password?.type === 'required' ? 'error' : ''}
            type="password"
            {...register('password', { required: true })}
          />
          {errors.password?.type === 'required' && <p>*Password is required</p>}

          <div className="form-buttons">
            <input type="submit" value="Login" />
            <input onClick={() => navigate('/sign-up')} type="button" value="Register" />
          </div>
        </form>
      </section>
    </div>
  );
};
