INSERT INTO users (name, email, password)
VALUES ('Ramesh', 'abcd@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users (name, email, password)
VALUES ('Khilan', 'efgh@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users (name, email, password)
VALUES ('Hardik', 'ijkl@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'sand cherry', 'description', 'https://delawanaresort.ca/cottage-rentals.htm', 'https://delawanaresort.ca/muskoka-resorts__cottage-sandcherry-exterior__450x800.jpg', 100, 30, 1, 2, 'Canada', 'Delawana Road', 'Muskoka', 'Ontario', 'P0E 1E0', true),
(2, 'Blueberry', 'description', 'https://delawanaresort.ca/cottage-rentals.htm', 'https://delawanaresort.ca/muskoka-resorts__cottage-blueberry-exterior5__450x800.jpg', 100, 30, 1, 1, 'Canada', 'Delawana Road', 'Muskoka', 'Ontario', 'P0E 1E0', true),
(3, 'Honeysuckle', 'description', 'https://delawanaresort.ca/cottage-rentals.htm', 'https://delawanaresort.ca/muskoka-resorts__cottage-honeysuckle-exterior2__450x800.jpg', 100, 30, 1, 2, 'Canada', 'Delawana Road', 'Muskoka', 'Ontario', 'P0E 1E0', true);


INSERT INTO reservations (
  start_date, end_date, property_id, guest_id
)
VALUES ('2018-09-11', '2018-09-26', 1, 1),
('2019-01-04', '2019-02-01', 2, 2),
('2021-10-01', '2021-10-14', 3, 3);


INSERT INTO property_reviews (
  guest_id, property_id, reservation_id, rating, message
)
VALUES (1, 1, 1, 4, 'messages'),
(2, 2, 2, 4, 'messages'),
(3, 3, 3, 5, 'messages');