export async function cameraOn(videoElement, facing) {
  const constraints = {
    video: { facingMode: facing, width: 400, height: 300 }
  };

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = stream;
    videoElement.play()
  } catch (error) {
    console.log("Could not use camera : ", error.message);
    window.alert(
      "sorry! could not use your camera, Did you give me permission?."
    );
  }
}


export async function cameraOff(videoElement) {
  const tracks = videoElement.srcObject.getTracks()
  tracks.forEach((track) => track.stop())
  videoElement.srcObject = null;
}

