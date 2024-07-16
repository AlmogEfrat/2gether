// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";

// const VideoChat = ({ userId, peerId }) => {
//   const [socket, setSocket] = useState(null);
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const peerConnection = useRef(null);

//   useEffect(() => {
//     const newSocket = io("http://localhost:8000");
//     setSocket(newSocket);
//     return () => newSocket.close();
//   }, [setSocket]);

//   useEffect(() => {
//     if (socket) {
//       socket.emit("join", { userId, peerId });

//       socket.on("offer", async (offer) => {
//         if (!peerConnection.current) {
//           setupPeerConnection();
//         }
//         await peerConnection.current.setRemoteDescription(
//           new RTCSessionDescription(offer)
//         );
//         const answer = await peerConnection.current.createAnswer();
//         await peerConnection.current.setLocalDescription(answer);
//         socket.emit("answer", answer);
//       });

//       socket.on("answer", async (answer) => {
//         await peerConnection.current.setRemoteDescription(
//           new RTCSessionDescription(answer)
//         );
//       });

//       socket.on("ice-candidate", async (candidate) => {
//         try {
//           await peerConnection.current.addIceCandidate(
//             new RTCIceCandidate(candidate)
//           );
//         } catch (e) {
//           console.error("Error adding received ice candidate", e);
//         }
//       });
//     }
//   }, [socket]);

//   const setupPeerConnection = () => {
//     peerConnection.current = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });

//     peerConnection.current.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", event.candidate);
//       }
//     };

//     peerConnection.current.ontrack = (event) => {
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localVideoRef.current.srcObject = stream;
//         stream
//           .getTracks()
//           .forEach((track) => peerConnection.current.addTrack(track, stream));
//       });
//   };

//   const callPeer = async () => {
//     if (!peerConnection.current) {
//       setupPeerConnection();
//     }
//     const offer = await peerConnection.current.createOffer();
//     await peerConnection.current.setLocalDescription(offer);
//     socket.emit("offer", offer);
//   };

//   return (
//     <div>
//       <video
//         ref={localVideoRef}
//         autoPlay
//         muted
//         style={{ width: "300px", height: "300px" }}
//       />
//       <video
//         ref={remoteVideoRef}
//         autoPlay
//         style={{ width: "300px", height: "300px" }}
//       />
//       <button onClick={callPeer}>Call</button>
//     </div>
//   );
// };

// export default VideoChat;

// בלי קונסול

// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";

// const VideoChat = ({ userId, targetUserId }) => {
//   const [socket, setSocket] = useState(null);
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const localStream = useRef(null);
//   const peerConnection = useRef(null);

//   useEffect(() => {
//     const newSocket = io("http://localhost:8000");
//     setSocket(newSocket);

//     newSocket.on("offer", handleReceiveOffer);
//     newSocket.on("answer", handleReceiveAnswer);
//     newSocket.on("candidate", handleReceiveCandidate);

//     return () => newSocket.close();
//   }, []);

//   const handleReceiveOffer = async (data) => {
//     if (data.target !== userId) return;

//     await peerConnection.current.setRemoteDescription(
//       new RTCSessionDescription(data.offer)
//     );
//     const answer = await peerConnection.current.createAnswer();
//     await peerConnection.current.setLocalDescription(
//       new RTCSessionDescription(answer)
//     );

//     socket.emit("answer", { answer, target: data.source });
//   };

//   const handleReceiveAnswer = async (data) => {
//     if (data.target !== userId) return;

//     await peerConnection.current.setRemoteDescription(
//       new RTCSessionDescription(data.answer)
//     );
//   };

//   const handleReceiveCandidate = async (data) => {
//     if (data.target !== userId) return;

//     try {
//       await peerConnection.current.addIceCandidate(
//         new RTCIceCandidate(data.candidate)
//       );
//     } catch (e) {
//       console.error("Error adding received ice candidate", e);
//     }
//   };

//   const startCall = async () => {
//     peerConnection.current = new RTCPeerConnection();

//     peerConnection.current.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("candidate", {
//           candidate: event.candidate,
//           target: targetUserId,
//         });
//       }
//     };

//     peerConnection.current.ontrack = (event) => {
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     localStream.current = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true,
//     });
//     localVideoRef.current.srcObject = localStream.current;

//     localStream.current.getTracks().forEach((track) => {
//       peerConnection.current.addTrack(track, localStream.current);
//     });

