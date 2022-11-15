const papel = require("url:../../img/papel.png");
export function initPapel() {
    class PiedraMov extends HTMLElement {
        shadow = this.attachShadow({ mode: "open" });
        constructor() {
            super();
        }

        connectedCallback() {
            this.render();
        }

        render() {
            let style = document.createElement("style");

            style.textContent = `
            *{
                box-sizing: border-box;
            }
            .body{}
            
            .img{
                width:100%;
                height: 190px;
                cursor: pointer;
            }
            
            
            .active{
                height: 500px;
                color: aqua;
                margin:20px;
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

            let div = document.createElement("div");

            div.innerHTML = `
                <div class="move-container">
                    <div >
                        <img src=${papel} class="img" >
                    </div>
                </div>
            
            `;

            this.shadow.appendChild(div);
        }
    }
    customElements.define("papel-mov", PiedraMov);
}