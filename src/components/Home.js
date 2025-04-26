import React from 'react';
import ReactApexChart from 'react-apexcharts';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const lineChartOptions = {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June'],
    },
    stroke: {
      curve: 'smooth',
    },
    colors: ['#000000'], 
  };

  const lineChartSeries = [
    {
      name: 'My First dataset',
      data: [0, 5,10,15,20,25],
    },
  ];

  const donutChartOptions = {
    chart: {
      type: 'donut',
    },
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    colors: ['#000000','#000000','#000000','#000000','#000000','#000000'],  
     legend: {
      position: 'bottom',
    },
    tooltip: {
      enabled: true,
    },


  };

  const donutChartSeries = [10, 20, 30, 10, 20, 10];

  return (
    <div className="container mt-4">
      <div className="row mb-4">
                  <div className="col-md-3">
                        <div className="card text-center">s
                          <h5 className="card-title">$</h5>
                          <p className="card-text">First Component</p>
                          <h3>1234</h3>
                        </div>
                       </div>
        <div className="col-md-3">
          <div className="card text-center">
              <h5 className="card-title">*</h5>
              <p className="card-text">Second Component</p>
              <h3>5678</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
              <h5 className="card-title">@</h5>
              <p className="card-text">Third Component</p>
              <h3>9123</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
              <h5 className="card-title">&</h5>
              <p className="card-text">Fourth Component</p>
              <h3>4567</h3>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6">
          <div className="card">
              <h5 className="card-title text-center">Line Chart</h5>
              <ReactApexChart options={lineChartOptions} series={lineChartSeries} type="line" height={350} />
            </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
              <h5 className="card-title text-center">Donut Chart</h5>
              <ReactApexChart options={donutChartOptions} series={donutChartSeries} type="donut" height={350} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
