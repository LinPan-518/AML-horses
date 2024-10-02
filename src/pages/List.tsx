import { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

import { Horse } from "../types/definitions";
import { getHorses } from "../services/apiServices";
import HorseList from "../components/HorseList";
import Details from "../components/Details";
import Loading from "../components/loading/ListSkeleton";
import { StyledBox } from "../components/Box";

export default function Horses() {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchHorses = async () => {
      try {
        setLoading(true);
        const data = await getHorses();
        setHorses(data);
      } catch (error) {
        console.error("Error fetching horses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHorses();
  }, []);

  const handleCompare = (id: string) => {
    if (!ids.includes(id)) {
      setIds((prevIds) => [...prevIds, id]);
    }
  };

  const removeCompare = (id: string) => {
    setIds((prev) => prev.filter((item) => item !== id));
  };

  useEffect(() => {
    if (ids.length > 0) {
      const element = document.getElementById("compare-section");
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }
  }, [ids]);

  if (loading) {
    return <Loading />;
  }

  const compareHorses = horses?.filter((item) => ids.includes(item.id));
  return (
    <>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h2">Current Horses:</Typography>
        <Button variant="contained" component={Link} to={"/horse"}>
          Add a Horse
        </Button>
      </Container>

      <HorseList horses={horses} handleCompare={handleCompare} ids={ids} />

      <Container sx={{ my: 4 }} id={"compare-section"}>
        <Typography variant="h3" gutterBottom>
          Compare Two Horses
        </Typography>
        <Typography variant="h6" gutterBottom>
          You can select two horses above, to compare their details.
        </Typography>

        <StyledBox
          sx={{ mb: "20px", minHeight: "200px", flexDirection: "row" }}
        >
          {ids.length > 0 && (
            <>
              {compareHorses.map((horse: Horse) => (
                <StyledBox key={horse.id} sx={{ flexBasis: "50%" }}>
                  <Details horse={horse} />
                  <Button
                    variant="outlined"
                    onClick={() => removeCompare(horse.id)}
                    sx={{ width: "max-content", alignSelf: "end" }}
                  >
                    Remove
                  </Button>
                </StyledBox>
              ))}
            </>
          )}
        </StyledBox>
      </Container>
    </>
  );
}
