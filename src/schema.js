
const schema = `
CREATE TABLE IF NOT EXISTS sample_products (
    product_id SERIAL PRIMARY KEY,          -- Auto-incrementing integer primary key
    product_name VARCHAR(255) NOT NULL,     -- Variable-length string, required
    description TEXT,                       -- Longer variable-length text, optional
    price NUMERIC(10, 2) CHECK (price >= 0), -- Decimal number with precision 10, scale 2 (e.g., 12345678.99), must be non-negative
    stock_quantity INTEGER DEFAULT 0,       -- Integer for stock count, defaults to 0
    is_available BOOLEAN DEFAULT TRUE,      -- True/False flag, defaults to true
    added_date DATE DEFAULT CURRENT_DATE,   -- Date value (YYYY-MM-DD), defaults to the current date
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP -- Timestamp including timezone, defaults to current timestamp
);

`

export async function initSchema(pool) {
    const result = await pool.query(schema)
} 