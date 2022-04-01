import React from 'react';
import './LiveChat.styles.scss';

export const LiveChat = () => {
  const [stream, setStream] = React.useState<any>(null);

  const myVideoRef = React.useRef<HTMLVideoElement>(null);
  const videoGrid = React.useRef<HTMLDivElement>(null);
  const addVideoStream = (video: any, stream: any) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
      videoGrid.current?.append(video);
    });
  };
  const start = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        addVideoStream(myVideoRef.current, stream);
        setStream(stream);
      });
  };

  const leave = () => {
    if (myVideoRef.current) {
      console.log(stream?.getTracks());
      stream?.getTracks().forEach((track: any) => track.stop());
    }
  };
  return (
    <section className="live">
      <div>
        <button onClick={() => start()}>Join Audio Chat</button>
        <button onClick={() => leave()}>Leave Audio Chat</button>
      </div>

      {/* <div id="#audio" style={{ width: '100%', height: '100%' }}> */}
      {/* <video ref={myVideoRef} autoPlay muted className="local-video" id="local-video"></video> */}
      {/* </div> */}
      {/* <div ref={videoGrid} style={{ width: '100%', height: '100%' }} id="video-grid"></div> */}
    </section>
  );
};
