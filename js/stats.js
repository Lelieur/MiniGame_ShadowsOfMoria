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
        this.statsElement.style.backgroundColor = "green"

        document.querySelector("#game-screen").appendChild(this.statsElement)

        // TOTAL POINTS

        this.totalPointsElement = document.createElement("div")

        this.totalPointsElement.style.position = "static"
        this.totalPointsElement.style.display = "flex"
        this.totalPointsElement.style.justifyContent = "space-around"
        this.totalPointsElement.style.alignItems = "center"
        this.totalPointsElement.style.width = `${this.statsSize.width / 2}px`
        this.totalPointsElement.style.height = `${this.statsSize.height}px`
        this.totalPointsElement.style.backgroundColor = "pink"

        this.statsElement.appendChild(this.totalPointsElement)

        this.totalPiontsText = document.createElement("p")
        this.totalPiontsText.classList.add('totalPoints')
        this.totalPiontsText.innerText = `Puntos totales: ${this.totalPoints}`
        this.totalPointsElement.appendChild(this.totalPiontsText)


        // MAX POINTS

        this.maxPointsElement = document.createElement("div")

        this.maxPointsElement.style.position = "static"
        this.maxPointsElement.style.display = "flex"
        this.maxPointsElement.style.justifyContent = "space-around"
        this.maxPointsElement.style.alignItems = "center"
        this.maxPointsElement.style.width = `${this.statsSize.width / 2}px`
        this.maxPointsElement.style.height = `${this.statsSize.height}px`
        this.maxPointsElement.style.backgroundColor = "blue"

        this.statsElement.appendChild(this.maxPointsElement)

        this.maxPiontsText = document.createElement("p")
        this.maxPiontsText.innerText = `Puntación máxima: ${this.maxPoints}`
        this.maxPointsElement.appendChild(this.maxPiontsText)
    }

    updatePoints(newPoints) {
        this.totalPoints = newPoints
    }

    updateLives(newLives) {
        this.totalLives = newLives
    }

    update() {
        this.totalPiontsText.innerText = `Puntos totales: ${this.totalPoints}`
        this.maxPiontsText.innerText = `Puntación máxima: ${this.maxPoints}`
    }

}