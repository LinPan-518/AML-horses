import { useState } from "react";
import { Button, Container, List } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Horse } from "../types/definitions";
import DetailsDialog from "./DetailsModal";
import { usePagination } from "../hooks/Pagination";
import Item from "./ListItem";
import { ITME_PRE_PAGE } from "../utils/settings";
import { StyledBox} from "./Box";

export default function HorseList({
  horses,
  handleCompare,
  ids,
}: {
  horses: Horse[];
  handleCompare: (id: string) => void;
  ids: string[];
}) {
  const { currentPage, currentItemRange, nextPage, previousPage } =
    usePagination(horses.length, ITME_PRE_PAGE);

  const [selectedId, setSelectedId] = useState("");
  const nevigate = useNavigate();

  const handleEditHorse = (id: string) => {
    nevigate(`/add/${id}`);
  };
  const handleViewDetails = (id: string) => {
    setSelectedId(id);
  };
  
  return (
    <>
      <Container>
        <StyledBox>
          <List>
            {horses
              .slice(currentItemRange.start, currentItemRange.end)
              .map((horse: Horse) => (
                <Item
                  key={horse.id}
                  horse={horse}
                  view={handleViewDetails}
                  edit={handleEditHorse}
                  compare={handleCompare}
                  ids={ids}
                />
              ))}
          </List>
        </StyledBox>
        <Container sx={{ mt: 4 }}>
          <Button
            disabled={currentPage === 0}
            onClick={previousPage}
            variant="contained"
          >
            Previous
          </Button>
          <Button
            disabled={currentItemRange.end >= horses.length}
            onClick={nextPage}
            variant="contained"
            sx={{ ml: 2 }}
          >
            Next
          </Button>
        </Container>
      </Container>

      {selectedId && (
        <DetailsDialog
          horse={horses.find((h: Horse) => h.id === selectedId)}
          onClose={() => {
            setSelectedId("");
          }}
        />
      )}
    </>
  );
}
