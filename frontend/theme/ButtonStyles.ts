import ColorPalatte from "./ColorPalatte"

const {primary, secondary} = ColorPalatte;

const includeProperty = (property: any, condition: boolean) => (
  condition ? property : {}
)

const commonStyles = ({includeColor = true}: {includeColor?: boolean} = {}) => ({
  fontFamily: "Sora",
  fontWeight: "medium",
  focusBorderColor: "secondary.200",
  ...includeProperty({color: "white"}, includeColor),
})

export default {
  variants: {
    primarySolid: () => ({
      bg: primary[800],
      _hover: { bg: "primary.500" },
      ...commonStyles(),
    }),
    primaryOutline: () => ({
      bg: "white",
      outlineColor: primary[800],
      outlineOffset: "none",
      borderRadius: "sm",
      textColor: primary[900],
      ...commonStyles({includeColor: false}),
    }),
    secondaryOutline: () => ({
      bg: "white",
      outlineColor: secondary[200],
      outlineOffset: "none",
      borderRadius: "sm",
      textColor: secondary[200],
      ...commonStyles({includeColor: false}),
    }),
    secondarySolid: () => ({
      bg: secondary[200],
      _hover: { bg: secondary[200] },
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
}