import React, { useState } from "react";
import * as XLSX from "xlsx";
import CallDetailsTable from "./components/CallDetailsTable";
import CallScoresChart from "./components/CallScoresChart";
import InterestGauge from "./components/InterestGauge";
import "./styles.css";
const App = () => {
  const [callData, setCallData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      
      console.log("Sheet Data:", sheetData);

      
      const formattedData = sheetData.map((item) => {
        let interestLevel = item.interest_level ? item.interest_level.toString().trim().toUpperCase() : "";

        
        if (interestLevel === "INTERESTED") {
          interestLevel = 1;
        } else if (interestLevel === "NOT INTERESTED") {
          interestLevel = 0;
        } else {
          interestLevel = null; 
        }

        return {
          ...item,
          interest_level: interestLevel,
        };
      });

      console.log("Formatted Data:", formattedData); 
      setCallData(formattedData); 
    };

    reader.readAsBinaryString(file); 
  };

  return (
    <div className="app">
      <h1 >Call Data Visualization</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} /> 
      {callData.length > 0 && (
        <>
          <CallDetailsTable data={callData} /> 
          <CallScoresChart data={callData} /> 
          <InterestGauge data={callData} /> 
        </>
      )}
    </div>
  );
};

export default App;
