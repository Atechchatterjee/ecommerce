import { createContext } from 'react';

interface Props {
  selectedRows: any;
  setSelectedRows: Function;
}

export const GSTSelectorContext = createContext<Props>({
  selectedRows: undefined,
  setSelectedRows: () => {},
});