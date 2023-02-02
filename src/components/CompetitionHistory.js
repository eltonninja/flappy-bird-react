import styled from "styled-components";
import { usePastCompetitions } from "../hooks";
import { Panel, PanelHead, PanelBody, PanelFooter } from "./Panel";
import { formatDate, formatWalletAddress } from "../utils";
import prizeRates from "../values/prizeRates";
import colors from "../values/colors";
import SvgAlgoIcon from "../assets/AlgoIcon";
import { FaRegCopy } from "react-icons/fa";

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
                  {formatDate(competition["start_time"])} ~{" "}
                  {formatDate(competition["end_time"])}
                </CompetitionTime>
                <CompetitionPrizeList>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <CompetitionPrizeItem>
                      <CompetitionPrize>
                        #{i + 1}
                        <span>
                          {competition["algo"] * prizeRates[i]}
                          <AlgoIcon width={20} height={20} />
                        </span>
                      </CompetitionPrize>
                      <CompetitionWallet>
                        {formatWalletAddress(
                          competition[`rank${i + 1}_wallet`]
                        )}
                      </CompetitionWallet>
                      <CopyIcon title={competition[`rank${i + 1}_wallet`]} />
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
  marginBottom: 5,
  borderBottom: `1px solid ${colors.orange}`,
  fontSize: 16,
  "@media (min-width: 1024px)": {
    fontSize: 20,
  },
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
  "& svg": {
    fill: colors.orange,
  },
  width: "100%",
  justifyContent: "space-between",
  "@media (min-width: 1024px)": {
    width: "initial",
  },
});

const CompetitionPrize = styled.p({
  display: "flex",
  alignItems: "center",
  fontWeight: 700,
  fontSize: 18,
  width: 110,
  "& > span": {
    marginLeft: "auto",
  },
  "& svg": {
    width: 14,
    height: 14,
  },
  "@media (min-width: 1024px)": {
    fontSize: 24,
    width: "initial",
    "& svg": {
      width: 20,
      height: 20,
    },
  },
});

const CompetitionWallet = styled.p({
  marginLeft: "auto",
  fontSize: 14,
  "@media (min-width: 1024px)": {
    marginLeft: 10,
    fontSize: 18,
  },
});

const AlgoIcon = styled(SvgAlgoIcon)({
  marginLeft: 3,
});

const CopyIcon = styled(FaRegCopy)({
  cursor: "pointer",
  marginLeft: 5,
  "@media (min-width: 1024px)": {
    marginLeft: 5,
  },
});
