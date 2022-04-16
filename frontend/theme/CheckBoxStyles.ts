export default {
  baseStyle: {
    icon: {
      color: 'white',
    },
    control: {
      border: '1px',
      borderRadius: 'sm',
      _checked: {
        bgColor: "secondary.200",
        borderColor: "secondary.200",
        _hover: {
          bgColor: "secondary.200",
          borderColor: "secondary.200",
        },
      },
      _disabled: {
        borderColor: 'primary.800',
        bg: 'gray.200',
      },
    },
  },
}