-- Cloudflare D1 Database Schema for RC Family Restaurant (Nova SaaS Engine)
-- To create the D1 database in Cloudflare:
-- npx wrangler d1 create rc_family_restaurant_db
-- npx wrangler d1 execute rc_family_restaurant_db --file=./scripts/cloudflare_d1_schema.sql

-- 1. Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    veg INTEGER DEFAULT 0,
    is_bestseller INTEGER DEFAULT 0,
    description TEXT,
    prompt TEXT,
    image_url TEXT,
    station TEXT DEFAULT 'kitchen',
    available INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer TEXT NOT NULL,
    phone TEXT,
    type TEXT NOT NULL, -- 'Dine-In (Table 1)', 'Takeaway', 'Delivery'
    items_json TEXT NOT NULL, -- JSON array of items [{id, name, qty, price}]
    subtotal REAL NOT NULL,
    discount REAL DEFAULT 0,
    gst REAL NOT NULL,
    total REAL NOT NULL,
    status TEXT DEFAULT 'Pending', -- 'Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'
    payment_status TEXT DEFAULT 'Pending', -- 'Paid (UPI)', 'Paid (Cash)', 'Paid (Card)', 'Pending'
    delivery_rider TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    guests INTEGER NOT NULL,
    date TEXT NOT NULL,
    type TEXT NOT NULL,
    status TEXT DEFAULT 'Confirmed', -- 'Confirmed', 'Pending', 'Cancelled'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Store Settings Table
CREATE TABLE IF NOT EXISTS store_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Initial Settings
INSERT OR REPLACE INTO store_settings (key, value) VALUES
('is_open', 'true'),
('announcement', 'Fresh Lambasinghi Country Specials & Dum Biryanis Hot All Day! Free Delivery on orders above ₹499.'),
('tax_rate', '5'),
('gstin', '37AAECR1234F1Z5'),
('primary_phone', '9346749665'),
('secondary_phone', '9490546643'),
('address', 'Bhajangi, Chintapalli Mandal, Lambasinghi, ASR District, AP');
