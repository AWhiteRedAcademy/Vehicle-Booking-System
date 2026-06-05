import {
  Card,
  CardTop,
  IconBox,
  Content,
  Label,
  Value,
  HelperText,
} from "./StatCard.styles";

function StatCard({ label, value, helperText, icon, tone = "blue" }) {
  return (
    <Card>
      <CardTop>
        <Content>
          <Label>{label}</Label>
          <Value>{value}</Value>
        </Content>

        <IconBox $tone={tone}>{icon}</IconBox>
      </CardTop>

      {helperText && <HelperText>{helperText}</HelperText>}
    </Card>
  );
}

export default StatCard;
