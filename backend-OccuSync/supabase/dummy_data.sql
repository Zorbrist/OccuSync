-- run dekat dbeaver 

TRUNCATE TABLE
    notifications,
    payments,
    invoice_items,
    invoices,
    job_logs,
    jobs,
    staff_skills,
    services,
    business_members,
    businesses,
    customer_profiles,
    users
RESTART IDENTITY CASCADE;

INSERT INTO users (email, password_hash, role)
VALUES
(
    'syafiq@gmail.com',
    '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
    'CUSTOMER'
),
(
    'anis@gmail.com',
    '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
    'CUSTOMER'
),
(
    'amir@gmail.com',
    '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
    'CUSTOMER'
),
(
    'farah@gmail.com',
    '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
    'CUSTOMER'
),
(
    'danial@gmail.com',
    '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
    'CUSTOMER'
),
(
    'coolair@gmail.com',
    '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
    'SERVICE_PROVIDER'
),
(
    'coolair.staff@gmail.com',
    '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
    'SERVICE_PROVIDER'
),
(
    'sparkpro@gmail.com',
    '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
    'SERVICE_PROVIDER'
),
(
    'sparkpro.staff@gmail.com',
    '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
    'SERVICE_PROVIDER'
),
(
    'homefix@gmail.com',
    '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
    'SERVICE_PROVIDER'
),
(
    'admin@occusync.com',
    '$2b$12$9sxQY5wlGI0YaRvAdRs73uU4v08ohN6urr9tzBf1kw1jiZ8MYEctu',
    'ADMIN'
);



INSERT INTO customer_profiles
    (user_id, first_name, last_name, phone, country, state, postcode)
VALUES
(
    1,
    'Syafiq',
    'Danial',
    '0123456789',
    'Malaysia',
    'Selangor',
    '40150'
),
(
    2,
    'Anis',
    'Asyikin',
    '0134567890',
    'Malaysia',
    'Selangor',
    '40100'
),
(
    3,
    'Amir',
    'Hakim',
    '0145678901',
    'Malaysia',
    'Selangor',
    '40000'
),
(
    4,
    'Farah',
    'Aina',
    '0167890123',
    'Malaysia',
    'Kuala Lumpur',
    '50000'
),
(
    5,
    'Danial',
    'Hafiz',
    '0178901234',
    'Malaysia',
    'Selangor',
    ' Shah Alam'
);



INSERT INTO businesses
    (
        name,
        registration_no,
        industry,
        area_of_service,
        phone,
        email,
        state,
        postcode,
        country
    )
VALUES
(
    'Cool Air Services',
    'SSM100001',
    'Air Conditioning',
    'Shah Alam, Klang, Petaling Jaya',
    '0323456789',
    'coolair@gmail.com',
    'Selangor',
    '40150',
    'Malaysia'
),
(
    'SparkPro Electrical',
    'SSM100002',
    'Electrical Services',
    'Shah Alam, Subang Jaya, Klang',
    '0334567890',
    'sparkpro@gmail.com',
    'Selangor',
    '40170',
    'Malaysia'
),
(
    'HomeFix Solutions',
    'SSM100003',
    'Home Maintenance',
    'Shah Alam, Petaling Jaya, Kuala Lumpur',
    '0345678901',
    'homefix@gmail.com',
    'Selangor',
    '40000',
    'Malaysia'
);



INSERT INTO business_members
    (user_id, business_id, role)
VALUES
-- Cool Air Services
(6, 'BUS001', 'OWNER'),
(7, 'BUS001', 'STAFF'),

-- SparkPro Electrical
(8, 'BUS002', 'OWNER'),
(9, 'BUS002', 'STAFF'),

-- HomeFix Solutions
(10, 'BUS003', 'OWNER');



INSERT INTO services
    (
        business_id,
        name,
        description,
        base_price,
        estimated_duration
    )
VALUES

