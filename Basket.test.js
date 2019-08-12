const Basket = require('./Basket.js');

describe('Basket test', () => {
    test('Should add product to basket properly', () => {
        const basket = new Basket();
        basket.add('FR1');
        const x = basket.getBasket();
        expect(basket.getBasket()).toMatchObject(['FR1']);
    })

    test('Should  not add product if it not in productlist', () => {
        const basket = new Basket();
        basket.add('C');
        expect(basket.getBasket()).toMatchObject([]);
    })

    test('Should calculate total price correctly, no priceRules', () => {
        const basket = new Basket();

        var sampleBasket = ['SR1', 'SR1', 'FR1', 'SR1'];
        sampleBasket.forEach((item) => {
            basket.add(item);
        })

        var price = basket.total();
        expect(price).toBe(18.11);
    })

    test('Should calculate total price correctly, with priceRule', () => {
        const mockRules = {
            SR1: {
                quantity: 3,
                promoPrice: 1,
            }
        }
        const basket = new Basket(mockRules);

        var sampleBasket = ['SR1', 'SR1', 'FR1', 'SR1'];
        sampleBasket.forEach((item) => {
            basket.add(item);
        })

        var price = basket.total();
        expect(price.toFixed(2)).toBe("6.11");
    })

    test('Should calculate total price correctly, with multi rules', () => {
        const mockRules = {
            SR1: {
                quantity: 3,
                promoPrice: 1,
            },
            FR1: {
                quantity: 2,
                promoPrice: 1.5,
            }
        }
        const basket = new Basket(mockRules);

        var sampleBasket = ['SR1', 'SR1', 'FR1', 'SR1', 'FR1', 'FR1', 'CF1'];
        sampleBasket.forEach((item) => {
            basket.add(item);
        })

        var price = basket.total();
        expect(price.toFixed(2)).toBe("18.73");
    })
})