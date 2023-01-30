import styled from "styled-components";
import colors from "../../values/colors";

export const Button = styled.button({
  padding: ({ size = "medium" }) => paddings[size],
  color: colors.white,
  background: ({ variant = "primary", disabled = false }) =>
    disabled ? colors.orange : backgrounds.default[variant],
  textTransform: "uppercase",
  fontWeight: 900,
  border: "none",
  transition: "all .3s ease-in-out",
  borderRadius: 5,
  opacity: ({ disabled = false }) => (disabled ? 0.6 : 1),
  cursor: ({ disabled = false }) => (disabled ? "not-allowed" : "pointer"),
  fontSize: ({ size = "medium" }) => fontSizes[size],
  "&:hover": {
    background: ({ variant = "primary", disabled = false }) =>
      disabled ? colors.orange : backgrounds.hover[variant],
  },
});

const backgrounds = {
  default: {
    primary: colors.orange,
    text: "none",
  },
  hover: {
    primary: colors.darkOrange,
    text: colors.darkOrange,
  },
};

const paddings = {
  large: "10px 20px",
  medium: "3px 10px",
  small: "2px 5px",
};

const fontSizes = {
  large: "28px",
  medium: "20px",
  small: "14px",
};