-- Cool Air Services
(
    'BUS001',
    'Air Conditioner Repair',
    'Diagnosis and repair of common air conditioner problems.',
    80.00,
    60
),
(
    'BUS001',
    'Air Conditioner Cleaning',
    'Full cleaning and maintenance of residential air conditioners.',
    60.00,
    45
),
(
    'BUS001',
    'Air Conditioner Installation',
    'Professional installation of wall-mounted air conditioning units.',
    250.00,
    120
),

-- SparkPro Electrical
(
    'BUS002',
    'Electrical Wiring',
    'Electrical wiring installation and repair.',
    120.00,
    90
),
(
    'BUS002',
    'Light Installation',
    'Installation of ceiling lights and lighting fixtures.',
    50.00,
    45
),
(
    'BUS002',
    'Power Socket Repair',
    'Inspection and repair of faulty electrical sockets.',
    40.00,
    30
),

-- HomeFix Solutions
(
    'BUS003',
    'Plumbing Repair',
    'Repair of leaking pipes, taps and household plumbing.',
    70.00,
    60
),
(
    'BUS003',
    'Furniture Assembly',
    'Assembly of household furniture and fixtures.',
    80.00,
    90
),
(
    'BUS003',
    'Wall Painting',
    'Interior wall painting service.',
    150.00,
    180
);




INSERT INTO staff_skills
    (member_id, service_id, proficiency)
VALUES
-- Cool Air owner
('MEM001', 1, 'Expert'),
('MEM001', 2, 'Expert'),
('MEM001', 3, 'Expert'),

-- Cool Air staff
('MEM002', 1, 'Intermediate'),
('MEM002', 2, 'Expert'),

-- SparkPro owner
('MEM003', 4, 'Expert'),
('MEM003', 5, 'Expert'),
('MEM003', 6, 'Expert'),

-- SparkPro staff
('MEM004', 4, 'Intermediate'),
('MEM004', 5, 'Expert'),
('MEM004', 6, 'Intermediate'),

-- HomeFix owner
('MEM005', 7, 'Expert'),
('MEM005', 8, 'Expert'),
('MEM005', 9, 'Intermediate');



INSERT INTO jobs
    (
        business_id,
        customer_id,
        service_id,
        assigned_member_id,
        status,
        scheduled_start,
        scheduled_end,
        notes
    )
VALUES

-- Job 1 - Syafiq - Completed
(
    'BUS001',
    'CUST001',
    1,
    'MEM001',
    'COMPLETED',
    CURRENT_TIMESTAMP - INTERVAL '10 days',
    CURRENT_TIMESTAMP - INTERVAL '10 days' + INTERVAL '1 hour',
    'Air conditioner making unusual noise.'
),

-- Job 2 - Syafiq - Upcoming
(
    'BUS002',
    'CUST001',
    5,
    'MEM004',
    'CONFIRMED',
    CURRENT_TIMESTAMP + INTERVAL '2 days',
    CURRENT_TIMESTAMP + INTERVAL '2 days' + INTERVAL '45 minutes',
    'Install new ceiling light in living room.'
),

-- Job 3 - Anis - In progress
(
    'BUS003',
    'CUST002',
    7,
    'MEM005',
    'IN_PROGRESS',
    CURRENT_TIMESTAMP - INTERVAL '1 hour',
    CURRENT_TIMESTAMP + INTERVAL '30 minutes',
    'Kitchen sink is leaking.'
),

-- Job 4 - Anis - Completed
(
    'BUS001',
    'CUST002',
    2,
    'MEM002',
    'COMPLETED',
    CURRENT_TIMESTAMP - INTERVAL '20 days',
    CURRENT_TIMESTAMP - INTERVAL '20 days' + INTERVAL '45 minutes',
    'Routine air conditioner cleaning.'
),

-- Job 5 - Amir - Pending
(
    'BUS001',
    'CUST003',
    3,
    NULL,
    'PENDING',
    CURRENT_TIMESTAMP + INTERVAL '5 days',
    CURRENT_TIMESTAMP + INTERVAL '5 days' + INTERVAL '2 hours',
    'Need installation for new air conditioner.'
),

