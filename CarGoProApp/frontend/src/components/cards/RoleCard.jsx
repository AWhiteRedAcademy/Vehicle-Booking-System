import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Card,
  IconCircle,
  Title,
  Description,
  SelectedIcon,
} from "./RoleCard.styles";

function RoleCard({ title, description, icon, selected, onClick }) {
  return (
    <Card $selected={selected} onClick={onClick}>
      {selected && (
        <SelectedIcon>
          <CheckCircleIcon fontSize="small" />
        </SelectedIcon>
      )}

      <IconCircle>{icon}</IconCircle>

      <Title>{title}</Title>

      <Description>{description}</Description>
    </Card>
  );
}

export default RoleCard;