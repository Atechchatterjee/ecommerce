export default {
  baseStyle: {
    icon: {
      color: 'white',
    },
    control: {
      border: '1px',
      borderRadius: 'sm',
      _checked: {
        bgColor: "primary.200",
        borderColor: "primary.200",
        _hover: {
          bgColor: "primary.800",
          borderColor: "primary.800",
        },
      },
      _disabled: {
        borderColor: 'secondary.800',
        bg: 'gray.200',
      },
    },
  },
}