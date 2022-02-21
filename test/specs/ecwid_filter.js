describe('Test ecwid filter', () => {
    let URL = 'https://buy-in-10-seconds.company.site/search'

    let productsGeneralAmount = 6

    it('test filter by price', async () => {
        let lowPriceValue = 3
        let highPriceValue = 5
        let productsInPriceAmount = 2

        let lowPriceSelector = '.ec-filter--price .ec-filter__price-from input'
        let highPriceSelector = '.ec-filter--price .ec-filter__price-to input'
        let filters_count_selector = '.ec-filters__applied-count'
        let products_container_selector = '.grid__products'
        let first_product_selector = '.grid__products .grid-product:first-child'
        let first_product_img_selector = '.grid__products .grid-product:first-child .grid-product__image'

        await browser.url(URL)

        await $(lowPriceSelector).setValue(lowPriceValue)
        await $(highPriceSelector).setValue(highPriceValue)
        await $(highPriceSelector).addValue('\uE007')

        // Wait filter to apply
        await expect($(filters_count_selector)).toBeExisting()
        await expect($(filters_count_selector)).toHaveText('(1)')
        await expect($(products_container_selector)).toBeExisting()
        await expect($(first_product_selector)).toBeExisting()
        await expect($(first_product_img_selector)).toBeExisting()
        await expect($(first_product_img_selector)).toBeClickable()

        // Count amount of products after applying filter
        let products_container = await $(products_container_selector)
        let products_filtered = await products_container.$$('.grid-product')
        let products_filtered_amount = products_filtered.length

        // Count unique amount of products after applying filter
        let products_filtered_text_blocks = await products_container.$$('.grid-product .grid-product__title-inner')
        let products_filtered_names_set = new Set()
        products_filtered_text_blocks.forEach(text_block => {
            products_filtered_names_set.add(text_block.getText())
        })
        let unique_products_filtered_amount = products_filtered_names_set.size
        
        // Assertion
        await expect(products_filtered_amount).toEqual(productsInPriceAmount)
        await expect(unique_products_filtered_amount).toEqual(productsInPriceAmount)
    })

    it.skip('test filter by in stock', async () => {
        let productsInStockAmount = 5
        
        let filter_by_in_stock_checkbox_selector = '#checkbox-in_stock'
        
        await browser.url(URL)

        await $(filter_by_in_stock_checkbox_selector).click()

        // Wait filter to apply
        
        // Count amount of products after applying filter

        // Count unique amount of products after applying filter

        // Assertion

    })

    it.skip('test filter by discount', async () => {
        let productsWithStrikeAmount = 1

        let filter_by_discount_checkbox_selector = '#checkbox-on_sale'
        
        await browser.url(URL)

        await $(filter_by_discount_checkbox_selector).click()

        // Wait filter to apply
        
        // Count amount of products after applying filter

        // Count unique amount of products after applying filter

        // Assertion

    })
})