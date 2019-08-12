const Basket = require('./Basket');
const priceRules = require('./priceRules.json');

var basket = new Basket(priceRules);

var input = process.stdin;
input.setEncoding('utf-8');

console.log("Please input products codes by using ',' as a separator (ex. SR1,FR1,SR1,CF1) :");

// When user input data and click enter key.
input.on('data', (data) => {
    if (data === 'exit\n') {
        process.exit();
    } else {
        itemList = data.split(',');
        itemList.forEach((item) => {
            success = basket.add(item.toUpperCase().trim());
            if (!success) console.log("You have input invalid product's code: " + item);
        })
        // Print user input in console.
        console.log("Basket : " + basket.getBasket());
        console.log("Total Price: £" + basket.total());

        basket.clearBasket();
        console.log("Type 'exit' to exit program or input new products codes:")
    }
});