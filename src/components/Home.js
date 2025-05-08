import React from "react";
import ReactApexChart from "react-apexcharts";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const lineChartOptions = {
    chart: {
      type: "line",
    },
    xaxis: {
      categories: ["January", "February", "March", "April", "May", "June"],
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#4CAF50"], // Updated color for better visibility
  };

  const lineChartSeries = [
    {
      name: "Dataset",
      data: [0, 5, 10, 15, 20, 25],
    },
  ];

  const donutChartOptions = {
    chart: {
      type: "donut",
    },
    labels: ["January", "February", "March", "April", "May", "June"],
    colors: ["#FF5733", "#33FF57", "#3357FF", "#FFC300", "#DAF7A6", "#C70039"], // Updated colors
    legend: {
      position: "bottom",
    },
    tooltip: {
      enabled: true,
    },
  };

  const donutChartSeries = [10, 20, 30, 10, 20, 10];

  return (
    <div className="container mt-4">
      {/* Cards Section */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center stats-card">
            <h5 className="card-icon">$</h5>
            <p className="card-text">Revenue</p>
            <h3 className="card-value">1234</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center stats-card">
            <h5 className="card-icon">*</h5>
            <p className="card-text">Users</p>
            <h3 className="card-value">5678</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center stats-card">
            <h5 className="card-icon">@</h5>
            <p className="card-text">Orders</p>
            <h3 className="card-value">9123</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center stats-card">
            <h5 className="card-icon">&</h5>
            <p className="card-text">Feedback</p>
            <h3 className="card-value">4567</h3>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row">
        <div className="col-md-6">
          <div className="card chart-card">
            <h5 className="card-title text-center">Line Chart</h5>
            <ReactApexChart
              options={lineChartOptions}
              series={lineChartSeries}
              type="line"
              height={350}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card chart-card">
            <h5 className="card-title text-center">Donut Chart</h5>
            <ReactApexChart
              options={donutChartOptions}
              series={donutChartSeries}
              type="donut"
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;