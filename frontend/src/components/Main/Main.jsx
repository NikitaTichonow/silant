import React, { useEffect, useState } from "react";
import { API_URL_USERS } from "../../api/api_user";

function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL_USERS) 
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
            <li key={item.id}>{item.username}</li> 
          ))}
        </ul>
      </div>
    </main>
  );
}

export { Main };
