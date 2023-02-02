import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Panel, PanelHead, PanelBody } from "./Panel";
import { FaRegCopy } from "react-icons/fa";
import prizeRates from "../values/prizeRates";
import colors from "../values/colors";
import SvgAlgoIcon from "../assets/AlgoIcon";
import { formatNumber, formatTimeSpan, formatWalletAddress } from "../utils";
import { usePrizes } from "../hooks";

export function Prizes({ prizeWallet, className }) {
  const { data, isLoading, isError, erro } = usePrizes();
  const [leftTime, setLeftTime] = useState(0);
  const timerRef = useRef();

  useEffect(() => {
    if (!data?.leftTime) return;
    setLeftTime(data?.leftTime);
    timerRef.current = setInterval(() => {
      setLeftTime((i) => i - 1000);
    }, 1000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [data?.leftTime]);

  return (
    <Panel className={className}>
      <PanelHead>
        Prizes{" "}
        <WalletText>
          {formatWalletAddress(prizeWallet)}
          <FaRegCopy title={prizeWallet} />
        </WalletText>
      </PanelHead>
      {data && (
        <StyledPanelBody>
          <TimeLeftText>
            Competition Ends <span>{formatTimeSpan(leftTime)}</span>
          </TimeLeftText>
          <PrizeList>
            {data.prizes.map(({ wallet, score }, i) => (
              <PrizeItem key={wallet}>
                <PrizeItemRank>#{i + 1}</PrizeItemRank>
                <PrizeItemValue>
                  {formatNumber(Math.round(data.algo * prizeRates[i]))}
                  <AlgoIcon width={20} height={20} fill={colors.orange} />
                </PrizeItemValue>{" "}
                <PrizeItemWallet>{formatWalletAddress(wallet)}</PrizeItemWallet>
                <CopyIcon title={wallet} />
              </PrizeItem>
            ))}
          </PrizeList>
        </StyledPanelBody>
      )}
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
  "& > span": {
    fontSize: "1.2em",
    fontWeight: "bold",
  },
  fontSize: 16,
  "@media (min-width: 1024px)": {
    fontSize: 20,
  },
});

const PrizeList = styled.ul({
  listStyle: "none",
  margin: "6px auto",
  padding: 0,
});

const PrizeItem = styled.li({
  display: "flex",
  alignItems: "center",
  color: colors.orange,
  "& > span": {
    fontSize: "1.2em",
  },
  fontSize: 16,
  "& svg": {
    width: 14,
    height: 14,
  },
  "@media (min-width: 1024px)": {
    fontSize: 20,
    "& svg": {
      width: 14,
      height: 14,
    },
  },
});

const PrizeItemRank = styled.p({
  textAlign: "right",
  width: 25,
  // marginRight: 10,
  "@media (min-width: 1024px)": {
    width: 35,
    marginRight: 10,
  },
});

const PrizeItemWallet = styled.p({
  marginLeft: "auto",
  fontSize: "0.9em",
  "& > span": {
    fontFamily: "initial",
  },
});

const PrizeItemValue = styled.p({
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
  fontWeight: 700,
  fontSize: "1.2em",
  width: 82,
  marginLeft: 3,
  "@media (min-width: 1024px)": {
    width: 100,
    marginLeft: 10,
  },
});

const AlgoIcon = styled(SvgAlgoIcon)({
  marginLeft: 1,
  "@media (min-width: 1024px)": {
    marginLeft: 3,
  },
});

const CopyIcon = styled(FaRegCopy)({
  cursor: "pointer",
  marginLeft: 5,
  "@media (min-width: 1024px)": {
    marginLeft: 10,
  },
});
