let Page = require('./page')


class SortPage extends Page {
    constructor() {
        super()
        this.productsTitlesArray = []
        this.productsTitlesNewArray = []
        this.productsPricesArray = []
        this.productsPricesNewArray = []
        this.productsTitlesSelector = '.grid__products .grid-product .grid-product__title-inner'
        this.productsPricesSelector = '.grid__products .grid-product .grid-product__price-value'
    }

    get filters() { return $('div.ec-filter--search') }
    get productSort() { return $('#ec-products-sort') }

    async open(path) {
        await super.open(path)
    }

    async sortByTitle() {
        await this.filters.waitForExist({ timeout: 5000 , interval: 50 })
        await this.filters.waitForDisplayed({ timeout: 5000, interval: 50 })
        this.productsTitlesArray = await this.createArrayOfTitles()
        this.productsTitlesArray.sort()
        await this.productSort.selectByAttribute('value', 'nameAsc')
        await browser.pause(1000)
        this.productsTitlesNewArray = await this.createArrayOfTitles()
    }

    async sortByPrice() {
        await this.filters.waitForExist({ timeout: 5000 , interval: 50 })
        await this.filters.waitForDisplayed({ timeout: 5000, interval: 50 })
        this.productsPricesArray = await this.createArrayOfPrices()
        this.productsPricesArray.sort()
        await this.productSort.selectByAttribute('value', 'priceAsc')
        await browser.pause(1000)
        this.productsPricesNewArray = await this.createArrayOfPrices()
    }

    async checkSortByTitle() {
        console.log(`${this.productsTitlesNewArray} == ${this.productsTitlesArray}`)
        expect(this.productsTitlesNewArray).toEqual(this.productsTitlesArray)
        
    }

    async checkSortByPrice() {
        console.log(`${this.productsPricesNewArray} == ${this.productsPricesArray}`)
        expect(this.productsPricesNewArray).toEqual(this.productsPricesArray)
    }

    async createArrayOfTitles() {
        let productsTitlesArray = []
        let productsTitles = await $$(this.productsTitlesSelector)
        for (let i = 0; i < productsTitles.length; i++) {
            let text = await productsTitles[i].getText()
            productsTitlesArray.push(text)
        }
        return productsTitlesArray
    }

    async createArrayOfPrices() {
        let productsPricesArray = []
        let productsPrices = await $$(this.productsPricesSelector)
        for (let i = 0; i < productsPrices.length; i++) {
            let text = await productsPrices[i].getText()
            let price = parseFloat(text.split('$')[1])
            productsPricesArray.push(price)
        }
        return productsPricesArray
    }
}

module.exports =  new SortPage()
