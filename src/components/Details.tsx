import { Typography } from "@mui/material";
import { Horse } from "../types/definitions";

export default function Details({ horse }: { horse: Horse }) {
  return (
    <>
      <Typography variant="body1">Name: {horse?.name || ""}</Typography>
      <Typography variant="body1">Favourite Food: {horse?.profile?.favouriteFood || ""}</Typography>
      <Typography variant="body1">Height: {horse.profile?.physical?.height || ""} cm</Typography>
      <Typography variant="body1">Weight: {horse.profile?.physical?.weight || ""} kg</Typography>
    </>
  );
}
