import { Box, BoxProps, Button, Flex, Text } from "@chakra-ui/react";
import CustomTable from "../Custom/CustomTable";
import { createTableRows } from "./CreateTableRows";

interface ApprovedShippingQueryProps extends BoxProps {
  approvedShippingQueries: any[];
  onUndo?: ({ id }: { id: number }) => void;
  onSave?: Function;
}

const ApprovedShippingQuery = ({
  approvedShippingQueries,
  onUndo,
  onSave,
  ...props
}: ApprovedShippingQueryProps) => {
  return (
    <Box {...props}>
      <Text
        textAlign="center"
        mt="2%"
        fontFamily="Sora"
        fontWeight="semibold"
        fontSize="2xl"
      >
        Approved Shipping Queries
      </Text>
      <Box w="100%" display="flex" mt="2%" justifyContent="center">
        {approvedShippingQueries.length > 0 ? (
          <Flex flexDirection="column" w="80%" gridGap="1rem">
            <CustomTable
              tableVariant="primary"
              heading={[
                "address",
                "pincode",
                "state",
                "city",
                "user",
                "charges",
                "undo",
              ]}
              rows={createTableRows({
                shippingQueries: approvedShippingQueries,
                includeCharges: true,
                onUndo: (id) => onUndo && onUndo({ id }),
              })}
            />
            <Flex flexDirection="row">
              <Box w="100%" />
              <Button
                variant="primarySolid"
                alignContent="right"
                onClick={() => onSave && onSave()}
              >
                Save
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Text fontStyle="italic">No queries have been approved yet!</Text>
        )}
      </Box>
    </Box>
  );
};

export default ApprovedShippingQuery;
