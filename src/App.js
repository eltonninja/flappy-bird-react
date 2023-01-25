import React, { useEffect, useState } from "react";
import { initializeGame } from "./game";

import "./App.css";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import axios from "axios";

function App() {
  const [account, setAccount] = useState(null);

  const connect = async () => {
    const myAlgoConnect = new MyAlgoConnect();
    const accountsSharedByUser = await myAlgoConnect.connect({
      shouldSelectOneAccount: true,
    });
    if (!accountsSharedByUser || accountsSharedByUser.length === 0) return;
    const { address, name } = accountsSharedByUser[0];
    const balance = await axios
      .get(`https://node.testnet.algoexplorerapi.io/v2/accounts/${address}`)
      .then((response) => response.data)
      .then((accountInfo) => accountInfo.amount / 1_000_000);
    setAccount({ address, name, balance });
  };

  useEffect(() => {
    initializeGame({
      onStarted: () => alert("Started"),
      onFinished: (score) => alert(`Finished with score ${score}`),
    });
  }, []);

  return (
    <div>
      <div className="header">
        {account && (
          <>
            <p className="account-name">{account.name}</p>
            <p className="account-address">{account.address}</p>
            <p className="account-balance">{account.balance} Algo</p>
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
