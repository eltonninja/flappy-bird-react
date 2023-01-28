import { useState } from "react";
import styled from "styled-components";
import { formatWalletAddress } from "../utils";
import colors from "../values/colors";
import { Panel, PanelHead, PanelBody, PanelFooter } from "./Panel";
import Checkbox from "react-custom-checkbox";
import { FaCheck, FaRegCopy } from "react-icons/fa";
import { Button } from "./lib";

export function LeaderBoard({ className }) {
  const [games, setGames] = useState([
    {
      wallet: "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH4",
      score: 1130,
    },
    {
      wallet: "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJU",
      score: 854,
    },
    {
      wallet: "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH4",
      score: 760,
    },
    {
      wallet: "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJU",
      score: 490,
    },
    {
      wallet: "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH4",
      score: 389,
    },
    {
      wallet: "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJU",
      score: 386,
    },
    {
      wallet: "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH4",
      score: 270,
    },
    {
      wallet: "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJU",
      score: 240,
    },
    {
      wallet: "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH4",
      score: 211,
    },
    {
      wallet: "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJU",
      score: 192,
    },
    {
      wallet: "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH4",
      score: 187,
    },
    {
      wallet: "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJU",
      score: 154,
    },
    {
      wallet: "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH4",
      score: 133,
    },
    {
      wallet: "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJU",
      score: 122,
    },
    {
      wallet: "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH4",
      score: 121,
    },
    {
      wallet: "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJU",
      score: 120,
    },
    {
      wallet: "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH4",
      score: 101,
    },
    {
      wallet: "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJU",
      score: 99,
    },
    {
      wallet: "TKUY27ZHDWQJNCUAGLTBH735INOOEGIZHBO2QUWMGMAUWYZ6O5OZM5OHH4",
      score: 96,
    },
    {
      wallet: "UGWVE6DWK6UOPSJFSFIMYOWFD5ZK6U56CGWDXOVPS6A5P4HPEUWLZKPCJU",
      score: 95,
    },
  ]);
  const [offset, setOffset] = useState(1);

  return (
    <Panel className={className}>
      <PanelHead>Leader Board</PanelHead>
      <PanelBody>
        <CheckboxWrapper>
          <Checkbox
            checked={false}
            icon={<FaCheck color={colors.orange} />}
            borderColor={colors.orange}
            size={18}
            label="Show me only"
            labelStyle={{
              color: colors.orange,
              marginLeft: 10,
              cursor: "pointer",
            }}
          />
        </CheckboxWrapper>
        <ScoreList>
          {games.map((game, i) => (
            <ScoreItem>
              <ScoreItemRank>{`#${offset + i}`}</ScoreItemRank>
              <ScoreItemScore>{game.score}</ScoreItemScore>
              <ScoreItemAddress>
                {formatWalletAddress(game.wallet)}
                <CopyIcon title={game.wallet} />
              </ScoreItemAddress>
            </ScoreItem>
          ))}
        </ScoreList>
      </PanelBody>
      <StyledPanelFooter>
        <Button variant="text" size="small">
          First
        </Button>
        <Button variant="text" size="small">
          Prev
        </Button>
        <PageText
          style={{
            marginLeft: "auto",
          }}
        >
          Page 1 / 156
        </PageText>
        <Button
          variant="text"
          size="small"
          style={{
            marginLeft: "auto",
          }}
        >
          Next
        </Button>
        <Button variant="text" size="small">
          Last
        </Button>
      </StyledPanelFooter>
    </Panel>
  );
}

const ScoreList = styled.ul({
  listStyle: "none",
  padding: 0,
});

const ScoreItem = styled.li({
  color: colors.orange,
  display: "flex",
  alignItems: "center",
  fontSize: 16,
});

const ScoreItemRank = styled.p({
  width: 40,
  textAlign: "right",
});
const ScoreItemScore = styled.p({
  marginLeft: 30,
  flexGrow: 1,
  textAlign: "right",
  fontSize: "1.2em",
  fontWeight: 700,
});
const ScoreItemAddress = styled.p({
  fontFamily: "monospace",
  fontSize: "1.2em",
  display: "flex",
  alignItems: "center",
  marginLeft: 30,
});

const CopyIcon = styled(FaRegCopy)({
  marginLeft: 10,
  cursor: "pointer",
});

const StyledPanelFooter = styled(PanelFooter)({
  display: "flex",
});

const PageText = styled.p({
  fontWeight: 700,
});

const CheckboxWrapper = styled.div({
  display: "flex",
  justifyContent: "left",
  paddingLeft: 10,
});
