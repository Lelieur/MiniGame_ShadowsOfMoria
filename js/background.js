class Background {
    constructor(gameSize) {

        this.backgroundSize = {
            width: gameSize.width,
            heigth: gameSize.heigth
        }

        this.backgroundPosition = {
            left: 0,
            top: 0
        }

        this.init()


    }
    init() {

        this.backgroundElement = document.createElement("img")
        this.backgroundElement.src = "./img/fondo.webp"

        this.backgroundElement.style.width = `${this.backgroundSize.width}px`
        this.backgroundElement.style.height = `${this.backgroundSize.heigth}px`
        this.backgroundElement.style.top = `${this.backgroundSize.top}px`
        this.backgroundElement.style.left = `${this.backgroundSize.left}px`
        this.backgroundElement.style.zIndex = "-999"

        document.querySelector("#game-screen").appendChild(this.backgroundElement)



    }
}