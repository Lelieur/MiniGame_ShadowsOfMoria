class LifeBar {

    constructor(playerPosition, playerSize, playerVel, totalLives) {

        this.playerPosition = playerPosition
        this.playerSize = playerSize
        this.playerVel = playerVel
        this.totalLives = totalLives

        this.fullTotalBarSize = 200

        this.lifeBarSize = {
            width: this.fullTotalBarSize,
            height: 15
        }

        this.lifeBarPosition = {
            left: this.playerPosition.left - this.fullTotalBarSize / 2 + this.playerSize.width / 2,
            top: this.playerPosition.top + this.playerSize.height + 20
        }

        this.backgroundColor = "green"

        this.init()
    }

    init() {

        this.lifeBarElementContainer = document.createElement("div")

        this.lifeBarElementContainer.style.position = "absolute"
        this.lifeBarElementContainer.style.display = "flex"
        this.lifeBarElementContainer.style.justifyContent = "space-around"
        this.lifeBarElementContainer.style.alignItems = "center"
        this.lifeBarElementContainer.style.width = `${this.lifeBarSize.width}px`
        this.lifeBarElementContainer.style.height = `${this.lifeBarSize.height}px`
        this.lifeBarElementContainer.style.left = `${this.lifeBarPosition.left}px`
        this.lifeBarElementContainer.style.top = `${this.lifeBarPosition.top}px`
        this.lifeBarElementContainer.classList = "contenedor-barra"

        document.querySelector("#game-screen").appendChild(this.lifeBarElementContainer)



        this.lifeBarElement = document.createElement("div")

        this.lifeBarElement.style.position = "absolute"
        this.lifeBarElement.style.zIndex = `900`
        this.lifeBarElement.style.backgroundColor = `${this.backgroundColor}`
        this.lifeBarElement.style.width = `${this.lifeBarSize.width}px`
        this.lifeBarElement.style.height = `${this.lifeBarSize.height}px`
        this.lifeBarElement.style.borderStyle = "solid"
        this.lifeBarElement.style.borderColor = "#59382e"
        this.lifeBarElement.style.borderWidth = "3px"
        this.lifeBarElement.style.borderRadius = `10px`

        document.querySelector(".contenedor-barra").appendChild(this.lifeBarElement)
    }

    receivingDamage(newTotalLife) {

        this.lifeBarSize.width = this.fullTotalBarSize * (newTotalLife / this.totalLives)

        if (newTotalLife >= this.totalLives * 0.5 && newTotalLife <= this.totalLives * 0.75) this.backgroundColor = "yellow"
        if (newTotalLife >= this.totalLives * 0.25 && newTotalLife <= this.totalLives * 0.5) this.backgroundColor = "orange"
        if (newTotalLife <= this.totalLives * 0.25) this.backgroundColor = "red"

        this.updateSize()
        this.updateColor()
    }

    move() {
        this.updatePosition()
    }

    updatePosition() {
        this.lifeBarElementContainer.style.top = `${this.lifeBarPosition.top}px`
        this.lifeBarElementContainer.style.left = `${this.lifeBarPosition.left}px`
    }

    updateSize() {
        this.lifeBarElement.style.width = `${this.lifeBarSize.width}px`
    }

    updateColor() {
        this.lifeBarElement.style.backgroundColor = `${this.backgroundColor}`
    }

    moveLeft() {
        this.lifeBarPosition.left -= this.playerVel.left
    }

    moveRight() {
        this.lifeBarPosition.left += this.playerVel.left
    }

    moveUp() {
        this.lifeBarPosition.top -= this.playerVel.top
    }

    moveDown() {
        this.lifeBarPosition.top += this.playerVel.top
    }
}
