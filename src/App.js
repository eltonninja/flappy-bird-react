import { useEffect, useRef, useState } from "react";
import { Home } from "./pages/Home";
import { ConnectWallet } from "./pages/ConnectWallet";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { PeraWalletConnect } from "@perawallet/connect";
import { WalletTypeModal } from "./components/WalletTypeModal";

const peraWallet = new PeraWalletConnect({
  // chainId: "416001" // mainnet
  chainId: "416002", // testnet
});

function App() {
  const [account, setAccount] = useState(null);
  const [walletTypeModal, setWalletTypeModal] = useState(false);

  const myAlgoConnectRef = useRef();

  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet.reconnectSession().then((accounts) => {
      // Setup the disconnect event listener
      peraWallet.connector?.on("disconnect", disconnect);

      if (peraWallet.isConnected && accounts.length) {
        setAccount({ account: accounts[0] });
      }
    });
  }, []);

  const handleConnect = () => {
    setWalletTypeModal(true);
  };

  const connectWithMyalgo = async () => {
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

  const connectWithPera = () => {
    peraWallet
      .connect()
      .then((newAccounts) => {
        // Setup the disconnect event listener
        peraWallet.connector?.on("disconnect", disconnect);

        setAccount({
          address: newAccounts[0],
        });
      })
      .catch((error) => {
        // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
        // For the async/await syntax you MUST use try/catch
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          // log the necessary errors
          console.log("modal closed");
        }
      });
  };
  const disconnect = () => {
    peraWallet?.disconnect();
    setAccount(null);
    setWalletTypeModal(false);
  };

  return account ? (
    <Home
      account={account}
      disconnect={disconnect}
      myAlgoConnect={myAlgoConnectRef.current}
    />
  ) : (
    <>
      <ConnectWallet handleConnect={handleConnect} />
      {walletTypeModal && (
        <WalletTypeModal
          connectWithMyalgo={connectWithMyalgo}
          connectWithPera={connectWithPera}
          handleClose={() => setWalletTypeModal(false)}
        />
      )}
    </>
  );
}

export default App;
