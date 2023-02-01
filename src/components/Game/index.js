import { useEffect } from "react";
import styled from "styled-components";
import colors from "../../values/colors";
import { initializeGame } from "./game";

export function Game({ address, handleAfterFinished, disabled, className }) {
  useEffect(() => {
    const { game, socket } = initializeGame({
      afterFinished: handleAfterFinished,
      disabled,
      address,
    });
    return () => {
      game.canvas.remove();
      game.destroy();
      socket?.disconnect();
    };
  }, [address, disabled, handleAfterFinished]);

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
