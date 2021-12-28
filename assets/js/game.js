// this creates a function named "fight"

var playerInfo = {
  name: window.prompt("What is the name of your robot?"),
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
      window.alert("You don't have enough money to add health.")
    }
  },

  updateAttack: function() {
    if (this.money > 7) {
      this.attack += 6;
      this.money -= 7;  
    }
    else {
      window.alert("You don't have enough money to update attack points.")
    }
  }
    
}
var enemyInfo = [
  {
    name: "Rob Otto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Annie Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

var startGame = function() {
  
  playerInfo.reset();
  
  for (var i = 0; i < enemyInfo.length; i++) {
    var message = null;
    pickedEnemyObj = enemyInfo[i];
    pickedEnemyObj.health = randomNumber(40, 60);
    
    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators!\r\nRound #" + (i + 1) + "\r\n" + playerInfo.name + " (" + playerInfo.health + ") vs. " + pickedEnemyObj.name + "(" + pickedEnemyObj.health + ")");
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


var endGame = function() {
  if (playerInfo.health > 0) {
    message = "Congratulations! You've won the battle!\r\nYour winnings are: $" + playerInfo.money;
  }
  else {
    message = "You've lost your robot in battle....";
  }

  var playAgain = window.confirm(message + "\r\nLet's play again!") 

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

    var promptFight = window.prompt("Do you want to fight or skip battle? Enter FIGHT or SKIP to choose.");

    if (promptFight === "quit") {
      quitGame();
    }

    if (promptFight === "skip" || promptFight === "SKIP") {

      var confirmSkip = window.confirm("Are you sure you want to concede to " + enemy.name + "?");

      if (confirmSkip) {
        window.alert(playerInfo.name + " has chosen to skip the fight. Goodbye.");
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("Player Money", playerInfo.money)
        break;
      }
      else {
        fight(enemy);
      }    
    }

    else if (promptFight === "fight" || promptFight === "FIGHT") {
      
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
    var num = window.prompt("You have $" + playerInfo.money + " remaining.\r\n\Would you like to:\r\n1) Refill health\r\n2) Upgrde Attack\r\n3) Exit Store\r\nSelect (1 - 3)")
   switch(num) {
      case "1": 
        playerInfo.refillHealth();
      break;
      case "2": 
        playerInfo.updateAttack();
      break;
      case "3":
        exitStore = true;
        break;
      default: 
      break;
    }
  }
}

function randomNumber(from, to) {
  value = Math.floor(Math.random() * (to - from + 1)) + from;
  return value;
}

startGame();

    
