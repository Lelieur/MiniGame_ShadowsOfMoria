# 🕹️ **Shadows of Moria**


<p align="center">
  <img src="https://res.cloudinary.com/dhluctrie/image/upload/v1736501114/Shadows_of_Moria_-_MockUp_qjbhky.jpg" alt="Shadows Of Moria MockUp">
</p>

<p align="center">
  <a href="https://example.com](https://lelieur.github.io/MiniGame_ShadowsOfMoria/">Play de Game!</a>
</p>

## **Project Description**  
*Shadows of Moria* is a dynamic arcade game developed by **Marta Quiroga** and **Lucas Lelieur**. The objective is to survive waves of enemies, earn points, and avoid hazards. Set in the world of J.R.R Tolkien's 'The Lord of the Rings', the character, Frodo, will be able to use the unique ring to become invisible to enemies and not take damage. If you are a fan of Middle-earth, you will undoubtedly want to help our protagonist survive the dangers lurking in the shadows of Moria.

---

## **Features**  
- **Dynamic enemies:** Orcs and Trolls. Trolls have more health points than orcs and do more damage to our character.  
- **Simple and Intuitive Controls:** Use arrow keys to move and the space bar to shoot.
- **Score and High Score Storage:** Keeps the highest score in the browser's local storage.
- **Immersive Sound:** Includes sound effects triggered during various in-game events (shooting, damaging the enemy).
- **Accurate Collision Detection:** Ensures realistic movements and adds strategic challenge.

---

## **Project Structure**  
The project is organized around a **`Game`** object containing all the game logic and configuration and separate **`.js`** files defining each class.

## **Key Methods**  
- **`init()`**: Sets up the game area size and events.  
- **`start()`**: Starts the game by displaying the background, player, and score; and initializes the game loop using all its methods.  
- **`setEventListeners()`**: Detects key presses for character movement and shooting.  
- **`generateEnemies()`**: Generate all enemies at the start of the game.
- **`generateRing()`**: Generate the ring at the start of the game.
- **`handleInmunity()`**: Handle the character inmmunity when the Ring is collected.
- **`isCollision()`**: Checks for collisions between the character and enemies, and between enemies and bullets.
- **`isEnemyDistroyed()` & `isBigEnemyDistroyed()`**: Add points to the total score when enemies are destroyed.
- **`moveAll()`**: Handle all game stats: 
- **`clearAll()`**: Clears all elements from the DOM when enemies and bullets go off the screen or enemies are destroyed.
- **`decreaseLives(lives)`**: Handle the character's live points when it collides with an enemy.
- **`gameOver()`**: Ends the game and displays the Game Over screen.


---

## **Controls**  
- **Up Arrow:** Move and aim up.  
- **Down Arro:** Move and aim down.  
- **Right Arrow:** Move and aim rigth.  
- **Left Arrow:** Move and aim left.  
- **Space bar:** Shoot.  


---

## **Technologies Used**  
- **HTML**
- **CSS**
- **JavaScript**

---

## **Installation and Setup**  
1. Clone the repository:  
   ```bash
   git clone https://github.com/Lelieur/MiniGame_ShadowsOfMoria
2. Navigate to the project directory:
   ```bash
   cd MiniGame_ShadowsOfMoria
3. Open index.html:
   ```bash
   open index.html

___

## **Credits**

Developed by Lucas Lelieur and Marta Quiroga.



