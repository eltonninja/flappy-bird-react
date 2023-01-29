import styled from "styled-components";
import { Button } from "../components/lib";

export function ConnectWallet({ connect }) {
  return (
    <Wrapper>
      <Button size="large" onClick={connect}>
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
