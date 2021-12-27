// this creates a function named "fight"

var playerName = window.prompt("What is the name of your robot?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android","Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;


var fight = function(enemyName) {
  // Alert players that they are starting the round
  while(playerHealth > 0 && enemyHealth > 0) {

    var promptFight = window.prompt("Do you want to fight or skip battle? Enter FIGHT or SKIP to choose.");

    if (promptFight === "skip" || promptFight === "SKIP") {

      var confirmSkip = window.confirm("Are you sure you want to concede to " + enemyName + "?");

      if (confirmSkip) {
        window.alert(playerName + " has chosen to skp the fight. Goodbye.");
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
      if (enemyHealth > 0) {
        window.alert(enemyName + " still has " + enemyHealth + " left.");
      }
      else {
        window.alert(enemyName + " has died!");
        break;
      }
      
      // update player health
      playerHealth = playerHealth - enemyAttack;
      console.log(enemyName + " attacked " + playerName + ". " + playerName + " has " + playerHealth + " remaining.")
      
      // check player's health
      if (playerHealth > 0) {
        window.alert(playerName + " still has " + playerHealth + " left.");
      }
      else {
        window.alert(playerName + " has died!");
        break;
      }
    }

    // If the player chooses something other the fight or skip
    else {
      window.alert("You must choose to FIGHT or SKIP")
    }
  }
}
  
for (var i = 0; i < enemyNames.length; i++) {
  debugger;
  if (playerHealth > 0) {
    window.alert("Welcome to Robot Gladiaators! Round #" + (i + 1));
  }
  else {
    window.alert("You have lost your robot. Game Over!")
  }
  pickedEnemyName = enemyNames[i];
  enemyHealth = 50;
  fight(pickedEnemyName);
}
    
