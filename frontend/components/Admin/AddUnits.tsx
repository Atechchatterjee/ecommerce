import { Box, BoxProps, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdDone } from "react-icons/md";
import CustomContainer from "../Custom/CustomContainer";
import { CustomField } from "../Custom/CustomField";
import { FaTrash } from "react-icons/fa";
import { addUnits, fetchUnits, removeUnits } from "../../services/UnitService";

const AddUnits: React.FC = () => {
  const [unit, setUnit] = useState<string>("");
  const [allUnits, setAllUnits] = useState<any[]>([]);
  const [reRender, setReRender] = useState<boolean>(false);

  const DisplayUnits = ({ ...props }: BoxProps) => {
    if (allUnits.length === 0)
      return (
        <Box {...(props as any)}>
          <Text fontSize="1.2rem" fontWeight="medium" fontFamily="Sora">
            Enter some units ...
          </Text>
        </Box>
      );
    return (
      <Box
        {...(props as any)}
        display="flex"
        flexDirection="column"
        gridGap={5}
        w="100%"
      >
        {allUnits.map((unit: any, indx: number) => {
          return (
            <Flex flexDirection="row" gridGap={3} w="100%" flex="1" key={indx}>
              <Box
                borderRadius="md"
                padding="3%"
                boxShadow="rgba(99, 99, 99, 0.12) 1px 3px 8px 1px"
                flex="2"
              >
                {unit.value}
              </Box>
              <Button
                variant="ghost"
                h="5.6vh"
                color="primary.200"
                onClick={() => removeUnits(unit).then(() => setReRender(true))}
              >
                <FaTrash size="20" />
              </Button>
            </Flex>
          );
        })}
      </Box>
    );
  };

  useEffect(() => {
    fetchUnits().then((allUnits: any[]) => {
      setAllUnits(allUnits);
      setReRender(false);
    });
  }, [reRender]);

  return (
    <CustomContainer
      w="50rem"
      h="inherit"
      mt="5vh"
      borderRadius="lg"
      position="relative"
      color="gray.600"
      padding="2rem 2% 4rem 2%"
      display="flex"
      justifyContent="center"
    >
      <Flex flexDirection="column" gridGap={10} w="90%">
        <Heading textAlign="center" fontFamily="Sora">
          Add Units
        </Heading>
        <Flex flexDirection="row" gridGap={3} w="100%">
          <CustomField
            value={unit}
            size="lg"
            borderRadius="sm"
            placeholder="Enter units"
            onChange={(e: any) => setUnit(e.target.value)}
          />
          <Button
            variant="ghost"
            h="5vh"
            color="primary.200"
            onClick={() =>
              addUnits(unit)?.then(() => {
                setReRender(true);
                setUnit("");
              })
            }
          >
            <MdDone size="25" strokeWidth={1.5} />
          </Button>
        </Flex>
        <DisplayUnits textAlign="center" />
      </Flex>
    </CustomContainer>
  );
};

export default AddUnits;
