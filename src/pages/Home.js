import React, { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";

import { Header } from "../components/Header";
import { Game } from "../components/Game";
import { Prizes } from "../components/Prizes";
import { LeaderBoard } from "../components/LeaderBoard";

import { waitForConfirmation } from "algosdk";
import algosdk from "algosdk";
import styled from "styled-components";
import { useBalance, useLastGame } from "../hooks";
import axios from "axios";
import { FAQ } from "../components/FAQ";
import { CompetitionHistory } from "../components/CompetitionHistory";
import colors from "../values/colors";

const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
  "X-API-Key": "LBBPibdIpf4dtq0M35s3t87K5sYVwi0X4TIDY4e2",
};

const algodclient = new algosdk.Algodv2(token, baseServer, port);

export function Home({ account, disconnect, myAlgoConnect }) {
  const { data: balance, isLoading: isLoadingBalance } = useBalance(
    account?.address,
    algodclient
  );
  const { data: lastGame, isLoading: isLoadingLastGame } = useLastGame(
    account?.address
  );
  const [isPurchasing, setIsPurchasing] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: "balance" });
  }, [queryClient]);

  const handleAfterGameFinished = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["last-game", account?.address],
    });
  }, [account?.address, queryClient]);

  const purchase = useCallback(async () => {
    setIsPurchasing(true);

    try {
      let params = await algodclient.getTransactionParams().do();
      const enc = new TextEncoder();
      let note = enc.encode("Purchase Flappy Bird Game for 4 algo");
      console.log(process.env.REACT_APP_PRIZE_WALLET);
      console.log(process.env.REACT_APP_PURCHASE_AMOUNT * 1_000_000);
      const txn = algosdk.makePaymentTxnWithSuggestedParams(
        account?.address,
        process.env.REACT_APP_PRIZE_WALLET,
        process.env.REACT_APP_PURCHASE_AMOUNT * 1_000_000,
        undefined,
        note,
        params
      );
      const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
      const sendTx = await algodclient.sendRawTransaction(signedTxn.blob).do();
      console.log("Transaction: " + sendTx.txId);
      await waitForConfirmation(algodclient, sendTx.txId, 30);

      axios
        .post(`${process.env.REACT_APP_API_URL}/purchase`, {
          wallet: account?.address,
          purchase_tx: sendTx.txId,
        })
        .then((res) => {
          queryClient.setQueryData(["last-game", account?.address], res.data);
          setIsPurchasing(false);
        })
        .catch((err) => {
          console.log("Error occured:", err);
          setIsPurchasing(false);
        });
    } catch (e) {
      setIsPurchasing(false);
    }
  }, [account?.address, myAlgoConnect, queryClient]);

  return (
    <Wrapper>
      <Header
        account={account}
        balance={balance}
        isLoadingBalance={isLoadingBalance}
        lastGame={lastGame}
        isLoadingLastGame={isLoadingLastGame}
        purchase={purchase}
        isPurchasing={isPurchasing}
        disconnect={disconnect}
      />
      <Main>
        <StyledPrizes prizeWallet={process.env.REACT_APP_PRIZE_WALLET} />
        <StyledGame
          address={account?.address}
          handleAfterFinished={handleAfterGameFinished}
        />
        {/* <ScrollArea /> */}
        <StyledLeaderBoard wallet={account?.address} />
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
  order: 2,
  "@media (min-width: 1024px)": {
    order: 1,
    width: "calc(50% - 172px)",
    height: "576px !important",
  },
});

const StyledGame = styled(Game)({
  position: "relative",
  width: "80% !important",
  marginRight: "auto",
  order: 1,
  overflow: "visible !important",
  "&::after": {
    content: '"SCROLL HERE"',
    position: "absolute",
    top: 0,
    left: "100%",
    width: "calc(25% + 10px)",
    height: "100%",
    color: colors.lightOrange,
    writingMode: "tb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 48,
    fontWeight: 900,
  },
  "@media (min-width: 1024px)": {
    order: 2,
    width: "324px !important",
    height: "576px !important",
    "&::after": {
      display: "none",
    },
  },
});

const StyledLeaderBoard = styled(LeaderBoard)({
  width: "100%",
  order: 3,
  "@media (min-width: 1024px)": {
    width: "calc(50% - 172px)",
    height: "576px !important",
  },
});

const StyledFAQ = styled(FAQ)({
  width: "100%",
  order: 4,
});

const StyledCompetitionHistory = styled(CompetitionHistory)({
  width: "100%",
  order: 5,
});
