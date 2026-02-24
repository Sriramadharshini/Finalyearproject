import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h1>Your Career Dashboard</h1>

      <div className="cards">
        <div onClick={() => navigate("/personal-info")}>
          Personal Info
        </div>
        <div>Skill Analysis</div>
        <div>Resume Score</div>
        <div>Job Recommendations</div>
      </div>
    </div>
  );
}

export default Dashboard;
