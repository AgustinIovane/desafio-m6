export function initText() {
    class TextElement extends HTMLElement {
        constructor() {
            super();

        }
        connectedCallback() {
            this.render()
        }

        render() {
            const variant = this.getAttribute("variant") || "body"
            var style = document.createElement('style');
            style.textContent = `
            *{
                box-sizing: border-box;
            }
            
            .title{
                font-size: 80px;
                font-weight: bold;
                font-family: 'Odibee Sans', cursive;;
                color:#009048;
                text-align:center;
            }
            .body{
                font-size: 40px;
                font-family: 'Odibee Sans', cursive;;
                color:#000000;
                text-align:center;
            }
            .tie{
                font-size: 90px;
                font-weight: bold;
                font-family: 'Odibee Sans', cursive;;
                color:black;
                text-align:center;
                margin-bottom:20px;
                text-decoration: underline;    
            }
           
            
            `;

            var shadow = this.attachShadow({ mode: 'open' });
            shadow.appendChild(style)

            var div = document.createElement("div")
            div.className = variant;
            div.textContent = this.textContent;



            shadow.appendChild(div)
        }
    }
    customElements.define('text-comp', TextElement);
}