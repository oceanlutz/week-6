var expect = chai.expect;  //assign expect function to variable

describe('myFunctions', function() {  //create category to test functions
    describe('#createDeck', function() { //init createDeck test
        it('should create new 52 card deck', function() {
            var deck = new Deck; //new Deck for function test
            deck.createDeck();
            var x = deck.stack.length; //assigning length of stack to compare values
            expect(x).to.equal(52); //testing to see if number of cards in deck is equal to 52
        });    
    });
    describe('#logDeck', function() { //init logDeck function test
        it('should display newly created deck', function() {
            var deck = new Deck; //create new Deck for function test
            deck.createDeck(); //uses previously tested function to fill stack
            deck.logDeck(); //display the new deck in console
        }); //wanted to run this in a test so i could check all the cards in console
    });
});