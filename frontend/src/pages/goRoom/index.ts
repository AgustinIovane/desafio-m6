import { Router } from "@vaadin/router";
import { state } from "../../state";

export class GoRoom extends HTMLElement {
    connectedCallback() {
        this.render();

        const formulario = document.querySelector(".formulario");
        const hidden = document.querySelector(".hidden");
        const volver = document.querySelector(".volver");

        const load = document.querySelector(".load");
        volver.addEventListener("click", () => {
            Router.go("/");
        });

        window.addEventListener("beforeunload", function (event) {
            state.playerOffline();
        });

        formulario.addEventListener("submit", (e) => {
            e.preventDefault();
            load.classList.replace("display", "cargando");
            hidden.classList.add("display");
            const targete = e.target as any;

            if (targete.room.value == "") {
                window.alert("No se ingreso una room valida");
                Router.go("/");
            } else {
                state.setRoomId(targete.room.value);
            }

            state.accesToRoom(
                () => {
                    const cs = state.getState();
                    window.setTimeout(() => {
                        if (cs.currentGame.length == 1) {
                            state.playerPushStatus();
                            Router.go("/wait");
                        } else if (
                            (cs.currentGame[0].name == cs.name &&
                                cs.currentGame[1].name !== cs.name) ||
                            (cs.currentGame[1].name == cs.name &&
                                cs.currentGame[0].name !== cs.name)
                        ) {
                            Router.go("/wait");
                        } else if (cs.currentGame.length >= 2) {
                            Router.go("/fullRoom");
                        } else {
                            Router.go("/fullRoom");
                        }
                    }, 3000);
                },
                () => {
                    window.alert("La sala no existe");
                    Router.go("/");
                }
            );
        });
    }
    connectRoom() {
        state.ListenRoomOnline();
    }
    render() {
        this.innerHTML = `
    <div class="container">
      <div class="volver atras">
        <button-comp variant="30px">←</button-comp> 
      </div>
      <div class="text-container">
        <text-comp variant="title">Piedra Papel ó Tijeras</text-comp>
      </div>
      <text-comp class="load display" variant="body">Cargando..</text-comp>
          
        <div>
            <form class="formulario hidden">
            <input class="input" type="text" autocomplete="off" name="room" placeholder="Código">
            <button class="botonAnim boton">Ingresar a la sala</button>
            </form>
        </div>
        
    </div>
        `;
        const style = document.createElement("style");
        style.innerHTML = `
    *{
      box-sizing: border-box;
  }
   body{
    
   }
   
    .container{
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: baseline;
      height: 110vh;
      padding:0 20px;
      gap:20px;
      }
      @media (min-width: 769px) {
      .container {
       
        height: inherit;
      
      }
      }
  .display{
    display: none;
}
  .label{
    font-size:24px;
    height: 28px;
  
  }
  .load{
    font-size:24px;
  }
  .form{
    font-weight: bold;
  }
  .botonAnim:hover{
    background-color: #008CBA;
    color: white;
    
  }
  .h1{
    font-size: 52px;
    font-family: 'Times New Roman', Times, serif;
    font-weight: bold;
}
  
  .boton{
    
    width:100%;
    color:#D8FCFC;
    background-color: #006CFC;
    border:10px solid #001997;
    font-size:45px;
    font-family:"Odibee Sans";
    border-radius: 10px;
    cursor: pointer;
    
  }
  .input{
    width: 100%;
    height: 55px;
    font-weight: bold;
    margin-bottom:15px;
}
.label-container{
  width:100%;
  display:flex;
  justify-content: center;
}
.atras{
 position: fixed;
 top:1px;
 left:1px;
}
.cargando{
 display: inherit;
 font-size: 100px;
 }
 
.label{
 font-size:30px;
 height: 28px;
}
.form{
 font-weight: bold;
}
.botonAnim:hover{
 background-color: #008CBA;
 color: white;
 
}
.h2-container{
 width:100%;
 padding:20px;
}
.boton{
 width:100%;
             color:#D8FCFC;
             background-color: #006CFC;
             border:10px solid #001997;
             font-size:35px;
             font-family:"Odibee Sans";
             border-radius: 10px;
             cursor: pointer;
   
}
.boton:hover {
 background-color: #2f44ad;
}
.input{
 width: 100%;
 height: 55px;
 font-weight: bold;
 margin-bottom:5vh;
}
.gap{
margin-bottom:20px;
}
@media (min-width: 769px) {
.gap{
 margin-bottom:50px;
}
}
.text-container{
max-width:317px;
}   
.buttom-container{
width:100%;
max-width:404px;
}
.move-container{
display:flex;
width:100%;
position: fixed;
bottom: 10px;
left:1vh;
height: 150px;
justify-content: center;
padding:0 5px;
}
@media (min-width: 769px) {
.move-container{
height: 21.277481vh;
width:500px;
padding:0;
gap:67px;
left:inherit;
}
}
.hand{
     
}
@media (min-width: 769px) {
.hand{
 width:100%;
}
}
.desktop{}
@media (min-width: 769px) {
.desktop{
 display:flex;
 width:100%;
 
 justify-content: center;
}
}
.cargando{
  display: inherit;
  font-size: 100px;
  }`;

        this.appendChild(style);
    }
}
customElements.define("goroom-page", GoRoom);