-- Job 6 - Amir - Assigned
(
    'BUS002',
    'CUST003',
    6,
    'MEM004',
    'ASSIGNED',
    CURRENT_TIMESTAMP + INTERVAL '3 days',
    CURRENT_TIMESTAMP + INTERVAL '3 days' + INTERVAL '30 minutes',
    'Power socket is not working.'
),

-- Job 7 - Farah - Completed
(
    'BUS003',
    'CUST004',
    8,
    'MEM005',
    'COMPLETED',
    CURRENT_TIMESTAMP - INTERVAL '7 days',
    CURRENT_TIMESTAMP - INTERVAL '7 days' + INTERVAL '90 minutes',
    'Assemble new wardrobe.'
),

-- Job 8 - Farah - Cancelled
(
    'BUS002',
    'CUST004',
    4,
    NULL,
    'CANCELLED',
    CURRENT_TIMESTAMP - INTERVAL '3 days',
    CURRENT_TIMESTAMP - INTERVAL '3 days' + INTERVAL '90 minutes',
    'Customer cancelled the appointment.'
),

-- Job 9 - Danial - Confirmed
(
    'BUS003',
    'CUST005',
    9,
    'MEM005',
    'CONFIRMED',
    CURRENT_TIMESTAMP + INTERVAL '7 days',
    CURRENT_TIMESTAMP + INTERVAL '7 days' + INTERVAL '3 hours',
    'Paint bedroom walls.'
),

-- Job 10 - Danial - Completed
(
    'BUS001',
    'CUST005',
    1,
    'MEM001',
    'COMPLETED',
    CURRENT_TIMESTAMP - INTERVAL '30 days',
    CURRENT_TIMESTAMP - INTERVAL '30 days' + INTERVAL '1 hour',
    'Air conditioner stopped cooling.'
);



INSERT INTO job_logs
    (job_id, user_id, notes, photo_url)
VALUES
(
    1,
    6,
    'Inspected air conditioner and replaced faulty capacitor.',
    NULL
),
(
    1,
    1,
    'Service completed successfully.',
    NULL
),
(
    3,
    10,
    'Inspected kitchen sink and identified leaking pipe.',
    NULL
),
(
    4,
    7,
    'Completed full air conditioner cleaning.',
    NULL
),
(
    7,
    10,
    'Wardrobe assembly completed.',
    NULL
),
(
    10,
    6,
    'Repaired compressor connection and tested cooling.',
    NULL
);



INSERT INTO invoices
    (
        business_id,
        job_id,
        status,
        issue_date,
        due_date,
        total_amount
    )
VALUES
-- Job 1
(
    'BUS001',
    1,
    'PAID',
    CURRENT_DATE - 10,
    CURRENT_DATE - 3,
    80.00
),

-- Job 2
(
    'BUS002',
    2,
    'ISSUED',
    CURRENT_DATE,
    CURRENT_DATE + 7,
    50.00
),

-- Job 3
(
    'BUS003',
    3,
    'ISSUED',
    CURRENT_DATE,
    CURRENT_DATE + 7,
    70.00
),

-- Job 4
(
    'BUS001',
    4,
    'PAID',
    CURRENT_DATE - 20,
    CURRENT_DATE - 13,
    60.00
),

-- Job 6
(
    'BUS002',
    6,
    'DRAFT',
    CURRENT_DATE,
    CURRENT_DATE + 14,
    40.00
),

-- Job 7
(
    'BUS003',
    7,
    'PAID',
    CURRENT_DATE - 7,
    CURRENT_DATE,
    80.00
),

-- Job 9
(
    'BUS003',
    9,
    'ISSUED',
    CURRENT_DATE,
    CURRENT_DATE + 7,
    150.00
),

-- Job 10
(
    'BUS001',
    10,
    'PAID',
    CURRENT_DATE - 30,
    CURRENT_DATE - 23,
    80.00
);



