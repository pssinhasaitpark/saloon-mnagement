import { Routes, Route } from "react-router-dom";
import MainLayout from "./view/layouts/MainLayout";
import { Home, SalonDetails, SalonList, Register } from "./view/pages/index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="salon/:id" element={<SalonDetails />} />
        <Route path="salons" element={<SalonList />} />
      </Route>
    </Routes>
  );
}

export default App;
