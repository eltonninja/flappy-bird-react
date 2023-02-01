import styled from "styled-components";
import { usePastCompetitions } from "../hooks";
import { Panel, PanelHead, PanelBody, PanelFooter } from "./Panel";
import { formatDate, formatWalletAddress } from "../utils";
import prizeRates from "../values/prizeRates";
import colors from "../values/colors";
import SvgAlgoIcon from "../assets/AlgoIcon";

export function CompetitionHistory({ className }) {
  const { data: competitions, isLoading } = usePastCompetitions();

  return (
    <Panel className={className}>
      <PanelHead>Past Competitions</PanelHead>
      <StyledPanelBody>
        {competitions && (
          <CompetitionList>
            {competitions.map((competition) => (
              <CompetitionItem>
                <CompetitionTime>
                  {formatDate(competition["start_time"])} -{" "}
                  {formatDate(competition["end_time"])}
                </CompetitionTime>
                <CompetitionPrizeList>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <CompetitionPrizeItem>
                      <CompetitionPrize>
                        #{i + 1} {competition["algo"] * prizeRates[i]}
                        <AlgoIcon width={20} height={20} />
                      </CompetitionPrize>
                      <CompetitionWallet>
                        {formatWalletAddress(
                          competition[`rank${i + 1}_wallet`]
                        )}
                      </CompetitionWallet>
                    </CompetitionPrizeItem>
                  ))}
                </CompetitionPrizeList>
              </CompetitionItem>
            ))}
          </CompetitionList>
        )}
      </StyledPanelBody>
    </Panel>
  );
}

const StyledPanelBody = styled(PanelBody)({
  minHeight: 200,
});

const CompetitionList = styled.ul({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  margin: 0,
  padding: 0,
  listStyle: "none",
});

const CompetitionItem = styled.li({});

const CompetitionTime = styled.p({
  color: colors.orange,
  fontSize: 20,
  marginBottom: 5,
  borderBottom: `1px solid ${colors.orange}`,
});

const CompetitionPrizeList = styled.ul({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  margin: 0,
  padding: 0,
  listStyle: "none",
  gap: "0px 30px",
});

const CompetitionPrizeItem = styled.li({
  display: "flex",
  alignItems: "center",
  color: colors.orange,
  fontSize: 24,
  "& svg": {
    fill: colors.orange,
  },
});

const CompetitionPrize = styled.p({
  fontSize: 24,
  display: "flex",
  alignItems: "center",
  fontWeight: 700,
});

const CompetitionWallet = styled.p({
  fontSize: 20,
  marginLeft: 10,
});

const AlgoIcon = styled(SvgAlgoIcon)({
  marginLeft: 3,
});
