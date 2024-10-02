import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
} from "@mui/material";

import { addHorse, updateHorseById } from "../services/apiServices";
import { Horse,EditHorse } from "../types/definitions";
import { useNavigate, useParams } from "react-router-dom";
import { getHorseById } from "../services/apiServices";
import Loading from "../components/Loading";

const initialState: EditHorse = {
  name: "",
  favouriteFood: "",
  weight: 0,
  height: 0,
};

const AddHorseForm: React.FC = () => {
  const [form, setForm] = useState<EditHorse>(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [currentHorse, setCurrentHorse] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsAdd(false);
      const fetchHorses = async () => {
        try {
          setLoading(true);
          const data: Horse = await getHorseById(id);
          setCurrentHorse(data.name);
          setForm({
            name: data.name,
            favouriteFood: data?.profile?.favouriteFood||"",
            weight: data?.profile?.physical?.weight||0,
            height: data?.profile?.physical?.height||0,
          });
        } catch (error) {
          console.error("Error fetching horses:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchHorses();
    }
  }, [id]);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name) {
      setError("Name field is required.");
      return;
    }
    setError("");
    const newHorse: Omit<Horse, "id"> = {
      name: form.name,
      profile: {
        favouriteFood: form.favouriteFood,
        physical: {
          height: Number(form.height),
          weight: Number(form.weight),
        },
      },
    };
    try {
      if (!isAdd && id) {
        await updateHorseById(id, newHorse);
      } else {
        await addHorse(newHorse);
      }
      setForm(initialState);
      navigate("/");
    } catch (error) {
      console.error("Failed to add horse:", error);
      setError("Failed to add horse. Please try again.");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        {isAdd ? "Add a New Horse" : `Edit the Horse: ${currentHorse}`}
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Horse Name"
          fullWidth
          margin="normal"
          value={form.name}
          name={"name"}
          onChange={handleInput}
          required
        />
        <TextField
          label="Favourite Food"
          fullWidth
          margin="normal"
          value={form.favouriteFood}
          name="favouriteFood"
          onChange={handleInput}
        />
        <TextField
          label="Height (cm)"
          fullWidth
          margin="normal"
          value={form.height}
          name="height"
          onChange={handleInput}
          type="number"
        />

        <TextField
          label="Weight (kg)"
          fullWidth
          margin="normal"
          value={form.weight}
          name="weight"
          onChange={handleInput}
          type="number"
        />

        <Button variant="contained" color="primary" type="submit" sx={{ m: 3 }}>
          {isAdd ? "Create" : "Save"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
      </form>
    </Container>
  );
};

export default AddHorseForm;
