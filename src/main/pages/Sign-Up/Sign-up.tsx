import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { signUpAction } from '../../../redux/actions/sagaActions';
import { getIsAuthed } from '../../../redux/selectors/user.selectors';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/redux';

export const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthed = useAppSelector(getIsAuthed);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const password = React.useRef({});
  password.current = watch('password', '');

  const onSignUp = ({ name, email, password, company }: { [x: string]: string }) => {
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
  };

  React.useEffect(() => {
    if (isAuthed) {
      navigate('/rooms');
    }
  }, [isAuthed]);

  return (
    <div className="form-wrapper">
      <section>
        <form className="sign-up" onSubmit={handleSubmit(onSignUp)} autoComplete="off">
          {/* Name */}
          <label>Name</label>
          <input
            className={errors.name?.type === 'required' ? 'error' : ''}
            type="text"
            {...register('name', { required: true })}
          />
          {errors.name?.type === 'required' && <p>*Name is required</p>}
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
            className={
              errors.password?.type === 'required' || errors.confirmPass?.type ? 'error' : ''
            }
            type="password"
            {...register('password', { required: true })}
          />
          {errors.password?.type === 'required' && <p>*Password is required</p>}
          {errors.confirmPass?.type === 'validate' && <p>*The passwords do not match</p>}
          {/* Confirm password */}
          <label>Confirm password</label>
          <input
            className={
              errors.confirmPass?.type === 'required' || errors.confirmPass?.type === 'validate'
                ? 'error'
                : ''
            }
            type="password"
            {...register('confirmPass', {
              required: true,
              validate: (value) => value === password.current,
            })}
          />
          {errors.confirmPass?.type === 'required' && <p>*Confirm password is required</p>}
          {errors.confirmPass?.type === 'validate' && <p>*The passwords do not match</p>}
          {/* Company */}
          <label>Company</label>
          <input
            className={errors.company?.type === 'required' ? 'error' : ''}
            type="text"
            {...register('company', { required: true })}
          />
          {errors.company?.type === 'required' && <p>*Company is required</p>}
          {/* Policy */}
          <div className="form-policy">
            <label>Confirm Policy</label>
            <input type="checkbox" {...register('policy', { required: true })} />
          </div>
          {errors.policy?.type && <p>*Confirm policy</p>}

          <div className="form-buttons">
            <input type="submit" value="Sign Up" />
            <input onClick={() => navigate('/sign-in')} type="button" value="Login" />
          </div>
        </form>
      </section>
      <section className="info">
        <div>
          <h2>Online Editor</h2>
          <h2>Sign Up</h2>
          <h3>
            Best online editor ever
            <br />
            Login or Register to start using
            <br />
            Some other information
          </h3>
        </div>
      </section>
    </div>
  );
};
