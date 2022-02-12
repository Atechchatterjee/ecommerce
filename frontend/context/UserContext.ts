import { createContext } from 'react';

export const UserContext = createContext<{
  admin: boolean | null;
  setAdmin: (admin: boolean) => void;
}>({
  admin: null,
  setAdmin: (admin: boolean) => {},
});

