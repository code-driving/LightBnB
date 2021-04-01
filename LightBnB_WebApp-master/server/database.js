// const properties = require("./json/properties.json");
// const users = require("./json/users.json");
const { Pool } = require("pg");
const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});
pool
  .connect()
  .then(console.log("Connected :)"))
  .catch((err) => console.log(err));
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function (email) {
  const query = `
SELECT *
FROM users
WHERE email = $1;
`;
  const values = [email.toLowerCase()];

  return pool
    .query(query, values)
    .then((response) => response.rows[0])
    .catch((error) => console.error("User not found", error.stack));
};
exports.getUserWithEmail = getUserWithEmail;
/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithId = function (id) {
  const query = `
  SELECT *
  FROM users
  WHERE id = $1;
  `;
  const values = [id];

  return pool
    .query(query, values)
    .then((response) => response.rows[0])
    .catch((error) => console.error("User not found", error.stack));
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const query = `
  INSERT into users (name, email, password)
  VALUES($1, $2, $3) RETURNING *;
  `;
  const values = [user.name, user.email, user.password];

  return pool
    .query(query, values)
    .then((response) => {
      return response.rows[0];
    })
    .catch((error) => error);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const query = `
  SELECT reservations.*, properties.*
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  WHERE reservations.guest_id = $1 AND reservations.end_date < now()::date
  LIMIT $2
  `;
  const values = [guest_id, limit];

  return pool
    .query(query, values)
    .then((response) => response.rows)
    .catch((error) => error.stack);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE TRUE
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length} `; //$1
  }
  // 4
  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `AND properties.owner_id = $${queryParams.length}`;
  }
  // 5
  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night);
    queryString += `AND cost_per_night > $${queryParams.length}`;
  }
  // 6
  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night);
    queryString += `AND cost_per_night < $${queryParams.length}`;
  }
  // 7
  if (options.minimum_rating > 0) {
    queryParams.push(options.minimum_rating);
    queryString += `AND rating > $${queryParams.length}`;
  }
  // 8
  queryParams.push(limit);
  queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;

  return pool
    .query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((error) => console.log(error));
};

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const query = `
  INSERT into properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
  
  RETURNING *;
  `;
  // const values = [
  //   property.owner_id,
  //   property.title,
  //   property.description,
  //   property.thumbnail_photo_url,
  //   property.cover_photo_url,
  //   property.cost_per_night,
  //   property.street,
  //   property.city,
  //   property.province,
  //   property.post_code,
  //   property.country,
  //   property.parking_spaces,
  //   property.number_of_bathrooms,
  //   property.number_of_bedrooms,
  // ];

  let values = [];
  for (let key in property) {
    values.push(property[key]);
  }
  return pool
    .query(query, values)
    .then((response) => response.rows[0])
    .catch((error) => console.log(error));
};
exports.addProperty = addProperty;
