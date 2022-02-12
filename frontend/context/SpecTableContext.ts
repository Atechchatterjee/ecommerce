import { createContext } from 'react';

interface SpecTableProps {
  headings: [heading: any[], setHeading: Function],
  tableExist: [tableExists:boolean, setTableExists:Function], 
  openRowModal: [openAddRowModal: boolean, setOpenAddRowModal: Function], 
  modifyRowModal: [modifyAddRowModal: boolean, setModifyAddRowModal: Function]
}

export const SpecTableContext = createContext<SpecTableProps>({
  headings: [[], () => {}],
  tableExist: [false, () => {}],
  openRowModal: [false, () => {}],
  modifyRowModal: [false, () => {}],
});