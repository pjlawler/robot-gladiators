// this creates a function named "fight"

var playerName = window.prompt("What is the name of your robot?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;


var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

console.log(playerName, playerHealth, playerAttack);

 

 


var fight = function() {
  // Alert players that they are starting the round
  window.alert("Welcome to Robot Gladiators!");

  var promptFight = window.prompt("Do you want to fight or skip?");

  if (promptFight === "fight" || promptFight === "FIGHT") {
    // update the opponents health
    enemyHealth = enemyHealth - playerAttack;
    playerHealth = playerHealth - enemyAttack;
    
    console.log(playerName + " attacked " + enemyName +". " + enemyName + " healthlevel = " + enemyHealth + " points." );

    // check enemy's health
    if (enemyHealth > 0) {
      window.alert(enemyName + " still has " + enemyHealth + " left.");
    }
    else {
      window.alert(enemyName + " has died!");
    }

    // check player's health
    if (playerHealth > 0) {
      window.alert(playerName + " still has " + playerHealth + " left.");
    }
    else {
      window.alert(playerName + " has died!");
    }
  }
  else if (promptFight === "skip" || promptFight === "SKIP") {
    var confirmSkip = window.confirm("Are you sure you want to quit?")
    if (confirmSkip) {
      window.alert(playerName + " has chosen to skp the fight. Goodbye.")
      playerMoney = playerMoney - 2
    }
    else {
      fight()
    }
   
    
  }
  else {
    window.alert("You need to choose a valid option")
  }

  
}

  fight();