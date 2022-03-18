interface ScrollBarStyleProps { 
  color: "primary" | "secondary";
  borderRadius?: "sm" | "md" | "lg";
}

export const scrollBarStyle = ({ color, borderRadius }: ScrollBarStyleProps = {color: "primary"}) => ({
  "&::-webkit-scrollbar": {
    width: "0.5rem",
    height: "0.5em",
    backgroundColor: "white",
  },
  "&::-webkit-scrollbar-track": {
    display: "none",
  },
  "&::-webkit-scrollbar-thumb": {
    width: "2em",
    height: "3px",
    borderRadius:  borderRadius ? borderRadius: "none",
    backgroundColor: color === "secondary" ? "secondary.200" : "primary.200",
    transition: "background-color 0.8s ease-in-out",
  },
});