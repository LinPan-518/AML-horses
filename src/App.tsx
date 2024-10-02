import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";

import HorseForm from "./pages/Edit";
import Horses from "./pages/List";
import { GlobalStyle } from "./styles/Global";

function App() {
  return (
    <Container
      sx={{
        minWidth: "800px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Horses />} />
        <Route path="/horse/:id?" element={<HorseForm />} />
      </Routes>
    </Container>
  );
}

export default App;
