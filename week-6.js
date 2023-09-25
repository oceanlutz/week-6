class Player { //creates a new player object that can later be edited 
    constructor() { 
        this.name = '';
        this.hand = []; //this is where the cards for the player will be pushed to
        this.bloodType = ''; //not currently utilized in this version but may be in future updates
        this.zodiac = '';
        this.careerGoals = '';
    }
}

class Deck { //creates an object holding the deck used for the game
    constructor() { 
        this.names = ['2', '3', '4', '5', '6', '7', '8',
            '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
        this.suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades']; //these arrays are used for card object creation
        this.stack = []; //empty array to hold cards when deck is created
    }

    createDeck() { //function for pushing cards into the stack array, creating a deck
        for (let i = 0; i < this.suits.length; i++) {
            for (let x = 0; x < this.names.length; x++) {
                this.stack.push(new Card(x+1, this.names[x], this.suits[i]));
            }
        }
    }

    logDeck() { //this function uses a for loop to display each card in a stack
        for (let i = 0; i < this.stack.length; i++) {
            console.log(this.stack[i].fullName);
        }
    }

    shuffleDeck(num) { //using Knuth/Fisher-Yates shuffle in which random element j swaps with last unswapped element i
        for (let n = 0; n < num; n++) {
            for (let i = this.stack.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1)); //generates random number from 0 to i
                [this.stack[i], this.stack[j]] = [this.stack[j], this.stack[i]]; 
            }     //the line above swaps the elements i and j of the array through destructuring assignment
        }           //equivalent to swapping 2 elements via third declared variable as placeholder
    }               //ie. let x = this.stack[i]; this.stack[i] = this.stack[j]; this.stack[j] = x;

    dealDeck(player1, player2) { //takes this stack and deals cards alternating between players 
        for (let i = 0; i < this.stack.length; i++) {
            if (i % 2 == 0) {
                player1.hand.push(this.stack[i]);
            } else {player2.hand.push(this.stack[i]);}
        }  //for loop and if else in order to deal alternating cards from deck
    }
}               

class Card { //creates a card object with inputs for actual value (1-13), name, and suit
    constructor(value, name, suit) {
        this.value = value;
        this.name = name;
        this.suit = suit;
        this.fullName = `${name} of ${suit}`; //for displaying
    }
}

class Game { //creates new Game which creates 2 players and their scores,
    constructor() { //along with a new deck and a round counter
        this.player1 = new Player();
        this.player2 = new Player();
        this.player1Score = 0;
        this.player2Score = 0;
        this.deck = new Deck();
        this.round = null;
    }

    init() { //this function runs an automated game from start to finish with randomized deck
        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Welcome to WAR!\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n`);
        console.log(`Player 1: ${this.player1Score}\nPlayer 2: ${this.player2Score}\n\nShuffling Deck.........Done.`);
        this.deck.createDeck();
        this.deck.shuffleDeck(33); //shuffles deck 33 times
        this.deck.dealDeck(this.player1, this.player2); 

        for (this.round = 1; this.round <= this.deck.stack.length/2; this.round++) { //for running through the game until all cards are dealt
            console.log(`\nRound: ${this.round}\nPlayer 1: ${this.player1Score}\nPlayer 2: ${this.player2Score}\n`); //display current round and scores
            console.log(`
            Player 1 plays ${this.player1.hand[this.round - 1].fullName}
            Player 2 plays ${this.player2.hand[this.round - 1].fullName}`);
            if (this.player1.hand[this.round - 1].value > this.player2.hand[this.round - 1].value) { //shows winner of each round
                console.log('\nPlayer 1 Wins!\n');
                this.player1Score++; //adds to player score count to compare at end
            } else if (this.player1.hand[this.round - 1].value < this.player2.hand[this.round - 1].value) {
                console.log('\nPlayer 2 Wins!\n');
                this.player2Score++;
            } else {console.log('\nEveryone Loses!');}
        }
            //after loop ends the scores are displayed and compared 
        console.log(`\n\nThe final score is: 
        Player 1: ${this.player1Score}
        Player 2: ${this.player2Score}`); 

        if (this.player1Score > this.player2Score) { //logic for determining which winner 
            console.log('---------PLAYER 1 WINS---------'); //to display
        } else if (this.player1Score < this.player2Score) {
            console.log('---------PLAYER 2 WINS---------');
        } else {console.log('---------EVERYONE LOSES---------');}

    }

}

let game = new Game(); //creates new Game when running program
game.init(); //runs the game through completion
