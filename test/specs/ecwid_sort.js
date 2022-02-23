describe('Test ecwid sort', () => {
    let URL = 'https://buy-in-10-seconds.company.site/search'
    
    let filtersSelector = 'div.ec-filter--search'
    let productsTitlesSelector = '.grid__products .grid-product .grid-product__title-inner'
    let productsPricesSelector = '.grid__products .grid-product .grid-product__price-value' 
    let productSortSelector = '#ec-products-sort'

    async function createArrayOfTitles() {
        let productsTitles = await $$(productsTitlesSelector)
        let productsTitlesArray = []
        for (let i = 0; i < productsTitles.length; i++) {
            let text = await productsTitles[i].getText()
            productsTitlesArray.push(text)
        }
        return productsTitlesArray
    }

    async function createArrayOfPrices() {
        let productsPrices = await $$(productsPricesSelector)
        let productsPricesArray = []
        for (let i = 0; i < productsPrices.length; i++) {
            let text = await productsPrices[i].getText()
            let price = parseFloat(text.split('$')[1])
            productsPricesArray.push(price)
        }
        return productsPricesArray
    }

    it('test sort by title', async () => {
        await browser.url(URL)
        
        await $(filtersSelector).waitForExist({ timeout: 5000 , interval: 50 })
        await $(filtersSelector).waitForDisplayed({ timeout: 5000, interval: 50 })

        let productsTitlesArray = await createArrayOfTitles()
        productsTitlesArray.sort()

        let productSort = await $(productSortSelector)
        await productSort.selectByAttribute('value', 'nameAsc')
        
        await browser.pause(1000)
    
        let productsTitlesNewArray = await createArrayOfTitles()

        expect(productsTitlesNewArray).toEqual(productsTitlesArray)
    })

    it('test sort by price', async () => {
        await browser.url(URL)
        
        await $(filtersSelector).waitForExist({ timeout: 5000 , interval: 50 })
        await $(filtersSelector).waitForDisplayed({ timeout: 5000, interval: 50 })

        let productsPricesArray = await createArrayOfPrices()
        productsPricesArray.sort((a, b) => a - b)

        let productSort = await $(productSortSelector)
        await productSort.selectByAttribute('value', 'priceAsc')

        await browser.pause(1000)

        let productsPricesNewArray = await createArrayOfPrices()

        expect(productsPricesNewArray).toEqual(productsPricesArray)
    })
})
