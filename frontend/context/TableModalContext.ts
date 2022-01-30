import { createContext } from 'react';

interface TableModalProps {
  createTableModal: [openCreateTableModal:boolean, setOpenCreateTableModal: Function];
  colNames: [columnNames:any[], setColumnNames: Function];
  colNo: [columnNo:number, setColumnNo: Function];
  confirmCol: [confirmColumn:boolean, setColNo: Function];
  addRowModal: [openAddRowModal:boolean, setOpenRowModal: Function];
  tableContent: [tableContentStr: any[], setTableContentStr: Function];
  modifyTable: [modifyAddRowModal: boolean, setModifyAddRowModal: Function];
}

export const TableModalContext = createContext<TableModalProps>({
  createTableModal: [false, () => {}],
  colNames: [[], () => {}],
  colNo: [0, () => {}],
  confirmCol: [false, () => {}],
  addRowModal: [false, () => {}],
  tableContent: [[], () => {}],
  modifyTable: [false, () => {}],
});