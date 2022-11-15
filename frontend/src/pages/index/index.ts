import { Router } from "@vaadin/router";
import { state } from "../../state";

export class Index extends HTMLElement {
  connectedCallback() {
    this.render();
    const newGame = document.querySelector(".newGame");
    const goToRoom = document.querySelector(".GoToRoom");

    window.addEventListener("beforeunload", function (event) {
      console.log("Me cierro");
    });

    newGame.addEventListener("click", () => {
      Router.go("/register");
    });
    goToRoom.addEventListener("click", () => {
      Router.go("/registerRoom");
    });
  }
  styles() { }
  render() {
    this.innerHTML = `
    <div class="container">
    
        <div class="text-container">
          <text-comp variant="title">Piedra Papel ó Tijeras</text-comp>
        </div>
        
        <div class="buttom-container">
                <div class="gap"><button-comp variant="35px" class="gap newGame">Nuevo Juego</button-comp></div>
                <button-comp  variant="35px" class=" GoToRoom">Ingresar a una sala</button-comp>
        </div>  
        <div class="desktop"><div class="move-container">
        <div class="hand "><tijeras-mov></tijeras-mov></div>
        <div class="hand "><piedra-mov></tijeras-mov></div>
        <div class="hand "><papel-mov></tijeras-mov></div></div></div>
        
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
`;

    this.appendChild(style);
  }
}
customElements.define("index-page", Index);