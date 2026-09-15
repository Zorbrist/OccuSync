
-- ============================================================
-- Default password for every dummy user:
-- Password123!
-- ============================================================


-- ============================================================
-- 1. USERS
-- Total: 12 Accounts (1 Admin, 2 Customers, 9 Business Providers)
-- ============================================================

INSERT INTO users (email, password_hash, role)
VALUES

-- Admin (1)
('admin@occusync.example.com',
 '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
 'ADMIN'),

-- Customers (2)
('amir.hakim@example.com',
 '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
 'CUSTOMER'),

('nur.aisyah@example.com',
 '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
 'CUSTOMER'),

-- Business Providers (9 total: 2 Owners + 7 Staff)
-- KlimaPro (1 Owner + 3 Staff)
('owner@klimaservices.example.com',
 '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
 'BUSINESS_PROVIDER'),

('staff1@klimaservices.example.com',
 '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
 'BUSINESS_PROVIDER'),

('staff2@klimaservices.example.com',
 '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
 'BUSINESS_PROVIDER'),

('staff3@klimaservices.example.com',
 '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
 'BUSINESS_PROVIDER'),

-- ProFlow (1 Owner + 4 Staff)
('owner@proflow.example.com',
 '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
 'BUSINESS_PROVIDER'),

('staff1@proflow.example.com',
 '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
 'BUSINESS_PROVIDER'),

('staff2@proflow.example.com',
 '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
 'BUSINESS_PROVIDER'),

('staff3@proflow.example.com',
 '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
 'BUSINESS_PROVIDER'),

('staff4@proflow.example.com',
 '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
 'BUSINESS_PROVIDER');


-- ============================================================
-- 2. CUSTOMER PROFILES
-- ============================================================

INSERT INTO customer_profiles
(user_id, first_name, last_name, phone,
 address_line, state, postcode, country)
VALUES

(
    (SELECT id FROM users WHERE email = 'amir.hakim@example.com'),
    'Amir', 'Hakim',
    '012-3456789',
    'No. 18, Jalan Anggerik 2/3',
    'Selangor',
    '40460',
    'Malaysia'
),

(
    (SELECT id FROM users WHERE email = 'nur.aisyah@example.com'),
    'Nur Aisyah', 'Rahman',
    '013-4567890',
    'No. 27, Jalan Setia Perdana',
    'Selangor',
    '40170',
    'Malaysia'
);


-- ============================================================
-- 3. BUSINESS MEMBER PROFILES
-- ============================================================

INSERT INTO business_member_profiles
(user_id, first_name, last_name, phone, profile_picture)
VALUES

-- KlimaPro Members
(
    (SELECT id FROM users WHERE email = 'owner@klimaservices.example.com'),
    'Hakim', 'Zulkifli', '012-1112233', NULL
),
(
    (SELECT id FROM users WHERE email = 'staff1@klimaservices.example.com'),
    'Amirul', 'Hassan', '018-5556677', NULL
),
(
    (SELECT id FROM users WHERE email = 'staff2@klimaservices.example.com'),
    'Syafiq', 'Adnan', '019-6667788', NULL
),
(
    (SELECT id FROM users WHERE email = 'staff3@klimaservices.example.com'),
    'Khairul', 'Anuar', '017-3334455', NULL
),

-- ProFlow Members
(
    (SELECT id FROM users WHERE email = 'owner@proflow.example.com'),
    'Faiz', 'Rahman', '013-2223344', NULL
),
(
    (SELECT id FROM users WHERE email = 'staff1@proflow.example.com'),
    'Daniel', 'Wong', '012-7778899', NULL
),
(
    (SELECT id FROM users WHERE email = 'staff2@proflow.example.com'),
    'Chong', 'Wei', '016-8889900', NULL
),
(
    (SELECT id FROM users WHERE email = 'staff3@proflow.example.com'),
    'Muthu', 'Kumar', '011-9990011', NULL
),
(
    (SELECT id FROM users WHERE email = 'staff4@proflow.example.com'),
    'Azman', 'Rosli', '014-2221133', NULL
);


-- ============================================================
-- 4. BUSINESSES (2 Businesses)
-- ============================================================

INSERT INTO businesses
(name, registration_no, approval_status, industry,
 phone, email, state, postcode, country)
VALUES

(
    'KlimaPro Solutions Sdn. Bhd.',
    '202601001234',
    'APPROVED',
    'HVAC',
    '03-55671234',
    'contact@klimapro.example.com',
    'Selangor',
    '40150',
    'Malaysia'
),

(
    'ProFlow Plumbing Services Sdn. Bhd.',
    '202601002345',
    'APPROVED',
    'PLUMBING',
    '03-78452345',
    'contact@proflow.example.com',
    'Selangor',
    '47301',
    'Malaysia'
);


-- ============================================================
-- 5. BUSINESS MEMBERS
-- ============================================================

