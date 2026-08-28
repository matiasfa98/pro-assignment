import { createContext } from 'react';
import data from '../data/data.json';

export type User = (typeof data)[number];

type UserContextType = {
  users: User[];
  userId: number | null;
  setUserId: (id: number | null) => void;
};

export const UserContext = createContext<UserContextType>({
  users: [],
  userId: null,
  setUserId: () => {},
});