import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import data from '../data/data.json';
import { UserContext } from './context';

export default function UserProvider({ children }: PropsWithChildren) {
  const [userId, setUserId] = useState<number | null>(null);

  return (
    <UserContext.Provider
      value={{
        users: data,
        userId,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}