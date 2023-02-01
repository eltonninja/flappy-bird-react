import { useState } from "react";
import styled from "styled-components";
import { formatWalletAddress } from "../utils";
import colors from "../values/colors";
import { Panel, PanelHead, PanelBody, PanelFooter } from "./Panel";
import Checkbox from "react-custom-checkbox";
import { FaCheck, FaRegCopy } from "react-icons/fa";
import { Button } from "./lib";
import { useLeaderBoard } from "../hooks";

export function LeaderBoard({ wallet, className }) {
  const [page, setPage] = useState(1);
  const [onlyMe, setOnlyMe] = useState(false);
  const { data } = useLeaderBoard(page, onlyMe ? wallet : "");

  const handleNext = () => {
    if (!data) return;
    if (page === data.total) return;
    setPage(page + 1);
  };

  const handlePrev = () => {
    if (!data) return;
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleFirst = () => {
    if (!data) return;
    setPage(1);
  };

  const handleLast = () => {
    if (!data) return;
    setPage(data.total);
  };

  return (
    <Panel className={className}>
      <PanelHead>Leader Board</PanelHead>
      <PanelBody>
        {wallet && (
          <CheckboxWrapper>
            <Checkbox
              checked={onlyMe}
              icon={<FaCheck color={colors.orange} />}
              borderColor={colors.orange}
              size={18}
              label="Show me only"
              labelStyle={{
                color: colors.orange,
                marginLeft: 10,
                cursor: "pointer",
              }}
              onChange={(value) => setOnlyMe(value)}
            />
          </CheckboxWrapper>
        )}
        {data && (
          <ScoreList>
            {data.games.map((game, i) => (
              <ScoreItem key={game.id}>
                <ScoreItemRank>{`#${(page - 1) * 20 + i + 1}`}</ScoreItemRank>
                <ScoreItemScore>{game.score}</ScoreItemScore>
                <ScoreItemAddress>
                  {formatWalletAddress(game.player_wallet)}
                  <CopyIcon title={game.player_wallet} />
                </ScoreItemAddress>
              </ScoreItem>
            ))}
          </ScoreList>
        )}
      </PanelBody>
      <StyledPanelFooter>
        <Button variant="text" size="small" onClick={handleFirst}>
          First
        </Button>
        <Button variant="text" size="small" onClick={handlePrev}>
          Prev
        </Button>
        <PageText
          style={{
            marginLeft: "auto",
          }}
        >
          Page {page} / {data?.total}
        </PageText>
        <Button
          variant="text"
          size="small"
          style={{
            marginLeft: "auto",
          }}
          onClick={handleNext}
        >
          Next
        </Button>
        <Button variant="text" size="small" onClick={handleLast}>
          Last
        </Button>
      </StyledPanelFooter>
    </Panel>
  );
}

const ScoreList = styled.ul({
  listStyle: "none",
  padding: 0,
  margin: 0,
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
  marginBottom: 10,
});
