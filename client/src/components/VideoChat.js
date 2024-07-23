import React, { useEffect, useRef, useState } from "react";

const VideoChat = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null); // This line defines the peerConnection
  const [stream, setStream] = useState(null);
  const [isAudioMuted, setAudioMuted] = useState(false);
  const [isVideoStopped, setVideoStopped] = useState(false);

  useEffect(() => {
    const startVideoChat = async () => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideoRef.current.srcObject = mediaStream;
      setStream(mediaStream);

      const configuration = {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      };
      peerConnection.current = new RTCPeerConnection(configuration); // This initializes the peerConnection

      mediaStream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, mediaStream);
      });

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("ICE candidate:", event.candidate);
        }
      };

      peerConnection.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      console.log("Offer:", offer);
    };

    startVideoChat();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, []);

  const toggleMuteAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setAudioMuted(!isAudioMuted);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setVideoStopped(!isVideoStopped);
    }
  };

  return (
    <div className="w-full mx-auto p-5">
      <div className="flex justify-center min-h-screen">
        <h2>Video Chat</h2>
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          style={{ width: "300px" }}
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          style={{ width: "300px" }}
        />
        <button onClick={toggleMuteAudio}>
          {isAudioMuted ? "Unmute" : "Mute"}
        </button>
        <button onClick={toggleVideo}>
          {isVideoStopped ? "Start Video" : "Stop Video"}
        </button>
      </div>
    </div>
  );
};

export default VideoChat;
