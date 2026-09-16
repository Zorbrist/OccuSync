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
            'BUSINESS_PROVIDER',
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

    address_line VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postcode VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE business_member_profiles (
    id SERIAL PRIMARY KEY,

    user_id INTEGER UNIQUE NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,

    phone VARCHAR(30) NOT NULL,

    profile_picture TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE businesses (
    id VARCHAR(20) PRIMARY KEY
        DEFAULT 'BUS' || LPAD(nextval('business_id_seq')::TEXT, 3, '0'),

    name VARCHAR(255) NOT NULL,

    registration_no VARCHAR(100) UNIQUE NOT NULL,

    approval_status VARCHAR(30) NOT NULL DEFAULT 'PENDING' CHECK (
        approval_status IN (
            'PENDING',
            'APPROVED',
            'REJECTED'
        )
    ),

    industry VARCHAR(100) NOT NULL CHECK (
        industry IN (
            'PLUMBING',
            'ENERGY',
            'HVAC',
            'AUTOMOTIVE',
            'LOGISTICS'
        )
    ),

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

    role VARCHAR(30) NOT NULL DEFAULT 'STAFF' CHECK (
        role IN (
            'OWNER',
            'STAFF'
        )
    ),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (user_id, business_id)
);


CREATE TABLE staff_invitations (
    id SERIAL PRIMARY KEY,

    business_id VARCHAR(20) NOT NULL
        REFERENCES businesses(id) ON DELETE CASCADE,

    email VARCHAR(255) NOT NULL,

    token_hash TEXT NOT NULL UNIQUE,

    expires_at TIMESTAMP NOT NULL,

    accepted_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE services (
    id SERIAL PRIMARY KEY,

    business_id VARCHAR(20) NOT NULL
        REFERENCES businesses(id) ON DELETE CASCADE,

    name VARCHAR(255) NOT NULL,

    description TEXT,

    base_price NUMERIC(10,2) NOT NULL
        CHECK (base_price >= 0),

    estimated_duration INTEGER NOT NULL
        CHECK (estimated_duration > 0),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,

    business_id VARCHAR(20) NOT NULL
        REFERENCES businesses(id) ON DELETE CASCADE,

    customer_id VARCHAR(20) NOT NULL
        REFERENCES customer_profiles(id) ON DELETE CASCADE,

    service_id INTEGER NOT NULL
        REFERENCES services(id) ON DELETE RESTRICT,

    assigned_member_id VARCHAR(20)
        REFERENCES business_members(id) ON DELETE SET NULL,

    status VARCHAR(30) NOT NULL DEFAULT 'PENDING' CHECK (
        status IN (
            'PENDING',
            'CONFIRMED',
            'COMPLETED',
            'CANCELLED'
        )
    ),

    date DATE,

    time_slot TIME,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    message TEXT
);


CREATE TABLE job_logs (
    id SERIAL PRIMARY KEY,

    job_id INTEGER NOT NULL
        REFERENCES jobs(id) ON DELETE CASCADE,

    user_id INTEGER NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    photo_url TEXT,

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,

    business_id VARCHAR(20) NOT NULL
        REFERENCES businesses(id) ON DELETE CASCADE,

    job_id INTEGER UNIQUE NOT NULL
        REFERENCES jobs(id) ON DELETE CASCADE,

    status VARCHAR(30) NOT NULL DEFAULT 'ISSUED' CHECK (
        status IN (
            'ISSUED',
            'PAID',
            'OVERDUE'
        )
    ),

    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,

    due_date DATE NOT NULL,

    total_amount NUMERIC(10,2) NOT NULL
        CHECK (total_amount >= 0),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CHECK (due_date >= issue_date)
);


CREATE TABLE invoice_items (
    id SERIAL PRIMARY KEY,

    invoice_id INTEGER NOT NULL
        REFERENCES invoices(id) ON DELETE CASCADE,

    description VARCHAR(255) NOT NULL,

    sub_total NUMERIC(10,2) NOT NULL
        CHECK (sub_total >= 0)
);


CREATE TABLE payments (
    id SERIAL PRIMARY KEY,

    invoice_id INTEGER NOT NULL
        REFERENCES invoices(id) ON DELETE CASCADE,

    amount NUMERIC(10,2) NOT NULL
        CHECK (amount > 0),

    method VARCHAR(30) NOT NULL CHECK (
        method IN (
            'CASH',
            'CARD',
            'ONLINE_BANKING',
            'E_WALLET'
        )
    )
);


CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    type VARCHAR(50) NOT NULL,

    message TEXT NOT NULL,

    is_read BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE proposals (
    id SERIAL PRIMARY KEY,

    job_id INTEGER UNIQUE NOT NULL
        REFERENCES jobs(id) ON DELETE CASCADE,

    message TEXT NOT NULL,

    proposed_date DATE NOT NULL,

    proposed_time TIME NOT NULL,

    notes TEXT,

    status VARCHAR(30) NOT NULL DEFAULT 'PENDING'
        CHECK (
            status IN (
                'PENDING',
                'ACCEPTED',
                'REJECTED'
            )
        ),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE business_availability (
    id SERIAL PRIMARY KEY,

    business_id VARCHAR(20) NOT NULL
        REFERENCES businesses(id) ON DELETE CASCADE,

    blocked_date DATE NOT NULL,

    is_available BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (business_id, blocked_date)
);