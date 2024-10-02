import { useEffect, useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

import { Horse } from "../types/definitions";
import { getHorses } from "../services/apiServices";
import HorseList from "../components/HorseList";
import Details from "../components/Details";
import Loading from "../components/Loading";
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
    setIds([...ids, id]);
  };

  const removeCompare = (id: string) => {
    setIds((prev) => prev.filter((item) => item !== id));
  };

  if (loading) {
    return <Loading />;
  }

  const compareHorses = horses?.filter((item) => ids.includes(item.id));
  return (
    <Container>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h2">Current Horses:</Typography>
        <Button variant="contained" component={Link} to={"/add"}>
          Add a Horse
        </Button>
      </Container>

      <HorseList horses={horses} handleCompare={handleCompare} ids={ids} />

      {ids.length > 0 && (
        <Container sx={{ mt: 4, mb: 1 }}>
          <Typography variant="h3">Compare</Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {compareHorses.map((horse: Horse) => (
              <StyledBox
                key={horse.id}
              >
                <Details horse={horse} />
                <Button
                  variant="outlined"
                  onClick={() => removeCompare(horse.id)}
                  sx={{ m: 2 }}
                >
                  Remove
                </Button>
              </StyledBox>
            ))}
          </Box>
        </Container>
      )}
    </Container>
  );
}
