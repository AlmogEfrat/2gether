// const express = require("express");
// const { MongoClient } = require("mongodb"); //בשביל התקשורת עם בסיס הנתונים שלי
// const { v4: uuidv4 } = require("uuid");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const dotenv = require("dotenv");
// require("dotenv").config();

// const uri =
//   "mongodb+srv://almogabergel:almog123@cluster0.lsjngbn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const PORT = 8000;
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Default
// app.get("/", (req, res) => {
//   res.json("Hello to my app"); //בדיקה שיש תקשורת בין הבקשה לתגובה
// });

// // Sign up to the Database
// app.post("/signup", async (req, res) => {
//   const client = new MongoClient(uri);
//   const { email, password } = req.body;

//   const generatedUserId = uuidv4();
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const existingUser = await users.findOne({ email });

//     if (existingUser) {
//       return res.status(409).send("User already exists. Please login");
//     }

//     const sanitizedEmail = email.toLowerCase();

//     const data = {
//       user_id: generatedUserId,
//       email: sanitizedEmail,
//       hashed_password: hashedPassword,
//     };

//     const insertedUser = await users.insertOne(data);

//     const token = jwt.sign(insertedUser, sanitizedEmail, {
//       expiresIn: 60 * 24,
//     });
//     res.status(201).json({ token, userId: generatedUserId });
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await client.close();
//   }
// });

// // Log in to the Database
// app.post("/login", async (req, res) => {
//   const client = new MongoClient(uri);
//   const { email, password } = req.body;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const user = await users.findOne({ email });

//     const correctPassword = await bcrypt.compare(
//       password,
//       user.hashed_password
//     );

//     if (user && correctPassword) {
//       const token = jwt.sign(user, email, {
//         expiresIn: 60 * 24,
//       });
//       res.status(201).json({ token, userId: user.user_id });
//     }

//     res.status(400).json("Invalid Credentials");
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await client.close();
//   }
// });

// // Get individual user
// app.get("/user", async (req, res) => {
//   const client = new MongoClient(uri);
//   const userId = req.query.userId;

//   try {
//     await client.connect();
//     const database = client.db("app-data"); // זה החיבור לבסיס נתונים שלנו,האפ דאטה זה השם ממונגו דאטה בייס שיצרתי
//     const users = database.collection("users"); //עם המשתנה דאטה בייס ניגש לקולקשיין שיצרתי במונגו ולשדה - משתמשים

//     const query = { user_id: userId };
//     const user = await users.findOne(query);

//     //const returnnedUser = await users.find().toArray();
//     //res.send(returnnedUser);

//     res.send(user);
//   } finally {
//     await client.close(); //זה מבטיח שהלקוח יסגר כשנסיים או אם יש שגיאה
//   }
// });

// // Update User with a match
// app.put("/addmatch", async (req, res) => {
//   const client = new MongoClient(uri);
//   const { userId, matchedUserId } = req.body;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const query = { user_id: userId };
//     const updateDocument = {
//       $push: { matches: { user_id: matchedUserId } },
//     };
//     const user = await users.updateOne(query, updateDocument);
//     res.send(user);
//   } finally {
//     await client.close();
//   }
// });

