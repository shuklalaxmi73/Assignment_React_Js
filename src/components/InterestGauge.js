import React from "react";
import GaugeChart from "react-gauge-chart";

const InterestGauge = ({ data }) => {
 
  const filteredData = data.filter(item => item.interest_level !== null);
  
  
  const averageInterest =
    filteredData.reduce((sum, item) => sum + item.interest_level, 0) / filteredData.length;

  
  const averageInterestPercentage = Math.round(averageInterest * 100);

  return (
    <div>
      <h2>Interest Level</h2>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
       </div>
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={10} 
        percent={averageInterestPercentage/100} 
        colors={["#FF5F6D", "#FFC371"]} 
        arcWidth={0.3} 
        textColor="#000000" 
        animate={true}
        style={{ width: "800px", height: "500px", margin: "0 auto" }} 
      />
    </div>
  );
};

export default InterestGauge;
