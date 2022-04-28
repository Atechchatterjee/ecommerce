interface ScrollBarStyleProps { 
  color?: string;
  borderRadius?: "sm" | "md" | "lg";
  hidden?: boolean;
}

export const scrollBarStyle = ({ hidden, color, borderRadius }: ScrollBarStyleProps = {}) => ({
  "&::-webkit-scrollbar": {
    width: "0.5rem",
    height: "0.5em",
    backgroundColor: "rgba(255,255,255,0)",
    borderRadius:  borderRadius ? borderRadius: "full",
    display: hidden ? "none": "block"
  },
  "&::-webkit-scrollbar-track": {
    display: "none",
    backgroundColor: "rgba(255,255,255,0)",
    borderRadius:  borderRadius ? borderRadius: "full",
  },
  "&::-webkit-scrollbar-thumb": {
    width: "2em",
    height: "3px",
    borderRadius:  borderRadius ? borderRadius: "full",
    backgroundColor: color || "primary.200",
    transition: "background-color 0.8s ease-in-out",
    display: hidden ? "none": "block"
  },
});