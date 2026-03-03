import { Routes, Route } from "react-router-dom";  // ✅ Remove BrowserRouter import
import { ProfileProvider } from "./context/ProfileContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PersonalInfo from "./pages/PersonalInfo";
import Onboarding from "./pages/Onboarding";
import ResumeUpload from "./pages/ResumeUpload";
import ResumeAnalyze from "./pages/ResumeAnalyze";
import Templates from "./pages/Templates";
import ResumePreview from "./pages/ResumePreview";

function App() {
  return (
    <ProfileProvider>
      {/* ✅ No BrowserRouter here */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/personalinfo" element={<PersonalInfo />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/resume-upload" element={<ResumeUpload />} />
        <Route path="/analyze" element={<ResumeAnalyze />} />
        <Route path="/resume-preview" element={<ResumePreview />} />
      </Routes>
    </ProfileProvider>
  );
}

export default App;