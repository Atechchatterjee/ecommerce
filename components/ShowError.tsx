// displays error msg with proper styling if the condition satisfies
export const ShowError: React.FunctionComponent<{
  condition: boolean | undefined | null;
  error: string | undefined;
}> = ({ condition, error }) => {
  return condition ? (
    <>
      <span className="error">{error}</span>
      <br />
    </>
  ) : (
    <></>
  );
};
