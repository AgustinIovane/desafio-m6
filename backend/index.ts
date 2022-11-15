import * as express from "express";
import { fireStore, rtdb } from "./db";
import * as cors from "cors";
import { nanoid } from "nanoid";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const userCollection = fireStore.collection("users");
const romsCollection = fireStore.collection("rooms");

app.post("/user/signup", function (req, res) {
  const nombre = req.body.nombre;
  userCollection
    .where("nombre", "==", nombre)
    .get()
    .then((resp) => {
      if (resp.empty) {
        userCollection
          .add({
            nombre,
          })
          .then((newUser) => {
            res.json({ id: newUser.id });
          });
      } else {
        res.status(400).json({
          message: "User already exist",
        });
      }
    });
});

app.post("/user/auth", function (req, res) {
  const { nombre } = req.body;
  userCollection
    .where("nombre", "==", nombre)
    .get()
    .then((resp) => {
      if (resp.empty) {
        res.status(404).json({
          message: "Not found",
        });
      } else {
        res.json({
          id: resp.docs[0].id,
        });
      }
    });
});

app.post("/rooms", (req, res) => {
  const { userId } = req.body;
  userCollection
    .doc(userId.toString())
    .get()
    .then((snap) => {
      if (snap.exists) {
        const roomRef = rtdb.ref("rooms/" + nanoid());

        roomRef
          .set({
            currentGame: userId,
          })
          .then((respRtdb) => {
            const roomLongId = roomRef.key;
            const roomId = 1000 + Math.floor(Math.random() * 9999);
            romsCollection.doc(roomId.toString()).set({
              rtdbRoomId: roomLongId,
            });
            res.json({
              id: roomId,
            });
          });
      } else {
        res.status(404).json({
          message: "Error",
        });
      }
    });
});

app.put("/rooms/:roomId/game", (req, res) => {
  const { userId1 } = req.body;
  const { userId2 } = req.body;
  const { roomId } = req.params;
  const { ref1 } = req.body;
  const { ref2 } = req.body;
  const { winners } = req.body;
  const room = romsCollection.doc(roomId.toString());

  if (userId1 !== undefined && ref1 !== undefined) {
    room.update({ userId1, ref1 }).then((result) => {
      res.json("ok");
    });
  } else if (userId2 !== undefined && ref2 !== undefined) {
    room.update({ userId2, ref2 }).then((result) => {
      res.json("ok");
    });
  } else if (winners !== undefined) {
    room.update({ winners }).then((result) => {
      res.json("ok");
    });
  }
});

app.get("/rooms/:roomId", (req, res) => {
  const { userId } = req.query;
  const { roomId } = req.params;

  if (userId == undefined || roomId == undefined) {
    res.json({ message: "Error, incomplete parameters" });
  } else {
    userCollection
      .doc(userId.toString())
      .get()
      .then((snap) => {
        if (snap.exists) {
          romsCollection
            .doc(roomId)
            .get()
            .then((snap) => {
              const data = snap.data();
              if (data == undefined) {
                res.json({ message: "not found" });
              } else {
                res.json(data);
              }
            });
        } else {
          res.status(404).json({
            message: "Not found",
          });
        }
      });
  }
});

app.post("/game/status", function (req, res) {
  const gameRoomRef = rtdb.ref("/rooms/" + req.body.roomId + "/currentGame");
  const push = gameRoomRef.push(req.body);
  push;
  const keyPush = push.key;
  res.json({ id: keyPush });
});

app.put("/game/ready", function (req, res) {
  const gameRoomRef = rtdb.ref(
    "/rooms/" + req.body.roomId + "/currentGame/" + req.body.ref
  );
  const data = { start: req.body.start, ref: req.body.ref };
  gameRoomRef.update(data);
  res.json({ userId: req.body.userId });
});

app.put("/game/choice", function (req, res) {
  const gameRoomRef = rtdb.ref(
    "/rooms/" + req.body.roomId + "/currentGame/" + req.body.ref
  );
  const data = { choice: req.body.choice };
  gameRoomRef.update(data);
  res.json({ userId: req.body.userId });
});

app.put("/game/online", function (req, res) {
  const gameRoomRef = rtdb.ref(
    "/rooms/" + req.body.roomId + "/currentGame/" + req.body.ref
  );
  const data = { online: req.body.online, ref: req.body.ref };
  gameRoomRef.update(data);
  res.json({ userId: req.body.userId });
});

app.listen(port, () => {
  console.log(`Ejecutando en http://localhost:${port}`);
});
