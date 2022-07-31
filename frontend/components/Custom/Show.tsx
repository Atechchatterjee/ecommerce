import React from "react";

interface ShowProps {
  when?: boolean;
}

const Show: React.FC<ShowProps> = ({ children, when }) => {
  if (when) return <>{children}</>;
  else return <></>;
};

export default Show;
