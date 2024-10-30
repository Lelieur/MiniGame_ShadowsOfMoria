class Player {

    constructor(gameSize, totalLives) {

        this.gameSize = gameSize
        this.totalLives = totalLives

        this.bullets = []

        this.playerSize = {
            width: 50,
            height: 97
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

        this.init()

    }


    init() {

        this.playerElement = document.createElement("img")
        this.playerElement.src = "./img/character.png"

        this.playerElement.style.position = "absolute"
        this.playerElement.style.width = `${this.playerSize.width}px`
        this.playerElement.style.height = `${this.playerSize.height}px`
        this.playerElement.style.top = `${this.playerPosition.top}px`
        this.playerElement.style.left = `${this.playerPosition.left}px`
        this.playerElement.style.zIndex = `990`

        document.querySelector("#game-screen").appendChild(this.playerElement)

        this.createLifeBar()
    }

    createLifeBar() {
        this.lifeBar = new LifeBar(this.playerPosition, this.playerSize, this.playerVel, this.totalLives)
    }

    move() {

        this.lifeBar.move()
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
            this.lifeBar.moveLeft()
        }
        this.playerDirection = "left"
    }

    moveRight() {
        if (this.playerPosition.left <= this.gameSize.width - this.playerSize.width) {
            this.playerPosition.left += this.playerVel.left
            this.lifeBar.moveRight()
        }
        this.playerDirection = "right"
    }

    moveUp() {
        if (this.playerPosition.top >= 0) {
            this.playerPosition.top -= this.playerVel.top
            this.lifeBar.moveUp()
        }
        this.playerDirection = "up"
    }

    moveDown() {
        if (this.playerPosition.top <= this.gameSize.height - this.playerSize.height) {
            this.playerPosition.top += this.playerVel.top
            this.lifeBar.moveDown()
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

    setOpacity(level) {
        this.playerElement.style.opacity = level
    }
}