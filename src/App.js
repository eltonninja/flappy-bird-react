import { useEffect } from "react";
import { initializeGame } from "./game";
import "./App.css";

function App() {
  useEffect(() => {
    initializeGame({
      onStarted: () => alert("Started"),
      onFinished: (score) => alert(`Finished with score ${score}`),
    });
  }, []);
  return <div id="game"></div>;
}

export default App;
