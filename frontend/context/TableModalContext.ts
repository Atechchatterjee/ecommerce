import { createContext } from 'react';

interface ModalProps {
  openCreateTableModal: boolean;
  setOpenCreateTableModal: (_: boolean) => void;
  columnNames: any[];
  setColumnNames: (_:any[]) => void;
  columnNo: number;
  setColumnNo: (_:number) => void;
  confirmColumn: boolean;
  setConfirmColumn: (_:boolean) => void;
  openAddRowModal: boolean;
  setOpenAddRowModal: (_:boolean) => void;
  tableContentStr?: any[][];
  setTableContentStr?: (_:any[][])=> void;
}

export const TableModalContext = createContext<ModalProps>({
  openCreateTableModal: false,
  setOpenCreateTableModal: (_: boolean) => {},
  columnNames: [],
  columnNo: 0,
  setColumnNames: (_:any[]) => {},
  setColumnNo: (_:number) => {},
  confirmColumn: false,
  setConfirmColumn: (_:boolean) => {},
  openAddRowModal: false,
  setOpenAddRowModal: (_:boolean) => {},
  tableContentStr: [],
  setTableContentStr: (_:any[][])=> {},
});