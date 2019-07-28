const axios = require('axios');
const router = require('express').Router();
const { authenticateUser } = require('../auth/middleware');

router.get('/', authenticateUser, async (req, res, next) => {
  try {
    const requestOptions = {
      headers: { accept: 'application/json' },
    };

    const response = await axios.get('https://icanhazdadjoke.com/search', requestOptions);
    res.status(200).json(response.data.results);

  } catch (err) {
    next(err);
  }
});

module.exports = router;