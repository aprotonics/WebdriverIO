describe('Test ecwid filter', () => {
    let URL = 'https://buy-in-10-seconds.company.site/search'

    let filters_count_selector = '.ec-filters__applied-count'
    let products_container_selector = '.grid__products'
    let first_product_selector = '.grid__products .grid-product:first-child'
    let first_product_img_selector = '.grid__products .grid-product:first-child .grid-product__image'
    let products_filtered_selector = '.grid__products .grid-product'
    let products_filtered_titles_selector = '.grid__products .grid-product .grid-product__title-inner'
    let lowPriceSelector = '.ec-filter--price .ec-filter__price-from input'
    let highPriceSelector = '.ec-filter--price .ec-filter__price-to input'
    let filter_by_in_stock_checkbox_selector = '#checkbox-in_stock'
    let filter_by_discount_checkbox_selector = '#checkbox-on_sale'
    
    async function waitFilterToApply() {
        await expect($(filters_count_selector)).toBeExisting()
        await expect($(filters_count_selector)).toHaveText('(1)')
        await expect($(products_container_selector)).toBeExisting()
        await expect($(first_product_selector)).toBeExisting()
        await expect($(first_product_img_selector)).toBeExisting()
        await expect($(first_product_img_selector)).toBeClickable()
    }

    async function countProducts() {
        let products_filtered = await $$(products_filtered_selector)
        let products_filtered_amount = products_filtered.length
        return products_filtered_amount
    }

    async function countUniqueProducts() {
        let products_filtered_titles = await $$(products_filtered_titles_selector)
        let products_filtered_names_set = new Set()
        products_filtered_titles.forEach(text_block => {
            products_filtered_names_set.add(text_block.getText())
        })
        let unique_products_filtered_amount = products_filtered_names_set.size
        return unique_products_filtered_amount
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
        let products_filtered_amount = await countProducts()
        let unique_products_filtered_amount = await countUniqueProducts()
        
        await expect(products_filtered_amount).toEqual(productsInPriceAmount)
        expect(unique_products_filtered_amount).toEqual(productsInPriceAmount)
    })

    it('test filter by in stock', async () => {
        let productsInStockAmount = 5

        await browser.url(URL)
        await $(filter_by_in_stock_checkbox_selector).click()
        await waitFilterToApply()
        let products_filtered_amount = await countProducts()
        let unique_products_filtered_amount = await countUniqueProducts()

        await expect(products_filtered_amount).toEqual(productsInStockAmount)
        expect(unique_products_filtered_amount).toEqual(productsInStockAmount)
    })

    it('test filter by discount', async () => {
        let productsWithStrikeAmount = 1

        await browser.url(URL)
        await $(filter_by_discount_checkbox_selector).click()
        await waitFilterToApply()
        let products_filtered_amount = await countProducts()
        let unique_products_filtered_amount = await countUniqueProducts()

        await expect(products_filtered_amount).toEqual(productsWithStrikeAmount)
        expect(unique_products_filtered_amount).toEqual(productsWithStrikeAmount)
    })
})
