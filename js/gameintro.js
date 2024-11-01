const GameIntro = {

    gameIntroSize: {
        width: window.innerWidth,
        height: window.innerHeight
    },

    background: undefined,
    menu: undefined,

    init() {
        this.setDimensions()
        this.createElements()
        this.setEventListeners()
    },

    setDimensions() {
        document.querySelector("#game-intro").style.width = `${this.gameIntroSize.width}px`
        document.querySelector("#game-intro").style.height = `${this.gameIntroSize.height}px`
    },

    createElements() {

        this.background = document.createElement("video")


        this.background.src = "./img/fondo-intro.mp4"

        this.background.style.position = "absolute"
        this.background.style.width = `${this.gameIntroSize.width}px`
        this.background.style.height = `${this.gameIntroSize.height}px`
        this.background.style.objectFit = "cover"
        this.background.classList = "intro-video"
        this.background.volume = 0.3

        document.querySelector("#game-intro").appendChild(this.background)


        this.menu = document.createElement("div")

        this.menu.style.position = "absolute"
        this.menu.style.display = "flex"
        this.menu.style.flexDirection = "column"
        this.menu.style.alignItems = "center"
        this.menu.style.width = `${this.gameIntroSize.width / 2}px`
        this.menu.style.height = `${(this.gameIntroSize.width / 2) * 0.60}px`
        this.menu.style.left = `${this.gameIntroSize.width / 2 - (this.gameIntroSize.width / 2) / 2}px`
        this.menu.style.top = `${this.gameIntroSize.height / 2 - ((this.gameIntroSize.width / 2) * 0.60) / 2}px`
        this.menu.style.borderRadius = "20px"
        this.menu.classList = "menu"

        document.querySelector("#game-intro").appendChild(this.menu)


        this.logo = document.createElement("img")
        this.logo.src = "./img/LOGO.png"


        this.logo.style.position = "absolute"
        this.logo.style.width = `${(this.gameIntroSize.width / 2) * 0.8}px`
        this.logo.style.top = `20%`

        document.querySelector(".menu").appendChild(this.logo)


        this.menuBottom = document.createElement("div")

        this.menuBottom.style.position = "absolute"
        this.menuBottom.style.display = "flex"
        this.menuBottom.style.justifyContent = "space-between"
        this.menuBottom.style.width = `${(this.gameIntroSize.width / 2) * 0.8}px`
        this.menuBottom.style.height = `${((this.gameIntroSize.width / 2) * 0.60) / 2}px`
        this.menuBottom.style.top = `${((this.gameIntroSize.width / 2) * 0.60) / 2}px`
        this.menuBottom.classList = "menu-bottom"

        document.querySelector(".menu").appendChild(this.menuBottom)


        this.controls = document.createElement("img")
        this.controls.src = "./img/Controles.png"

        this.controls.style.height = `${((this.gameIntroSize.width / 2) * 0.60) / 4}px`
        this.controls.style.width = "auto"

        document.querySelector(".menu-bottom").appendChild(this.controls)



        this.playButton = document.createElement("img")
        this.playButton.src = "./img/PLAY.png"

        this.playButton.style.height = `${((this.gameIntroSize.width / 2) * 0.60) / 5}px`
        this.playButton.classList = "play-button"

        document.querySelector(".menu-bottom").appendChild(this.playButton)
    },

    setEventListeners() {

        document.querySelector("body").addEventListener("mousemove", function () {
            document.querySelector("video").play()
            document.querySelector("video").loop = "true"
        })

        document.querySelector(".play-button").addEventListener("click", function () {
            document.querySelector("#game-intro").remove()
            Game.init()
        })
    }
}

