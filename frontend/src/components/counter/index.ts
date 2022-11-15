export function initCounter() {
    class CounterElement extends HTMLElement {
        shadow = this.attachShadow({ mode: 'open' })
        constructor() {
            super();

        }
        connectedCallback() {
            this.render()
        }
        counter() {
            let contador = 4
            let interval = setInterval(() => {
                contador--
                if (contador == 3) {

                    let shadow = this.shadow.querySelector(".counter")
                    shadow.textContent = "3"
                } else if (contador == 2) {

                    let shadow = this.shadow.querySelector(".counter")
                    shadow.textContent = "2"

                } else if (contador == 1) {

                    let shadow = this.shadow.querySelector(".counter")
                    shadow.textContent = "1"

                } else { clearInterval(interval) }


            }, 1000);
            return interval;
        };
        render() {
            this.counter()
            var style = document.createElement('style');
            style.textContent = `
            *{
                box-sizing: border-box;
            }
            .circulo {
                width: 15rem;
                height: 15rem;
                border-radius: 50%;
                background-color: color|transparent|initial|inherit;
                opacity: 1;
                border:solid 20px black;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin:0px auto;
                padding:3%;
            }
            .counter{
                width:100%;
                color:black;
                font-size:150px;
                font-family:"Odibee Sans";
                text-align: center;
            }
            `;


            this.shadow.appendChild(style)

            var div = document.createElement("div")
            div.classList.add("counter")
            div.classList.add("circulo")


            this.shadow.appendChild(div)
        }
    }
    customElements.define('counter-comp', CounterElement);
}    