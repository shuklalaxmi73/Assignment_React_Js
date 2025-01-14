import React from "react";
import "../styles.css";


const formatDate = (date) => {
 
  if (typeof date === "number") {
    const excelDate = new Date((date - 25569) * 86400 * 1000); 
    return excelDate.toLocaleDateString(); 
  }

  
  if (typeof date === "string") {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString(); 
  }

  if (date instanceof Date && !isNaN(date)) {
    return date.toLocaleDateString(); 
  }

  return "Invalid Date"; 
};

const CallDetailsTable = ({ data }) => {
  return (
    <div className="table-container">
      <h2>Call Details</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Call ID</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ 'call id': call_id, Date, Time }) => (
            <tr key={call_id}>
              <td>{call_id}</td>
              <td>{formatDate(Date)}</td> 
              <td>{Time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CallDetailsTable;
