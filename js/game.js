const Game = {

    gameSize: {
        width: window.innerWidth,
        height: window.innerHeight
    },

    
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

    totalLives: 3,
    totalPoints: 0,
    maxPoints:  localStorage.getItem('maxPoints'),



    keys: {
        RIGHT: 'ArrowRight',
        LEFT: 'ArrowLeft',
        UP: 'ArrowUp',
        DOWN: 'ArrowDown',
        SHOOT: 'Space'
    },

    init() {
        console.log('la max puntuacion fue', localStorage.getItem('maxPoints'))
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
        this.player = new Player(this.gameSize, this.canCollide)
        this.stats = new Stats (this.gameSize, this.totalLives, this.totalPoints, this.maxPoints)
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

            if (this.isCollision()) this.gameOver() 

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
        }
    },

    generateRing(){
        if (this.canCollide && this.framesCounter % this.ringDensity === 0){
            const newRing = new Ring(this.gameSize, this.playerPosition, this.playerSize)
            this.ring = newRing
            this.ringDensity = undefined
        }
    },

    clearAll() {

        if (this.isRingCollected()){
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
                this.increasePoints()

                console.log('tienes', this.totalPoints)
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

    handleInmunity(){
        
        if (!this.canCollide && this.inmunityFrames > 0){
            this.inmunityFrames-- 
            this.player.setOpacity(0.5)
        }else if (!this.canCollide && this.inmunityFrames === 0){
            this.inmunityFrames = 500
            this.canCollide = true
            this.player.setOpacity(1)
            this.ringDensity = 1000
        }
    },

    increasePoints(){
        this.totalPoints++
        localStorage.setItem('maxPoints', this.totalPoints)
    },


    isCollision() {
        for (let i = 0; i < this.enemies.length; i++) {

            if (
                this.player.playerPosition.left + this.player.playerSize.width >= this.enemies[i].enemyPositionAbsolute.left &&
                this.player.playerPosition.top + this.player.playerSize.height >= this.enemies[i].enemyPositionAbsolute.top &&
                this.player.playerPosition.left <= this.enemies[i].enemyPositionAbsolute.left + this.enemies[i].enemySize.width &&
                this.player.playerPosition.top <= this.enemies[i].enemyPositionAbsolute.top + this.enemies[i].enemySize.height
            ) {
                return true && this.canCollide
            }
        }

        for (let i = 0; i < this.bigEnemies.length; i++) {

            if (
                this.player.playerPosition.left + this.player.playerSize.width >= this.bigEnemies[i].bigEnemyPositionAbsolute.left &&
                this.player.playerPosition.top + this.player.playerSize.height >= this.bigEnemies[i].bigEnemyPositionAbsolute.top &&
                this.player.playerPosition.left <= this.bigEnemies[i].bigEnemyPositionAbsolute.left + this.bigEnemies[i].bigEnemySize.width &&
                this.player.playerPosition.top <= this.bigEnemies[i].bigEnemyPositionAbsolute.top + this.bigEnemies[i].bigEnemySize.height
            ) {
                return true && this.canCollide
            }
        }
    },

    isRingCollected(){
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
                    return true
                }
            }
        }
    },

    isBigEnemyDistroyed(){
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
                    
                    if (this.bigEnemies[i].lives === 0) {
                        return true
                    }
                }
            }
        }
    },

    gameOver() {
        alert('MORITSTE')
    }

}