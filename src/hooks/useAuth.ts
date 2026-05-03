import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { loginStart, loginSuccess, loginFailure, logout, updateUser } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  const login = async (email: string, password: string) => {
    dispatch(loginStart());
    try {
      // Replace with real API call
      await new Promise((res) => setTimeout(res, 1000));
      dispatch(loginSuccess({
        user: { id: '1', name: 'Neha Sharma', email },
        token: 'mock_token_123',
      }));
    } catch {
      dispatch(loginFailure());
    }
  };

  const signOut = () => dispatch(logout());
  const editProfile = (data: Parameters<typeof updateUser>[0]) => dispatch(updateUser(data));

  return { user, token, isAuthenticated, loading, login, signOut, editProfile };
};
