import styled from "styled-components";
import colors from "../values/colors";
import { Button } from "./lib";
import { FaExclamationTriangle, FaRegCopy } from "react-icons/fa";
import SvgAlgoIcon from "../assets/AlgoIcon";
import { formatWalletAddress } from "../utils";

export function Header({
  account,
  balance,
  isLoadingBalance,
  lastGame,
  isLoadingLastGame,
  purchase,
  isPurchasing,
  disconnect,
}) {
  const copyPurchaseTx = () => {};

  return (
    <Wrapper>
      <NameText>{account.name}</NameText>
      <AddressText>
        {formatWalletAddress(account.address)}
        <FaRegCopy title={account.address} />
      </AddressText>
      {isLoadingBalance || (
        <BalanceText>
          {balance} <AlgoIcon width={16} height={16} fill={colors.orange} />
        </BalanceText>
      )}
      {isLoadingLastGame && (
        <>
          {lastGame && (
            <Scores>
              <StyledScore value={lastGame["score1"]} />
              <StyledScore value={lastGame["score2"]} />
              <StyledScore value={lastGame["score3"]} />
              <StyledScore value={lastGame["score4"]} />
            </Scores>
          )}
          {!lastGame || lastGame["score4"] > -1 ? (
            <>
              <PurchaseButton
                onClick={purchase}
                disabled={isPurchasing}
                title="You should purchase 4 algo, or your score won't be recorded."
              >
                {isPurchasing || <FaExclamationTriangle />}
                {isPurchasing ? "Purchasing ..." : "Purchase"}
              </PurchaseButton>
            </>
          ) : (
            <PurchasedButton
              onClick={copyPurchaseTx}
              isLoadingBalance={isLoadingBalance}
              disabled={isPurchasing}
              title={lastGame["purchase_tx"]}
              variant="text"
              style={{
                marginLeft: "auto",
              }}
            >
              <FaRegCopy title={lastGame["purchase_tx"]} /> Purchased
            </PurchasedButton>
          )}
          <DisconnectButton onClick={disconnect}>Disconnect</DisconnectButton>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.header({
  position: "relative",
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
  marginLeft: 12,
  display: "flex",
  alignItems: "center",
  fontSize: 20,
  fontWeight: 700,
  color: colors.orange,
  "& > img": {
    marginLeft: 5,
  },
});

const AlgoIcon = styled(SvgAlgoIcon)({
  marginLeft: 3,
});

const PurchaseButton = styled(Button)({
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
  "& > svg": {
    marginRight: 5,
  },
});
const PurchasedButton = styled(Button)({
  color: colors.orange,
  marginLeft: ({ isLoadingBalance }) => (isLoadingBalance ? "auto" : "20px"),
  "&:hover": {
    color: colors.white,
  },
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

const Scores = styled.p({
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  alignItems: "center",
  gap: 20,
});

const Score = ({ value, className }) => {
  return <span className={className}>{value === -1 ? "" : value}</span>;
};

const StyledScore = styled(Score)({
  position: "relative",
  paddingLeft: 15,
  color: colors.orange,
  fontSize: 24,
  fontWeight: 900,
  "&:before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: 8,
    height: 8,
    border: `1px solid ${colors.orange}`,
    borderRadius: "100%",
    background: ({ value }) => (value === -1 ? colors.white : colors.orange),
  },
});
