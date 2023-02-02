import styled from "styled-components";
import colors from "../values/colors";
import { Button } from "./lib";

export function WalletTypeModal({
  connectWithMyalgo,
  connectWithPera,
  handleClose,
}) {
  return (
    <Wrapper>
      <Title>Select your wallet</Title>
      <ButtonWrapper>
        <WalletButton onClick={connectWithMyalgo}>My Algo</WalletButton>
        <WalletButton variant="text" onClick={connectWithPera}>
          Pera
        </WalletButton>
      </ButtonWrapper>
      <CloseButton variant="text" onClick={handleClose}>
        &times;
      </CloseButton>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  position: "fixed",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: colors.black + "ee",
  zIndex: 100,
});

const Title = styled.h2({
  color: colors.white,
  textTransform: "uppercase",
  fontSize: 28,
  "@media (min-width: 1024px)": {
    fontSize: 48,
  },
});

const CloseButton = styled(Button)({
  position: "absolute",
  top: 10,
  right: 10,
  fontSize: 32,
  width: 40,
  height: 40,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "@media (min-width: 1024px)": {
    top: 20,
    right: 20,
    fontSize: 40,
    width: 60,
    height: 60,
  },
});

const ButtonWrapper = styled.div({
  display: "flex",
  gap: 20,
});

const WalletButton = styled(Button)({
  "@media (min-width: 1024px)": {
    fontSize: 28,
    padding: "10px 20px",
  },
});
