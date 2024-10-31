const GameOver = {

    gameOverSize: {
        width: window.innerWidth,
        height: window.innerHeight
    },

    background: undefined,
    menu: undefined,

    init(){
        this.setDimensions()
        this.createElements()
        this.setEventListeners()
    },

    setDimensions(){
        document.querySelector("#game-end").style.width = `${this.gameOverSize.width}px`
        document.querySelector("#game-end").style.height = `${this.gameOverSize.height}px`
    },

    createElements(){

        this.background = document.createElement("video")

        this.background.src = "./img/game-over-video.mp4"
        this.background.autoplay = "true"
        this.background.loop = "true"
        
        this.background.style.position = "absolute"
        this.background.style.width = `${this.gameOverSize.width}px`
        this.background.style.height = `${this.gameOverSize.height}px`
        this.background.style.objectFit = "cover"

        document.querySelector("#game-end").appendChild(this.background)


        this.menu = document.createElement("div")

        this.menu.style.position = "absolute"
        this.menu.style.display = "flex"
        this.menu.style.flexDirection = "column"
        this.menu.style.alignItems = "center"
        this.menu.style.width = `${this.gameOverSize.width / 2}px`
        this.menu.style.height= `${(this.gameOverSize.width / 2) * 0.60}px`
        this.menu.style.left = `${this.gameOverSize.width / 2 - (this.gameOverSize.width / 2) / 2}px`
        this.menu.style.top = `${this.gameOverSize.height /2 - ((this.gameOverSize.width / 2) * 0.60) / 2}px`
        this.menu.style.borderRadius = "20px"
        this.menu.classList = "menu"

        document.querySelector("#game-end").appendChild(this.menu)
        

        this.logo = document.createElement ("img")
        this.logo.src = "./img/LOGO.png"


        this.logo.style.position = "absolute"
        this.logo.style.width = `${(this.gameOverSize.width / 2) * 0.8}px`
        this.logo.style.top = `20%`

        document.querySelector(".menu").appendChild(this.logo)

        
        this.menuBottom = document.createElement ("div")

        this.menuBottom.style.position = "absolute"
        this.menuBottom.style.display = "flex"
        this.menuBottom.style.justifyContent = "center"
        this.menuBottom.style.width = `${(this.gameOverSize.width / 2) * 0.8}px`
        this.menuBottom.style.height = `${((this.gameOverSize.width / 2) * 0.60) / 2}px`
        this.menuBottom.style.top = `${((this.gameOverSize.width / 2) * 0.60) / 2}px`
        this.menuBottom.classList = "menu-bottom"

        document.querySelector(".menu").appendChild(this.menuBottom)


        this.rePlayButton = document.createElement ("img")
        this.rePlayButton.src = "./img/replay.png"

        this.rePlayButton.style.height = `${((this.gameOverSize.width / 2) * 0.60) / 7}px`
        this.rePlayButton.classList = "replay-button"

        document.querySelector(".menu-bottom").appendChild(this.rePlayButton)
    },

    setEventListeners(){

        document.querySelector(".replay-button").addEventListener("click", function () {
            
            location.reload()
            })

    },
}

