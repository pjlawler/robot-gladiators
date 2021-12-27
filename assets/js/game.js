// this creates a function named "fight"

var playerName = window.prompt("What is the name of your robot?");
var playerHealth = null;
var playerAttack = null;
var playerMoney = null;
var enemyHealth = null;
var enemyAttack = null;

var enemyNames = ["Roborto", "Amy Android","Robo Trumble"];

var startGame = function() {
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;
  enemyHealth = 50;
  enemyAttack = 12;  

  for (var i = 0; i < enemyNames.length; i++) {
    var message = null;
    pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    
    if (playerHealth > 0) {
      window.alert("Welcome to Robot Gladiators!\r\nRound #" + (i + 1) + "\r\n" + playerName + " (" + playerHealth + ") vs. " + pickedEnemyName + "(" + enemyHealth + ")");
    }
    else {
     endGame();
    }
   
    fight(pickedEnemyName);

    if (playerHealth > 0 && i< enemyNames.length -1) {
      var storeConfirm = window.confirm("That fight is over.... Would you like to enter the store?");
      if (storeConfirm) {
        shop();
      }
    }
  }
  endGame();
}

var endGame = function() {
  if (playerHealth > 0) {
    message = "Congratulations! You've won the battle!\r\nYour winnings are: $" + playerMoney;
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

var fight = function(enemyName) {
  // Alert players that they are starting the round
  while(playerHealth > 0 && enemyHealth > 0) {

    var promptFight = window.prompt("Do you want to fight or skip battle? Enter FIGHT or SKIP to choose.");

    if (promptFight === "skip" || promptFight === "SKIP") {

      var confirmSkip = window.confirm("Are you sure you want to concede to " + enemyName + "?");

      if (confirmSkip) {
        window.alert(playerName + " has chosen to skip the fight. Goodbye.");
        playerMoney = playerMoney - 10;
        console.log("Player Money", playerMoney)
        break;
      }
      else {
        fight(enemyName);
      }    
    }

    else if (promptFight === "fight" || promptFight === "FIGHT") {
      
      // update the enemy's health and player's money
      playerMoney = playerMoney + 10
      enemyHealth = enemyHealth - playerAttack;
      console.log(playerName + " attacked " + enemyName + ". " + enemyName + " has " + enemyHealth + " remaining." )
      console.log(playerName + " has " + playerMoney + " in the bank!")
      
      // check enemy's health
      if (enemyHealth <= 0) {
        window.alert(enemyName + " has been defeated!")
        break;
      }
      
      // update player health
      playerHealth = playerHealth - enemyAttack;
      console.log(enemyName + " attacked " + playerName + ". " + playerName + " has " + playerHealth + " remaining.")
      
      // check player's health
      if (playerHealth > 0) {
        window.alert("Battle completed!\r\n" + playerName + " has " + playerHealth + " and " + enemyName + " has " + enemyHealth + ".");
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
  var num = null;
  var exitStore = false;
  
  while(!exitStore) {
    var num = window.prompt("You have $" + playerMoney + " remaining.\r\n\Would you like to:\r\n1) Refill health\r\n2) Upgrde Attack\r\n3) Exit Store\r\nSelect (1 - 3)")
   switch(num) {
      case "1": 
        if (playerMoney >= 7) {
          playerHealth = playerHealth + 20;
          playerMoney = playerMoney - 7;
        }
      break;
      case "2": 
      if (playerMoney >= 7) {
        playerAttack = playerAttack + 6;
        playerMoney = playerMoney - 7;
      }
      break;
      case "3":
        exitStore = true;
        break;
      default: 
      break;
    }
  }
}
  
startGame();

    
