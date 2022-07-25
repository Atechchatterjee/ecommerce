import WithAuth from "../../util/WithAuth";
import { useQuery } from "react-query";
import {
  approveShippingQueries,
  getAllShippingQueries,
} from "../../services/ShippingService";
import { useEffect, useState } from "react";
import Navbar from "../../components/Admin/Navbar";
import PendingShippingQuery from "../../components/ShippingQuery/PendingShippingQuery";
import ApprovedShippingQuery from "../../components/ShippingQuery/ApprovedShippingQuery";

const ShippingQuery = () => {
  const { data: shippingQueries } = useQuery(
    "get-all-shipping-queries",
    getAllShippingQueries
  );
  const [approvedShippingQuery, setApprovedShippingQueries] = useState<any[]>(
    []
  );
  const [pendingShippingQueries, setPendingShippingQueries] = useState<
    any[] | undefined
  >(shippingQueries);

  useEffect(() => {
    let pendingQueries = [],
      approvedQueries = [];

    for (const query of shippingQueries || []) {
      const finalPrice = query.cart.reduce(
        (finalPrice: any, cartItem: any) =>
          finalPrice + parseInt(cartItem.total_price),
        0
      );
      if (query.approved)
        approvedQueries.push({
          ...query,
          cart: [...query.cart, { finalPrice }],
        });
      else
        pendingQueries.push({
          ...query,
          cart: [...query.cart, { finalPrice }],
        });
    }
    setApprovedShippingQueries(approvedQueries);
    setPendingShippingQueries(pendingQueries);
  }, [shippingQueries]);

  const handleShippingQueryApproval = ({ queryId, charges }: any) => {
    setPendingShippingQueries(
      pendingShippingQueries?.filter((q: any) => {
        if (q.id !== queryId) return q;
        else {
          setApprovedShippingQueries([
            ...approvedShippingQuery,
            { ...q, charges },
          ]);
        }
      })
    );
  };

  const handleShippingQueryUndo = ({ id }: { id: number }) => {
    setApprovedShippingQueries(
      approvedShippingQuery?.filter((q: any) => {
        if (q.id !== id) return q;
        else {
          setPendingShippingQueries([...(pendingShippingQueries || []), q]);
        }
      })
    );
  };

  const handleSaveApproval = () => {
    approveShippingQueries(
      approvedShippingQuery.filter((query) => {
        if (!query.approved)
          return {
            id: query.id,
            charges: query.charges,
          };
      })
    );
  };

  return (
    <>
      <Navbar />
      <PendingShippingQuery
        mt="3%"
        pendingShippingQueries={pendingShippingQueries || []}
        onApproval={handleShippingQueryApproval}
      />
      <ApprovedShippingQuery
        approvedShippingQueries={approvedShippingQuery}
        mt="5%"
        onUndo={handleShippingQueryUndo}
        onSave={handleSaveApproval}
      />
    </>
  );
};

export default WithAuth(ShippingQuery, { admin: true });
