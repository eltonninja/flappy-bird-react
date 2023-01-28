import { useEffect } from "react";
import styled from "styled-components";
import colors from "../../values/colors";
import { initializeGame } from "./game";

export function Game({ address, className }) {
  useEffect(() => {
    const { game, socket } = initializeGame({
      beforeStart: async () =>
        new Promise((resolve) => setTimeout(() => resolve(true), 0)),
      afterFinished: async (score) => {},
      address,
    });
    return () => {
      game.canvas.remove();
      game.destroy();
      socket.disconnect();
    };
  }, [address]);

  return <Wrapper id="game" className={className}></Wrapper>;
}

const Wrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  outline: `2px solid ${colors.darkOrange2}`,
  "& > canvas": {
    width: "100%",
  },
});
