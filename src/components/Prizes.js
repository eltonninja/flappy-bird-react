import styled from "styled-components";
import { Panel, PanelHead, PanelBody } from "./Panel";
import { FaRegCopy } from "react-icons/fa";
import prizeRates from "../values/prizeRates";
import colors from "../values/colors";
import SvgAlgoIcon from "../assets/AlgoIcon";
import { formatNumber, formatWalletAddress } from "../utils";

export function Prizes({ prizeWallet, prizeAlgo, top10Wallets, className }) {
  return (
    <Panel className={className}>
      <PanelHead>
        Prizes{" "}
        <WalletText>
          {formatWalletAddress(prizeWallet)}
          <FaRegCopy title={prizeWallet} />
        </WalletText>
      </PanelHead>
      <StyledPanelBody>
        <TimeLeftText>
          Competition Ends <span>7d 3h 31m 14s</span>
        </TimeLeftText>
        <PrizeList>
          {top10Wallets.map((wallet, i) => (
            <PrizeItem key={wallet}>
              <PrizeItemRank>#{i + 1}</PrizeItemRank>
              <PrizeItemWallet>{formatWalletAddress(wallet)}</PrizeItemWallet>
              <CopyIcon title={wallet} />
              <PrizeItemValue>
                {formatNumber(Math.round(prizeAlgo * prizeRates[i]))}
                <AlgoIcon width={20} height={20} fill={colors.orange} />
              </PrizeItemValue>{" "}
            </PrizeItem>
          ))}
        </PrizeList>
      </StyledPanelBody>
    </Panel>
  );
}

const StyledPanelBody = styled(PanelBody)({
  textAlign: "center",
});

const WalletText = styled.span({
  fontSize: "0.5em",
  fontWeight: "normal",
  display: "inline-flex",
  alignItems: "center",
  marginLeft: 5,
  "& > svg": {
    marginLeft: 5,
    cursor: "pointer",
  },
});

const TimeLeftText = styled.p({
  color: colors.orange,
  fontSize: 20,
  "& > span": {
    fontSize: "1.2em",
    fontWeight: "bold",
  },
});

const PrizeList = styled.ul({
  listStyle: "none",
  marginLeft: "auto",
  marginRight: "auto",
  padding: 0,
});

const PrizeItem = styled.li({
  display: "flex",
  alignItems: "center",
  color: colors.orange,
  fontSize: 20,
  "& > span": {
    fontSize: "1.2em",
  },
});

const PrizeItemRank = styled.p({
  textAlign: "right",
  width: 35,
  marginRight: 10,
});

const PrizeItemWallet = styled.p({
  marginLeft: 10,
  fontFamily: "monospace",
  "& > span": {
    fontFamily: "initial",
  },
});

const PrizeItemValue = styled.p({
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
  fontWeight: 700,
  fontSize: "1.2em",
});

const AlgoIcon = styled(SvgAlgoIcon)({
  marginLeft: 3,
});

const CopyIcon = styled(FaRegCopy)({
  marginLeft: 15,
  cursor: "pointer",
});
