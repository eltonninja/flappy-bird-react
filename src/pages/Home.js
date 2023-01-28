import React, { useEffect, useRef, useState } from "react";

import { Header } from "../components/Header";
import { Game } from "../components/Game";
import { Prizes } from "../components/Prizes";
import { LeaderBoard } from "../components/LeaderBoard";

import { waitForConfirmation } from "algosdk";
import algosdk from "algosdk";
import styled from "styled-components";

const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
  "X-API-Key": "LBBPibdIpf4dtq0M35s3t87K5sYVwi0X4TIDY4e2",
};

const algodclient = new algosdk.Algodv2(token, baseServer, port);

export function Home({ account }) {
  const [balance, setBalance] = useState(0);
  const [balanceUpdated, setBalanceUpdated] = useState(0);
  const [top10Wallets, setTop10Wallets] = useState([
    "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH4",
    "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJU",
    "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH4",
    "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJU",
    "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH4",
    "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJU",
    "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH4",
    "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJU",
    "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH4",
    "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJU",
  ]);

  const myAlgoConnectRef = useRef();

  useEffect(() => {
    if (!account?.address) return;
    algodclient
      .accountInformation(account.address)
      .do()
      .then((info) => info.amount / 1_000_000)
      .then((balance) => setBalance(balance));
  }, [account?.address, balanceUpdated]);

  const send = async () => {
    const myAlgoConnect = myAlgoConnectRef.current;
    if (!myAlgoConnect) return;
    let params = await algodclient.getTransactionParams().do();
    const enc = new TextEncoder();
    let note = enc.encode("Test");
    const txn = algosdk.makePaymentTxnWithSuggestedParams(
      "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJU",
      "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH4",
      1_000_000,
      undefined,
      note,
      params
    );
    const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
    const sendTx = await algodclient.sendRawTransaction(signedTxn.blob).do();
    console.log("Transaction: " + sendTx.txId);
    await waitForConfirmation(algodclient, sendTx.txId, 30);
    setBalanceUpdated((i) => i + 1);
  };

  return (
    <Wrapper>
      <Header account={account} balance={balance} send={send} />
      <Main>
        <StyledPrizes
          prizeWallet="TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH4"
          prizeAlgo={108243}
          top10Wallets={top10Wallets}
        />
        <StyledGame address={account?.address} />
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
