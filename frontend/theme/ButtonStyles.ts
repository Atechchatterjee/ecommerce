import ColorPalatte from "./ColorPalatte"

const {secondaryBlue, secondaryPink} = ColorPalatte;

const includeProperty = (property: any, condition: boolean) => (
  condition ? property : {}
)

const commonStyles = ({includeColor = true}: {includeColor?: boolean} = {}) => ({
  fontFamily: "Sora",
  fontWeight: "medium",
  ...includeProperty({color: "white"}, includeColor),
})

export default {
  variants: {
    blueSolid: () => ({
      bg: secondaryBlue[900],
      _hover: { bg: "#314775" },
      ...commonStyles(),
    }),
    blueOutline: () => ({
      bg: "white",
      outlineColor: secondaryBlue[900],
      outlineOffset: "none",
      borderRadius: "sm",
      textColor: secondaryBlue[900],
      ...commonStyles({includeColor: false}),
    }),
    pinkSolid: () => ({
      bg: secondaryPink[200],
      _hover: { bg: "#B199CC" },
      ...commonStyles(),
    }),
    pinkGradient: () => ({
      bgGradient: "linear(to-b, #9D84B7, #E863B6)",
      _hover: {
        bgGradient: "linear(to-b, #9D84B7, #E863B6)",
      },
      ...commonStyles(),
    }),
    blueGradient: () => ({
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