import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

import { addHorse, updateHorseById } from "../services/apiServices";
import { Horse, EditHorse } from "../types/definitions";
import { useNavigate, useParams } from "react-router-dom";
import { getHorseById } from "../services/apiServices";
import Loading from "../components/loading/FormSkeleton";
import HorseForm from "../components/HorseForm";

const initialState: EditHorse = {
  name: "",
  favouriteFood: "",
  weight: "",
  height: "",
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
          const { favouriteFood = "", physical = {} } = data?.profile || {};
          const { weight = "", height = "" } = physical;
          setForm({
            name: data?.name || "",
            favouriteFood,
            weight,
            height,
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
    <>
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "80%",
        }}
      >
        {isAdd ? "Add a New Horse" : `Edit the Horse: ${currentHorse}`}
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <HorseForm
        form={form}
        formHeader={isAdd ? "Create" : "Save"}
        onSubmit={handleFormSubmit}
        onReset={() => navigate("/")}
        onChange={handleInput}
      />
    </>
  );
};

export default AddHorseForm;
