// const API_BASE_URL = "http://localhost:3000";
const API_BASE_URL = "https://api-piedra-papel-tijeras.herokuapp.com";
import { rtdb } from "./rtdb";
import map from "lodash/map";
import { Router } from "@vaadin/router";

const state = {
    data: {
        name: "",
        namePlayer2: "",
        userId: "",
        roomId: "",
        rtdbRoomId: "",
        choice: "",
        currentGame: [],
        playerRef: {},
        player2Ref: {},

        win: [],
        gameStart: false,

        playerOnline: "",
        playerOnline2: "",

        player1Choice: "",
        player2Choice: "",

        player1Ready: "",
        player2Ready: "",
    },
    listeners: [],
    ListenRoomOnline() {
        const cs = state.getState();
        const chatrooms = rtdb.ref("/rooms/" + cs.rtdbRoomId);
        chatrooms.on("value", (snap) => {
            const valor = snap.val();
            const game = map(valor.currentGame);

            const online = game[0].online;
            const player2 = game[1]?.name;

            cs.currentGame = game;
            cs.namePlayer2 = player2;

            cs.player1Choice = game[0].choice;
            cs.player2Choice = game[1]?.choice;

            cs.playerOnline2 = game[1]?.online;
            cs.playerOnline = online;

            cs.player1Ready = game[0].start;
            cs.player2Ready = game[1]?.start;
            this.setState(cs);
        });
    },
    gameStart(data) {
        const cs = this.getState();
        cs.gameStart = data;
        state.setState(cs);
    },
    pushWinner() {
        const cs = this.getState();

        fetch(API_BASE_URL + "/rooms/" + cs.roomId + "/game", {
            method: "put",
            headers: {
                "content-type": "application/json",
            },

            body: JSON.stringify({
                winners: cs.win,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => { });
    },
    filterWin() {
        const cs = state.getState();

        let player1 = cs.win.filter((i) => {
            return i == 0;
        });
        let counterPlayer1 = player1.length;

        let player2 = cs.win.filter((i) => {
            return i == 1;
        });
        let counterPlayer2 = player2.length;
        let counterPlayers = { counterPlayer1, counterPlayer2 };
        return counterPlayers;
    },
    restartMove() {
        const cs = this.getState();
        const ref = cs.playerRef.ref;
        fetch(API_BASE_URL + "/game/choice", {
            method: "put",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                roomId: cs.rtdbRoomId,
                ref: ref,
                choice: "",
                userId: cs.userId,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => { });
    },

    whoWins() {
        const data = this.getState();

        const winWhitPaper =
            data.player1Choice == "papel" && data.player2Choice == "piedra";
        const winWhitRock =
            data.player1Choice == "piedra" && data.player2Choice == "tijeras";
        const winWhitScissors =
            data.player1Choice == "tijeras" && data.player2Choice == "papel";
        const win1 = [winWhitPaper, winWhitRock, winWhitScissors].includes(true);

        const missWhitPaper =
            data.player2Choice == "papel" && data.player1Choice == "piedra";
        const missWhitRock =
            data.player2Choice == "piedra" && data.player1Choice == "tijeras";
        const missWhitScissors =
            data.player2Choice == "tijeras" && data.player1Choice == "papel";
        const win2 = [missWhitPaper, missWhitRock, missWhitScissors].includes(true);

        if (win1 == true) {
            data.win.push(0);
        } else if (win2 == true) {
            data.win.push(1);
        } else {
        }

        if (win1 == true) {
            if (data.name == data.currentGame[0].name) {
                this.pushWinner();
                Router.go("/win");
            } else {
                Router.go("/loose");
            }
        } else if (win2 == true) {
            if (data.name == data.currentGame[1].name) {
                this.pushWinner();
                Router.go("/win");
            } else {
                Router.go("/loose");
            }
        } else {
            Router.go("/tie");
        }
    },
    playerReady() {
        const cs = this.getState();
        const ref = cs.playerRef.ref;

        fetch(API_BASE_URL + "/game/ready", {
            method: "put",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                roomId: cs.rtdbRoomId,
                ref: ref,
                start: true,
                userId: cs.userId,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => { });
    },
    playerNotReady() {
        const cs = this.getState();
        const ref = cs.playerRef.ref;
        fetch(API_BASE_URL + "/game/ready", {
            method: "put",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                roomId: cs.rtdbRoomId,
                ref: ref,
                start: false,
                userId: cs.userId,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => { });
    },
    playerOffline() {
        const cs = this.getState();
        const ref = cs.playerRef.ref;
        this.gameStart(false);
        fetch(API_BASE_URL + "/game/online", {
            method: "put",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                roomId: cs.rtdbRoomId,
                ref: ref,
                online: false,
                userId: cs.userId,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => { });
    },
    playerOnline() {
        const cs = this.getState();
        const ref = cs.playerRef.ref;
        fetch(API_BASE_URL + "/game/online", {
            method: "put",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                roomId: cs.rtdbRoomId,
                ref: ref,
                online: true,
                userId: cs.userId,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => { });
    },

    playerChoice() {
        const cs = this.getState();
        const ref = cs.playerRef.ref;

        fetch(API_BASE_URL + "/game/choice", {
            method: "put",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                roomId: cs.rtdbRoomId,
                ref: ref,
                choice: cs.choice,
                userId: cs.userId,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => { });
    },
    init() { },

    setChoice(choice) {
        const currentState = state.getState();
        currentState.choice = choice;
        this.setState(currentState);
    },

    getState() {
        return this.data;
    },
    setName(name: string) {
        const currentState = state.getState();
        currentState.name = name;
        this.setState(currentState);
    },
    setRoomId(roomId) {
        const currentState = state.getState();
        currentState.roomId = roomId;
        this.setState(currentState);
    },

    playerPushStatus() {
        const cs = this.getState();
        fetch(API_BASE_URL + "/game/status", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                userId: cs.userId,
                name: cs.name,
                choice: cs.choice,
                roomId: cs.rtdbRoomId,
                online: true,
                start: false,
                ref: "",
                time: new Date(),
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                cs.playerRef = { ref: data.id, player: cs.userId };
                this.setState(data);
            });
    },
    pushRefPlayer1Db() {
        const cs = this.getState();
        fetch(API_BASE_URL + "/rooms/" + cs.roomId + "/game", {
            method: "put",
            headers: {
                "content-type": "application/json",
            },

            body: JSON.stringify({
                userId1: cs.userId,
                ref1: cs.playerRef.ref,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => { });
    },
    pushRefPlayer2Db() {
        const cs = this.getState();
        fetch(API_BASE_URL + "/rooms/" + cs.roomId + "/game", {
            method: "put",
            headers: {
                "content-type": "application/json",
            },

            body: JSON.stringify({
                userId2: cs.userId,
                ref2: cs.playerRef.ref,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => { });
    },
    setState(newState) {
        this.data = newState;
        for (const cb of this.listeners) {
            cb();
        }
    },
    subscribe(callback) {
        this.listeners.push(callback);
    },
    registerUser(callback?, err?) {
        const cs = this.getState();
        fetch(API_BASE_URL + "/user/signup", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ nombre: cs.name }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.message) {
                    this.authUser(() => {
                        this.askNewRoom(() => {
                            this.accesToRoom(() => {
                                this.playerPushStatus();
                                Router.go("/wait");
                            });
                        });
                    });
                    if (err) err();
                } else {
                    cs.userId = data.id;
                    this.setState(cs);
                    callback();
                }
            });
    },
    userToRoom(callback?, err?) {
        const cs = this.getState();
        fetch(API_BASE_URL + "/user/signup", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ nombre: cs.name }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.message) {
                    this.authUser(() => {
                        Router.go("/goRoom");
                    });
                    if (err) err();
                } else {
                    cs.userId = data.id;
                    this.setState(cs);

                    callback();
                }
            });
    },
    // connectUserToRoom() {
    //   const cs = state.getState();
    //   this.accesToRoom();
    // },
    authUser(callback?, err?) {
        const cs = this.getState();
        if (cs.name) {
            fetch(API_BASE_URL + "/user/auth", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ nombre: cs.name }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    cs.userId = data.id;
                    this.setState(cs);
                    if (data.message) {
                        if (err) err();
                    } else {
                        if (callback) callback();
                    }
                });
        } else {
        }
    },
    askNewRoom(callback?) {
        const cs = this.getState();
        if (cs.userId) {
            fetch(API_BASE_URL + "/rooms", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ userId: cs.userId }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    cs.roomId = data.id;
                    this.setState(cs);

                    if (callback) callback();
                });
        } else {
            console.error("No hay un userId en el state");
        }
    },
    accesToRoom(callback?, err?) {
        const cs = this.getState();
        const roomId = cs.roomId;
        fetch(API_BASE_URL + "/rooms/" + roomId + "?userId=" + cs.userId)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.userId1 == cs.userId) {
                    cs.playerRef = { ref: data.ref1, userId: data.userId1 };
                } else if (data.userId2 == cs.userId) {
                    cs.playerRef = { ref: data.ref2, userId: data.userId2 };
                }

                if (data.winners) cs.win = data.winners;
                cs.rtdbRoomId = data.rtdbRoomId;
                this.setState(cs);
                this.playerOnline();
                this.ListenRoomOnline();

                if (data.message) {
                    err();
                } else {
                    if (callback) callback();
                }
            });
    },
};

export { state };