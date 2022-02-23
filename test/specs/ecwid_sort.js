describe('Test ecwid sort', () => {
    let URL = 'https://buy-in-10-seconds.company.site/search'
    
    let filters_selector = 'div.ec-filter--search'
    let products_titles_selector = '.grid__products .grid-product .grid-product__title-inner'
    let products_prices_selector = '.grid__products .grid-product .grid-product__price-value' 
    let product_sort_selector = '#ec-products-sort'

    async function createArrayOfTitles() {
        let products_titles = await $$(products_titles_selector)
        let products_titles_array = []
        for (let i = 0; i < products_titles.length; i++) {
            let text = await products_titles[i].getText()
            products_titles_array.push(text)
        }
        return products_titles_array
    }

    async function createArrayOfPrices() {
        let products_prices = await $$(products_prices_selector)
        let products_prices_array = []
        for (let i = 0; i < products_prices.length; i++) {
            let text = await products_prices[i].getText()
            let price = parseFloat(text.split('$')[1])
            products_prices_array.push(price)
        }
        return products_prices_array
    }

    it('test sort by title', async () => {
        await browser.url(URL)
        
        await $(filters_selector).waitForExist({ timeout: 5000 , interval: 50 })
        await $(filters_selector).waitForDisplayed({ timeout: 5000, interval: 50 })

        let products_titles_array = await createArrayOfTitles()
        products_titles_array.sort()

        let product_sort = await $(product_sort_selector)
        await product_sort.selectByAttribute('value', 'nameAsc')
        
        await browser.pause(1000)
    
        let products_titles_new_array = await createArrayOfTitles()

        expect(products_titles_new_array).toEqual(products_titles_array)
    })

    it('test sort by price', async () => {
        await browser.url(URL)
        
        await $(filters_selector).waitForExist({ timeout: 5000 , interval: 50 })
        await $(filters_selector).waitForDisplayed({ timeout: 5000, interval: 50 })

        let products_prices_array = await createArrayOfPrices()
        products_prices_array.sort((a, b) => a - b)

        let product_sort = await $(product_sort_selector)
        await product_sort.selectByAttribute('value', 'priceAsc')

        await browser.pause(1000)

        let products_prices_new_array = await createArrayOfPrices()

        expect(products_prices_new_array).toEqual(products_prices_array)
    })
})
