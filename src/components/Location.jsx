/* eslint-disable no-unused-vars */
import { React, useState, useEffect, useContext } from "react";

import { InstaContext } from "./context/Context";

const Location = () => {
  const { setLocation } = useContext(InstaContext);
  const [canUse, setCanUse] = useState(false);
  
 /*  const [error, setError] = useState(""); */

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCanUse(true);
         lookupPosition(pos.coords.latitude,pos.coords.longitude);

      });
    } else {
      window.alert("Location access blocked");
      setLocation("UnKnown Location")
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function lookupPosition(lat, long) {

    try {

      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=0a1e32d1abf24016a555832a09f60a47`
      );
  
      const data = await response.json();
  
      let city = (data.features[0].properties.city);
      console.log(city)
  
      if (!city) {
        console.log("Try again!");
        setLocation("UnKnown Location");
      } else {
        
        setLocation(city);
      }
    } catch (error) {
      
      setLocation("UnKnown Location");
    }
  
    }
    
  
  return <div></div>;
};

export default Location;
