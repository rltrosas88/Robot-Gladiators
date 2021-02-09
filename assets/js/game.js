var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

//Note the lack of quotation marks around playerName.
console.log(playerName, playerAttack, playerHealth);

//String data type variable
var enemyName = "Roborto";
//Number data type variable
var enemyHealth = 50;
var enemyAttack = 12;

// this creates a function named "fight"
//Think of an alert as a way to get information to the user-not the developer.
//this is a function expression. If it didnt have the (var fight =) it would be a function declaration
var fight = function() {
    // Alert players that they are starting the round
    window.alert("Welcome to Robot Gladiators!");
    
    //Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use the result to update the value in the 'enemyHealth' variable
    enemyHealth = enemyHealth - playerAttack;

    // Log a resulting message to the console so we know that it worked.
    console.log(
        playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );

    // check enemy's health
    if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
    }
    else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

    // Subtract the value of 'enemyAttack' from the value of the 'playerHealth' and use that result to update the value in the 'playerHealth' variable
    playerHealth = playerHealth - enemyAttack;

    // Log a resulting message to the console so we know that it worked
    console.log(
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );

    // check player's health 
    if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
    }
    else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
    }
};
//execute function
fight();
// this will do math and log 20
//console.log(10 + 10);

// this will combine the results for playerName and the starting of sentence of "Our robot's name is"
// notice the space between is and "
//console.log("Our robot's name is " + playerName);