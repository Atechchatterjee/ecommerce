import { useState } from "react";
import {
  Container,
  HStack,
  Text,
  Box,
  ContainerProps,
  Center,
} from "@chakra-ui/react";
import { BsStarFill, BsStar } from "react-icons/bs";
import ColorPalatte from "../../theme/ColorPalatte";

const MAX_RATING = 5;

const commonIconStyles = (i: number, interactive?: boolean) => {
  return {
    cursor: interactive ? "pointer" : "default",
    key: i,
    fill: ColorPalatte.secondaryBlue[200],
  };
};

interface RatingProps extends ContainerProps {
  rating?: number;
  interactive?: boolean;
  numberOfReviews?: number;
}

const Rating = ({
  rating: ratingProps,
  interactive,
  numberOfReviews,
  ...props
}: RatingProps) => {
  const [rating, setRating] = useState<number>(ratingProps || 0);

  const Stars = (state: "filled" | "empty", i: number) => {
    return (
      <Box>
        {state === "filled" ? (
          <BsStarFill
            size={20}
            onClick={() => (interactive ? setRating(i) : null)}
            {...commonIconStyles(i, interactive)}
          />
        ) : (
          <BsStar
            size={20}
            onClick={() => (interactive ? setRating(i + 1) : null)}
            {...commonIconStyles(i, interactive)}
          />
        )}
      </Box>
    );
  };

  return (
    <Container width="30em" {...props}>
      <HStack width="30em" position="relative">
        {[...Array(MAX_RATING)].map((_, i) => {
          if (i < rating) return Stars("filled", i);
          return Stars("empty", i);
        })}
      </HStack>
      <Text positon="absolute" marginLeft="9em" marginTop="-1.25em">
        {numberOfReviews}
      </Text>
    </Container>
  );
};

export default Rating;
