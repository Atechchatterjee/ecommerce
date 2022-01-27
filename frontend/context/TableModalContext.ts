import { createContext } from 'react';

interface ModalProps {
  triggerOpen: boolean;
  setTriggerOpen: (_: boolean) => void;
  columnNames: any[];
  setColumnNames: (_:any[]) => void;
  columnNo: number;
  setColumnNo: (_:number) => void;
  confirmColumn: boolean;
  setConfirmColumn: (_:boolean) => void;
}

export const TableModalContext = createContext<ModalProps>({
  triggerOpen: false,
  setTriggerOpen: (_: boolean) => {},
  columnNames: [],
  columnNo: 0,
  setColumnNames: (_:any[]) => {},
  setColumnNo: (_:number) => {},
  confirmColumn: false,
  setConfirmColumn: (_:boolean) => {},
});