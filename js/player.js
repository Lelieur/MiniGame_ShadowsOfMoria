class Player {

    constructor(gameSize) {

        this.gameSize = gameSize;

        this.bullets = []

        this.playerSize = {
            width: 100,
            height: 100
        }

        this.playerPosition = {
            left: (this.gameSize.width / 2) - (this.playerSize.width / 2),
            top: (this.gameSize.height / 2) - (this.playerSize.height / 2)
        }

        this.playerVel = {
            left: 35,
            top: 35,
        }

        this.playerDirection = undefined

        this.playerColor = "black"

        this.init()

    }


    init() {
        this.playerElement = document.createElement("div")

        this.playerElement.style.position = "absolute"
        this.playerElement.style.width = `${this.playerSize.width}px`
        this.playerElement.style.height = `${this.playerSize.height}px`
        this.playerElement.style.top = `${this.playerPosition.top}px`
        this.playerElement.style.left = `${this.playerPosition.left}px`
        this.playerElement.style.backgroundColor = `${this.playerColor}`

        document.querySelector("#game-screen").appendChild(this.playerElement)
    }

    move() {
        this.updatePosition()

        this.bullets.forEach(eachBullet => eachBullet.move())
        this.clearBullets()
    }


    updatePosition() {
        this.playerElement.style.top = `${this.playerPosition.top}px`
        this.playerElement.style.left = `${this.playerPosition.left}px`
    }


    moveLeft() {
        if (this.playerPosition.left >= 0) {
            this.playerPosition.left -= this.playerVel.left
        }
        this.playerDirection = "left"
    }

    moveRight() {
        if (this.playerPosition.left <= this.gameSize.width - this.playerSize.width) {
            this.playerPosition.left += this.playerVel.left
        }
        this.playerDirection = "right"

    }

    moveUp() {
        if (this.playerPosition.top >= 0) {
            this.playerPosition.top -= this.playerVel.top
        }
        this.playerDirection = "up"

    }

    moveDown() {
        if (this.playerPosition.top <= this.gameSize.height - this.playerSize.height) {
            this.playerPosition.top += this.playerVel.top
        }
        this.playerDirection = "down"

    }

    shoot() {
        this.bullets.push(new Bullets(this.playerPosition, this.playerSize, this.playerDirection));
    }

    clearBullets() {
        this.bullets.forEach((eachBullet, index) => {
            if (
                eachBullet.bulletPosition.left >= this.gameSize.width ||
                eachBullet.bulletPosition.left + eachBullet.bulletSize.width <= 0 ||
                eachBullet.bulletPosition.top + eachBullet.bulletSize.height <= 0 ||
                eachBullet.bulletPosition.top >= this.gameSize.height ||
                this.bulletColisionIndex
            ) {
                this.bullets.splice(index, 1)
                eachBullet.bulletElement.remove()
            }
        })
    }

}