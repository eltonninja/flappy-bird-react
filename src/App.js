import { useRef, useState } from "react";
import { Home } from "./pages/Home";
import { ConnectWallet } from "./pages/ConnectWallet";
import MyAlgoConnect from "@randlabs/myalgo-connect";

function App() {
  const [account, setAccount] = useState(null);
  const myAlgoConnectRef = useRef();

  const connect = async () => {
    // const myAlgoConnect = new MyAlgoConnect();
    // const accountsSharedByUser = await myAlgoConnect.connect({
    //   shouldSelectOneAccount: true,
    // });
    // if (!accountsSharedByUser || accountsSharedByUser.length === 0) return;
    // setAccount(accountsSharedByUser[0]);

    // myAlgoConnectRef.current = myAlgoConnect;
    
    setAccount({
      address: "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH4",
      name: "Lazaro",
    });
  };

  const disconnect = () => {
    setAccount(null);
  };

  return account ? (
    <Home
      account={account}
      disconnect={disconnect}
      myAlgoConnect={myAlgoConnectRef.current}
    />
  ) : (
    <ConnectWallet connect={connect} />
  );
}

export default App;
