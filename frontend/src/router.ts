import { Router } from "@vaadin/router";

import "./pages/index/index";
import "./pages/registerName/index";
import "./pages/waitForPlayer/index";
import "./pages/registerNameRoom/index";
import "./pages/goRoom/index";
import "./pages/rules/index";
import "./pages/fullRoom/index";
import "./pages/play/index";
import "./pages/result/loose/index";
import "./pages/result/tie/index";
import "./pages/result/win/index";
import "./pages/plays/index";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
    { path: "/register", component: "register-page" },
    { path: "/", component: "index-page" },
    { path: "/wait", component: "wait-page" },
    { path: "/goRoom", component: "goRoom-page" },
    { path: "/registerRoom", component: "registerroom-page" },
    { path: "/rules", component: "rules-page" },
    { path: "/fullRoom", component: "fullroom-page" },
    { path: "/play", component: "play-page" },
    { path: "/loose", component: "loose-page" },
    { path: "/win", component: "win-page" },
    { path: "/tie", component: "tie-page" },
    { path: "/plays", component: "plays-page" },
]);