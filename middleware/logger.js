const logger = (req, res, next) => {
  console.log(`SERVING: ${req.method} to ${req.url}`);
  next(); //specifies that we can go to the next thing
}

module.exports = logger;
