import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const detailContext = createContext();

const Details = ({ children }) => {
  const [details, setDetails] = useState([]);

  const fetchDetails = async () => {
    const res = await axios("https://new-employee-crud.onrender.com");

    setDetails(res.data);
  };

  console.log(details);

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <detailContext.Provider value={{ details, setDetails }}>
      {children}
    </detailContext.Provider>
  );
};

export default Details;
