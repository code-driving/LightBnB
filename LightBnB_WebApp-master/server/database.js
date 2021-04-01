const properties = require("./json/properties.json");
const users = require("./json/users.json");

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function (email) {
  const query = `
SELECT email
FROM users
WHERE email = $1;
`;
  const values = [email.toLowerCase()];

  return pool
    .query(query, values)
    .then((response) => response.rows[0])
    .catch((error) => console.error("User not found", error.stack));
};
/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithId = function (id) {
  const query = `
  SELECT id
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
  return getAllProperties(null, 2);
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
  return pool
    .query(
      `
  SELECT * FROM properties
  LIMIT $1
  `,
      [limit]
    )
    .then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
