class BigEnemies {

    constructor(gameSize, playerPosition, playerSize) {

        this.gameSize = gameSize
        this.playerPosition = playerPosition
        this.playerSize = playerSize

        this.direction = undefined
        this.lives = 10

        this.bigEnemySize = {
            width: 300,
            height: 320
        }

        this.bigEnemyPosition = [
            {
                left: Math.random() * this.gameSize.width,
                top: 0 - this.bigEnemySize.height,
                direction: 'down'
            },
            {
                left: this.gameSize.width,
                top: Math.random() * this.gameSize.height,
                direction: 'left'
            },
            {
                left: Math.random() * this.gameSize.width,
                top: this.gameSize.height,
                direction: 'up'
            },
            {
                left: 0 - this.bigEnemySize.width,
                top: Math.random() * this.gameSize.height,
                direction: 'right'
            }
        ]

        this.bigEnemyPositionAbsolute = this.bigEnemyPosition[Math.round(Math.random() * (this.bigEnemyPosition.length - 1))]

        this.direction = this.bigEnemyPositionAbsolute.direction

        this.bigEnemyVel = 0.5

        this.init()
    }

    init() {

        this.bigEnemyElement = document.createElement('img')
        this.bigEnemyElement.src = "./img/troll.png"

        this.bigEnemyElement.style.position = "absolute"

        this.bigEnemyElement.style.width = `${this.bigEnemySize.width}px`
        this.bigEnemyElement.style.height = `${this.bigEnemySize.height}px`

        this.bigEnemyElement.style.top = `${this.bigEnemyPositionAbsolute.top}px`
        this.bigEnemyElement.style.left = `${this.bigEnemyPositionAbsolute.left}px`

        document.querySelector('#game-screen').appendChild(this.bigEnemyElement)
    }

    move() {
        if (this.direction === "down") this.bigEnemyPositionAbsolute.top += this.bigEnemyVel
        if (this.direction === "right") this.bigEnemyPositionAbsolute.left += this.bigEnemyVel
        if (this.direction === "left") this.bigEnemyPositionAbsolute.left -= this.bigEnemyVel
        if (this.direction === "up") this.bigEnemyPositionAbsolute.top -= this.bigEnemyVel
        this.updatePosition()
    }

    updatePosition() {
        this.bigEnemyElement.style.left = `${this.bigEnemyPositionAbsolute.left}px`
        this.bigEnemyElement.style.top = `${this.bigEnemyPositionAbsolute.top}px`
    }
}