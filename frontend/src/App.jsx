import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PersonalInfo from "./pages/PersonalInfo";
import Onboarding from "./pages/Onboarding";
import ResumeUpload from "./pages/ResumeUpload";
import ResumeAnalyze from "./pages/ResumeAnalyze";




function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/personalinfo" element={<PersonalInfo />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/resume-upload" element={<ResumeUpload />} />
     
<Route path="/analyze" element={<ResumeAnalyze />} />
    </Routes>
  );
}

export default App;
