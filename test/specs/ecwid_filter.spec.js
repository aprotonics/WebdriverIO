describe('Test ecwid filter', () => {
    let URL = 'https://buy-in-10-seconds.company.site/search'

    let filtersCountSelector = '.ec-filters__applied-count'
    let productsContainerSelector = '.grid__products'
    let firstProductSelector = '.grid__products .grid-product:first-child'
    let firstProductImgSelector = '.grid__products .grid-product:first-child .grid-product__image'
    let productsFilteredSelector = '.grid__products .grid-product'
    let productsFilteredTitlesSelector = '.grid__products .grid-product .grid-product__title-inner'
    let lowPriceSelector = '.ec-filter--price .ec-filter__price-from input'
    let highPriceSelector = '.ec-filter--price .ec-filter__price-to input'
    let filterByInStockCheckboxSelector = '#checkbox-in_stock'
    let filterByDiscountCheckboxSelector = '#checkbox-on_sale'
    
    async function waitFilterToApply() {
        await expect($(filtersCountSelector)).toBeExisting()
        await expect($(filtersCountSelector)).toHaveText('(1)')
        await expect($(productsContainerSelector)).toBeExisting()
        await expect($(firstProductSelector)).toBeExisting()
        await expect($(firstProductImgSelector)).toBeExisting()
        await expect($(firstProductImgSelector)).toBeClickable()
    }

    async function countProducts() {
        let productsFiltered = await $$(productsFilteredSelector)
        let productsFilteredAmount = productsFiltered.length
        return productsFilteredAmount
    }

    async function countUniqueProducts() {
        let productsFilteredTitles = await $$(productsFilteredTitlesSelector)
        let productsFilteredNamesSet = new Set()
        productsFilteredTitles.forEach(textBlock => {
            productsFilteredNamesSet.add(textBlock.getText())
        })
        let uniqueProductsFilteredAmount = productsFilteredNamesSet.size
        return uniqueProductsFilteredAmount
    }

    it('test filter by price', async () => {
        let lowPriceValue = 3
        let highPriceValue = 5
        let productsInPriceAmount = 2
        
        await browser.url(URL)

        await $(lowPriceSelector).setValue(lowPriceValue)
        await $(highPriceSelector).setValue(highPriceValue)
        await $(highPriceSelector).addValue('\uE007')

        await waitFilterToApply()        
        let productsFilteredAmount = await countProducts()
        let uniqueProductsFilteredAmount = await countUniqueProducts()
        
        await expect(productsFilteredAmount).toEqual(productsInPriceAmount)
        expect(uniqueProductsFilteredAmount).toEqual(productsInPriceAmount)
    })

    it('test filter by in stock', async () => {
        let productsInStockAmount = 5

        await browser.url(URL)
        await $(filterByInStockCheckboxSelector).click()
        await waitFilterToApply()
        let productsFilteredAmount = await countProducts()
        let uniqueProductsFilteredAmount = await countUniqueProducts()

        await expect(productsFilteredAmount).toEqual(productsInStockAmount)
        expect(uniqueProductsFilteredAmount).toEqual(productsInStockAmount)
    })

    it('test filter by discount', async () => {
        let productsWithStrikeAmount = 1

        await browser.url(URL)
        await $(filterByDiscountCheckboxSelector).click()
        await waitFilterToApply()
        let productsFilteredAmount = await countProducts()
        let uniqueProductsFilteredAmount = await countUniqueProducts()

        await expect(productsFilteredAmount).toEqual(productsWithStrikeAmount)
        expect(uniqueProductsFilteredAmount).toEqual(productsWithStrikeAmount)
    })
})
