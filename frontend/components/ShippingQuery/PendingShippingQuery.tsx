import { Box, BoxProps, Text } from "@chakra-ui/react";
import { useState } from "react";
import CustomTable from "../Custom/CustomTable";
import ApprovalModal from "./ApprovalModal";
import { createTableRows } from "./CreateTableRows";

interface PendingShippingQueryProps extends BoxProps {
  pendingShippingQueries: any[];
  onApproval?: Function;
}

const PendingShippingQuery = ({
  pendingShippingQueries,
  onApproval,
  ...props
}: PendingShippingQueryProps) => {
  const [selectedRow, setSelectedRow] = useState<number>(-1);

  return (
    <Box {...props}>
      <Text
        textAlign="center"
        mt="2%"
        fontFamily="Sora"
        fontWeight="semibold"
        fontSize="2xl"
      >
        Pending Shipping Queries
      </Text>
      <Text textAlign="center" mt="0.7rem" fontStyle="italic">
        To approve a query click on an individual row.
      </Text>
      <Box w="100%" display="flex" justifyContent="center" mt="3%">
        {pendingShippingQueries.length > 0 ? (
          <CustomTable
            w="80%"
            tableVariant="secondary"
            heading={["address", "pincode", "state", "city", "user", "cart"]}
            rows={createTableRows({ shippingQueries: pendingShippingQueries })}
            rowCb={(id: string) => setSelectedRow(parseInt(id))}
            overflowX="auto"
            doubleClick
          />
        ) : (
          <Text fontStyle="italic">No pending shipping Queries.</Text>
        )}
      </Box>
      <ApprovalModal
        isOpen={selectedRow !== -1}
        onClose={() => setSelectedRow(-1)}
        onApproval={(shippingCharge) => {
          if (onApproval) {
            onApproval({
              queryId: selectedRow,
              charges: shippingCharge,
            });
          }
        }}
      />
    </Box>
  );
};

export default PendingShippingQuery;
