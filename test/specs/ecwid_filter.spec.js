let FilterPage = require('../pageobjects/filter.page')


describe('Test ecwid filter', () => {
    let URL = 'https://buy-in-10-seconds.company.site/search'


    it('test filter by price', async () => {
        let productsInPriceAmount = 2
        let lowPriceValue = 3
        let highPriceValue = 5
        
        await FilterPage.open(URL)
        await FilterPage.filterByPrice(lowPriceValue, highPriceValue)
        await FilterPage.checkFilterByPrice(productsInPriceAmount)
    })

    it('test filter by in stock', async () => {
        let productsInStockAmount = 5

        await FilterPage.open(URL)
        await FilterPage.filterByInStock()
        await FilterPage.checkFilterByInStock(productsInStockAmount)
    })

    it('test filter by discount', async () => {
        let productsWithStrikeAmount = 1
        
        await FilterPage.open(URL)
        await FilterPage.filterByDiscount()
        await FilterPage.checkFilterByDiscount(productsWithStrikeAmount) 
    })
})
