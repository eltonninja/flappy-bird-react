import { useEffect } from "react";
import styled from "styled-components";
import colors from "../../values/colors";
import { initializeGame } from "./game";

export function Game({ address, className, handleAfterFinished }) {
  useEffect(() => {
    const { game, socket } = initializeGame({
      beforeStart: async () => {
        return true;
      },
      afterFinished: handleAfterFinished,
      address,
    });
    return () => {
      game.canvas.remove();
      game.destroy();
      socket.disconnect();
    };
  }, [address, handleAfterFinished]);

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
