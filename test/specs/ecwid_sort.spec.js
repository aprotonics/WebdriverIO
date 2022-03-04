let SortPage = require('../pageobjects/sort.page')


describe('Test ecwid sort', () => {
    let URL = 'https://buy-in-10-seconds.company.site/search'
    
    it('test sort by title', async () => {
        await SortPage.open(URL)
        await SortPage.sortByTitle()
        await SortPage.checkSortByTitle()
    })

    it('test sort by price', async () => {
        await browser.reloadSession()
        await SortPage.open(URL)
        await SortPage.sortByPrice()
        await SortPage.checkSortByPrice()
    })
})
