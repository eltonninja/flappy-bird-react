import React, { useEffect, useRef, useState } from "react";
import { initializeGame } from "./game";

import "./App.css";

import MyAlgoConnect from "@randlabs/myalgo-connect";
import { waitForConfirmation } from "algosdk";
import algosdk from "algosdk";

const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
  "X-API-Key": "LBBPibdIpf4dtq0M35s3t87K5sYVwi0X4TIDY4e2",
};

const algodclient = new algosdk.Algodv2(token, baseServer, port);

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [balanceUpdated, setBalanceUpdated] = useState(0);

  const myAlgoConnectRef = useRef();

  useEffect(() => {
    if (!account?.address) return;
    algodclient
      .accountInformation(account.address)
      .do()
      .then((info) => info.amount / 1_000_000)
      .then((balance) => setBalance(balance));
  }, [account?.address, balanceUpdated]);

  const connect = async () => {
    const myAlgoConnect = new MyAlgoConnect();
    const accountsSharedByUser = await myAlgoConnect.connect({
      shouldSelectOneAccount: true,
    });
    if (!accountsSharedByUser || accountsSharedByUser.length === 0) return;
    setAccount(accountsSharedByUser[0]);

    myAlgoConnectRef.current = myAlgoConnect;
  };

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

  useEffect(() => {
    initializeGame({
      beforeStart: async () =>
        new Promise((resolve) => setTimeout(() => resolve(true), 0)),
      afterFinished: async (score) => {},
    });
  }, []);

  return (
    <div>
      <div className="header">
        {account && (
          <>
            <p className="account-name">{account.name}</p>
            <p className="account-address">{account.address}</p>
            <p className="account-balance">{balance} Algo</p>
            <button className="connect-button" onClick={send}>
              Send
            </button>
          </>
        )}
        {!account && (
          <button className="connect-button" onClick={connect}>
            Connect Wallet
          </button>
        )}
      </div>
      <div className="main">
        <div id="game"></div>
      </div>
    </div>
  );
}

export default App;
