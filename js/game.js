const Game = {

    gameSize: {
        width: window.innerWidth,
        height: window.innerHeight
    },

    backgroundMusic: new Audio("./audio/banda-sonora.mp3"),
    enemyDeadSound: new Audio("./audio/enemy-dead.mp3"),
    trollSound: new Audio("./audio/troll-sound.mp3"),
    rockImpactSound: new Audio("./audio/rock-impact.mp3"),

    framesCounter: 0,

    background: undefined,
    player: undefined,
    stats: undefined,

    enemies: [],
    bigEnemies: [],
    ring: undefined,

    bulletColisionIndex: undefined,

    enemiesDensity: 300,
    bigEnemiesDensity: 1000,
    ringDensity: 1000,

    canCollide: true,
    inmunityFrames: 500,

    totalLives: 10000,
    totalPoints: 0,
    maxPoints: localStorage.getItem('maxPoints'),



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
        this.backgroundMusic.play()
        this.backgroundMusic.volume = 0.3
        this.backgroundMusic.loop = true

        this.createElements()
        this.startGameLoop()
    },

    createElements() {
        this.background = new Background(this.gameSize)
        this.player = new Player(this.gameSize, this.totalLives)
        this.stats = new Stats(this.gameSize, this.totalLives, this.totalPoints, this.maxPoints)
    },

    startGameLoop() {

        setInterval(() => {
            if (this.framesCounter > 5000) {
                this.framesCounter = 0
            }
            else {
                this.framesCounter++
            }

            this.moveAll()
            this.clearAll()
            this.generateEnemies()
            this.generateRing()
            this.handleInmunity()
            this.updateStats()
            this.isCollision()

        }, 10)

    },

    moveAll() {
        this.player.move()
        this.enemies.forEach(eachEnemy => eachEnemy.move())
        this.bigEnemies.forEach(eachBigEnemy => eachBigEnemy.move())
    },

    generateEnemies() {
        if (this.framesCounter % this.enemiesDensity === 0) {
            const newEnemy = new Enemies(this.gameSize, this.playerPosition, this.playerSize)
            this.enemies.push(newEnemy)
        } else if (this.framesCounter % this.bigEnemiesDensity === 0) {
            const newBigEnemy = new BigEnemies(this.gameSize, this.playerPosition, this.playerSize)
            this.bigEnemies.push(newBigEnemy)
            this.trollSound.play()
        }
    },

    generateRing() {
        if (this.canCollide && this.framesCounter % this.ringDensity === 0) {
            const newRing = new Ring(this.gameSize, this.playerPosition, this.playerSize)
            this.ring = newRing
            this.ringDensity = undefined
        }
    },

    clearAll() {

        if (this.isRingCollected()) {
            this.canCollide = false
            this.ring.ringElement.remove()
            this.ring = undefined
            this.handleInmunity()
        }

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

        this.bigEnemies.forEach((eachBigEnemy, index) => {
            if (
                eachBigEnemy.bigEnemyPositionAbsolute.left + eachBigEnemy.bigEnemySize.width <= 0 ||
                eachBigEnemy.bigEnemyPositionAbsolute.top + eachBigEnemy.bigEnemySize.height <= 0 ||
                eachBigEnemy.bigEnemyPositionAbsolute.left >= this.gameSize.width ||
                eachBigEnemy.bigEnemyPositionAbsolute.top >= this.gameSize.height ||
                this.isBigEnemyDistroyed()
            ) {
                this.bigEnemies.splice(index, 1)
                eachBigEnemy.bigEnemyElement.remove()
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

    handleInmunity() {

        if (!this.canCollide && this.inmunityFrames > 0) {
            this.inmunityFrames--
            this.player.setOpacity(0.5)
        } else if (!this.canCollide && this.inmunityFrames === 0) {
            this.inmunityFrames = 500
            this.canCollide = true
            this.player.setOpacity(1)
            this.ringDensity = 1000
        }
    },

    updateStats() {
        this.stats.update()
        this.stats.updatePoints(this.totalPoints)
        this.stats.updateLives(this.totalLives)
    },

    increasePoints(points) {
        this.totalPoints += points
        localStorage.setItem('maxPoints', this.totalPoints)
    },

    decreaseLives(lives) {

        if (this.canCollide) {
            this.totalLives -= lives
            this.player.lifeBar.receivingDamage(this.totalLives)
        }

        if (this.totalLives <= 0) {
            this.gameOver()
        }
    },

    isCollision() {
        for (let i = 0; i < this.enemies.length; i++) {

            if (
                this.player.playerPosition.left + this.player.playerSize.width >= this.enemies[i].enemyPositionAbsolute.left &&
                this.player.playerPosition.top + this.player.playerSize.height >= this.enemies[i].enemyPositionAbsolute.top &&
                this.player.playerPosition.left <= this.enemies[i].enemyPositionAbsolute.left + this.enemies[i].enemySize.width &&
                this.player.playerPosition.top <= this.enemies[i].enemyPositionAbsolute.top + this.enemies[i].enemySize.height
            ) {
                this.decreaseLives(15)
                return true
            }
        }

        for (let i = 0; i < this.bigEnemies.length; i++) {

            if (
                this.player.playerPosition.left + this.player.playerSize.width >= this.bigEnemies[i].bigEnemyPositionAbsolute.left &&
                this.player.playerPosition.top + this.player.playerSize.height >= this.bigEnemies[i].bigEnemyPositionAbsolute.top &&
                this.player.playerPosition.left <= this.bigEnemies[i].bigEnemyPositionAbsolute.left + this.bigEnemies[i].bigEnemySize.width &&
                this.player.playerPosition.top <= this.bigEnemies[i].bigEnemyPositionAbsolute.top + this.bigEnemies[i].bigEnemySize.height
            ) {
                this.decreaseLives(50)
                return true
            }
        }
    },

    isRingCollected() {
        if (this.ring &&
            this.player.playerPosition.left + this.player.playerSize.width >= this.ring.ringPosition.left &&
            this.player.playerPosition.top + this.player.playerSize.height >= this.ring.ringPosition.top &&
            this.player.playerPosition.left <= this.ring.ringPosition.left + this.ring.ringSize.width &&
            this.player.playerPosition.top <= this.ring.ringPosition.top + this.ring.ringSize.height
        ) {
            return true
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
                    this.increasePoints(1)

                    this.rockImpactSound.currentTime = 0
                    this.rockImpactSound.play()

                    this.enemyDeadSound.currentTime = 0
                    this.enemyDeadSound.play()

                    return true
                }
            }
        }
    },

    isBigEnemyDistroyed() {
        for (let i = 0; i < this.bigEnemies.length; i++) {

            for (let j = 0; j < this.player.bullets.length; j++) {

                if (
                    this.player.bullets[j].bulletPosition.left + this.player.bullets[j].bulletSize.width >= this.bigEnemies[i].bigEnemyPositionAbsolute.left &&
                    this.player.bullets[j].bulletPosition.top + this.player.bullets[j].bulletSize.height >= this.bigEnemies[i].bigEnemyPositionAbsolute.top &&
                    this.player.bullets[j].bulletPosition.left <= this.bigEnemies[i].bigEnemyPositionAbsolute.left + this.bigEnemies[i].bigEnemySize.width &&
                    this.player.bullets[j].bulletPosition.top <= this.bigEnemies[i].bigEnemyPositionAbsolute.top + this.bigEnemies[i].bigEnemySize.height
                ) {
                    this.bulletColisionIndex = j
                    this.bigEnemies[i].lives--

                    this.rockImpactSound.currentTime = 0
                    this.rockImpactSound.play()

                    if (this.bigEnemies[i].lives === 0) {
                        this.increasePoints(10)
                        return true
                    }
                }
            }
        }
    },

    gameOver() {

        this.backgroundMusic.pause()
        this.enemyDeadSound.pause()
        this.trollSound.pause()
        this.rockImpactSound.pause()

        GameOver.init()
        document.querySelector("#game-screen").remove()
        this.totalLives = undefined
    }
}