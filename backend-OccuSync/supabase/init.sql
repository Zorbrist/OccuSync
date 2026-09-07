

CREATE SEQUENCE customer_id_seq START 1;
CREATE SEQUENCE business_id_seq START 1;
CREATE SEQUENCE member_id_seq START 1;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,

    email VARCHAR(255) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    role VARCHAR(30) NOT NULL CHECK (
        role IN (
            'CUSTOMER',
            'BUSINESS_OWNER',
            'STAFF',
            'ADMIN'
        )
    ),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE customer_profiles (
    id VARCHAR(20) PRIMARY KEY
        DEFAULT 'CUST' || LPAD(nextval('customer_id_seq')::TEXT, 3, '0'),

    user_id INTEGER UNIQUE NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,

    phone VARCHAR(30) NOT NULL,

    country VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postcode VARCHAR(20) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE businesses (
    id VARCHAR(20) PRIMARY KEY
        DEFAULT 'BUS' || LPAD(nextval('business_id_seq')::TEXT, 3, '0'),

    name VARCHAR(255) NOT NULL,

    registration_no VARCHAR(100) UNIQUE NOT NULL,

    industry VARCHAR(100) NOT NULL,

    area_of_service TEXT,

    phone VARCHAR(30) NOT NULL,
    email VARCHAR(255) NOT NULL,

    state VARCHAR(100) NOT NULL,
    postcode VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE business_members (
    id VARCHAR(20) PRIMARY KEY
        DEFAULT 'MEM' || LPAD(nextval('member_id_seq')::TEXT, 3, '0'),

    user_id INTEGER NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    business_id VARCHAR(20) NOT NULL
        REFERENCES businesses(id) ON DELETE CASCADE,

    role VARCHAR(30) NOT NULL DEFAULT 'OWNER',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (user_id, business_id)
);


CREATE INDEX idx_business_members_user
ON business_members(user_id);

CREATE INDEX idx_business_members_business
ON business_members(business_id);