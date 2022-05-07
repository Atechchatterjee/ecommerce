import { Flex, ContainerProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { addGST, deleteGST, fetchGST } from "../../services/GSTService";
import { AddButton, DeleteButton } from "../Custom/CustomButtons";
import { CustomField } from "../Custom/CustomField";
import CustomTable from "../Custom/CustomTable";
import CustomContainer from "../Custom/CustomContainer";

const EnterGST = ({ ...props }: ContainerProps) => {
  const [rows, setRows] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any>({});
  const [cgst, setCgst] = useState<string>("");
  const [sgst, setSgst] = useState<string>("");
  const [igst, setIgst] = useState<string>("");
  const [rowsToDelete, setRowsToDelete] = useState<number[]>([]);
  const [reRender, setReRender] = useState<boolean>(false);

  useEffect(() => {
    fetchGST().then((res) => {
      setRows(
        res.data.map((data: any) =>
          Object.keys(data).map((key) => `${data[key]} %`)
        )
      );
      setCgst("");
      setSgst("");
      setIgst("");
      setReRender(false);
    });
  }, [reRender]);

  useEffect(() => {
    setRowsToDelete(
      Object.keys(selectedRows)
        .map((key) => parseInt(key))
        .filter((key) => selectedRows[key] === true)
    );
  }, [selectedRows]);

  const handleAddGST = async () => {
    await addGST({ cgst: cgst || "0", sgst: sgst || "0", igst: igst || "0" });
    setReRender(true);
  };

  const handleDeleteGST = async () => {
    await deleteGST(rowsToDelete);
    setReRender(true);
  };

  return (
    <CustomContainer padding="2rem" borderRadius="lg" {...props}>
      <Flex flexDirection="column" gridGap={3}>
        <CustomTable
          rows={rows}
          heading={["CGST (%)", "SGST (%)", "IGST (%)"]}
          select
          selectedRowsState={[selectedRows, setSelectedRows]}
        />
        <Flex flexDirection="row" gridGap={2}>
          <CustomField
            placeholder="CGST"
            value={cgst}
            onChange={(e: any) => setCgst(e.target.value)}
          />
          <CustomField
            placeholder="SGST"
            value={sgst}
            onChange={(e: any) => setSgst(e.target.value)}
          />
          <CustomField
            placeholder="IGST"
            value={igst}
            onChange={(e: any) => setIgst(e.target.value)}
          />
        </Flex>
        <Flex
          flexDirection="row"
          gridGap="2"
          justifyContent="right"
          mt="1.5rem"
        >
          <AddButton onClick={handleAddGST} />
          {rows.length !== 0 && <DeleteButton onClick={handleDeleteGST} />}
        </Flex>
      </Flex>
    </CustomContainer>
  );
};

export default EnterGST;