INSERT INTO invoice_items
    (
        invoice_id,
        description,
        unit_price,
        quantity,
        subtotal
    )
VALUES
(
    1,
    'Air Conditioner Repair',
    80.00,
    1,
    80.00
),
(
    2,
    'Light Installation',
    50.00,
    1,
    50.00
),
(
    3,
    'Plumbing Repair',
    70.00,
    1,
    70.00
),
(
    4,
    'Air Conditioner Cleaning',
    60.00,
    1,
    60.00
),
(
    5,
    'Power Socket Repair',
    40.00,
    1,
    40.00
),
(
    6,
    'Furniture Assembly',
    80.00,
    1,
    80.00
),
(
    7,
    'Wall Painting',
    150.00,
    1,
    150.00
),
(
    8,
    'Air Conditioner Repair',
    80.00,
    1,
    80.00
);



INSERT INTO payments
    (
        invoice_id,
        amount,
        method,
        status,
        reference,
        paid_at
    )
VALUES
(
    1,
    80.00,
    'ONLINE_BANKING',
    'COMPLETED',
    'PAY-0001',
    CURRENT_TIMESTAMP - INTERVAL '9 days'
),
(
    2,
    50.00,
    'E_WALLET',
    'PENDING',
    'PAY-0002',
    NULL
),
(
    3,
    70.00,
    'CARD',
    'PENDING',
    'PAY-0003',
    NULL
),
(
    4,
    60.00,
    'ONLINE_BANKING',
    'COMPLETED',
    'PAY-0004',
    CURRENT_TIMESTAMP - INTERVAL '19 days'
),
(
    6,
    80.00,
    'CARD',
    'COMPLETED',
    'PAY-0006',
    CURRENT_TIMESTAMP - INTERVAL '6 days'
),
(
    7,
    80.00,
    'E_WALLET',
    'PENDING',
    'PAY-0007',
    NULL
),
(
    8,
    80.00,
    'ONLINE_BANKING',
    'COMPLETED',
    'PAY-0008',
    CURRENT_TIMESTAMP - INTERVAL '29 days'
);



INSERT INTO notifications
    (user_id, type, message, is_read)
VALUES

-- Syafiq
(
    1,
    'BOOKING_CONFIRMED',
    'Your Light Installation booking has been confirmed by SparkPro Electrical.',
    FALSE
),
(
    1,
    'JOB_COMPLETED',
    'Your Air Conditioner Repair has been completed.',
    TRUE
),

-- Anis
(
    2,
    'JOB_STARTED',
    'Your Plumbing Repair service is currently in progress.',
    FALSE
),
(
    2,
    'PAYMENT_REMINDER',
    'Your invoice for Air Conditioner Cleaning is due soon.',
    TRUE
),

-- Amir
(
    3,
    'BOOKING_CREATED',
    'Your Air Conditioner Installation request has been submitted.',
    FALSE
),
(
    3,
    'STAFF_ASSIGNED',
    'A technician has been assigned to your Power Socket Repair booking.',
    FALSE
),

-- Farah
(
    4,
    'JOB_COMPLETED',
    'Your Furniture Assembly service has been completed.',
    TRUE
),
(
    4,
    'BOOKING_CANCELLED',
    'Your Electrical Wiring booking has been cancelled.',
    FALSE
),

-- Danial
(
    5,
    'BOOKING_CONFIRMED',
    'Your Wall Painting booking has been confirmed.',
    FALSE
),

-- Cool Air owner
(
    6,
    'NEW_BOOKING',
    'A new Air Conditioner Installation booking has been received.',
    FALSE
),

-- SparkPro owner
(
    8,
    'NEW_BOOKING',
    'A new Light Installation booking has been received.',
    FALSE
),

-- HomeFix owner
(
    10,
    'NEW_BOOKING',
    'A new Wall Painting booking has been received.',
    FALSE
),

-- Admin
(
    11,
    'SYSTEM',
    'OccuSync has received new customer and business activity.',
    FALSE
);