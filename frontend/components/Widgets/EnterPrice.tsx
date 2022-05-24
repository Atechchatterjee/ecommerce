import {
  Flex,
  FlexProps,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DeleteButton, SaveButton } from "../Custom/CustomButtons";
import { CustomField } from "../Custom/CustomField";

interface EnterPriceProps extends FlexProps {
  allPriceData: any[];
  setAllPriceData: Function;
  deleteCb?: Function;
}

const EnterPrice = ({
  allPriceData,
  setAllPriceData,
  deleteCb,
  ...props
}: EnterPriceProps) => {
  const [range, setRange] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const DisplayExistingPrice = ({ ...props }: FlexProps) => {
    return (
      <Table variant="simple">
        <Thead>
          <Th>Range</Th>
          <Th>Value</Th>
          <Th>Delete</Th>
        </Thead>
        <Tbody>
          {allPriceData?.map((data) => (
            <Tr key={data.id}>
              <Td>{data.range}</Td>
              <Td>{data.price}</Td>
              <Td w="15%">
                <DeleteButton
                  variant="ghost"
                  color="primary.500"
                  onClick={() => handleDeletePrice(data.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };

  useEffect(() => {
    setRange("");
    setPrice("");
  }, [allPriceData]);

  const handleAddPrice = () => {
    setAllPriceData([
      ...allPriceData,
      { id: allPriceData.length, range, price, new: true },
    ]);
  };

  const handleDeletePrice = (id: number) => {
    setAllPriceData(allPriceData.filter((data) => data.id !== id));
    if (deleteCb) deleteCb(id);
  };

  return (
    <Flex flexDirection="column" gridGap={4}>
      <DisplayExistingPrice />
      <Flex
        flexDirection="row"
        gridGap={3}
        w="100%"
        padding="0.5rem 1.5vw 0 0.5vw"
        {...props}
      >
        <CustomField
          placeholder="Range"
          value={range}
          onChange={(e: any) => setRange(e.target.value)}
        />
        <CustomField
          placeholder="Price"
          value={price}
          onChange={(e: any) => setPrice(e.target.value)}
        />
        <SaveButton onClick={handleAddPrice} ml="3%" />
      </Flex>
    </Flex>
  );
};

export default EnterPrice;
