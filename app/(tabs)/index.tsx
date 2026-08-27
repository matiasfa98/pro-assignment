import { useContext } from 'react';

import Login from '@/components/Login';
import Main from '@/components/main';
import { UserContext } from '@/context/context';

export default function HomeScreen() {
  const { userId } = useContext(UserContext);

  if (userId === null) {
    return <Login />;
  }

  return <Main />;
}