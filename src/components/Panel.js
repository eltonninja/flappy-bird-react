import styled from "styled-components";
import colors from "../values/colors";

const Panel = styled.div({
  outline: `2px solid ${colors.darkOrange2}`,
  border: "none",
  display: "flex",
  flexDirection: "column",
});

const PanelHead = styled.div({
  color: colors.white,
  background: colors.darkOrange2,
  textAlign: "center",
  fontSize: 24,
  textTransform: "uppercase",
  fontWeight: 900,
  padding: 3,
});

const PanelBody = styled.div({
  padding: 10,
  flexGrow: 1,
  overflowY: "auto",
});

const PanelFooter = styled.div({
  color: colors.white,
  background: colors.darkOrange2,
  padding: 10,
});

export { Panel, PanelHead, PanelBody, PanelFooter };
