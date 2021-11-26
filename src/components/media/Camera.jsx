/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { InstaContext } from "../context/Context";
import { FaCameraRetro } from "react-icons/fa";
import {
  RiCameraOffFill,
  RiCameraFill,
  RiCameraSwitchLine,
} from "react-icons/ri";

import { cameraOn, cameraOff } from "../../services/camera";

const Camera = () => {

  const imageRef = useRef(null);

  const { gallery, setGallery, canUseNotification } = useContext(InstaContext);
  const [canUseMd, setCanUseMd] = useState(false);
  const [cameraIsOn, setCameraIsOn] = useState(false);
  const [facing, setFacing] = useState("user");
  const videoRef = useRef(null);
  
  useEffect(() => {
    if("mediaDevices" in navigator){

      setCanUseMd(true)
    }else{
      window.alert("Allow camera to click a picture")
    }
  }, [setCanUseMd]);

  function changeCameraFacing() {
    cameraOff(videoRef.current);
    if (facing === "user") {
      setFacing("environment");
    } else {
      setFacing("user");
    }

    cameraOn(videoRef.current, facing, setCameraIsOn(true));
  }

  function handleCameraToggle() {
    if (cameraIsOn) {
      cameraOff(videoRef.current, setCameraIsOn(false));
    } else {
      cameraOn(videoRef.current, facing, setCameraIsOn(true));
    }
  }

  function takePicture() {
    setTimeout(async function takesPicture() {
      const width = 400;
      const height = 300;
      imageRef.current.width = width;
      imageRef.current.height = height;
      imageRef.current
        .getContext("2d")
        .drawImage(videoRef.current, 0, 0, width,height);

        const newPicTaken = (imageRef.current.toDataURL("image/jpeg"))

      setGallery([...gallery, newPicTaken]);

      if (canUseNotification) {
        new Notification("New Photo", { icon: newPicTaken });
      }

      localStorage.setItem(
        "gallery",
        JSON.stringify([...gallery,newPicTaken])
      );
    }, 3000);
  }
  
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("gallery"))) {
      let newImageArray = JSON.parse(localStorage.getItem("gallery"));
      setGallery(newImageArray);
    }
  }, [setGallery]);

  return (
    <div className="container mx-auto">
      <span className="font-Montserrat font-extrabold text-3xl flex justify-center items-center text-purple-900">
        <h1 className="p-1 m-4">InstaBlam</h1>
        <FaCameraRetro />
      </span>

      {canUseMd ? (
        <video
          ref={videoRef}
          className="container mx-auto w-1/2 h-1/2 bg-gray-400 border-2 border-pink-400"
        ></video>
      ) : null}

      <div className="flex justify-center">
        <button
          className="flex bg-purple-900 text-white border rounded-full border-2 p-1 m-2 w-8 h-8 justify-center "
          onClick={handleCameraToggle}
        >
          {cameraIsOn ? <RiCameraOffFill /> : <RiCameraFill />}
        </button>

        {cameraIsOn ? (
          <button
            className="border-purple-900 w-8 h-8 bg-pink-500 font-Fira border rounded-full border-4 p-1 m-2 text-white hover:animate-pulse"
            onClick={takePicture}
          ></button>
        ) : null}
        {cameraIsOn ? (
          <button
            className="flex bg-purple-900 text-white border rounded-full border-2 p-1 m-2 w-8 h-8 justify-center align-middle "
            onClick={changeCameraFacing}
          >
            <RiCameraSwitchLine />
          </button>
        ) : null}
      </div>
                <canvas className ="hidden" ref={imageRef}></canvas>
      </div>
  );
};

export default Camera;