// // Get all Users by userIds in the Database
// app.get("/users", async (req, res) => {
//   const client = new MongoClient(uri);
//   const userIds = JSON.parse(req.query.userIds);

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const pipeline = [
//       {
//         $match: {
//           user_id: {
//             $in: userIds,
//           },
//         },
//       },
//     ];

//     const foundUsers = await users.aggregate(pipeline).toArray();

//     res.json(foundUsers);
//   } finally {
//     await client.close();
//   }
// });

// // Get all the Gendered Users in the Database
// app.get("/gendered-users", async (req, res) => {
//   const client = new MongoClient(uri);
//   const gender = req.query.gender;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");
//     const query = { gender_identity: { $eq: gender } };
//     const foundUsers = await users.find(query).toArray();
//     res.json(foundUsers);
//   } finally {
//     await client.close();
//   }
// });

// // Update a User in the Database
// app.put("/user", async (req, res) => {
//   const client = new MongoClient(uri);
//   const formData = req.body.formData;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const query = { user_id: formData.user_id };

//     const updateDocument = {
//       $set: {
//         first_name: formData.first_name,
//         dob_day: formData.dob_day,
//         dob_month: formData.dob_month,
//         dob_year: formData.dob_year,
//         show_gender: formData.show_gender,
//         gender_identity: formData.gender_identity,
//         gender_interest: formData.gender_interest,
//         url: formData.url,
//         about: formData.about,
//         matches: formData.matches,
//       },
//     };

//     const insertedUser = await users.updateOne(query, updateDocument);

//     res.json(insertedUser);
//   } finally {
//     await client.close();
//   }
// });

// // Get Messages by from_userId and to_userId
// app.get("/messages", async (req, res) => {
//   const { userId, correspondingUserId } = req.query;
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const messages = database.collection("messages");

//     const query = {
//       from_userId: userId,
//       to_userId: correspondingUserId,
//     };
//     const foundMessages = await messages.find(query).toArray();
//     res.send(foundMessages);
//   } finally {
//     await client.close();
//   }
// });

// // Add a Message to our Database
// app.post("/message", async (req, res) => {
//   const client = new MongoClient(uri);
//   const message = req.body.message;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const messages = database.collection("messages");

//     const insertedMessage = await messages.insertOne(message);
//     res.send(insertedMessage);
//   } finally {
//     await client.close();
//   }
// });

// app.listen(PORT, () => console.log("server running on PORT " + PORT));

///-------------הקובץ הכי מעודכן ללא הצ'אט

/// לפני השינוי של הפרופיל
// const PORT = 8000;
// const express = require("express");
// const { MongoClient } = require("mongodb");
// const { v4: uuidv4 } = require("uuid");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// require("dotenv").config();

// const uri =
//   "mongodb+srv://almogabergel:almog123@cluster0.lsjngbn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Default
// app.get("/", (req, res) => {
//   res.json("Hello to my app");
// });

// // Sign up to the Database
// app.post("/signup", async (req, res) => {
//   const client = new MongoClient(uri);
//   const { email, password } = req.body;

//   const generatedUserId = uuidv4();
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const existingUser = await users.findOne({ email });

//     if (existingUser) {
//       return res.status(401).send({ message: "User already exist. Try again" });
//     }

//     const sanitizedEmail = email.toLowerCase();

//     const data = {
//       user_id: generatedUserId,
//       email: sanitizedEmail,
//       hashed_password: hashedPassword,
//     };

//     const insertedUser = await users.insertOne(data);

//     const token = jwt.sign(insertedUser, sanitizedEmail, {
//       expiresIn: 60 * 24,
//     });
//     res.status(201).json({ token, userId: generatedUserId });
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await client.close();
//   }
// });

// // Log in to the Database
// app.post("/login", async (req, res) => {
//   const client = new MongoClient(uri);
//   const { email, password } = req.body;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const user = await users.findOne({ email });

//     const correctPassword = await bcrypt.compare(
//       password,
//       user.hashed_password
//     );

//     if (user && correctPassword) {
//       const token = jwt.sign(user, email, {
//         expiresIn: 60 * 24,
//       });
//       res.status(201).json({ token, userId: user.user_id });
//     }

//     res.status(400).json("Invalid Credentials");
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await client.close();
//   }
// });

// // Get individual user
// app.get("/user", async (req, res) => {
//   const client = new MongoClient(uri);
//   const userId = req.query.userId;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const query = { user_id: userId };
//     const user = await users.findOne(query);
//     res.send(user);
//   } finally {
//     await client.close();
//   }
// });

// // Update User with a match
// app.put("/addmatch", async (req, res) => {
//   const client = new MongoClient(uri);
//   const { userId, matchedUserId } = req.body;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const query = { user_id: userId };
//     const updateDocument = {
//       $push: { matches: { user_id: matchedUserId } },
//     };
//     const user = await users.updateOne(query, updateDocument);
//     res.send(user);
//   } finally {
//     await client.close();
//   }
// });

// // Get all Users by userIds in the Database
// app.get("/users", async (req, res) => {
//   const client = new MongoClient(uri);
//   const userIds = JSON.parse(req.query.userIds);

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const pipeline = [
//       {
//         $match: {
//           user_id: {
//             $in: userIds,
//           },
//         },
//       },
//     ];

//     const foundUsers = await users.aggregate(pipeline).toArray();

//     res.json(foundUsers);
//   } finally {
//     await client.close();
//   }
// });

// // Get all the Gendered Users in the Database
// app.get("/gendered-users", async (req, res) => {
//   const client = new MongoClient(uri);
//   const gender = req.query.gender;
//   const userId = req.query.userId;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");
//     let query = { user_id: { $ne: userId } };
//     if (gender !== "everyone") {
//       query = { gender_identity: { $eq: gender } };
//     }
//     const foundUsers = await users.find(query).toArray();

//     res.json(foundUsers);
//   } catch {
//     console.log("not work");
//   } finally {
//     await client.close();
//   }
// });

// // Update a User in the Database
// app.put("/user", async (req, res) => {
//   const client = new MongoClient(uri);
//   const formData = req.body;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const query = { user_id: formData.user_id };

//     const updateDocument = {
//       $set: {
//         first_name: formData.first_name,
//         dob_day: formData.dob_day,
//         dob_month: formData.dob_month,
//         dob_year: formData.dob_year,
//         show_gender: formData.show_gender,
//         gender_identity: formData.gender_identity,
//         gender_interest: formData.gender_interest,
//         url: formData.url,
//         about: formData.about,
//         matches: formData.matches,
//         interests: formData.interests,
//       },
//     };

//     const insertedUser = await users.updateOne(query, updateDocument);

//     res.json(insertedUser);
//   } finally {
//     await client.close();
//   }
// });

// // Get Messages by from_userId and to_userId
// app.get("/messages", async (req, res) => {
//   const { userId, correspondingUserId } = req.query;
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const messages = database.collection("messages");

//     const query = {
//       from_userId: userId,
//       to_userId: correspondingUserId,
//     };
//     const foundMessages = await messages.find(query).toArray();
//     res.send(foundMessages);
//   } finally {
//     await client.close();
//   }
// });

// // Add a Message to our Database
// app.post("/message", async (req, res) => {
//   const client = new MongoClient(uri);

//   const message = req.body.message;
//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const messages = database.collection("messages");

//     const insertedMessage = await messages.insertOne(message);
//     res.send(insertedMessage);
//   } finally {
//     await client.close();
//   }
// });

// app.listen(PORT, () => console.log("server running on PORT " + PORT));
//// לפני השינוי בפרופיל

///-------------הקובץ הכי מעודכן ללא הצ'אט

// const PORT = 8000;
// const express = require("express");
// const { MongoClient } = require("mongodb");
// const { v4: uuidv4 } = require("uuid");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const http = require("http"); // New
// const socketIo = require("socket.io"); // New
// require("dotenv").config();

// const uri =
//   "mongodb+srv://almogabergel:almog123@cluster0.lsjngbn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const app = express();
// app.use(cors());
// app.use(express.json());

// const server = http.createServer(app); // New
// const io = socketIo(server); // New

// // Signaling server logic - New
// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("offer", (data) => {
//     io.to(data.target).emit("offer", data);
//   });
//   socket.on("answer", (data) => {
//     io.to(data.target).emit("answer", data);
//   });
//   socket.on("candidate", (data) => {
//     io.to(data.target).emit("candidate", data);
//   });
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

// // Default
// app.get("/", (req, res) => {
//   res.json("Hello to my app");
// });

// // Sign up to the Database
// app.post("/signup", async (req, res) => {
//   const client = new MongoClient(uri);
//   const { email, password } = req.body;

//   const generatedUserId = uuidv4();
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const existingUser = await users.findOne({ email });

//     if (existingUser) {
//       return res.status(401).send({ message: "User already exist. Try again" });
//     }

//     const sanitizedEmail = email.toLowerCase();

//     const data = {
//       user_id: generatedUserId,
//       email: sanitizedEmail,
//       hashed_password: hashedPassword,
//     };

//     const insertedUser = await users.insertOne(data);

//     const token = jwt.sign(insertedUser, sanitizedEmail, {
//       expiresIn: 60 * 24,
//     });
//     res.status(201).json({ token, userId: generatedUserId });
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await client.close();
//   }
// });

// // Log in to the Database
// app.post("/login", async (req, res) => {
//   const client = new MongoClient(uri);
//   const { email, password } = req.body;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const user = await users.findOne({ email });

//     const correctPassword = await bcrypt.compare(
//       password,
//       user.hashed_password
//     );

//     if (user && correctPassword) {
//       const token = jwt.sign(user, email, {
//         expiresIn: 60 * 24,
//       });
//       res.status(201).json({ token, userId: user.user_id });
//     }

//     res.status(400).json("Invalid Credentials");
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await client.close();
//   }
// });

// // Get individual user
// app.get("/user", async (req, res) => {
//   const client = new MongoClient(uri);
//   const userId = req.query.userId;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const query = { user_id: userId };
//     const user = await users.findOne(query);
//     res.send(user);
//   } finally {
//     await client.close();
//   }
// });

// // Update User with a match
// app.put("/addmatch", async (req, res) => {
//   const client = new MongoClient(uri);
//   const { userId, matchedUserId } = req.body;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const query = { user_id: userId };
//     const updateDocument = {
//       $push: { matches: { user_id: matchedUserId } },
//     };
//     const user = await users.updateOne(query, updateDocument);
//     res.send(user);
//   } finally {
//     await client.close();
//   }
// });

// // Get all Users by userIds in the Database
// app.get("/users", async (req, res) => {
//   const client = new MongoClient(uri);
//   const userIds = JSON.parse(req.query.userIds);

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const pipeline = [
//       {
//         $match: {
//           user_id: {
//             $in: userIds,
//           },
//         },
//       },
//     ];

//     const foundUsers = await users.aggregate(pipeline).toArray();

//     res.json(foundUsers);
//   } finally {
//     await client.close();
//   }
// });

// // Get all the Gendered Users in the Database
// app.get("/gendered-users", async (req, res) => {
//   const client = new MongoClient(uri);
//   const gender = req.query.gender;
//   const userId = req.query.userId;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");
//     let query = { user_id: { $ne: userId } };
//     if (gender !== "everyone") {
//       query = { gender_identity: { $eq: gender } };
//     }
//     const foundUsers = await users.find(query).toArray();

//     res.json(foundUsers);
//   } catch {
//     console.log("not work");
//   } finally {
//     await client.close();
//   }
// });

// // Update a User in the Database
// app.put("/user", async (req, res) => {
//   const client = new MongoClient(uri);
//   const formData = req.body.formData;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const query = { user_id: formData.user_id };

//     const updateDocument = {
//       $set: {
//         first_name: formData.first_name,
//         dob_day: formData.dob_day,
//         dob_month: formData.dob_month,
//         dob_year: formData.dob_year,
//         show_gender: formData.show_gender,
//         gender_identity: formData.gender_identity,
//         gender_interest: formData.gender_interest,
//         url: formData.url,
//         about: formData.about,
//         matches: formData.matches,
//       },
//     };

//     const insertedUser = await users.updateOne(query, updateDocument);

//     res.json(insertedUser);
//   } finally {
//     await client.close();
//   }
// });

// // Get Messages by from_userId and to_userId
// app.get("/messages", async (req, res) => {
//   const { userId, correspondingUserId } = req.query;
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const messages = database.collection("messages");

//     const query = {
//       from_userId: userId,
//       to_userId: correspondingUserId,
//     };
//     const foundMessages = await messages.find(query).toArray();
//     res.send(foundMessages);
//   } finally {
//     await client.close();
//   }
// });

// // Add a Message to our Database
// app.post("/message", async (req, res) => {
//   const client = new MongoClient(uri);

//   const message = req.body.message;
//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const messages = database.collection("messages");

//     const insertedMessage = await messages.insertOne(message);
//     res.send(insertedMessage);
//   } finally {
//     await client.close();
//   }
// });

// server.listen(PORT, () => console.log("server running on PORT " + PORT)); // Modified
////////////////////////////

// require("dotenv").config();

// const PORT = process.env.PORT || 8000;
// const express = require("express");
// const http = require("http");
// const app = express();
// const server = http.createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// const { MongoClient } = require("mongodb");
// const { v4: uuidv4 } = require("uuid");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const bcrypt = require("bcrypt");

// const uri =
//   "mongodb+srv://almogabergel:almog123@cluster0.lsjngbn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// app.use(cors());
// app.use(express.json());

// // WebRTC signaling server logic
// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.emit("me", socket.id);

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//     socket.broadcast.emit("callEnded");
//   });

//   socket.on("callUser", (data) => {
//     io.to(data.userToCall).emit("callUser", {
//       signal: data.signalData,
//       from: data.from,
//       name: data.name,
//     });
//   });

//   socket.on("answerCall", (data) => {
//     io.to(data.to).emit("callAccepted", data.signal);
//   });

//   socket.on("offer", (data) => {
//     io.to(data.target).emit("offer", data);
//   });

//   socket.on("answer", (data) => {
//     io.to(data.target).emit("answer", data);
//   });

//   socket.on("candidate", (data) => {
//     io.to(data.target).emit("candidate", data);
//   });
// });

// // Default route
// app.get("/", (req, res) => {
//   res.json("Hello to my app");
// });

// // Sign up to the Database
// app.post("/signup", async (req, res) => {
//   const client = new MongoClient(uri);
//   const { email, password } = req.body;

//   const generatedUserId = uuidv4();
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const existingUser = await users.findOne({ email });

//     if (existingUser) {
//       return res.status(401).send({ message: "User already exist. Try again" });
//     }

//     const sanitizedEmail = email.toLowerCase();

//     const data = {
//       user_id: generatedUserId,
//       email: sanitizedEmail,
//       hashed_password: hashedPassword,
//     };

//     const insertedUser = await users.insertOne(data);

//     const token = jwt.sign(insertedUser, sanitizedEmail, {
//       expiresIn: 60 * 24,
//     });
//     res.status(201).json({ token, userId: generatedUserId });
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await client.close();
//   }
// });

// // Log in to the Database
// app.post("/login", async (req, res) => {
//   const client = new MongoClient(uri);
//   const { email, password } = req.body;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const user = await users.findOne({ email });

//     const correctPassword = await bcrypt.compare(
//       password,
//       user.hashed_password
//     );

//     if (user && correctPassword) {
//       const token = jwt.sign(user, email, {
//         expiresIn: 60 * 24,
//       });
//       res.status(201).json({ token, userId: user.user_id });
//     }

//     res.status(400).json("Invalid Credentials");
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await client.close();
//   }
// });

// // Get individual user
// app.get("/user", async (req, res) => {
//   const client = new MongoClient(uri);
//   const userId = req.query.userId;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const query = { user_id: userId };
//     const user = await users.findOne(query);
//     res.send(user);
//   } finally {
//     await client.close();
//   }
// });

// // Update User with a match
// app.put("/addmatch", async (req, res) => {
//   const client = new MongoClient(uri);
//   const { userId, matchedUserId } = req.body;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const query = { user_id: userId };
//     const updateDocument = {
//       $push: { matches: { user_id: matchedUserId } },
//     };
//     const user = await users.updateOne(query, updateDocument);
//     res.send(user);
//   } finally {
//     await client.close();
//   }
// });

// // Get all Users by userIds in the Database
// app.get("/users", async (req, res) => {
//   const client = new MongoClient(uri);
//   const userIds = JSON.parse(req.query.userIds);

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const pipeline = [
//       {
//         $match: {
//           user_id: {
//             $in: userIds,
//           },
//         },
//       },
//     ];

//     const foundUsers = await users.aggregate(pipeline).toArray();

//     res.json(foundUsers);
//   } finally {
//     await client.close();
//   }
// });

// // Get all the Gendered Users in the Database
// app.get("/gendered-users", async (req, res) => {
//   const client = new MongoClient(uri);
//   const gender = req.query.gender;
//   const userId = req.query.userId;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");
//     let query = { user_id: { $ne: userId } };
//     if (gender !== "everyone") {
//       query = { gender_identity: { $eq: gender } };
//     }
//     const foundUsers = await users.find(query).toArray();

//     res.json(foundUsers);
//   } catch {
//     console.log("not work");
//   } finally {
//     await client.close();
//   }
// });

// // Update a User in the Database
// app.put("/user", async (req, res) => {
//   const client = new MongoClient(uri);
//   const formData = req.body.formData;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const query = { user_id: formData.user_id };

//     const updateDocument = {
//       $set: {
//         first_name: formData.first_name,
//         dob_day: formData.dob_day,
//         dob_month: formData.dob_month,
//         dob_year: formData.dob_year,
//         show_gender: formData.show_gender,
//         gender_identity: formData.gender_identity,
//         gender_interest: formData.gender_interest,
//         url: formData.url,
//         about: formData.about,
//         matches: formData.matches,
//       },
//     };

//     const insertedUser = await users.updateOne(query, updateDocument);

//     res.json(insertedUser);
//   } finally {
//     await client.close();
//   }
// });

// // Get Messages by from_userId and to_userId
// app.get("/messages", async (req, res) => {
//   const { userId, correspondingUserId } = req.query;
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const messages = database.collection("messages");

//     const query = {
//       from_userId: userId,
//       to_userId: correspondingUserId,
//     };
//     const foundMessages = await messages.find(query).toArray();
//     res.send(foundMessages);
//   } finally {
//     await client.close();
//   }
// });

// // Add a Message to our Database
// app.post("/message", async (req, res) => {
//   const client = new MongoClient(uri);

//   const message = req.body.message;
//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const messages = database.collection("messages");

//     const insertedMessage = await messages.insertOne(message);
//     res.send(insertedMessage);
//   } finally {
//     await client.close();
//   }
// });

// server.listen(PORT, () => console.log("server running on PORT " + PORT));

////////////////////////////

// require("dotenv").config();

// const PORT = process.env.PORT || 8000;
// const express = require("express");
// const http = require("http");
// const app = express();
// const server = http.createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// const { MongoClient } = require("mongodb");
// const { v4: uuidv4 } = require("uuid");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const bcrypt = require("bcrypt");

// const uri =
//   "mongodb+srv://almogabergel:almog123@cluster0.lsjngbn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// app.use(cors());
// app.use(express.json());

// // WebRTC signaling server logic
// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.emit("me", socket.id);

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//     socket.broadcast.emit("callEnded");
//   });

//   socket.on("callUser", (data) => {
//     io.to(data.userToCall).emit("callUser", {
//       signal: data.signalData,
//       from: data.from,
//       name: data.name,
//     });
//   });

//   socket.on("answerCall", (data) => {
//     io.to(data.to).emit("callAccepted", data.signal);
//   });

//   socket.on("offer", (data) => {
//     io.to(data.target).emit("offer", data);
//   });

//   socket.on("answer", (data) => {
//     io.to(data.target).emit("answer", data);
//   });

//   socket.on("candidate", (data) => {
//     io.to(data.target).emit("candidate", data);
//   });
// });

// // Default route
// app.get("/", (req, res) => {
//   res.json("Hello to my app");
// });

// // Sign up to the Database
// app.post("/signup", async (req, res) => {
//   const client = new MongoClient(uri);
//   const { email, password } = req.body;

//   const generatedUserId = uuidv4();
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const existingUser = await users.findOne({ email });

//     if (existingUser) {
//       return res.status(401).send({ message: "User already exist. Try again" });
//     }

//     const sanitizedEmail = email.toLowerCase();

//     const data = {
//       user_id: generatedUserId,
//       email: sanitizedEmail,
//       hashed_password: hashedPassword,
//     };

//     const insertedUser = await users.insertOne(data);

//     const token = jwt.sign(insertedUser, sanitizedEmail, {
//       expiresIn: 60 * 24,
//     });
//     res.status(201).json({ token, userId: generatedUserId });
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await client.close();
//   }
// });

// // Log in to the Database
// app.post("/login", async (req, res) => {
//   const client = new MongoClient(uri);
//   const { email, password } = req.body;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const user = await users.findOne({ email });

//     const correctPassword = await bcrypt.compare(
//       password,
//       user.hashed_password
//     );

//     if (user && correctPassword) {
//       const token = jwt.sign(user, email, {
//         expiresIn: 60 * 24,
//       });
//       res.status(201).json({ token, userId: user.user_id });
//     } else {
//       res.status(400).json("Invalid Credentials");
//     }
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await client.close();
//   }
// });

// // Get individual user
// app.get("/user", async (req, res) => {
//   const client = new MongoClient(uri);
//   const userId = req.query.userId;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const query = { user_id: userId };
//     const user = await users.findOne(query);
//     res.send(user);
//   } finally {
//     await client.close();
//   }
// });

// // Update User with a match
// app.put("/addmatch", async (req, res) => {
//   const client = new MongoClient(uri);
//   const { userId, matchedUserId } = req.body;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const query = { user_id: userId };
//     const updateDocument = {
//       $push: { matches: { user_id: matchedUserId } },
//     };
//     const user = await users.updateOne(query, updateDocument);
//     res.send(user);
//   } finally {
//     await client.close();
//   }
// });

// // Get all Users by userIds in the Database
// app.get("/users", async (req, res) => {
//   const client = new MongoClient(uri);
//   const userIds = JSON.parse(req.query.userIds);

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const pipeline = [
//       {
//         $match: {
//           user_id: {
//             $in: userIds,
//           },
//         },
//       },
//     ];

//     const foundUsers = await users.aggregate(pipeline).toArray();

//     res.json(foundUsers);
//   } finally {
//     await client.close();
//   }
// });

// // Get all the Gendered Users in the Database
// app.get("/gendered-users", async (req, res) => {
//   const client = new MongoClient(uri);
//   const gender = req.query.gender;
//   const userId = req.query.userId;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");
//     let query = { user_id: { $ne: userId } };
//     if (gender !== "everyone") {
//       query = { gender_identity: { $eq: gender } };
//     }
//     const foundUsers = await users.find(query).toArray();

//     res.json(foundUsers);
//   } catch {
//     console.log("not work");
//   } finally {
//     await client.close();
//   }
// });

// // Update a User in the Database
// app.put("/user", async (req, res) => {
//   const client = new MongoClient(uri);
//   const formData = req.body.formData;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const query = { user_id: formData.user_id };

//     const updateDocument = {
//       $set: {
//         first_name: formData.first_name,
//         dob_day: formData.dob_day,
//         dob_month: formData.dob_month,
//         dob_year: formData.dob_year,
//         show_gender: formData.show_gender,
//         gender_identity: formData.gender_identity,
//         gender_interest: formData.gender_interest,
//         url: formData.url,
//         about: formData.about,
//         matches: formData.matches,
//       },
//     };

//     const insertedUser = await users.updateOne(query, updateDocument);

//     res.json(insertedUser);
//   } finally {
//     await client.close();
//   }
// });

// // Get Messages by from_userId and to_userId
// app.get("/messages", async (req, res) => {
//   const { userId, correspondingUserId } = req.query;
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const messages = database.collection("messages");

//     const query = {
//       from_userId: userId,
//       to_userId: correspondingUserId,
//     };
//     const foundMessages = await messages.find(query).toArray();
//     res.send(foundMessages);
//   } finally {
//     await client.close();
//   }
// });

// // Add a Message to our Database
// app.post("/message", async (req, res) => {
//   const client = new MongoClient(uri);

//   const message = req.body.message;
//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const messages = database.collection("messages");

//     const insertedMessage = await messages.insertOne(message);
//     res.send(insertedMessage);
//   } finally {
//     await client.close();
//   }
// });

// server.listen(PORT, () => console.log("server running on PORT " + PORT));

const PORT = 8000;
const express = require("express");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();

require("./websocket");

const uri =
  "mongodb+srv://almogabergel:almog123@cluster0.lsjngbn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
// WebSocket connection handling

app.get("/", (req, res) => {
  res.json("Hello to my app");
});

// Sign up to the Database
app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(401).send({ message: "User already exist. Try again" });
    }

    const sanitizedEmail = email.toLowerCase();

    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
    };

    const insertedUser = await users.insertOne(data);

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });
    res.status(201).json({ token, userId: generatedUserId });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

// Log in to the Database
app.post("/login", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const user = await users.findOne({ email });

    const correctPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );

    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24,
      });
      res.status(201).json({ token, userId: user.user_id });
    }

    res.status(400).json("Invalid Credentials");
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