//     const offer = await peerConnection.current.createOffer();
//     await peerConnection.current.setLocalDescription(
//       new RTCSessionDescription(offer)
//     );

//     socket.emit("offer", { offer, target: targetUserId });
//   };

//   return (
//     <div>
//       <h1>Video Chat</h1>
//       <video ref={localVideoRef} autoPlay playsInline muted />
//       <video ref={remoteVideoRef} autoPlay playsInline />
//       <button onClick={startCall}>Start Call</button>
//     </div>
//   );
// };

// export default VideoChat;

// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";

// const VideoChat = ({ userId, targetUserId }) => {
//   const [socket, setSocket] = useState(null);
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const localStream = useRef(null);
//   const peerConnection = useRef(null);

//   useEffect(() => {
//     const newSocket = io("http://localhost:8000");
//     setSocket(newSocket);
//     console.log("Socket connected:", newSocket); // Debug log

//     newSocket.on("offer", handleReceiveOffer);
//     newSocket.on("answer", handleReceiveAnswer);
//     newSocket.on("candidate", handleReceiveCandidate);

//     return () => newSocket.close();
//   }, []);

//   const handleReceiveOffer = async (data) => {
//     console.log("Received offer:", data); // Debug log
//     if (data.target !== userId) return;

//     await peerConnection.current.setRemoteDescription(
//       new RTCSessionDescription(data.offer)
//     );
//     const answer = await peerConnection.current.createAnswer();
//     await peerConnection.current.setLocalDescription(
//       new RTCSessionDescription(answer)
//     );

//     socket.emit("answer", { answer, target: data.source });
//   };

//   const handleReceiveAnswer = async (data) => {
//     console.log("Received answer:", data); // Debug log
//     if (data.target !== userId) return;

//     await peerConnection.current.setRemoteDescription(
//       new RTCSessionDescription(data.answer)
//     );
//   };

//   const handleReceiveCandidate = async (data) => {
//     console.log("Received candidate:", data); // Debug log
//     if (data.target !== userId) return;

//     try {
//       await peerConnection.current.addIceCandidate(
//         new RTCIceCandidate(data.candidate)
//       );
//     } catch (e) {
//       console.error("Error adding received ice candidate", e);
//     }
//   };

//   const startCall = async () => {
//     console.log("Starting call"); // Debug log
//     peerConnection.current = new RTCPeerConnection();

//     peerConnection.current.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("candidate", {
//           candidate: event.candidate,
//           target: targetUserId,
//         });
//       }
//     };

