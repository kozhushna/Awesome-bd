import { useSelector } from 'react-redux';
import { selectUser, selectIsLoggedIn } from './selectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  return {
    isLoggedIn,
    user,
  };
};
