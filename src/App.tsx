import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import SeatSelectionPage from "@/pages/SeatSelectionPage";
import EntryGuidePage from "@/pages/EntryGuidePage";
import InteractionPage from "@/pages/InteractionPage";
import RemindersPage from "@/pages/RemindersPage";
import BigScreenPage from "@/pages/BigScreenPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/seats" element={<SeatSelectionPage />} />
        <Route path="/guide" element={<EntryGuidePage />} />
        <Route path="/interaction" element={<InteractionPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/screen" element={<BigScreenPage />} />
      </Routes>
    </Router>
  );
}
