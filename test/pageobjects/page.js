class Page {
    constructor() {}

    async open(path) {
        await browser.url(path)
    }
}

module.exports =  Page
