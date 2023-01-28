import styled from "styled-components";
import { Button } from "../components/lib";

export function ConnectWallet({ onConnect }) {
  return (
    <Wrapper>
      <Button size="large" onClick={onConnect}>
        Connect
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  position: "fixed",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
