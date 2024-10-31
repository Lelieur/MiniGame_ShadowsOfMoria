window.onload = function() {
    GameIntro.init()

    document.querySelector(".play-button").addEventListener("click", function () {
        document.querySelector("#game-intro").remove()
        Game.init() 
    })
} 
