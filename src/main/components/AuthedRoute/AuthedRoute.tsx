import { Navigate, useLocation } from 'react-router';
import { getIsAuthed } from '../../../redux/selectors/user.selectors';
import { useAppSelector } from '../../../utils/hooks/redux';

export const Authed: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const isAuthed = useAppSelector(getIsAuthed);
  const location = useLocation();

  if (!isAuthed) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
  return children;
};
