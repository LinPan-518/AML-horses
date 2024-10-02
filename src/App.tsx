
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HorseEdit from "./pages/Edit";
import Horses from "./pages/List";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Horses />} />
      <Route path="/add/:id?" element={<HorseEdit />} />
    </Routes>
  );
}

export default App;
