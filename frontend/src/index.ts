import "./router";
import { initButton } from "./components/button/index";
import { initCounter } from "./components/counter/index";
import { initPapel } from "./components/move/papel";
import { initPiedra } from "./components/move/piedra";
import { initTijeras } from "./components/move/tijeras";
import { initStar } from "./components/star/index";
import { initText } from "./components/text/index";

(function () {
    initButton();
    initCounter();
    initPapel();
    initPiedra();
    initTijeras();
    initStar();
    initText();
})();