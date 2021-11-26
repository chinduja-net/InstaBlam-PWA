import { createContext, useState } from "react";

import Image1 from './Image1.jpg'
import Image2 from './Image2.jpg'
 


export const InstaContext = createContext();

export default function Instaprovider(props) {
  const [gallery, setGallery] = useState([Image1, Image2]);
  const [location, setLocation] = useState("UnKnown Location");
  const [canUseNotification, setCanUseNotification] = useState(false) 

  return (
    <InstaContext.Provider
      value={{ setGallery, gallery, location, setLocation,canUseNotification,setCanUseNotification}}
    >
      {props.children}
    </InstaContext.Provider>
  );
}
