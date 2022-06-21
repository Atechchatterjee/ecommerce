import ColorPalatte from "./ColorPalatte";

const { primary, secondary } = ColorPalatte;

const includeProperty = (property: any, condition: boolean) =>
  condition ? property : {};

const commonStyles = ({
  includeColor = true,
}: { includeColor?: boolean } = {}) => ({
  fontFamily: "Sora",
  fontWeight: "medium",
  focusBorderColor: "secondary.200",
  fontSize: { base: "12px", md: "15px", lg: "16px" },
  ...includeProperty({ color: "white" }, includeColor),
});

export default {
  variants: {
    primarySolid: () => ({
      bg: primary[500],
      _hover: { bg: "primary.200" },
      _disabled: {
        _hover: {
          textColor: primary[900],
        },
      },
      ...commonStyles(),
    }),
    mutedPrimarySolid: () => ({
      bg: primary[200],
      _hover: { bg: "primary.100" },
      _disabled: {
        _hover: {
          textColor: primary[900],
        },
      },
      ...commonStyles(),
    }),
    whitePrimarySolid: () => ({
      bg: "#ffffff",
      color: primary[500],
      _hover: { bg: "gray.200" },
      _disabled: {
        _hover: {
          textColor: primary[900],
        },
      },
      ...commonStyles({ includeColor: false }),
    }),
    primaryLightSolid: () => ({
      bg: "#3E4A7F",
      _hover: { bg: "primary.100" },
      _disabled: {
        _hover: {
          textColor: primary[500],
        },
      },
      ...commonStyles(),
    }),
    primaryOutline: () => ({
      bg: "white",
      outlineColor: primary[800],
      outlineOffset: "none",
      borderRadius: "sm",
      textColor: primary[900],
      _hover: {
        bg: primary[500],
        color: "white",
        borderColor: primary[500],
        outlineColor: primary[500],
        outlineOffset: "none",
      },
      _disabled: {
        _hover: {
          textColor: primary[900],
        },
      },
      ...commonStyles({ includeColor: false }),
    }),
    secondaryOutline: () => ({
      bg: "white",
      outlineColor: secondary[200],
      outlineOffset: "none",
      borderRadius: "sm",
      textColor: secondary[200],
      ...commonStyles({ includeColor: false }),
    }),
    blurSolid: () => ({
      bgImage:
        "linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.15))",
      backdropFilter: "blur(20px)",
    }),
    primaryBlurSolid: () => ({
      bgImage:
        "linear-gradient(to bottom, rgba(71, 84, 153, 0.4), rgba(59, 73, 148, 0.5))",
      backdropFilter: "blur(30px)",
    }),
    secondaryBlurSolid: () => ({
      bgImage:
        "linear-gradient(to right, rgba(161, 157, 242, 0.9), rgba(161, 157, 242, 0.8))",
      backdropFilter: "blur(30px)",
    }),
    secondarySolid: () => ({
      bg: secondary[200],
      borderRadius: "md",
      _hover: {
        opacity: "0.8",
      },
      ...commonStyles(),
    }),
    secondaryGradient: () => ({
      bgGradient: "linear(to-b, #9D84B7, #E863B6)",
      _hover: {
        bgGradient: "linear(to-b, #9D84B7, #E863B6)",
      },
      ...commonStyles(),
    }),
    primaryGradient: () => ({
      bgGradient: "linear(to-b, #161F4F, #4E2A81)",
      _hover: {
        bgGradient: "linear(to-b, #222D68, #6C48A5)",
      },
      ...commonStyles(),
    }),
    redGradient: () => ({
      bgGradient: "linear(to-b, #D34E93, #FF491C)",
      _hover: {
        bgGradient: "linear(to-b, #FF7597, #F98970)",
      },
      ...commonStyles(),
    }),
  },
};
