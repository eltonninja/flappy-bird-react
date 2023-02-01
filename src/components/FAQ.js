import styled from "styled-components";
import colors from "../values/colors";
import { Panel, PanelHead, PanelBody, PanelFooter } from "./Panel";

export function FAQ({ className }) {
  return (
    <Panel className={className}>
      <StyledPanelHead>Frequently Asked Questions</StyledPanelHead>
      <StyledPanelBody />
    </Panel>
  );
}

const StyledPanelHead = styled(PanelHead)({
  color: colors.darkOrange2,
  background: colors.white,
});

const StyledPanelBody = styled(PanelBody)({
  minHeight: 200,
});
