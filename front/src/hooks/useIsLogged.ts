import { useSelector } from 'react-redux';
import { RootState } from '@@/store';

const useIsLogged = () => {
  const auth = useSelector((state: RootState) => state.auth);
  return !!auth.accessToken;
};

export default useIsLogged;
