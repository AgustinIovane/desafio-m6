import { Router } from "@vaadin/router";
import { state } from "../../state";

export class RegisterNameRoom extends HTMLElement {
    connectedCallback() {
        this.render();
        const label = document.querySelector(".label");
        const boton = document.querySelector(".boton");
        const form = document.querySelector(".form");
        const input = document.querySelector(".input");
        const loading = document.querySelector(".loading");

        const atras = document.querySelector(".atras");
        atras.addEventListener("click", () => {
            Router.go("/");
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            boton.classList.add("display");
            label.classList.add("display");
            input.classList.add("display");
            loading.classList.replace("display", "cargando");
            const targete = e.target as any;

            if (targete.nombre.value == "") {
                window.alert("No se ingreso un nombre");
                Router.go("/");
            } else {
                state.setName(targete.nombre.value);
            }

            state.userToRoom(() => {
                Router.go("/goRoom");
            });
        });
    }
    render() {
        this.innerHTML = `
    <div class="container">
    <button-comp variant="30px" class="atras">←</button-comp>
    <div class="text-container">
      <text-comp variant="title">Piedra Papel ó Tijeras</text-comp>
    </div>
        <div>
        <text-comp class="display loading" variant="body">Cargando..</text-comp>
            <form class="form">
            
            <div class="label-container gap"><label class="label">Tu nombre</label></div>
                <input class="input" type="text" autocomplete="off" maxlength="10" minlength="1" name="nombre" >
                <button class="botonAnim boton">Enviar</button>
                
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
   .cargando{
    display: inherit;
    font-size: 100px;
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
  .display{
    display: none;
}
  .label{
    font-size:24px;
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
   .asd{
    font-size: 20px;
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
 
.display{
 display: none;
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
customElements.define("registerroom-page", RegisterNameRoom);