import { useState } from "react";
import styled from "styled-components";
import { Game } from "../components/Game";
import { LeaderBoard } from "../components/LeaderBoard";
import { Button } from "../components/lib";
import { Prizes } from "../components/Prizes";
import colors from "../values/colors";

export function ConnectWallet({ handleConnect }) {
  return (
    <Wrapper>
      <Header>
        <LogoText>Flappy Bird</LogoText>
        <HelpButton variant="text">Help</HelpButton>
        <AboutButton variant="text">About Us</AboutButton>
        <ConnectButton onClick={handleConnect}>Connect</ConnectButton>
      </Header>
      <Main>
        <StyledPrizes prizeWallet={process.env.REACT_APP_PRIZE_WALLET} />
        <StyledGame disabled onClick={handleConnect} />
        <StyledLeaderBoard />
      </Main>
    </Wrapper>
  );
}

const Wrapper = styled.div({});

const Header = styled.header({
  display: "flex",
  padding: 10,
  alignItems: "center",
});

const Main = styled.main({
  display: "flex",
  justifyContent: "center",
  padding: 10,
  paddingTop: 0,
  position: "relative",
  width: "100%",
  gap: 10,
});

const StyledPrizes = styled(Prizes)({
  width: "calc(50% - 172px)",
  height: "576px !important",
});

const StyledGame = styled(Game)({
  width: "324px !important",
  height: "576px !important",
});

const StyledLeaderBoard = styled(LeaderBoard)({
  width: "calc(50% - 172px)",
  height: "576px !important",
});

const LogoText = styled.p({
  color: colors.orange,
  textTransform: "uppercase",
  fontSize: 24,
  fontWeight: 900,
});

const HelpButton = styled(Button)({
  marginLeft: "auto",
  color: colors.orange,
  "&:hover": {
    color: colors.white,
  },
});

const AboutButton = styled(Button)({
  marginLeft: 20,
  color: colors.orange,
  "&:hover": {
    color: colors.white,
  },
});

const ConnectButton = styled(Button)({
  marginLeft: 20,
});
