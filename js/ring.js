class Ring {
    constructor(gameSize, playerPosition, playerSize) {

        this.gameSize = gameSize
        this.playerPosition = playerPosition
        this.playerSize = playerSize

        this.ringSize = {
            width: 50,
            height: 30.47
        }
        this.ringPosition = {
            left: Math.random() * this.gameSize.width,
            top: Math.random() * this.gameSize.height,
        }

        this.init()
    }

    init() {

        this.ringElement = document.createElement('img')
        this.ringElement.src = "./img/anillo.gif"

        this.ringElement.style.position = "absolute"

        this.ringElement.style.width = `${this.ringSize.width}px`
        this.ringElement.style.height = `${this.ringSize.height}px`

        this.ringElement.style.top = `${this.ringPosition.top}px`
        this.ringElement.style.left = `${this.ringPosition.left}px`

        document.querySelector('#game-screen').appendChild(this.ringElement)

    }
}