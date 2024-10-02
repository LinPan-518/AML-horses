import { Button, ListItem, ListItemText } from "@mui/material";
import { Horse } from "../types/definitions";

const Item = ({
  horse,
  view,
  edit,
  compare,
  ids,
}: {
  horse: Horse;
  view: (id: string) => void;
  edit: (id: string) => void;
  compare: (id: string) => void;
  ids: string[];
}) => {
  return (
    <>
      <ListItem>
        <ListItemText primary={horse.name} sx={{ width: "70%" }} />
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => compare(horse.id)}
          disabled={ids.includes(horse.id) || ids.length >= 2}
        >
          Compare
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ ml: 2, mr: 2 }}
          onClick={() => view(horse.id)}
        >
          View
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => edit(horse.id)}
        >
          Edit
        </Button>
      </ListItem>
    </>
  );
}

export default Item;