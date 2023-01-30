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

const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
  "X-API-Key": "LBBPibdIpf4dtq0M35s3t87K5sYVwi0X4TIDY4e2",
};

const algodclient = new algosdk.Algodv2(token, baseServer, port);

export function Home({ account, disconnect, myAlgoConnect }) {
  const [top10Wallets, setTop10Wallets] = useState([
    "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH1",
    "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJ2",
    "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH3",
    "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJ4",
    "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH5",
    "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJ6",
    "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH7",
    "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJ8",
    "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH9",
    "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJ0",
  ]);
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
          console.log(res);
          queryClient.setQueryData(["last-game", account?.address], res);
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
        <StyledPrizes
          prizeWallet={process.env.REACT_APP_PRIZE_WALLET}
          prizeAlgo={108243}
          top10Wallets={top10Wallets}
        />
        <StyledGame
          address={account?.address}
          handleAfterFinished={handleAfterGameFinished}
        />
        <StyledLeaderBoard />
      </Main>
    </Wrapper>
  );
}

const Wrapper = styled.div({});

const Main = styled.main({
  display: "flex",
  justifyContent: "center",
  padding: 10,
  position: "relative",
  width: "100%",
  gap: 10,
});

const StyledPrizes = styled(Prizes)({
  flexGrow: 1,
  height: "576px !important",
});

const StyledGame = styled(Game)({
  width: "325px !important",
  height: "576px !important",
});

const StyledLeaderBoard = styled(LeaderBoard)({
  flexGrow: 1,
  height: "576px !important",
});
