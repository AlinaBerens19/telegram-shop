export function extractValuesFromUrl(urlString: string): Record<string, string | undefined> {
    const urlObject = new URL(urlString);

    // Get the query parameters as a dictionary
    const queryParams = Object.fromEntries(urlObject.searchParams.entries());

    // Extract specific values
    const extractedValues: Record<string, string | undefined> = {
        orderId: queryParams['orderId'],
        quantity: queryParams['quantity'],
        totalPrice: queryParams['price'],  // Assuming 'price' corresponds to 'totalPrice'
        menuItemId: queryParams['menuItemId'],
        orderIdIv: queryParams['orderIdIv'],
        quantityIv: queryParams['quantityIv'],
        totalPriceIv: queryParams['priceIv'],  // Assuming 'priceIv' corresponds to 'totalPriceIv'
        menuItemIdIv: queryParams['menuItemIdIv']
    };

    return extractedValues;
}
