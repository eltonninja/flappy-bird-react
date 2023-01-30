import styled from "styled-components";
import colors from "../values/colors";
import { Button } from "./lib";
import { FaRegCopy } from "react-icons/fa";
import SvgAlgoIcon from "../assets/AlgoIcon";

export function Header({
  account,
  balance,
  isLoadingBalance,
  lastGame,
  isLoadingLastGame,
  purchase,
  disconnect,
}) {
  console.log(lastGame);
  return (
    <Wrapper>
      <NameText>{account.name}</NameText>
      <AddressText>
        {account.address}
        <FaRegCopy title={account.address} />
      </AddressText>
      {isLoadingLastGame ||
        (lastGame["score4"] > -1 ? (
          <>
            {isLoadingBalance || (
              <BalanceText>
                {balance}{" "}
                <AlgoIcon width={24} height={24} fill={colors.orange} />
              </BalanceText>
            )}
            <SendButton onClick={purchase} isLoadingBalance={isLoadingBalance}>
              Purchase
            </SendButton>
            <DisconnectButton onClick={disconnect}>Disconnect</DisconnectButton>
          </>
        ) : lastGame["score3"] > -1 ? (
          <RoundLeftText>1 round left</RoundLeftText>
        ) : lastGame["score2"] > -1 ? (
          <RoundLeftText>2 rounds left</RoundLeftText>
        ) : lastGame["score1"] > -1 ? (
          <RoundLeftText>3 rounds left</RoundLeftText>
        ) : (
          <RoundLeftText>4 rounds left</RoundLeftText>
        ))}
    </Wrapper>
  );
}

const Wrapper = styled.header({
  display: "flex",
  padding: 10,
  alignItems: "center",
});

const NameText = styled.p({
  fontSize: 24,
  textTransform: "uppercase",
  fontWeight: 900,
  color: colors.orange,
});

const AddressText = styled.p({
  fontSize: 13,
  color: colors.orange,
  marginLeft: 10,
  display: "flex",
  alignItems: "center",
  "& > svg": {
    marginLeft: 5,
    cursor: "pointer",
  },
});

const BalanceText = styled.p({
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  fontSize: 24,
  fontWeight: 900,
  color: colors.orange,
  "& > img": {
    marginLeft: 5,
  },
});

const AlgoIcon = styled(SvgAlgoIcon)({
  marginLeft: 3,
});

const SendButton = styled(Button)({
  marginLeft: ({ isLoadingBalance }) => (isLoadingBalance ? "auto" : "20px"),
});
const DisconnectButton = styled(Button)({
  color: colors.orange,
  marginLeft: 5,
  "&:hover": {
    color: colors.white,
  },
});
DisconnectButton.defaultProps = {
  variant: "text",
};

const RoundLeftText = styled.p({
  marginLeft: "auto",
  color: colors.orange,
  fontSize: 20,
  fontWeight: 900,
  textTransform: "uppercase",
});
