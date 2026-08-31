import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../layouts/MainLayout";
import AssetLibrary from "../pages/AssetLibrary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<AssetLibrary />} />
          {/* <Route path="/assets" element={<AssetLibrary />} />
          <Route path="/assets/:id" element={<AssetPreview />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;