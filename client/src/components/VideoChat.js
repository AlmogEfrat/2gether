import React, { useEffect, useRef, useState } from "react";
import defaultUserImage from "../images/6e9794bcedeecf5a8f8f41338a2a7345.webp";

const VideoChat = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const [stream, setStream] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isAudioMuted, setAudioMuted] = useState(false);
  const [isVideoStopped, setVideoStopped] = useState(false);
  const [pendingCandidates, setPendingCandidates] = useState([]);
  const [remoteStreamAvailable, setRemoteStreamAvailable] = useState(false);

  useEffect(() => {
    const startVideoChat = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localVideoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      } catch (err) {
        console.error("Error accessing media devices:", err);
        // If there's an error getting the stream, we'll just continue without it
      }

      const configuration = {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      };
      peerConnection.current = new RTCPeerConnection(configuration);

      if (stream) {
        stream.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, stream);
        });
      }

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          sendMessage({ type: "ice-candidate", candidate: event.candidate });
        }
      };

      peerConnection.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
        setRemoteStreamAvailable(true);
      };

      const socketInstance = new WebSocket("ws://localhost:8080");
      setSocket(socketInstance);

      socketInstance.onmessage = async (event) => {
        const message = JSON.parse(event.data);

        switch (message.type) {
          case "offer":
            await handleOffer(message.offer);
            break;
          case "answer":
            await handleAnswer(message.answer);
            break;
          case "ice-candidate":
            await handleIceCandidate(message.candidate);
            break;
        }
      };

      socketInstance.onopen = () => {
        createAndSendOffer();
      };
    };

    startVideoChat();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
      if (peerConnection.current) {
        peerConnection.current.close();
      }
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };

  const createAndSendOffer = async () => {
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    sendMessage({ type: "offer", offer });
  };

  const handleOffer = async (offer) => {
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(offer)
    );
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);
    sendMessage({ type: "answer", answer });
  };

  const handleAnswer = async (answer) => {
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
    // Add any pending ICE candidates after the remote description is set
    for (const candidate of pendingCandidates) {
      await peerConnection.current.addIceCandidate(candidate);
    }
    setPendingCandidates([]);
  };

  const handleIceCandidate = async (candidate) => {
    try {
      await peerConnection.current.addIceCandidate(
        new RTCIceCandidate(candidate)
      );
    } catch (e) {
      // If we can't add the candidate immediately, store it for later
      setPendingCandidates((prev) => [...prev, candidate]);
    }
  };

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
        <div>
          <h3>Local Video</h3>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            style={{ width: "300px", height: "225px", objectFit: "cover" }}
          />
        </div>
        <div>
          <h3>Remote Video</h3>
          {remoteStreamAvailable ? (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              style={{ width: "300px", height: "225px", objectFit: "cover" }}
            />
          ) : (
            <img
              src={defaultUserImage}
              alt="Default user"
              style={{ width: "300px", height: "225px", objectFit: "cover" }}
            />
          )}
        </div>
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