// Get individual user
app.get("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.query.userId;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const user = await users.findOne(query);
    res.send(user);
  } finally {
    await client.close();
  }
});

// // Update User with a match
// app.put("/addmatch", async (req, res) => {
//   const client = new MongoClient(uri);
//   const { userId, matchedUserId } = req.body;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const query = { user_id: userId };
//     const updateDocument = {
//       $push: { matches: { user_id: matchedUserId } },
//     };
//     const user = await users.updateOne(query, updateDocument);
//     res.send(user);
//   } finally {
//     await client.close();
//   }
// });
// Update User with a match
app.put("/addmatch", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, matchedUserId } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const updateDocument = {
      $push: { matches: { user_id: matchedUserId } },
    };
    const user = await users.updateOne(query, updateDocument);
    res.send(user);
  } finally {
    await client.close();
  }
});

// Get all Users by userIds in the Database
app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);
  const userIds = JSON.parse(req.query.userIds);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const pipeline = [
      {
        $match: {
          user_id: {
            $in: userIds,
          },
        },
      },
    ];

    const foundUsers = await users.aggregate(pipeline).toArray();

    res.json(foundUsers);
  } finally {
    await client.close();
  }
});

// Get all the Gendered Users in the Database
app.get("/gendered-users", async (req, res) => {
  const client = new MongoClient(uri);
  const gender = req.query.gender;
  const userId = req.query.userId;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    let query = { user_id: { $ne: userId } };
    if (gender !== "everyone") {
      query = { gender_identity: { $eq: gender } };
    }
    const foundUsers = await users.find(query).toArray();

    res.json(foundUsers);
  } catch {
    console.log("not work");
  } finally {
    await client.close();
  }
});

