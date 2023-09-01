/* eslint-disable no-unused-vars */
const errorHandler = (err,req, res, next) => {
  console.error("Error in controller: ", err);

  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal server error";

  res.status(statusCode).send({ error: errorMessage });
};

module.exports = errorHandler;