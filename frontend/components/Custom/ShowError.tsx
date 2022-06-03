import { Box, BoxProps } from "@chakra-ui/react";

interface ShowErrorProps extends BoxProps {
  condition: boolean | undefined | null;
  error: string | undefined;
}

// displays error msg with proper styling if the condition satisfies
export const ShowError = ({ condition, error, ...props }: ShowErrorProps) => {
  return condition ? (
    <Box
      className="error"
      fontSize="0.85em"
      color="red"
      backgroundColor="#FFEBE8"
      padding="1em 0em"
      {...(props as any)}
    >
      <span>{error}</span>
    </Box>
  ) : (
    <></>
  );
};