// Update a User in the Database
app.put("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const formData = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: formData.user_id };

    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        show_gender: formData.show_gender,
        gender_identity: formData.gender_identity,
        gender_interest: formData.gender_interest,
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
        interests: formData.interests,
        intent: formData.intent,
        disability: formData.disability,
      },
    };

    const insertedUser = await users.updateOne(query, updateDocument);

    res.json(insertedUser);
  } finally {
    await client.close();
  }
});

// Get Messages by from_userId and to_userId
app.get("/messages", async (req, res) => {
  const { userId, correspondingUserId } = req.query;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("app-data");
    const messages = database.collection("messages");

    const query = {
      from_userId: userId,
      to_userId: correspondingUserId,
    };
    const foundMessages = await messages.find(query).toArray();
    res.send(foundMessages);
  } finally {
    await client.close();
  }
});

// Add a Message to our Database
app.post("/message", async (req, res) => {
  const client = new MongoClient(uri);

  const message = req.body.message;
  try {
    await client.connect();
    const database = client.db("app-data");
    const messages = database.collection("messages");

    const insertedMessage = await messages.insertOne(message);
    res.send(insertedMessage);
  } finally {
    await client.close();
  }
});

// Get user profile data
app.get("/user-profile", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, requesterId } = req.query;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    // Use the requesterId if userId is not specified
    const effectiveUserId = userId || requesterId;

    if (!effectiveUserId) {
      return res.status(400).json({ error: "No user ID provided" });
    }

    const user = await users.findOne({ user_id: effectiveUserId });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user profile" });
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => console.log("server running on PORT " + PORT));
