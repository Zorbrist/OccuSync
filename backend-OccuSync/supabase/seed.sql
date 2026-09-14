-- ============================================================
-- OCCUSYNC DUMMY / SEED DATA
-- ============================================================
-- Default password for every dummy user:
-- Password123!
--
-- NOTE:
-- The password_hash values below are placeholder bcrypt hashes
-- for development/testing. Replace them with hashes generated
-- by your application's bcrypt implementation if needed.
-- ============================================================


-- ============================================================
-- 1. USERS
-- ============================================================

INSERT INTO users (email, password_hash, role)
VALUES

-- Customers
('amir.hakim@example.com',
 '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'CUSTOMER'),

('nur.aisyah@example.com',
 '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'CUSTOMER'),

('daniel.tan@example.com',
 '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'CUSTOMER'),

('siti.nabila@example.com',
 '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'CUSTOMER'),

('muhammad.faris@example.com',
 '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'CUSTOMER'),


-- Business owners
('owner@klimaservices.example.com',
 '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'BUSINESS_PROVIDER'),

('owner@proflow.example.com',
 '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'BUSINESS_PROVIDER'),

('owner@brightgrid.example.com',
 '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'BUSINESS_PROVIDER'),

('owner@rapidroute.example.com',
 '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'BUSINESS_PROVIDER'),


-- Staff
('staff1@klimaservices.example.com',
 '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'BUSINESS_PROVIDER'),

('staff2@klimaservices.example.com',
 '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'BUSINESS_PROVIDER'),

('staff@proflow.example.com',
 '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldLZdL17lhWy',
 'BUSINESS_PROVIDER'),

('staff@brightgrid.example.com',
 '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'BUSINESS_PROVIDER'),


-- Admin
('admin@occusync.example.com',
 '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'ADMIN');


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
),

(
    (SELECT id FROM users WHERE email = 'daniel.tan@example.com'),
    'Daniel', 'Tan',
    '016-5678901',
    '12, Jalan SS 15/4',
    'Selangor',
    '47500',
    'Malaysia'
),

(
    (SELECT id FROM users WHERE email = 'siti.nabila@example.com'),
    'Siti Nabila', 'Azman',
    '017-6789012',
    'No. 6, Jalan Bukit Jelutong',
    'Selangor',
    '40150',
    'Malaysia'
),

(
    (SELECT id FROM users WHERE email = 'muhammad.faris@example.com'),
    'Muhammad Faris', 'Ismail',
    '018-7890123',
    'No. 31, Jalan Tasik Utama',
    'Selangor',
    '68000',
    'Malaysia'
);


-- ============================================================
-- 3. BUSINESS MEMBER PROFILES
-- ============================================================

INSERT INTO business_member_profiles
(user_id, first_name, last_name, phone, profile_picture)
VALUES

(
    (SELECT id FROM users WHERE email = 'owner@klimaservices.example.com'),
    'Hakim', 'Zulkifli',
    '012-1112233',
    NULL
),

(
    (SELECT id FROM users WHERE email = 'owner@proflow.example.com'),
    'Faiz', 'Rahman',
    '013-2223344',
    NULL
),

(
    (SELECT id FROM users WHERE email = 'owner@brightgrid.example.com'),
    'Jonathan', 'Lee',
    '016-3334455',
    NULL
),

(
    (SELECT id FROM users WHERE email = 'owner@rapidroute.example.com'),
    'Arif', 'Hamzah',
    '017-4445566',
    NULL
),

(
    (SELECT id FROM users WHERE email = 'staff1@klimaservices.example.com'),
    'Amirul', 'Hassan',
    '018-5556677',
    NULL
),

(
    (SELECT id FROM users WHERE email = 'staff2@klimaservices.example.com'),
    'Syafiq', 'Adnan',
    '019-6667788',
    NULL
),

(
    (SELECT id FROM users WHERE email = 'staff@proflow.example.com'),
    'Daniel', 'Wong',
    '012-7778899',
    NULL
),

(
    (SELECT id FROM users WHERE email = 'staff@brightgrid.example.com'),
    'Jason', 'Lim',
    '013-8889900',
    NULL
);


-- ============================================================
-- 4. BUSINESSES
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
),

(
    'BrightGrid Energy Solutions Sdn. Bhd.',
    '202601003456',
    'APPROVED',
    'ENERGY',
    '03-55163456',
    'contact@brightgrid.example.com',
    'Selangor',
    '40170',
    'Malaysia'
),

(
    'RapidRoute Logistics Sdn. Bhd.',
    '202601004567',
    'PENDING',
    'LOGISTICS',
    '03-55274567',
    'contact@rapidroute.example.com',
    'Selangor',
    '40400',
    'Malaysia'
);


-- ============================================================
-- 5. BUSINESS MEMBERS
-- ============================================================

-- KlimaPro
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
);


-- ProFlow
INSERT INTO business_members
(user_id, business_id, role)
VALUES
(
    (SELECT id FROM users WHERE email = 'owner@proflow.example.com'),
    (SELECT id FROM businesses WHERE name = 'ProFlow Plumbing Services Sdn. Bhd.'),
    'OWNER'
),
(
    (SELECT id FROM users WHERE email = 'staff@proflow.example.com'),
    (SELECT id FROM businesses WHERE name = 'ProFlow Plumbing Services Sdn. Bhd.'),
    'STAFF'
);


-- BrightGrid
INSERT INTO business_members
(user_id, business_id, role)
VALUES
(
    (SELECT id FROM users WHERE email = 'owner@brightgrid.example.com'),
    (SELECT id FROM businesses WHERE name = 'BrightGrid Energy Solutions Sdn. Bhd.'),
    'OWNER'
),
(
    (SELECT id FROM users WHERE email = 'staff@brightgrid.example.com'),
    (SELECT id FROM businesses WHERE name = 'BrightGrid Energy Solutions Sdn. Bhd.'),
    'STAFF'
);


-- RapidRoute
INSERT INTO business_members
(user_id, business_id, role)
VALUES
(
    (SELECT id FROM users WHERE email = 'owner@rapidroute.example.com'),
    (SELECT id FROM businesses WHERE name = 'RapidRoute Logistics Sdn. Bhd.'),
    'OWNER'
);


-- ============================================================
-- 6. STAFF INVITATIONS
-- ============================================================

INSERT INTO staff_invitations
(business_id, email, token_hash, expires_at, accepted_at)
VALUES

(
    (SELECT id FROM businesses WHERE name = 'KlimaPro Solutions Sdn. Bhd.'),
    'newstaff@klimapro.example.com',
    'dummy-token-hash-klima-001',
    CURRENT_TIMESTAMP + INTERVAL '7 days',
    NULL
),

(
    (SELECT id FROM businesses WHERE name = 'ProFlow Plumbing Services Sdn. Bhd.'),
    'technician@proflow.example.com',
    'dummy-token-hash-proflow-001',
    CURRENT_TIMESTAMP + INTERVAL '5 days',
    NULL
),

(
    (SELECT id FROM businesses WHERE name = 'BrightGrid Energy Solutions Sdn. Bhd.'),
    'technician@brightgrid.example.com',
    'dummy-token-hash-brightgrid-001',
    CURRENT_TIMESTAMP - INTERVAL '2 days',
    NULL
);


-- ============================================================
-- 7. SERVICES
-- ============================================================

-- KlimaPro HVAC services

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
);


-- ProFlow plumbing services

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
);


-- BrightGrid energy services

INSERT INTO services
(business_id, name, description, base_price, estimated_duration)
VALUES

(
    (SELECT id FROM businesses WHERE name = 'BrightGrid Energy Solutions Sdn. Bhd.'),
    'Electrical Inspection',
    'General electrical safety inspection for residential properties.',
    100.00,
    60
),

(
    (SELECT id FROM businesses WHERE name = 'BrightGrid Energy Solutions Sdn. Bhd.'),
    'Electrical Wiring Repair',
    'Diagnosis and repair of common household electrical wiring issues.',
    180.00,
    120
),

(
    (SELECT id FROM businesses WHERE name = 'BrightGrid Energy Solutions Sdn. Bhd.'),
    'Solar Panel Inspection',
    'Inspection and performance assessment of residential solar panels.',
    200.00,
    120
);


-- ============================================================
-- 8. JOBS
-- ============================================================

-- Amir -> KlimaPro
INSERT INTO jobs
(business_id, customer_id, service_id, assigned_member_id,
 status, date, time_slot)
VALUES
(
    (SELECT id FROM businesses WHERE name = 'KlimaPro Solutions Sdn. Bhd.'),
    (SELECT id FROM customer_profiles WHERE user_id =
        (SELECT id FROM users WHERE email = 'amir.hakim@example.com')),
    (SELECT id FROM services WHERE name = 'Air Conditioner Servicing'),
    (SELECT id FROM business_members WHERE user_id =
        (SELECT id FROM users WHERE email = 'staff1@klimaservices.example.com')),
    'COMPLETED',
    '2026-09-05',
    '2026-09-05 10:00:00'
);


-- Aisyah -> KlimaPro
INSERT INTO jobs
(business_id, customer_id, service_id, assigned_member_id,
 status, date, time_slot)
VALUES
(
    (SELECT id FROM businesses WHERE name = 'KlimaPro Solutions Sdn. Bhd.'),
    (SELECT id FROM customer_profiles WHERE user_id =
        (SELECT id FROM users WHERE email = 'nur.aisyah@example.com')),
    (SELECT id FROM services WHERE name = 'Air Conditioner Chemical Wash'),
    (SELECT id FROM business_members WHERE user_id =
        (SELECT id FROM users WHERE email = 'staff2@klimaservices.example.com')),
    'CONFIRMED',
    '2026-09-18',
    '2026-09-18 14:00:00'
);


-- Daniel -> ProFlow
INSERT INTO jobs
(business_id, customer_id, service_id, assigned_member_id,
 status, date, time_slot)
VALUES
(
    (SELECT id FROM businesses WHERE name = 'ProFlow Plumbing Services Sdn. Bhd.'),
    (SELECT id FROM customer_profiles WHERE user_id =
        (SELECT id FROM users WHERE email = 'daniel.tan@example.com')),
    (SELECT id FROM services WHERE name = 'Pipe Leak Repair'),
    (SELECT id FROM business_members WHERE user_id =
        (SELECT id FROM users WHERE email = 'staff@proflow.example.com')),
    'COMPLETED',
    '2026-09-07',
    '2026-09-07 11:00:00'
);


-- Siti -> ProFlow
INSERT INTO jobs
(business_id, customer_id, service_id, assigned_member_id,
 status, date, time_slot)
VALUES
(
    (SELECT id FROM businesses WHERE name = 'ProFlow Plumbing Services Sdn. Bhd.'),
    (SELECT id FROM customer_profiles WHERE user_id =
        (SELECT id FROM users WHERE email = 'siti.nabila@example.com')),
    (SELECT id FROM services WHERE name = 'Drain Unblocking'),
    NULL,
    'PENDING',
    '2026-09-20',
    '2026-09-20 09:00:00'
);


-- Faris -> BrightGrid
INSERT INTO jobs
(business_id, customer_id, service_id, assigned_member_id,
 status, date, time_slot)
VALUES
(
    (SELECT id FROM businesses WHERE name = 'BrightGrid Energy Solutions Sdn. Bhd.'),
    (SELECT id FROM customer_profiles WHERE user_id =
        (SELECT id FROM users WHERE email = 'muhammad.faris@example.com')),
    (SELECT id FROM services WHERE name = 'Electrical Inspection'),
    (SELECT id FROM business_members WHERE user_id =
        (SELECT id FROM users WHERE email = 'staff@brightgrid.example.com')),
    'CONFIRMED',
    '2026-09-22',
    '2026-09-22 15:00:00'
);

-- ============================================================
-- 9. JOB LOGS
-- ============================================================

INSERT INTO job_logs
(job_id, user_id, photo_url, notes)
VALUES

(
    (
        SELECT id
        FROM jobs
        WHERE customer_id = (
            SELECT id
            FROM customer_profiles
            WHERE user_id = (
                SELECT id FROM users
                WHERE email = 'amir.hakim@example.com'
            )
        )
        AND service_id = (
            SELECT id
            FROM services
            WHERE name = 'Air Conditioner Servicing'
        )
    ),
    (
        SELECT id FROM users
        WHERE email = 'staff1@klimaservices.example.com'
    ),
    'https://example.com/job-photos/ac-service-001.jpg',
    'Air conditioner cleaned and tested successfully.'
),

(
    (
        SELECT id
        FROM jobs
        WHERE customer_id = (
            SELECT id
            FROM customer_profiles
            WHERE user_id = (
                SELECT id FROM users
                WHERE email = 'daniel.tan@example.com'
            )
        )
        AND service_id = (
            SELECT id
            FROM services
            WHERE name = 'Pipe Leak Repair'
        )
    ),
    (
        SELECT id FROM users
        WHERE email = 'staff@proflow.example.com'
    ),
    'https://example.com/job-photos/pipe-repair-001.jpg',
    'Leaking pipe repaired and water pressure tested.'
);


-- ============================================================
-- 10. INVOICES
-- ============================================================

INSERT INTO invoices
(business_id, job_id, status, issue_date, due_date, total_amount)
VALUES

(
    (SELECT id FROM businesses
     WHERE name = 'KlimaPro Solutions Sdn. Bhd.'),
    (
        SELECT id FROM jobs
        WHERE customer_id = (
            SELECT id FROM customer_profiles
            WHERE user_id = (
                SELECT id FROM users
                WHERE email = 'amir.hakim@example.com'
            )
        )
    ),
    'PAID',
    '2026-09-05',
    '2026-09-12',
    80.00
),

(
    (SELECT id FROM businesses
     WHERE name = 'ProFlow Plumbing Services Sdn. Bhd.'),
    (
        SELECT id FROM jobs
        WHERE customer_id = (
            SELECT id FROM customer_profiles
            WHERE user_id = (
                SELECT id FROM users
                WHERE email = 'daniel.tan@example.com'
            )
        )
    ),
    'OVERDUE',
    '2026-09-07',
    '2026-09-14',
    120.00
);


-- ============================================================
-- 11. INVOICE ITEMS
-- ============================================================

INSERT INTO invoice_items
(invoice_id, description, sub_total)
VALUES

(
    (
        SELECT id FROM invoices
        WHERE total_amount = 80.00
        AND business_id = (
            SELECT id FROM businesses
            WHERE name = 'KlimaPro Solutions Sdn. Bhd.'
        )
    ),
    'Air Conditioner Servicing',
    80.00
),

(
    (
        SELECT id FROM invoices
        WHERE total_amount = 120.00
        AND business_id = (
            SELECT id FROM businesses
            WHERE name = 'ProFlow Plumbing Services Sdn. Bhd.'
        )
    ),
    'Pipe Leak Repair',
    120.00
);


-- ============================================================
-- 12. PAYMENTS
-- ============================================================

INSERT INTO payments
(invoice_id, amount, method)
VALUES

(
    (
        SELECT id FROM invoices
        WHERE total_amount = 80.00
        AND business_id = (
            SELECT id FROM businesses
            WHERE name = 'KlimaPro Solutions Sdn. Bhd.'
        )
    ),
    80.00,
    'ONLINE_BANKING'
);


-- ============================================================
-- 13. NOTIFICATIONS
-- ============================================================

INSERT INTO notifications
(user_id, type, message, is_read)
VALUES

(
    (SELECT id FROM users WHERE email = 'amir.hakim@example.com'),
    'JOB_COMPLETED',
    'Your air conditioner servicing job has been completed.',
    FALSE
),

(
    (SELECT id FROM users WHERE email = 'nur.aisyah@example.com'),
    'JOB_CONFIRMED',
    'Your air conditioner chemical wash has been confirmed.',
    FALSE
),

(
    (SELECT id FROM users WHERE email = 'daniel.tan@example.com'),
    'INVOICE_ISSUED',
    'Your invoice for the pipe leak repair has been issued.',
    TRUE
),

(
    (SELECT id FROM users WHERE email = 'owner@klimaservices.example.com'),
    'NEW_JOB',
    'A new service booking has been received.',
    FALSE
),

(
    (SELECT id FROM users WHERE email = 'staff1@klimaservices.example.com'),
    'JOB_ASSIGNED',
    'A new job has been assigned to you.',
    FALSE
),

(
    (SELECT id FROM users WHERE email = 'admin@occusync.example.com'),
    'BUSINESS_PENDING',
    'RapidRoute Logistics Sdn. Bhd. is awaiting approval.',
    FALSE
);


-- ============================================================
-- 14. MESSAGES
-- ============================================================

-- Customer -> Business
INSERT INTO messages
(business_id, customer_id, sender_user_id, message_text, is_read)
VALUES

(
    (SELECT id FROM businesses
     WHERE name = 'KlimaPro Solutions Sdn. Bhd.'),
    (SELECT id FROM customer_profiles
     WHERE user_id = (
         SELECT id FROM users
         WHERE email = 'amir.hakim@example.com'
     )),
    (SELECT id FROM users
     WHERE email = 'amir.hakim@example.com'),
    'Hi, my air conditioner has started making a strange noise. Can you check it during the service?',
    TRUE
),

-- Business -> Customer
(
    (SELECT id FROM businesses
     WHERE name = 'KlimaPro Solutions Sdn. Bhd.'),
    (SELECT id FROM customer_profiles
     WHERE user_id = (
         SELECT id FROM users
         WHERE email = 'amir.hakim@example.com'
     )),
    (SELECT id FROM users
     WHERE email = 'staff1@klimaservices.example.com'),
    'Sure. We will inspect the unit and let you know if any additional repair is required.',
    TRUE
),

-- Customer -> Business
(
    (SELECT id FROM businesses
     WHERE name = 'ProFlow Plumbing Services Sdn. Bhd.'),
    (SELECT id FROM customer_profiles
     WHERE user_id = (
         SELECT id FROM users
         WHERE email = 'daniel.tan@example.com'
     )),
    (SELECT id FROM users
     WHERE email = 'daniel.tan@example.com'),
    'The leak seems to be coming from underneath the kitchen sink.',
    TRUE
),

-- Business -> Customer
(
    (SELECT id FROM businesses
     WHERE name = 'ProFlow Plumbing Services Sdn. Bhd.'),
    (SELECT id FROM customer_profiles
     WHERE user_id = (
         SELECT id FROM users
         WHERE email = 'daniel.tan@example.com'
     )),
    (SELECT id FROM users
     WHERE email = 'staff@proflow.example.com'),
    'Thanks for the information. We will inspect the pipe connection when we arrive.',
    FALSE
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
UNION ALL
SELECT 'messages', COUNT(*) FROM messages;