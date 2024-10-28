class Enemies {

    constructor(gameSize, playerPosition, playerSize) {

        this.gameSize = gameSize
        this.playerPosition = playerPosition
        this.playerSize = playerSize

        this.direction = undefined

        this.enemySize = {
            width: 100,
            height: 100
        }

        this.enemyPosition = [
            {
                left: Math.random() * this.gameSize.width,
                top: 0,
                direction: 'down'
            },
            {
                left: this.gameSize.width - this.enemySize.width,
                top: Math.random() * this.gameSize.height,
                direction: 'left'
            },
            {
                left: Math.random() * this.gameSize.width,
                top: this.gameSize.height - this.enemySize.height,
                direction: 'up'
            },
            {
                left: 0,
                top: Math.random() * this.gameSize.height,
                direction: 'right'
            }
        ]

        this.enemyPositionAbsolute = this.enemyPosition[Math.round(Math.random() * (this.enemyPosition.length - 1))]

        this.direction = this.enemyPositionAbsolute.direction

        this.enemyVel = 2


        this.init()
    }

    init() {

        this.enemyElement = document.createElement('div')

        this.enemyElement.style.position = "absolute"
        this.enemyElement.style.backgroundColor = "yellow"

        this.enemyElement.style.width = `${this.enemySize.width}px`
        this.enemyElement.style.height = `${this.enemySize.height}px`

        this.enemyElement.style.top = `${this.enemyPositionAbsolute.top}px`
        this.enemyElement.style.left = `${this.enemyPositionAbsolute.left}px`

        document.querySelector('#game-screen').appendChild(this.enemyElement)


    }

    move() {


        if (this.direction === "down") {
            this.enemyPositionAbsolute.top += this.enemyVel
        }

        if (this.direction === "right") {
            this.enemyPositionAbsolute.left += this.enemyVel
        }

        if (this.direction === "left") {
            this.enemyPositionAbsolute.left -= this.enemyVel
        }

        if (this.direction === "up") {
            this.enemyPositionAbsolute.top -= this.enemyVel
        }

        this.updatePosition()
    }

    updatePosition() {
        this.enemyElement.style.left = `${this.enemyPositionAbsolute.left}px`
        this.enemyElement.style.top = `${this.enemyPositionAbsolute.top}px`

    }


}