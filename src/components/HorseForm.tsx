import { ChangeEvent, FormEvent } from "react";
import { EditHorse } from "../types/definitions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const FormFields = [
  { label: "Horse Name", name: "name", required: true },
  { label: "Favourite Food", name: "favouriteFood" },
  { label: "Height (cm)", name: "height" },
  { label: "Weight (kg)", name: "weight" },
];

interface IProps {
  formHeader: "Save" | "Create";
  form: EditHorse;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const HorseForm = ({
  form,
  formHeader,
  onSubmit,
  onReset,
  onChange,
}: IProps) => {
  return (
    <form onSubmit={onSubmit}>
      {FormFields.map((field) => (
        <TextField
          fullWidth
          margin="normal"
          key={field.name}
          name={field.name}
          value={form[field.name as keyof EditHorse]}
          required={field.required ?? false}
          onChange={onChange}
          label={field.label}
        />
      ))}
      <Button variant="contained" color="primary" type="submit" sx={{ m: 3 }}>
        {formHeader}
      </Button>
      <Button variant="contained" color="secondary" onClick={onReset}>
        Cancel
      </Button>
    </form>
  );
};
export default HorseForm;
