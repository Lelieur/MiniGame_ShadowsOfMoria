class Stats {
    constructor(gameSize, totalLives, totalPoints, maxPoints) {

        this.gameSize = gameSize
        this.totalLives = totalLives
        this.totalPoints = totalPoints
        this.maxPoints = maxPoints

        this.statsPadding = 7

        this.statsSize = {
            width: 500,
            height: 40

        }
        this.statsPosition = {
            left: this.gameSize.width / 2 - this.statsSize.width / 2,
            top: 30
        }

        this.init()
    }

    init() {

        this.statsElement = document.createElement("div")

        this.statsElement.style.position = "absolute"
        this.statsElement.style.display = "flex"
        this.statsElement.style.flexWrap = "wrap"
        this.statsElement.style.justifyContent = "space-around"

        this.statsElement.style.width = `${this.statsSize.width}px`
        this.statsElement.style.height = `${this.statsSize.height}px`
        this.statsElement.style.left = `${this.statsPosition.left}px`
        this.statsElement.style.top = `${this.statsPosition.top}px`
        this.statsElement.style.padding = `${this.statsPadding}px`
        this.statsElement.style.zIndex = `1000`


        document.querySelector("#game-screen").appendChild(this.statsElement)

        // TOTAL POINTS

        this.totalPointsElement = document.createElement("div")

        this.totalPointsElement.style.position = "static"
        this.totalPointsElement.style.display = "flex"
        this.totalPointsElement.style.justifyContent = "space-around"
        this.totalPointsElement.style.alignItems = "center"
        this.totalPointsElement.style.width = `${this.statsSize.width / 2.3}px`
        this.totalPointsElement.style.height = `${this.statsSize.height}px`
        this.totalPointsElement.style.backgroundImage = "url(./img/panel.png)"
        this.totalPointsElement.style.backgroundSize = "100% 100%"



        this.statsElement.appendChild(this.totalPointsElement)

        this.totalPointsText = document.createElement("p")

        this.totalPointsText.style.color = "white"
        this.totalPointsText.style.textShadow = "1px 1px 1px black"
        this.totalPointsText.style.fontFamily = "Pixelify Sans, sans-serif";
        this.totalPointsText.style.textTransform = "uppercase";
        this.totalPointsText.innerText = `PUNTUACIÓN MÁXIMA: ${this.totalPoints}`
        this.totalPointsText.classList.add('totalPoints')
        this.totalPointsText.innerText = `Puntos totales: ${this.totalPoints}`

        this.totalPointsElement.appendChild(this.totalPointsText)
        

        // MAX POINTS

        this.maxPointsElement = document.createElement("div")

        this.maxPointsElement.style.position = "static"
        this.maxPointsElement.style.display = "flex"
        this.maxPointsElement.style.justifyContent = "space-around"
        this.maxPointsElement.style.alignItems = "center"
        this.maxPointsElement.style.width = `${this.statsSize.width / 2.3}px`
        this.maxPointsElement.style.height = `${this.statsSize.height}px`
        this.maxPointsElement.style.backgroundImage = "url(./img/panel.png)"
        this.maxPointsElement.style.backgroundSize = "100% 100%"

        

        this.statsElement.appendChild(this.maxPointsElement)

        this.maxPointsText = document.createElement("p")
        this.maxPointsText.style.color = "white"
        this.maxPointsText.style.textShadow = "1px 1px 1px black"
        this.maxPointsText.style.fontFamily = "Pixelify Sans, sans-serif";
        this.maxPointsText.style.textTransform = "uppercase";
        this.maxPointsText.innerText = `PUNTUACIÓN MÁXIMA: ${this.maxPoints}`
        this.maxPointsElement.appendChild(this.maxPointsText)
        
    }

    updatePoints(newPoints) {
        this.totalPoints = newPoints
    }

    updateLives(newLives) {
        this.totalLives = newLives
    }

    update() {
        this.totalPointsText.innerText = `Puntos totales: ${this.totalPoints}`
        this.maxPointsText.innerText = `Puntación máxima: ${this.maxPoints}`
    }

}