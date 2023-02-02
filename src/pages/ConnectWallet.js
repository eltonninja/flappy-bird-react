import { useState } from "react";
import styled from "styled-components";
import { Game } from "../components/Game";
import { LeaderBoard } from "../components/LeaderBoard";
import { Button } from "../components/lib";
import { Prizes } from "../components/Prizes";
import colors from "../values/colors";
import { FAQ } from "../components/FAQ";
import { CompetitionHistory } from "../components/CompetitionHistory";

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
        <StyledFAQ />
        <StyledCompetitionHistory />
      </Main>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Header = styled.header({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: 10,
});

const LogoText = styled.p({
  color: colors.orange,
  textTransform: "uppercase",
  fontSize: 24,
  fontWeight: 900,
  // display: "none",
  // "@media (min-width: 1024px)": {
  //   display: "block",
  // },
});

const Main = styled.main({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  padding: 10,
  paddingTop: 0,
  position: "relative",
  width: "100%",
  gap: 10,
  flexDirection: "column",
  "@media (min-width: 1024px)": {
    flexDirection: "row",
  },
});

const StyledPrizes = styled(Prizes)({
  width: "100%",
  "@media (min-width: 1024px)": {
    width: "calc(50% - 172px)",
    height: "576px !important",
  },
});

const StyledGame = styled(Game)({
  width: "324px !important",
  height: "576px !important",
  display: "none",
  "@media (min-width: 1024px)": {
    display: "block",
  },
});

const StyledLeaderBoard = styled(LeaderBoard)({
  width: "100%",
  "@media (min-width: 1024px)": {
    width: "calc(50% - 172px)",
    height: "576px !important",
  },
});

const HelpButton = styled(Button)({
  marginLeft: "auto",
  color: colors.orange,
  "&:hover": {
    color: colors.white,
  },
  display: "none",
  "@media (min-width: 1024px)": {
    display: "block",
  },
});

const AboutButton = styled(Button)({
  marginLeft: 20,
  color: colors.orange,
  "&:hover": {
    color: colors.white,
  },
  display: "none",
  "@media (min-width: 1024px)": {
    display: "block",
  },
});

const ConnectButton = styled(Button)({
  marginLeft: "auto",
  "@media (min-width: 1024px)": {
    marginLeft: 20,
  },
});

const StyledFAQ = styled(FAQ)({
  width: "100%",
});

const StyledCompetitionHistory = styled(CompetitionHistory)({
  width: "100%",
});
