import React, { useEffect, useState } from "react";

function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/car/datavehicle") 
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
      <div>
        <h1>Your Model Data</h1>
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li> 
          ))}
        </ul>
      </div>
    </main>
  );
}

export { Main };
