import styled from "styled-components";
import colors from "../values/colors";

export const Button = styled.button({
  padding: ({ size = "medium" }) => paddings[size],
  color: colors.white,
  background: ({ variant = "primary" }) => backgrounds[variant],
  cursor: "pointer",
  textTransform: "uppercase",
  fontWeight: 900,
  border: "none",
  transition: "all .3s ease-in-out",
  borderRadius: 5,
  fontSize: ({ size = "medium" }) => fontSizes[size],
  "&:hover": {
    background: colors.darkOrange,
  },
});

const backgrounds = {
  primary: colors.orange,
  text: "none",
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
