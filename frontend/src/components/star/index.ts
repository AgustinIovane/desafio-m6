const starLoose = require("url:../../img/starLoose.png");
const starWin = require("url:../../img/starWin.png");
export function initStar() {
    class Star extends HTMLElement {
        constructor() {
            super();
        }
        connectedCallback() {
            this.render();
        }
        render() {
            const variant = this.getAttribute("variant");
            var style = document.createElement("style");
            style.textContent = `
            *{
                box-sizing: border-box;
            }
            .contenedor{
                position: relative;
                display: inline-block;
                text-align: center;
                width: 100%;
            }
            
            
            .centrado{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-family: 'Odibee Sans', cursive;;
                font-size: 50px;
                color: #FFFFFF;
            }
            `;
            let content = this.textContent;

            var shadow = this.attachShadow({ mode: "open" });
            shadow.appendChild(style);

            let star = "";
            if (variant == "win") {
                star = starWin;
            } else {
                star = starLoose;
            }

            var div = document.createElement("div");
            div.innerHTML = `<div class="contenedor">
            <img src=${star} />
        
            <div class="centrado">${content}</div>
          </div>`;

            shadow.appendChild(div);
        }
    }
    customElements.define("star-comp", Star);
}