const UserController = require('./../db/controllers/userController');

const getUserGeolocation = (req, res) => {
  return UserController.getGeolocation(req.userId)
    .then((data) => { res.send(data.dataValues); })
    .catch((err) => { res.sendStatus(404); });
};

module.exports = getUserGeolocation;