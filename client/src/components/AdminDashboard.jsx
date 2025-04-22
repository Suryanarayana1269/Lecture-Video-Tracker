import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [barData, setBarData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/analytics", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch analytics data");
        }

        const data = await response.json();

        setBarData({
          labels: data.barLabels,
          datasets: [
            {
              label: "User Engagement (Hours)",
              data: data.barValues,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        });

        setLineData({
          labels: data.lineLabels,
          datasets: [
            {
              label: "Active Users",
              data: data.lineValues,
              borderColor: "rgba(153, 102, 255, 1)",
              backgroundColor: "rgba(153, 102, 255, 0.2)",
            },
          ],
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Admin Dashboard</h1>
      {error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : (
        <>
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ textAlign: "center" }}>User Engagement (Bar Chart)</h2>
            {barData ? <Bar data={barData} /> : <p>Loading...</p>}
          </div>
          <div>
            <h2 style={{ textAlign: "center" }}>Active Users Over Time (Line Chart)</h2>
            {lineData ? <Line data={lineData} /> : <p>Loading...</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;