import { CloseButton, Text } from "@chakra-ui/react";
import ShowAllCartItems from "./ShowAllCartItems";

interface CreateTableRowsProps {
  shippingQueries?: any[];
  includeCharges?: boolean;
  onUndo?: (id: number) => void;
}

export const createTableRows = ({
  shippingQueries,
  includeCharges,
  onUndo,
}: CreateTableRowsProps) =>
  shippingQueries?.map((el: any) => {
    if (el && el.details) {
      const query = [
        el.id,
        el.details.address,
        el.details.pincode,
        el.details.state,
        el.details.city,
        el.details.user_id.name,
      ];
      return includeCharges
        ? [
            ...query,
            <Text fontWeight="bold">&#x20B9; {el.charges}</Text>,
            <CloseButton
              onClick={() => onUndo && onUndo(el.id)}
              disabled={el.approved}
            />,
          ]
        : [
            ...query,
            <ShowAllCartItems user={el.details.user_id} cartItems={el.cart} />,
          ];
    } else return [];
  }) || [];
