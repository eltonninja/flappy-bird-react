import { useRef, useState } from "react";
import { Home } from "./pages/Home";
import { ConnectWallet } from "./pages/ConnectWallet";
import MyAlgoConnect from "@randlabs/myalgo-connect";

function App() {
  const [account, setAccount] = useState(null);
  const myAlgoConnectRef = useRef();

  const handleConnect = async () => {
    const myAlgoConnect = new MyAlgoConnect();
    const accountsSharedByUser = await myAlgoConnect.connect({
      shouldSelectOneAccount: true,
    });
    if (!accountsSharedByUser || accountsSharedByUser.length === 0) return;
    setAccount(accountsSharedByUser[0]);

    myAlgoConnectRef.current = myAlgoConnect;

    // setAccount({
    //   name: "Lazaro",
    //   address: "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJU",
    // });
  };

  return account ? (
    <Home account={account} />
  ) : (
    <ConnectWallet onConnect={handleConnect} />
  );
}

export default App;
