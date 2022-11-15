import { Router } from "@vaadin/router";
import { state } from "../../../state";

export class Win extends HTMLElement {
    connectedCallback() {
        this.render();
        window.addEventListener("unload", () => {
            state.playerOffline();
            state.playerNotReady();
        });

        const ready = document.querySelector(".send");
        ready.addEventListener("click", () => {
            state.restartMove();
            Router.go("/rules");
        });
        window.addEventListener("beforeunload", function (event) {
            state.playerOffline();
            state.playerNotReady();
        });
        window.onbeforeunload = function () {
            state.playerOffline();
            state.playerNotReady();
        };
    }
    game = state.filterWin();
    name = state.getState().currentGame[0].name;
    name2 = state.getState().currentGame[1].name;
    render() {
        this.innerHTML = `
    <div class="center">
    <star-comp variant="win">Ganaste</star-comp>
    <div class="desktop"><div class="container">
            <h2 class="h2">Score<h2>
            <div class="h3-container">
            <h3 class="h3">${this.name}: ${this.game.counterPlayer1}   </h3>
            <h3 class="h3">${this.name2}: ${this.game.counterPlayer2}  </h3>
            </div>
    </div></div>
    <div class="desktop"><div class="buttom-container"><button-comp class="send">volver a jugar</button-comp></div></div>
    </div>
        `;
        const style = document.createElement("style");
        style.innerHTML = `
    *{
      margin:0;
      
      box-sizing: border-box;
  }
  body {
      background-color: rgba(0, 255, 0, 0.5);
      
    }
  .container{
      display:flex;
      height: 217px;
      flex-direction: column;
      gap:10px;
      margin: 0 58px 0 58px;
      border:solid 10px black;
      justify-content: space-evenly;
      background-color: white;
          
        
  }
  @media (min-width: 769px) {
      .container{
          width:404px;
      }}
  .h3-container{
      display:flex;
      width: 100%;
      flex-direction: column;
      justify-content: end;
      align-items: flex-end;
      text-align: end;
  }
  .h2-container{
  }
  .h2{
      text-align: center;
      font-size: 55px;
      font-family: 'Odibee Sans', cursive;;
      color:#000000;
  }
  .h3{
      text-align: center;
      font-size: 45px;
      font-family: 'Odibee Sans', cursive;;
      color:#000000;
  }
  .buttom-container{
      padding:20px ;
      
  }
  @media (min-width: 769px) {
      .buttom-container{
          
          width:424px;
      }}
  .center{
      height: 100vh;
      display:flex;
      flex-direction: column;
      justify-content: center;
  }
  @media (min-width: 769px) {
  .desktop{
      width:100%;
      display:flex;
      justify-content:center;
  }}
`;

        this.appendChild(style);
    }
}
customElements.define("win-page", Win);