-- KlimaPro (1 Owner + 3 Staff)
INSERT INTO business_members
(user_id, business_id, role)
VALUES
(
    (SELECT id FROM users WHERE email = 'owner@klimaservices.example.com'),
    (SELECT id FROM businesses WHERE name = 'KlimaPro Solutions Sdn. Bhd.'),
    'OWNER'
),
(
    (SELECT id FROM users WHERE email = 'staff1@klimaservices.example.com'),
    (SELECT id FROM businesses WHERE name = 'KlimaPro Solutions Sdn. Bhd.'),
    'STAFF'
),
(
    (SELECT id FROM users WHERE email = 'staff2@klimaservices.example.com'),
    (SELECT id FROM businesses WHERE name = 'KlimaPro Solutions Sdn. Bhd.'),
    'STAFF'
),
(
    (SELECT id FROM users WHERE email = 'staff3@klimaservices.example.com'),
    (SELECT id FROM businesses WHERE name = 'KlimaPro Solutions Sdn. Bhd.'),
    'STAFF'
);


-- ProFlow (1 Owner + 4 Staff)
INSERT INTO business_members
(user_id, business_id, role)
VALUES
(
    (SELECT id FROM users WHERE email = 'owner@proflow.example.com'),
    (SELECT id FROM businesses WHERE name = 'ProFlow Plumbing Services Sdn. Bhd.'),
    'OWNER'
),
(
    (SELECT id FROM users WHERE email = 'staff1@proflow.example.com'),
    (SELECT id FROM businesses WHERE name = 'ProFlow Plumbing Services Sdn. Bhd.'),
    'STAFF'
),
(
    (SELECT id FROM users WHERE email = 'staff2@proflow.example.com'),
    (SELECT id FROM businesses WHERE name = 'ProFlow Plumbing Services Sdn. Bhd.'),
    'STAFF'
),
(
    (SELECT id FROM users WHERE email = 'staff3@proflow.example.com'),
    (SELECT id FROM businesses WHERE name = 'ProFlow Plumbing Services Sdn. Bhd.'),
    'STAFF'
),
(
    (SELECT id FROM users WHERE email = 'staff4@proflow.example.com'),
    (SELECT id FROM businesses WHERE name = 'ProFlow Plumbing Services Sdn. Bhd.'),
    'STAFF'
);



-- ============================================================
-- 7. SERVICES (4 Services per Business)
-- ============================================================

-- KlimaPro HVAC services (4)
-- ============================================================
-- 7. SERVICES (4 Services per Business)
-- ============================================================

-- KlimaPro HVAC services (4)
INSERT INTO services
(business_id, name, description, base_price, estimated_duration)
VALUES

(
    (SELECT id FROM businesses WHERE name = 'KlimaPro Solutions Sdn. Bhd.'),
    'Air Conditioner Servicing',
    'Standard cleaning and inspection of residential air conditioning units.',
    80.00,
    60
),

(
    (SELECT id FROM businesses WHERE name = 'KlimaPro Solutions Sdn. Bhd.'),
    'Air Conditioner Chemical Wash',
    'Deep chemical cleaning for heavily soiled air conditioning units.',
    150.00,
    90
),

(
    (SELECT id FROM businesses WHERE name = 'KlimaPro Solutions Sdn. Bhd.'),
    'Air Conditioner Installation',
    'Installation of a new residential split air conditioning unit.',
    350.00,
    180
),

(
    (SELECT id FROM businesses WHERE name = 'KlimaPro Solutions Sdn. Bhd.'),
    'Gas Top-Up Service',
    'R32/R410 refrigerant gas top-up for residential units.',
    60.00,
    45
);


-- ProFlow plumbing services (4)
INSERT INTO services
(business_id, name, description, base_price, estimated_duration)
VALUES

(
    (SELECT id FROM businesses WHERE name = 'ProFlow Plumbing Services Sdn. Bhd.'),
    'Pipe Leak Repair',
    'Inspection and repair of leaking household water pipes.',
    120.00,
    90
),

(
    (SELECT id FROM businesses WHERE name = 'ProFlow Plumbing Services Sdn. Bhd.'),
    'Drain Unblocking',
    'Clearing of blocked household drains and pipework.',
    100.00,
    60
),

(
    (SELECT id FROM businesses WHERE name = 'ProFlow Plumbing Services Sdn. Bhd.'),
    'Water Heater Installation',
    'Installation and basic testing of residential water heaters.',
    250.00,
    120
),

(
    (SELECT id FROM businesses WHERE name = 'ProFlow Plumbing Services Sdn. Bhd.'),
    'Toilet Bowl Replacement',
    'Removal of old unit and installation of a new toilet bowl.',
    300.00,
    150
);



-- ============================================================
-- 15. VERIFICATION QUERIES
-- ============================================================

SELECT 'users' AS table_name, COUNT(*) AS records FROM users
UNION ALL
SELECT 'customer_profiles', COUNT(*) FROM customer_profiles
UNION ALL
SELECT 'business_member_profiles', COUNT(*) FROM business_member_profiles
UNION ALL
SELECT 'businesses', COUNT(*) FROM businesses
UNION ALL
SELECT 'business_members', COUNT(*) FROM business_members
UNION ALL
SELECT 'staff_invitations', COUNT(*) FROM staff_invitations
UNION ALL
SELECT 'services', COUNT(*) FROM services
UNION ALL
SELECT 'jobs', COUNT(*) FROM jobs
UNION ALL
SELECT 'job_logs', COUNT(*) FROM job_logs
UNION ALL
SELECT 'invoices', COUNT(*) FROM invoices
UNION ALL
SELECT 'invoice_items', COUNT(*) FROM invoice_items
UNION ALL
SELECT 'payments', COUNT(*) FROM payments
UNION ALL
SELECT 'notifications', COUNT(*) FROM notifications
