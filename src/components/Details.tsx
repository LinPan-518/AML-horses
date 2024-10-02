import { Typography, Box } from "@mui/material";
import { Horse } from "../types/definitions";

export default function Details({ horse }: { horse: Horse }) {
  return (
    <>
      {[
        { label: "Name", value: horse?.name },
        { label: "Favourite Food", value: horse?.profile?.favouriteFood },
        {
          label: "Height (kg)",
          value: horse?.profile?.physical?.height,
        },
        {
          label: "Weight (cm)",
          value: horse?.profile?.physical?.weight,
        },
      ].map((item) => (
        <Box key={item.label} display="flex" justifyContent="space-between">
          <Typography sx={{ fontWeight: "bold" }}>{item.label}:</Typography>
          <Typography>{item.value ?? ""}</Typography>
        </Box>
      ))}
    </>
  );
}
