const tijeras = require("url:../../img/tijeras.png");


export function initTijeras() {
    class TijerasMov extends HTMLElement {
        shadow = this.attachShadow({ mode: 'open' });
        constructor() {
            super();
        }

        connectedCallback() {
            this.render();

        }



        render() {
            let style = document.createElement('style');
            style.textContent = `
            *{
                box-sizing: border-box;
            }
            
            .container{
                width:100%;
                
                
            }
           
            
            .img{
                width:100%;
                height: 190px;
                cursor: pointer;
            }
            @media (min-width: 769px) {
                .img{
               width:100%;
               height: 250px;
               
           }
           .img:hover {
            height: 300px;
          }
           }
            `;
            this.shadow.appendChild(style);

            let div = document.createElement("div")
            div.classList.add("conteiner")

            div.innerHTML = `
                <div class="move-container">
                    <div>
                    <img src=${tijeras} class="img" who="tijeras">
                    </div>
                </div>
            
            `



            this.shadow.appendChild(div)
        }
    }
    customElements.define('tijeras-mov', TijerasMov);

}