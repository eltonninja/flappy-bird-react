import styled from "styled-components";
import colors from "../values/colors";
import { Button } from "./lib";
import { FaRegCopy } from "react-icons/fa";
import SvgAlgoIcon from "../assets/AlgoIcon";

export function Header({ account, balance, send }) {
  return (
    <Wrapper>
      <NameText>{account.name}</NameText>
      <AddressText>
        {account.address}
        <FaRegCopy title={account.address} />
      </AddressText>
      <BalanceText>
        {balance} <AlgoIcon width={24} height={24} fill={colors.orange} />
      </BalanceText>
      <SendButton onClick={send}>Send</SendButton>
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
  marginLeft: 20,
});
