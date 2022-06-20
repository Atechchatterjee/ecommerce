import { Box, BoxProps, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

type Label = { icon: any; text: string };

interface HorizontalSliderProps {
  labels: Label[];
  mode?: "light" | "dark";
  getSelectedIndx?: (selectedIndx: number) => void;
}

const ProgressLine = ({ ...props }: BoxProps) => {
  return <Box w="10vw" h="0.5vh" bgColor="#46508D" {...(props as any)}></Box>;
};

const HorizontalSlider = ({
  labels,
  mode = "dark",
  getSelectedIndx,
}: HorizontalSliderProps) => {
  const [selectedIndx, setSelectedIndx] = useState<number>(0);

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
              if (getSelectedIndx) getSelectedIndx(i);
            }}
          >
            <Flex flexDirection="row" gridGap="1rem">
              <Icon />
              <Text fontWeight="semibold">{text}</Text>
            </Flex>
          </Button>
          {i < labels.length - 1 && <ProgressLine mt="2%" />}
        </>
      ))}
    </Flex>
  );
};

export default HorizontalSlider;
