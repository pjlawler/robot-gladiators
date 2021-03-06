// this creates a function named "fight"

var playerInfo = {
  name: "",
  health: 0,
  money: 0,
  attack: 0,
  
  reset: function() {
    this.health = 100
    this.money = 10
    this.attack = randomNumber(10,14)
  },
  
  refillHealth: function () {
    if (this.money > 7) {
      this.health += 20;
      this.money -= 7;  
    }
    else {
      window.alert("You don't have enough money to add health.");
    }
  },

  setPlayerName: function (){
    while (!playerName) {
      var playerName = window.prompt("What is the name fo your robot?");
      if (playerName == null) {
        quitGame();
      }
    }
    this.name = playerName.trim();
  },

  updateAttack: function() {
    if (this.money > 7) {
      this.attack += 6;
      this.money -= 7;  
    }
    else {
      window.alert("You don't have enough money to update attack points.");
    }
  }
    
}


var enemies = {
  
  info: [],

  reset: function() {
    
    var enemyInfo = [
      {
      name: "Robbie Otto",
      attack: randomNumber(10, 14)
      },
      {
      name: "Annie Android",
      attack: randomNumber(10, 14)
      },
      {
      name: "Robo Trumble",
      attack: randomNumber(10, 14)
      }];

    // Shuffles the array
    for (i=0; i<enemyInfo.length; i++) {
      var swapIndex = randomNumber(0,enemyInfo.length - 1);
      [enemyInfo[i], enemyInfo[swapIndex]] = [enemyInfo[swapIndex], enemyInfo[i]];
    }
    this.info = enemyInfo;
   }
}

var startGame = function() {
  
  if(!playerInfo.name) {
    playerInfo.setPlayerName();
  }

  playerInfo.reset();
  enemies.reset(); 
  enemyInfo = enemies.info

  for (var i = 0; i < enemyInfo.length; i++) {
    pickedEnemyObj = enemyInfo[i]
    // pickedEnemyObj = getRandomOpponent();
    pickedEnemyObj.health = randomNumber(40, 60);
    
    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators!\r\nRound #" + (i + 1) + "\r\n" + playerInfo.name + " (" + playerInfo.health + ") vs. " + pickedEnemyObj.name + " (" + pickedEnemyObj.health + ")");
    }
    else {
     endGame();
    }
   
    fight(pickedEnemyObj);

    if (playerInfo.health > 0 && i< enemyInfo.length -1) {
      var storeConfirm = window.confirm("That fight is over.... Would you like to enter the store?");
      if (storeConfirm) {
        shop();
      }
    }
  }
  endGame();
}

var quitGame = function() {
  window.alert("You've quit...")
  throw Error;
} 

var highScoreBoard = {

  name: localStorage.getItem("robotName"),
  score: localStorage.getItem("highScore"),

  isHighScore: function() {

    if (this.score == null || playerInfo.money > this.score) {
      localStorage.setItem("robotName", playerInfo.name);
      localStorage.setItem("highScore", playerInfo.money);
      this.name = playerInfo.name;
      this.score = playerInfo.money.toString();
      return true;
      }
    else {
      return false;
    }
  }


}


var endGame = function() {
  if (playerInfo.health > 0 && highScoreBoard.isHighScore()) {
    message = "Congratulations! You've won the battle and you are the new highscore record holder!\r\nYour winnings are: $" + playerInfo.money;
  }
  else if(playerInfo.health > 0 && !highScoreBoard.isHighScore()) {
    message = "Congratulations! You've won the battle with a score of $" + playerInfo.money + " but you are not better than " + highScoreBoard.name + " who holds the record of $" + parseInt(highScoreBoard.score);
  }
  else {
    message = "You've lost your robot in battle.";
  }

  var playAgain = window.confirm(message + "\r\nLet's play again!");

  if (playAgain) {
    startGame();
  }
  else {
    window.alert("Good-bye, come play again soon!");
  }
}

var fight = function(enemy) {
  // Alert players that they are starting the round
  while(playerInfo.health > 0 && enemy.health > 0) {

    var promptFight = window.prompt("Do you want to fight or skip battle? Enter FIGHT or SKIP to choose.", "FIGHT");
  
    if (promptFight == null) {
      quitGame();
    }

    promptFight = promptFight.trim().toLowerCase();

    if (promptFight === "skip") {

      var confirmSkip = window.confirm("Are you sure you want to concede to " + enemy.name + "?");

      if (confirmSkip) {
        window.alert(playerInfo.name + " has chosen to skip the fight. Goodbye.");
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("Player Money", playerInfo.money)
        enemyInfo.attack = 0;
        break;
      }
      else {
        fight(enemy);
      }    
    }

    else if (promptFight === "fight") {
      
      // update the enemy's health and player's money
      playerInfo.money = playerInfo.money + 10;
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      enemy.health = Math.max(0, enemy.health - damage);

      
      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has been defeated!")
        break;
      }
      
      // update player health
      var damage = randomNumber(enemy.attack - 3, enemy.attack);
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      
      // check player's health
      if (playerInfo.health > 0) {
        window.alert("Battle completed!\r\n" + playerInfo.name + " has " + playerInfo.health + " and " + enemy.name + " has " + enemy.health + ".");
        enemyInfo.attack = 0;
      }
      else {
        endGame();
        break;
      }
    }

    // If the player chooses something other the fight or skip
    else {
      window.alert("You must choose to FIGHT or SKIP")
    }
  }
}

var shop = function() {
  console.log("Entered the store!!")
  var exitStore = false;
  
  while(!exitStore) {
    var choice = window.prompt("You have $" + playerInfo.money + " remaining.\r\n\Would you like to:\r\n1) Refill health\r\n2) Upgrde Attack\r\nSelect (1 or 2)")
    if(choice == null) {
      exitStore = true
    }
    else {
      switch(parseInt(choice)) {
        case 1: 
          playerInfo.refillHealth();
          break;
        case 2: 
          playerInfo.updateAttack();
          break;
        default: 
          window.alert("Please choose 1 or 2, or Cancel to exit store.")
          break;
      }
    }
  }
}

function randomNumber(from, to) {
  value = Math.floor(Math.random() * (to - from + 1)) + from;
  return value;
}

startGame();

    
