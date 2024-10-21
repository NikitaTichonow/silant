import React, { useEffect, useState } from "react";
import { API_URL_DATACAR } from "../api/api_car";


function TechnicalData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL_DATACAR)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container content">
      <table className="centered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Item Name</th>
            <th>Item Price</th>
            <th>Item Price</th>
            <th>Item Price</th>
            <th>Item Price</th>
            <th>Item Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => (
            <tr key={data.id}>
              <td>{data.serialNumberCar}</td>
              <td>{data.vehicleModel.name}</td>
              <td>{data.serialNumberDriveAxle}</td>
              <td>{data.serialNumberTransmission}</td>
              <td>{data.steeringAxleModel.name}</td>
              <td>{data.supplyContract}</td>
              <td>{data.transmissionModel.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <>
        
      </>
    </main>
  );
}

export { TechnicalData };