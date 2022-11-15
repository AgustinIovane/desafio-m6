import { Router } from "@vaadin/router";
import { state } from "../../state";

export class Rules extends HTMLElement {
    connectedCallback() {
        this.render();
        window.addEventListener("beforeunload", function (event) {
            state.playerOffline();
            state.playerNotReady();
        });
        state.gameStart(true);
        const ready = document.querySelector(".ready");
        const hidden = document.querySelector(".hidden");
        const listo = document.querySelector(".listo");

        ready.addEventListener("click", () => {
            state.playerReady();
            listo.classList.replace("display", "displayOn");
            hidden.classList.add("display");
        });

        state.subscribe(() => {
            const cs = state.getState();
            if (cs.currentGame[0].start && cs.currentGame[1].start) {
                Router.go("/play");
            }
        });
    }
    game = state.filterWin();
    name = state.getState().currentGame[0].name;
    name2 = state.getState().currentGame[1].name;
    room = state.getState().roomId;

    render() {
        this.innerHTML = `
    <div class="container">
      <div class="header-cont">
        <div>
            <h3 class="h3"> ${this.name}: ${this.game.counterPlayer1}</h3>
            <h3 class="h3"> ${this.name2}: ${this.game.counterPlayer2}</h3>
        </div>
        <div>
          <h3 class="h3">Sala: ${this.room}</h3>
        </div>
      </div>
      <div class="listo display"><text-comp variant="body">Esperando a que el rival presione ¡Jugar!...</text-comp></div>
      <div class="hidden body-container">
        <text-comp variant="body">Presioná jugar
        y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</text-comp>
        
        <div class="buttom-container"><button-comp  variant="35px" class=" ready">¡Jugar!</button-comp></div>
      </div>
        
    </div>
        `;
        const style = document.createElement("style");
        style.innerHTML = `
    *{
      box-sizing: border-box;
  }
   h2{
    display:none;
   }
   .buttom-container{
    width:100%;
    max-width:404px;
}
.body-container{
  display: flex;
  flex-direction: column;
  gap:5vh;
  width: 100%;
  align-items: center;
  justify-content: center;
}
   .header-cont{
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
   }
   .container{
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding:0 20px;
    gap:8vh;
    }
    @media (min-width: 769px) {
    .container {
     
      height: inherit;
    
    }
    }
  .display{
    display: none;
}
.displayOn{
  display: inherit;
}
  }
  .botonAnim:hover{
    background-color: #008CBA;
    color: white;
  }
  .h3{
    margin:0;
    font-size: 20px;
    font-family: 'Odibee Sans', cursive;
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
customElements.define("rules-page", Rules);