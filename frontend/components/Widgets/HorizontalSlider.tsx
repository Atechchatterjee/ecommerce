import { Box, BoxProps, Button, Flex, Text } from "@chakra-ui/react";

type Label = { icon: any; text: string };

interface HorizontalSliderProps {
  labels: Label[];
  indx: [selectedIndx: number, setSelectedIndx: (_: number) => void];
  disableIndx?: number;
  mode?: "light" | "dark";
}

const ProgressLine = ({ ...props }: BoxProps) => {
  return <Box w="10vw" h="0.5vh" bgColor="#46508D" {...(props as any)}></Box>;
};

const HorizontalSlider = ({
  labels,
  mode = "dark",
  disableIndx,
  indx,
}: HorizontalSliderProps) => {
  const [selectedIndx, setSelectedIndx] = indx;

  return (
    <Flex flexDirection="row" gridGap="0">
      {labels.map(({ icon: Icon, text }, i: number) => (
        <>
          <Button
            variant={
              i == selectedIndx ? "whitePrimarySolid" : "mutedPrimarySolid"
            }
            borderRadius="full"
            padding="1.6rem 3rem"
            fontSize="0.9rem"
            textAlign="center"
            opacity="0.9"
            onClick={() => {
              setSelectedIndx(i);
            }}
            isDisabled={disableIndx === i}
          >
            <Flex flexDirection="row" gridGap="1rem">
              <Icon />
              <Text fontWeight="semibold">{text}</Text>
            </Flex>
          </Button>
          {i < labels.length - 1 && <ProgressLine mt="1.5rem" />}
        </>
      ))}
    </Flex>
  );
};

export default HorizontalSlider;
