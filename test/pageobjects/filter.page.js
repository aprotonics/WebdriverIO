let Page = require('./page')


class FilterPage extends Page {
    constructor() {
        super()
        this.productsFilteredSelector = '.grid__products .grid-product'
        this.productsFilteredTitlesSelector = '.grid__products .grid-product .grid-product__title-inner'
    }

    get filters() { return $('div.ec-filter--search') }
    get lowPrice() { return $('.ec-filter--price .ec-filter__price-from input') }
    get highPrice() { return $('.ec-filter--price .ec-filter__price-to input') }
    get filtersCount() { return $('.ec-filters__applied-count') }
    get productsContainer() { return $('.grid__products') }
    get firstProduct() { return $('.grid__products .grid-product:first-child') }
    get firstProductImg() { return $('.grid__products .grid-product:first-child .grid-product__image') }
    get filterByInStockCheckbox() { return $('#checkbox-in_stock') }
    get filterByDiscountCheckbox() { return $('#checkbox-on_sale') }

    async open(path) {
        await super.open(path)
    }

    async filterByPrice(lowPriceValue, highPriceValue) {
        await this.filters.waitForExist({ timeout: 15000 , interval: 50 })
        await this.filters.waitForDisplayed({ timeout: 15000, interval: 50 })
        await this.lowPrice.click()
        await this.lowPrice.setValue(lowPriceValue)
        await this.highPrice.setValue(highPriceValue)
        await this.highPrice.addValue('\uE007')
        await this.waitFilterToApply()
    }

    async filterByInStock() {
        await this.filters.waitForExist({ timeout: 15000 , interval: 50 })
        await this.filters.waitForDisplayed({ timeout: 15000, interval: 50 })
        
        await this.filterByInStockCheckbox.scrollIntoView()        
        await this.filterByInStockCheckbox.click()
        await this.waitFilterToApply()
    }

    async filterByDiscount() {
        await this.filters.waitForExist({ timeout: 15000 , interval: 50 })
        await this.filters.waitForDisplayed({ timeout: 15000, interval: 50 })
        
        await this.filterByDiscountCheckbox.scrollIntoView()  
        await this.filterByDiscountCheckbox.click()
        await this.waitFilterToApply()
    }

    async checkFilterByPrice(productsInPriceAmount) {
        let productsFilteredAmount = await this.countProducts()
        let uniqueProductsFilteredAmount = await this.countUniqueProducts()

        await expect(productsFilteredAmount).toEqual(productsInPriceAmount)
        console.log(`${uniqueProductsFilteredAmount} == ${productsInPriceAmount}`)
        expect(uniqueProductsFilteredAmount).toEqual(productsInPriceAmount)
    }

    async checkFilterByInStock(productsInStockAmount) {
        let productsFilteredAmount = await this.countProducts()
        let uniqueProductsFilteredAmount = await this.countUniqueProducts()

        await expect(productsFilteredAmount).toEqual(productsInStockAmount)
        console.log(`${uniqueProductsFilteredAmount} == ${productsInStockAmount}`)
        expect(uniqueProductsFilteredAmount).toEqual(productsInStockAmount)
    }

    async checkFilterByDiscount(productsWithStrikeAmount) {
        let productsFilteredAmount = await this.countProducts()
        let uniqueProductsFilteredAmount = await this.countUniqueProducts()

        await expect(productsFilteredAmount).toEqual(productsWithStrikeAmount)
        console.log(`${uniqueProductsFilteredAmount} == ${productsWithStrikeAmount}`)
        expect(uniqueProductsFilteredAmount).toEqual(productsWithStrikeAmount)
    }

    async waitFilterToApply() {
        await expect(this.filtersCount).toBeExisting()
        await expect(this.filtersCount).toHaveText('(1)')
        await expect(this.productsContainer).toBeExisting()
        await expect(this.firstProduct).toBeExisting()
        await expect(this.firstProductImg).toBeExisting()
        await expect(this.firstProductImg).toBeClickable()
    }

    async countProducts() {
        let productsFiltered = await $$(this.productsFilteredSelector)
        let productsFilteredAmount = productsFiltered.length
        return productsFilteredAmount
    }

    async countUniqueProducts() {
        let productsFilteredTitles = await $$(this.productsFilteredTitlesSelector)
        let productsFilteredNamesSet = new Set()
        productsFilteredTitles.forEach(textBlock => {
            productsFilteredNamesSet.add(textBlock.getText())
        })
        let uniqueProductsFilteredAmount = productsFilteredNamesSet.size
        return uniqueProductsFilteredAmount
    }
}

module.exports = new FilterPage()