//     peerConnection.current.ontrack = (event) => {
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     try {
//       localStream.current = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       localVideoRef.current.srcObject = localStream.current;

//       localStream.current.getTracks().forEach((track) => {
//         peerConnection.current.addTrack(track, localStream.current);
//       });

//       const offer = await peerConnection.current.createOffer();
//       await peerConnection.current.setLocalDescription(
//         new RTCSessionDescription(offer)
//       );

//       socket.emit("offer", { offer, target: targetUserId });
//     } catch (error) {
//       console.error("Error accessing media devices.", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Video Chat</h1>
//       <video ref={localVideoRef} autoPlay playsInline muted />
//       <video ref={remoteVideoRef} autoPlay playsInline />
//       <button onClick={startCall}>Start Call</button>
//     </div>
//   );
// };

// export default VideoChat;
// //////////////////////////////

// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";

// const VideoChat = ({ userId, targetUserId }) => {
//   const [socket, setSocket] = useState(null);
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const localStream = useRef(null);
//   const peerConnection = useRef(null);

//   useEffect(() => {
//     const newSocket = io("http://localhost:8000");
//     setSocket(newSocket);
//     console.log("Socket connected:", newSocket); // Debug log

//     newSocket.on("offer", handleReceiveOffer);
//     newSocket.on("answer", handleReceiveAnswer);
//     newSocket.on("candidate", handleReceiveCandidate);

//     return () => newSocket.close();
//   }, []);

//   const handleReceiveOffer = async (data) => {
//     console.log("Received offer:", data); // Debug log
//     if (data.target !== userId) return;

//     await peerConnection.current.setRemoteDescription(
//       new RTCSessionDescription(data.offer)
//     );
//     const answer = await peerConnection.current.createAnswer();
//     await peerConnection.current.setLocalDescription(
//       new RTCSessionDescription(answer)
//     );

//     socket.emit("answer", { answer, target: data.source });
//   };

//   const handleReceiveAnswer = async (data) => {
//     console.log("Received answer:", data); // Debug log
//     if (data.target !== userId) return;

//     await peerConnection.current.setRemoteDescription(
//       new RTCSessionDescription(data.answer)
//     );
//   };

//   const handleReceiveCandidate = async (data) => {
//     console.log("Received candidate:", data); // Debug log
//     if (data.target !== userId) return;

//     try {
//       await peerConnection.current.addIceCandidate(
//         new RTCIceCandidate(data.candidate)
//       );
//     } catch (e) {
//       console.error("Error adding received ice candidate", e);
//     }
//   };

//   const startCall = async () => {
//     console.log("Starting call"); // Debug log
//     peerConnection.current = new RTCPeerConnection();

//     peerConnection.current.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("candidate", {
//           candidate: event.candidate,
//           target: targetUserId,
//         });
//       }
//     };

//     peerConnection.current.ontrack = (event) => {
//       console.log("Received remote stream:", event.streams[0]); // Debug log
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     try {
//       localStream.current = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       console.log("Local stream:", localStream.current); // Debug log
//       localVideoRef.current.srcObject = localStream.current;

//       localStream.current.getTracks().forEach((track) => {
//         peerConnection.current.addTrack(track, localStream.current);
//       });

//       const offer = await peerConnection.current.createOffer();
//       await peerConnection.current.setLocalDescription(
//         new RTCSessionDescription(offer)
//       );

//       socket.emit("offer", { offer, target: targetUserId });
//     } catch (error) {
//       console.error("Error accessing media devices.", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Video Chat</h1>
//       <video ref={localVideoRef} autoPlay playsInline muted />
//       <video ref={remoteVideoRef} autoPlay playsInline />
//       <button onClick={startCall}>Start Call</button>
//     </div>
//   );
// };

// export default VideoChat;

/////////////////////////////////

// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";

// const VideoChat = ({ userId, targetUserId }) => {
//   const [socket, setSocket] = useState(null);
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const localStream = useRef(null);
//   const peerConnection = useRef(null);

//   useEffect(() => {
//     const newSocket = io("http://localhost:8000");
//     setSocket(newSocket);
//     console.log("Socket connected:", newSocket);

//     newSocket.on("offer", handleReceiveOffer);
//     newSocket.on("answer", handleReceiveAnswer);
//     newSocket.on("candidate", handleReceiveCandidate);

//     return () => newSocket.close();
//   }, []);

//   const handleReceiveOffer = async (data) => {
//     console.log("Received offer:", data);
//     if (data.target !== userId) return;

//     await peerConnection.current.setRemoteDescription(
//       new RTCSessionDescription(data.offer)
//     );
//     const answer = await peerConnection.current.createAnswer();
//     await peerConnection.current.setLocalDescription(
//       new RTCSessionDescription(answer)
//     );

//     socket.emit("answer", { answer, target: data.source });
//   };

//   const handleReceiveAnswer = async (data) => {
//     console.log("Received answer:", data);
//     if (data.target !== userId) return;

//     await peerConnection.current.setRemoteDescription(
//       new RTCSessionDescription(data.answer)
//     );
//   };

//   const handleReceiveCandidate = async (data) => {
//     console.log("Received candidate:", data);
//     if (data.target !== userId) return;

//     try {
//       await peerConnection.current.addIceCandidate(
//         new RTCIceCandidate(data.candidate)
//       );
//     } catch (e) {
//       console.error("Error adding received ice candidate", e);
//     }
//   };

//   const startCall = async () => {
//     console.log("Starting call");
//     peerConnection.current = new RTCPeerConnection();

//     peerConnection.current.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("candidate", {
//           candidate: event.candidate,
//           target: targetUserId,
//         });
//       }
//     };

//     peerConnection.current.ontrack = (event) => {
//       console.log("Received remote stream:", event.streams[0]);
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     try {
//       localStream.current = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       console.log("Local stream:", localStream.current);
//       localVideoRef.current.srcObject = localStream.current;

//       localStream.current.getTracks().forEach((track) => {
//         peerConnection.current.addTrack(track, localStream.current);
//       });

//       const offer = await peerConnection.current.createOffer();
//       await peerConnection.current.setLocalDescription(
//         new RTCSessionDescription(offer)
//       );

//       socket.emit("offer", { offer, target: targetUserId });
//     } catch (error) {
//       console.error("Error accessing media devices:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Video Chat</h1>
//       <video ref={localVideoRef} autoPlay playsInline muted />
//       <video ref={remoteVideoRef} autoPlay playsInline />
//       <button onClick={startCall}>Start Call</button>
//     </div>
//   );
// };

// export default VideoChat;

////////////////////

// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import Peer from "simple-peer";
// import TextField from "@material-ui/core/TextField";
// import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";
// import AssignmentIcon from "@material-ui/icons/Assignment";
// import PhoneIcon from "@material-ui/icons/Phone";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import "./index.css";

// const socket = io.connect("http://localhost:8000");

// const VideoChat = () => {
//   const [me, setMe] = useState("");
//   const [stream, setStream] = useState();
//   const [receivingCall, setReceivingCall] = useState(false);
//   const [caller, setCaller] = useState("");
//   const [callerSignal, setCallerSignal] = useState();
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [idToCall, setIdToCall] = useState("");
//   const [callEnded, setCallEnded] = useState(false);
//   const [name, setName] = useState("");
//   const myVideo = useRef();
//   const userVideo = useRef();
//   const connectionRef = useRef();

//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         setStream(stream);
//         myVideo.current.srcObject = stream;
//       });

//     socket.on("me", (id) => {
//       setMe(id);
//     });

//     socket.on("callUser", (data) => {
//       setReceivingCall(true);
//       setCaller(data.from);
//       setName(data.name);
//       setCallerSignal(data.signal);
//     });
//   }, []);

//   const callUser = (id) => {
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream: stream,
//     });

//     peer.on("signal", (data) => {
//       socket.emit("callUser", {
//         userToCall: id,
//         signalData: data,
//         from: me,
//         name: name,
//       });
//     });

//     peer.on("stream", (stream) => {
//       userVideo.current.srcObject = stream;
//     });

//     socket.on("callAccepted", (signal) => {
//       setCallAccepted(true);
//       peer.signal(signal);
//     });

//     connectionRef.current = peer;
//   };

//   const answerCall = () => {
//     setCallAccepted(true);
//     const peer = new Peer({
//       initiator: false,
//       trickle: false,
//       stream: stream,
//     });

//     peer.on("signal", (data) => {
//       socket.emit("answerCall", { signal: data, to: caller });
//     });

//     peer.on("stream", (stream) => {
//       userVideo.current.srcObject = stream;
//     });

//     peer.signal(callerSignal);
//     connectionRef.current = peer;
//   };

//   const leaveCall = () => {
//     setCallEnded(true);
//     connectionRef.current.destroy();
//   };

//   return (
//     <div className="container">
//       <div className="video-container">
//         <div className="video">
//           {stream && (
//             <video
//               playsInline
//               muted
//               ref={myVideo}
//               autoPlay
//               style={{ width: "300px" }}
//             />
//           )}
//         </div>
//         <div className="video">
//           {callAccepted && !callEnded ? (
//             <video
//               playsInline
//               ref={userVideo}
//               autoPlay
//               style={{ width: "300px" }}
//             />
//           ) : null}
//         </div>
//       </div>
//       <div className="myId">
//         <TextField
//           id="filled-basic"
//           label="Name"
//           variant="filled"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           style={{ marginBottom: "20px" }}
//         />
//         <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<AssignmentIcon fontSize="large" />}
//           >
//             Copy ID
//           </Button>
//         </CopyToClipboard>
//         <TextField
//           id="filled-basic"
//           label="ID to call"
//           variant="filled"
//           value={idToCall}
//           onChange={(e) => setIdToCall(e.target.value)}
//         />
//         <div className="call-button">
//           {callAccepted && !callEnded ? (
//             <Button variant="contained" color="secondary" onClick={leaveCall}>
//               End Call
//             </Button>
//           ) : (
//             <IconButton
//               color="primary"
//               aria-label="call"
//               onClick={() => callUser(idToCall)}
//             >
//               <PhoneIcon fontSize="large" />
//             </IconButton>
//           )}
//         </div>
//       </div>
//       <div>
//         {receivingCall && !callAccepted ? (
//           <div className="caller">
//             <h1>{name} is calling...</h1>
//             <Button variant="contained" color="primary" onClick={answerCall}>
//               Answer
//             </Button>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default VideoChat;
