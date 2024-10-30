class Bullets {

    constructor(playerPosition, playerSize, playerDirection) {

        this.playerPosition = playerPosition
        this.playerSize = playerSize
        this.playerDirection = playerDirection

        this.bulletSize = {
            width: 20,
            height: 20
        }

        this.bulletPosition = {}

        if (this.playerDirection === "right" || !this.playerDirection) {
            this.bulletPosition = {
                left: this.playerPosition.left + this.playerSize.width,
                top: this.playerPosition.top + this.playerSize.height / 2 - this.bulletSize.height / 2
            }
        }

        if (this.playerDirection === "left") {
            this.bulletPosition = {
                left: this.playerPosition.left - this.bulletSize.width,
                top: this.playerPosition.top + this.playerSize.height / 2 - this.bulletSize.height / 2
            }
        }

        if (this.playerDirection === "up") {
            this.bulletPosition = {
                left: this.playerPosition.left + this.playerSize.width / 2 - this.bulletSize.width / 2,
                top: this.playerPosition.top - this.bulletSize.height
            }
        }

        if (this.playerDirection === "down") {
            this.bulletPosition = {
                left: this.playerPosition.left + this.playerSize.width / 2 - this.bulletSize.width / 2,
                top: this.playerPosition.top + this.playerSize.height
            }
        }


        this.bulletVel = 5

        this.init()
    }


    init() {

        this.bulletElement = document.createElement("img")
        this.bulletElement.src = "./img/piedra.png"

        this.bulletElement.style.position = "absolute"
        this.bulletElement.style.borderRadius = "50%"
        this.bulletElement.style.backgroundColor = "purple"

        this.bulletElement.style.width = `${this.bulletSize.width}px`
        this.bulletElement.style.height = `${this.bulletSize.height}px`

        this.bulletElement.style.left = `${this.bulletPosition.left}px`
        this.bulletElement.style.top = `${this.bulletPosition.top}px`

        document.querySelector("#game-screen").appendChild(this.bulletElement)
    }


    move() {

        if (this.playerDirection === "right" || !this.playerDirection) this.bulletPosition.left += this.bulletVel
        if (this.playerDirection === "left") this.bulletPosition.left -= this.bulletVel
        if (this.playerDirection === "up") this.bulletPosition.top -= this.bulletVel
        if (this.playerDirection === "down") this.bulletPosition.top += this.bulletVel

        this.updatePosition()
    }

    updatePosition() {
        this.bulletElement.style.left = `${this.bulletPosition.left}px`
        this.bulletElement.style.top = `${this.bulletPosition.top}px`
    }
}