import styled from "styled-components";
import colors from "../values/colors";
import { Button } from "./lib";
import {
  FaExclamationTriangle,
  FaRegCopy,
  FaPowerOff,
  FaCartPlus,
} from "react-icons/fa";
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
        <DisconnectIconButton
          onClick={disconnect}
          style={{ width: "100%", justifyContent: "right" }}
        >
          <FaPowerOff size={20} />
        </DisconnectIconButton>
      )}
      {!isLoadingLastGame && (
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
              <PurchaseIconButton
                onClick={purchase}
                style={{
                  marginLeft: isLoadingBalance ? "auto" : "10px",
                }}
              >
                <FaCartPlus size={20} />
              </PurchaseIconButton>
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
          <DisconnectIconButton onClick={disconnect}>
            <FaPowerOff size={20} />
          </DisconnectIconButton>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.header({
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  padding: 10,
  alignItems: "center",
  width: "100%",
  gap: "6px 0",
});

const NameText = styled.p({
  fontSize: 24,
  textTransform: "uppercase",
  fontWeight: 900,
  color: colors.orange,
  order: 1,
  "@media (min-width: 1024px)": {
    fontSize: 24,
  },
});

const AddressText = styled.p({
  fontSize: 13,
  color: colors.orange,
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  order: 2,
  "& > svg": {
    marginLeft: 5,
    cursor: "pointer",
  },
  "@media (min-width: 1024px)": {
    marginLeft: 10,
  },
});

const BalanceText = styled.p({
  display: "flex",
  marginLeft: "auto",
  alignItems: "center",
  fontSize: 20,
  fontWeight: 700,
  color: colors.orange,
  order: 4,
  "& > img": {
    marginLeft: 5,
  },
  "@media (min-width: 1024px)": {
    marginLeft: 12,
    order: 3,
  },
});

const AlgoIcon = styled(SvgAlgoIcon)({
  marginLeft: 3,
});

const Scores = styled.p({
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
  gap: 20,
  order: 3,
  "@media (min-width: 1024px)": {
    position: "absolute",
    transform: "translateX(-50%)",
    left: "50%",
    order: 4,
  },
});

const Score = ({ value, className }) => {
  return <span className={className}>{value === -1 ? "" : value}</span>;
};

const StyledScore = styled(Score)({
  position: "relative",
  color: colors.orange,
  paddingLeft: 12,
  fontSize: 18,
  fontWeight: 900,
  "&:before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: 6,
    height: 6,
    border: `1px solid ${colors.orange}`,
    borderRadius: "100%",
    background: ({ value }) => (value === -1 ? colors.white : colors.orange),
  },
  "@media (min-width: 1024px)": {
    paddingLeft: 15,
    fontSize: 24,
    fontWeight: 900,
    "&:before": {
      width: 8,
      height: 8,
    },
  },
});

const IconButton = styled.button({
  border: "none",
  margin: 0,
  padding: 0,
  background: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: colors.orange,
  "@media (min-width: 1024px)": {
    display: "none",
  },
});

const PurchaseButton = styled(Button)({
  alignItems: "center",
  marginLeft: "auto",
  "& > svg": {
    marginRight: 5,
  },
  display: "none",
  order: 5,
  "@media (min-width: 1024px)": {
    display: "flex",
  },
});

const PurchasedButton = styled(Button)({
  color: colors.orange,
  marginLeft: ({ isLoadingBalance }) => (isLoadingBalance ? "auto" : "20px"),
  "&:hover": {
    color: colors.white,
  },
  display: "none",
  "@media (min-width: 1024px)": {
    display: "flex",
  },
  order: 5,
});

const DisconnectButton = styled(Button)({
  color: colors.orange,
  marginLeft: 5,
  "&:hover": {
    color: colors.white,
  },
  display: "none",
  "@media (min-width: 1024px)": {
    display: "flex",
  },
  order: 6,
});
DisconnectButton.defaultProps = {
  variant: "text",
};

const PurchaseIconButton = styled(IconButton)({
  marginLeft: 10,
  order: 5,
});

const DisconnectIconButton = styled(IconButton)({
  marginLeft: 10,
  order: 6,
});
