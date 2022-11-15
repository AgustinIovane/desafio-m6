import { Router } from "@vaadin/router";
import { state } from "../../state";

export class Play extends HTMLElement {
    connectedCallback() {
        this.render();
        const piedra = document.querySelector(".piedra");
        const papel = document.querySelector(".papel");
        const tijeras = document.querySelector(".tijeras");
        const counter = document.querySelector(".counter");

        const hand1 = document.querySelector(".hand1");
        const hand2 = document.querySelector(".hand2");
        const hand3 = document.querySelector(".hand3");

        window.addEventListener("beforeunload", function (event) {
            state.playerOffline();
            state.playerNotReady();
        });

        piedra.addEventListener("click", () => {
            state.setChoice("piedra");
            state.playerChoice();

            papel.classList.add("displayNone");
            tijeras.classList.add("displayNone");
            piedra.classList.add("displayNone");
            counter.classList.add("displayNone");

            hand1.classList.replace("displayNone", "display");
            hand1.classList.add("userAnimation");
            hand2.classList.replace("displayNone", "opacity");
            hand3.classList.replace("displayNone", "opacity");
        });
        papel.addEventListener("click", () => {
            state.setChoice("papel");
            state.playerChoice();

            papel.classList.add("displayNone");
            tijeras.classList.add("displayNone");
            piedra.classList.add("displayNone");
            counter.classList.add("displayNone");

            hand2.classList.replace("displayNone", "display");
            hand2.classList.add("userAnimation");
            hand1.classList.replace("displayNone", "opacity");
            hand3.classList.replace("displayNone", "opacity");
        });
        tijeras.addEventListener("click", () => {
            state.setChoice("tijeras");
            state.playerChoice();

            papel.classList.add("displayNone");
            tijeras.classList.add("displayNone");
            piedra.classList.add("displayNone");
            counter.classList.add("displayNone");

            hand3.classList.replace("displayNone", "display");
            hand3.classList.add("userAnimation");
            hand1.classList.replace("displayNone", "opacity");
            hand2.classList.replace("displayNone", "opacity");
        });
        setTimeout(() => {
            Router.go("/plays");
        }, 5000);
    }

    render() {
        this.innerHTML = `
    
    <div class="container">
    <div  class="counter"><counter-comp></counter-comp></div>
    
    <div class="desktop"><div class="move-container">
        <div class="displayNone hand1 "><piedra-mov></piedra-mov></div>
        <div class="displayNone hand2 "><papel-mov class="pepe" variant=""></papel-mov></div>
        <div class="displayNone hand3 "><tijeras-mov></tijeras-mov></div></div></div>
    <div class="desktop"><div class="move-container">
        <div class="hand piedra"><piedra-mov></piedra-mov></div>
        <div class="hand papel"><papel-mov class="pepe" variant=""></papel-mov></div>
        <div class="hand tijeras"><tijeras-mov></tijeras-mov></div></div></div>
        
        </div>
        
        `;
        const style = document.createElement("style");
        style.innerHTML = `
    *{
      box-sizing: border-box;
  }
  .userAnimation{
    animation-duration: 1s;
    animation-name: toTop;
  }
  .counter{
    color:red;
    margin-top:20vh;
    width:15rem;  
}
  @keyframes toTop {
    from {
        margin-top: 25%;
    }
  
    to {
        margin-bottom: 100px;
    }
  }
  body{
    margin:0;
  
  }
   .opacity{
    display:inherit;
    opacity: 0.5;
    
   }
   .hand2{
   }
   .displayNone{
     display:none;
   }
   .displayOn{
     display:inherit;
     
   }
    .contenedor{
      display: flex;
      height: 100vh;
      flex-direction: column;
      justify-content: flex-start;
      gap:50px;
      align-items: center;
      background-color:#646562;
      font-weight: bold;
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
}`;

        this.appendChild(style);
    }
}

customElements.define("play-page", Play);