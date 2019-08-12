class Basket {
    constructor(priceRules) {
        this.products = require('./productList.json');
        this.basket = [];
        this.rules = priceRules || {};
    };

    add(productCode) {
        if (!!this.products[productCode]) {
            this.basket.push(productCode);
            return true;
        } else {
            return false;
        }
    };

    getBasket() {
        return this.basket;
    }

    clearBasket() {
        this.basket = [];
    };

    total() {
        let total = 0;
        const counts = {};

        // count products in the basket
        this.basket.forEach((item) => {
            counts[item] = (counts[item] || 0) + 1;
        })

        // calculate total price
        Object.keys(counts).forEach((item) => {
            if (this.rules[item] && counts[item] >= this.rules[item].quantity) {
                total = total + counts[item] * this.rules[item].promoPrice;
            } else {
                total = total + counts[item] * this.products[item].price;
            }
        })

        return total;
    };
}

module.exports = Basket;