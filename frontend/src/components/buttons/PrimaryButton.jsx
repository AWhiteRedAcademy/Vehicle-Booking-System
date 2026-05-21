import React from "react";
import { Button } from "./PrimaryButton.style";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function PrimaryButton({ children, onClick }) {
  return (
    <Button onClick={onClick}>
      {children}
      <ArrowForwardIcon fontSize="small" />
    </Button>
  );
}

export default PrimaryButton;
