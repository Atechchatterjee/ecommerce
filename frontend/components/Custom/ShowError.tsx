import { CSSProperties } from "react";

// displays error msg with proper styling if the condition satisfies
export const ShowError: React.FunctionComponent<{
  condition: boolean | undefined | null;
  error: string | undefined;
  style?: CSSProperties | undefined;
}> = ({ condition, error, ...style }) => {
  return condition ? (
    <div
      className="error"
      style={{
        fontSize: "0.85em",
        color: "red",
        backgroundColor: "#FFEBE8",
        padding: "1em 0em",
      }}
    >
      <span {...style}>{error}</span>
    </div>
  ) : (
    <></>
  );
};
