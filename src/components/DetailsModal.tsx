import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";
import { Horse } from "../types/definitions";
import Details from "./Details";

interface HorseDetailProps {
  horse: Horse | undefined;
  onClose: () => void;
}

const HorseDetail: React.FC<HorseDetailProps> = ({ horse, onClose }) => {
  if (!horse) return null;

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Horse Name: {horse.name}</DialogTitle>
      <Divider />
      <DialogContent
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: "column",
          minWidth: "500px",
        }}
      >
        <Details horse={horse} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HorseDetail;
