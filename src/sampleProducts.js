const sampleProductInsertQuery = `
INSERT INTO sample_products (
    product_name,
    description,
    price,
    stock_quantity,
    is_available,
    added_date
)
VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP);
`

const selectSampleProductQuery = `
SELECT * FROM sample_products LIMIT 100;
`

export async function createProduct(body, pool) {
    await pool.query(sampleProductInsertQuery, [
        body["productName"],
        body["productDescription"],
        body["price"],
        body["stockQuantity"],
        true,
    ])
}

export async function getFewProducts(pool) {
  const result = await pool.query(selectSampleProductQuery)
  return result.rows
}