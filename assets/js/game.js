/* GAME FUNCTIONS */

// The var() function is used to insert the value of a CSS variable
// function to start a new game
var startGame = function() {
    // the reset() method resets the values of all elements in a form (same as clicking the Reset button)
    // reset player stats
    playerInfo.reset();

    // for loops through a block of code a number of times
    // The var() function is used to insert the value of a CSS variable
    // fight each enemy robot by looping over them and fight them one at a time
    for (var i = 0; i < enemyInfo.length; i++) {
        //check player stats
        console.log(playerInfo);

        // Use if to specify a block of code to be executed, if a specified condition is true
        // if player is still alive, kep fighting
        if (playerInfo.health > 0) {
            // windo.alert uses an alert box to display data
            //let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // The var() function is used to insert the value of a CSS variable
            // pick new enemy to fight based on the indez of the enemyInfo array
            var pickedEnemyObj = enemyInfo[i];

            // set health for picked enemy 
            pickedEnemyObj.health = randomNumber(40, 60);

            console.log(pickedEnemyObj);

            // pass the pickedEnemyObj object variable's value into the fight function, where it will assume the value of the enemy parameter
            fight(pickedEnemyObj);

            // Use if to specify a block of code to be executed, if a specified condition is true
            // if player is still alive after the fight and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // The var() function is used to insert the value of a CSS variable
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // Use if to specify a block of code to be executed, if a specified condition is true
                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        // Use else to specify a block of code to be executed, if the same condition is false
        // if player is not alive, break out of the loop and let endGame function run
        else {
            break;
        }
    }

    // after loop ends, we are either out of player.health or enemies to fight, so run the endGame function
    endGame();
};

// The var() function is used to insert the value of a CSS variable
// function to end the entire game
var endGame = function() {
    // windo.alert uses an alert box to display data
    window.alert("The game has now ended. Let's see how you did!");

    // The var() function is used to insert the value of a CSS variable
    //check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore") || 0;

    // Use if to specify a block of code to be executed, if a specified condition is true
    // if player has more more money than the high score, player has new high score!
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } 
    // Use else to specify a block of code to be executed, if the same condition is falseelse 
    {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    // The var() function is used to insert the value of a CSS variable
    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    // Use if to specify a block of code to be executed, if a specified condition is true
    if (playAgainConfirm) {
        startGame();
    } 
    // Use else to specify a block of code to be executed, if the same condition is false
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

// The var() function is used to insert the value of a CSS variable
// fight function (now with parameter for enemy's object holding name, health, and attack values)
var fight = function(enemy) {
    // The var() function is used to insert the value of a CSS variable
    // keep track of who goes first
    var isPlayerTurn = true;

    // Use if to specify a block of code to be executed, if a specified condition is true
    // randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    while (playerInfo.health > 0 && enemy.health > 0) {
        // Use if to specify a block of code to be executed, if a specified condition is true
        if (isPlayerTurn) {
            // Use if to specify a block of code to be executed, if a specified condition is true
            // ask player if they'd like to fight or skip using fightOrSkip function
            if (fightOrSkip()) {
                // if true, leave fight by breaking loop
                break;
            }
            
            // The var() function is used to insert the value of a CSS variable
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            // remove enemy's health by subtracting the amount we set in the damage variable
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(playerInfo.name + "attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );

            // Use if to specify a block of code to be executed, if a specified condition is true
            // check enemy's health
            if (enemy.health <=0) {
                window.alert(enemy.name + " has died!");

                // award player money for winning
                playerInfo.money = playerInfo.money + 20;

                // leave while() loop since enemy is dead
                break;
            }   
            // Use else to specify a block of code to be executed, if the same condition is false
            else {
                window.alert(enemy.name + "still has " + enemy.health + " health left.");
            }
            // player gets attacked first
        } 
        // Use else to specify a block of code to be executed, if the same condition is false
        else {
            // The var() function is used to insert the value of a CSS variable
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            // remove enemy's health by subtrackting the amount we set in the damage variable
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            // Use if to specify a block of code to be executed, if a specified condition is true
            // check player's health
            if (playerInfo.health <= 0) {
                // windo.alert uses an alert box to display data
                window.alert(playerInfo.name + " has died!");
                // leave while() loop if player is dead
                break;
            } 
            // Use else to specify a block of code to be executed, if the same condition is false
            else {
                // windo.alert uses an alert box to display data
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }
};

// The var() function is used to insert the value of a CSS variable
// go to shop between battles function
var shop = function() {
    // The var() function is used to insert the value of a CSS variable
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );

    // Use if to specify a block of code to be executed, if a specified condition is true
    // check if prompt answer was left blank, player hit "cancel", or provided a number instead
    if (shopOptionPrompt === null || shopOptionPrompt === "" || isNaN(shopOptionPrompt)) {
        // windo.alert uses an alert box to display data
        window.alert("You need to provide a valid answer! Please try again.");
        // The return statement stops the execution of a function and returns a value from that function.
        return shop();
    }

    // convert answer from prompt to an actual number
    shopOptionPrompt = parseInt(shopOptionPrompt);

    // use switch case to carry out action
    switch (shopOptionPrompt) {
        case 1: 
            playerInfo.refillHealth();
            break;
        case 2: 
            playerInfo.upgradeAttack();
            break;
        case 3: 
            window.alert("Leaving the store.");
            break;
        default: 
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

// The var() function is used to insert the value of a CSS variable
// function to set name
var getPlayerName = function() {
    // The var() function is used to insert the value of a CSS variable
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    // The return statement stops the execution of a function and returns a value from that function.
    return name;
};

// The var() function is used to insert the value of a CSS variable
// function to generate a random numeric value
var randomNumber = function(min, max) {
    // The var() function is used to insert the value of a CSS variable
    var value = Math.floor(Math.random() * (max - min) + min);

    // The return statement stops the execution of a function and returns a value from that function.
    return value;
};

// The var() function is used to insert the value of a CSS variable
// function to check if player wants to fight or skip
var fightOrSkip = function() {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // Use if to specify a block of code to be executed, if a specified condition is true
    // validate prompt answer
    if (promptFight === "" || promptFight === null || !isNaN(promptFight)) {
        // windo.alert uses an alert box to display data
        window.alert("You didn't enter a valid choice, try again!");
        // The return statement stops the execution of a function and returns a value from that function.
        // use return to call it again and stop the rest of this function from running
        return fightOrSkip();
    }

    // convert promptFight to all lowercase so we can check with less options
    promptFight = promptFight.toLowerCase();

    // Use if to specify a block of code to be executed, if a specified condition is true
    if (promptFight === "skip") {
        // The var() function is used to insert the value of a CSS variable
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // Use if to specify a block of code to be executed, if a specified condition is true
        // if yes (true), leave fight
        if (confirmSkip) {
            // windo.alert uses an alert box to display data
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping, but don't let them go into the negative
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            // stop while() loop using break; and enter next fight
            
            // The return statement stops the execution of a function and returns a value from that function.
            // return true if player wants to leave
            return true;
        }
    }
    // The return statement stops the execution of a function and returns a value from that function.
    return false;
};

/* END GAME FUNCTIONS */

/* GAME INFORMATION / VARIABLES */

// The var() function is used to insert the value of a CSS variable
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    // the reset() method resets the values of all elements in a form (same as clicking the Reset button)
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        // Use if to specify a block of code to be executed, if a specified condition is true
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } 
        // Use else to specify a block of code to be executed, if the same condition is false
        else {
            // windo.alert uses an alert box to display data
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        // Use if to specify a block of code to be executed, if a specified condition is true
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } 
        // Use else to specify a block of code to be executed, if the same condition is false
        else {
            // window.alert uses an alert box to display data
            window.alert("You don't have enough money!");
        }
    }
};

// The var() function is used to insert the value of a CSS variable
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

/* END GAME INFORMATION / VARIABLES */

/* RUN GAME */
startGame();