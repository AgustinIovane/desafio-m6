import { Router } from "@vaadin/router";
import { state } from "../../state";

export class Waiting extends HTMLElement {
    connectedCallback() {
        this.render();
        this.addEventListener("beforeunload", function (event) {
            state.playerOffline();
        });
        window.onbeforeunload = function () {
            state.playerOffline();
        };

        state.subscribe(() => {
            this.playersCompleteAndRef();
        });
    }
    room = state.getState().roomId;

    playersCompleteAndRef() {
        const cs = state.getState();
        if (
            cs.gameStart == false &&
            cs.playerOnline == true &&
            cs.playerOnline2 == true
        ) {
            if (cs.userId == cs.currentGame[0].userId) {
                state.pushRefPlayer1Db();
            } else {
                state.pushRefPlayer2Db();
            }
            Router.go("/rules");
        }
    }
    render() {
        this.innerHTML = `
    <div class="container">
        <text-comp variant="body">Compartí el codigo: </text-comp>
        <text-comp variant="title">${this.room} </text-comp>
        <text-comp variant="body">con tu contrincante</text-comp>
    </div>
        `;
        const style = document.createElement("style");
        style.innerHTML = `
    *{
      box-sizing: border-box;
  }
   body{
    margin:0;
   }
   .container{
    display:flex;
    padding:20px;
    height: 100vh;
    justify-content: center;
    flex-direction: column;
  }
  
  .h1{
    font-size: 52px;
    font-family: 'Times New Roman', Times, serif;
    font-weight: bold;
}
  
  .boton{
    cursor: pointer;
      padding:10px;
      margin-top:5vh;
      width: 100%;
      font-size:22px;
      border: solid 1px;
      background-color: #0AAC11;
      border-radius: 4px;
      font-weight: bold;
  }
  .input{
    width: 100%;
    height: 55px;
    font-weight: bold;
    margin-bottom:15px;
}`;

        this.appendChild(style);
    }
}

customElements.define("wait-page", Waiting);