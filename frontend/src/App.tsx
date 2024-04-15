import { Routes, Route, MemoryRouter } from "react-router";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <MemoryRouter basename="/">
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </MemoryRouter>
  );
}

export default App;
