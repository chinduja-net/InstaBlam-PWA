/* eslint-disable no-unused-vars */
import { React, useContext, useEffect, useState} from "react";
import { InstaContext } from "./context/Context";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { MdLocationOn, MdDelete } from "react-icons/md";

const Gallery = () => {
  const { gallery, location, setGallery} = useContext(InstaContext);
  const [date, setDate] = useState(null);


  useEffect(() => {
    let today = new Date();
    let newDate = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate();

    setDate(newDate);
  }, []);

  /* ----Delete Images---- */
  function deleteImageHandler(id) {
    console.log(id);
    const newGalleryArray = gallery.slice(0, id).concat(gallery.slice(id + 1, gallery.length))
    setGallery(newGalleryArray)
    localStorage.setItem('gallery', JSON.stringify(newGalleryArray)); /* update local storage */

  }
 
 return (
    <div className="container mx-auto flex justify-evenly flex-wrap border  
    w-3/4 p-1 m-1">
      {gallery && gallery.map((image, index) => {
        return (
          <section key={index}>
            <img
              className="border border-2 border-pink-400 flex justify-center content-between m-2 hover:scale-75"
              id = "myImage"
              style={{ width: "400px", height: "300px" }}
              src={image}
              alt=""
              
            />
            <div className="font-Fira flex flex-row text-purple-900 justify-evenly items-center">
              <p className="flex items-center text-md justify-evenly">
                <MdLocationOn className = "text-xl" />
                {location} {date}
              </p>
              <a className="flex text-xl hover:animate-bounce" href={image} download>
                <BsFillArrowDownSquareFill />
              </a>
              <button
                className="flex text-xl"
                onClick={() => deleteImageHandler(index)}
              >
              <MdDelete />
              </button>
              
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Gallery;
