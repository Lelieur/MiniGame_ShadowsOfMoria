const Game = {

    gameSize: {
        width: window.innerWidth,
        height: window.innerHeight
    },

    framesCounter: 0,

    background: undefined,
    player: undefined,
    enemies: [],
    bulletColisionIndex: undefined,

    enemiesDensity: 300,

    keys: {
        RIGHT: 'ArrowRight',
        LEFT: 'ArrowLeft',
        UP: 'ArrowUp',
        DOWN: 'ArrowDown',
        SHOOT: 'Space'
    },

    init() {
        this.setDimensions()
        this.setEventListeners()
        this.start()
    },

    setDimensions() {
        document.querySelector("#game-screen").style.width = `${this.gameSize.width}px`
        document.querySelector("#game-screen").style.height = `${this.gameSize.height}px`
    },

    setEventListeners() {

        document.onkeydown = event => {
            switch (event.code) {
                case this.keys.RIGHT:
                    this.player.moveRight()
                    break;
                case this.keys.LEFT:
                    this.player.moveLeft()
                    break;
                case this.keys.UP:
                    this.player.moveUp()
                    break;
                case this.keys.DOWN:
                    this.player.moveDown()
                    break;
                case this.keys.SHOOT:
                    this.player.shoot()
                    break;
            }
        }
    },

    start() {
        this.createElements()
        this.startGameLoop()
    },

    createElements() {
        this.background = new Background(this.gameSize)
        this.player = new Player(this.gameSize, this.bulletColisionIndex)
    },

    startGameLoop() {

        setInterval(() => {
            if (this.framesCounter > 5000) {
                this.framesCounter = 0
            } else {
                this.framesCounter++
            }

            this.moveAll()
            this.clearAll()
            this.generateEnemies()

            if (this.isCollision()) this.gameOver()


        }, 10)

    },

    moveAll() {
        this.player.move()
        this.enemies.forEach(eachEnemy => eachEnemy.move())
    },

    generateEnemies() {
        if (this.framesCounter % this.enemiesDensity === 0) {
            const newEnemy = new Enemies(this.gameSize, this.playerPosition, this.playerSize)
            this.enemies.push(newEnemy)
        }
    },


    clearAll() {

        this.enemies.forEach((eachEnemy, index) => {
            if (
                eachEnemy.enemyPositionAbsolute.left + eachEnemy.enemySize.width <= 0 ||
                eachEnemy.enemyPositionAbsolute.top + eachEnemy.enemySize.height <= 0 ||
                eachEnemy.enemyPositionAbsolute.left >= this.gameSize.width ||
                eachEnemy.enemyPositionAbsolute.top >= this.gameSize.height ||
                this.isEnemyDistroyed()
            ) {
                this.enemies.splice(index, 1)
                eachEnemy.enemyElement.remove()
            }
        })

        this.player.bullets.forEach((eachBullet, bulletColisionIndex) => {

            if (this.bulletColisionIndex >= 0) {

                this.player.bullets.splice(bulletColisionIndex, 1)
                eachBullet.bulletElement.remove()
                this.bulletColisionIndex = undefined
            }
        })
    },

    isCollision() {
        for (let i = 0; i < this.enemies.length; i++) {

            if (
                this.player.playerPosition.left + this.player.playerSize.width >= this.enemies[i].enemyPositionAbsolute.left &&
                this.player.playerPosition.top + this.player.playerSize.height >= this.enemies[i].enemyPositionAbsolute.top &&
                this.player.playerPosition.left <= this.enemies[i].enemyPositionAbsolute.left + this.enemies[i].enemySize.width &&
                this.player.playerPosition.top <= this.enemies[i].enemyPositionAbsolute.top + this.enemies[i].enemySize.height
            ) {
                return true
            }
        }
    },

    isEnemyDistroyed() {

        for (let i = 0; i < this.enemies.length; i++) {

            for (let j = 0; j < this.player.bullets.length; j++) {

                if (
                    this.player.bullets[j].bulletPosition.left + this.player.bullets[j].bulletSize.width >= this.enemies[i].enemyPositionAbsolute.left &&
                    this.player.bullets[j].bulletPosition.top + this.player.bullets[j].bulletSize.height >= this.enemies[i].enemyPositionAbsolute.top &&
                    this.player.bullets[j].bulletPosition.left <= this.enemies[i].enemyPositionAbsolute.left + this.enemies[i].enemySize.width &&
                    this.player.bullets[j].bulletPosition.top <= this.enemies[i].enemyPositionAbsolute.top + this.enemies[i].enemySize.height
                ) {
                    this.bulletColisionIndex = j
                    return true
                }
            }
        }
    },

    gameOver() {
        alert('MORITSTE')
    }

}