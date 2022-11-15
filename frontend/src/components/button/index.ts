export function initButton() {
    class ButtonElement extends HTMLElement {
        constructor() {
            super();
        }
        connectedCallback() {
            this.render();
        }
        render() {
            const content = this.textContent;
            const variant = this.getAttribute("variant") || "size";
            var style = document.createElement("style");
            style.textContent = `
              *{
                  box-sizing: border-box;
              }
              .size{
                font-size:45px;
              }
              
              .button{
                  width:100%;
                  color:#D8FCFC;
                  background-color: #006CFC;
                  border:10px solid #001997;
                  font-size:45px;
                  font-family:"Odibee Sans";
                  border-radius: 10px;
                  cursor: pointer;
                  
              }
              .button:hover {
                  background-color: #2f44ad;
                }
              `;

            var shadow = this.attachShadow({ mode: "open" });
            shadow.appendChild(style);

            var div = document.createElement("button");

            div.classList.add("button");
            div.innerText = content;
            div.style.fontSize = variant;

            shadow.appendChild(div);
        }
    }
    customElements.define("button-comp", ButtonElement);
}