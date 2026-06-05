import React from "react";
import { Button } from "./PrimaryButton.style";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function PrimaryButton({ children, onClick, type = "button" }) {
  return (
    <Button type={type} onClick={onClick}>
      {children}
      <ArrowForwardIcon fontSize="small" />
    </Button>
  );
}

export default PrimaryButton;
