const path = require('path');
const router = require('express').Router();
const User = require('./db/controllers/userController.js');
const CalendarEvents = require('./db/controllers/eventController.js');
const GoogleAuthUrl = require('./setup/googleOAuth').url;
const getAllEventsFromCalendar = require('./utility/getAllEventsFromCalendar');
const addEvent = require('./utility/addEvent');
const addTravel = require('./utility/addTravel');
const queryTraffic = require('./workers/queryTraffic');

// put this parent function elsewhere later, but for now keep it here to understand what is happening. 
// first add event, then add travel, then set up queryTraffic worker
var addEventAndAddTravel = function(req, res) {
  addEvent(req, res)
  .spread((event, created) => {
    return addTravel(event); 
  })
  .then(travel => {
    queryTraffic(travel);
  })
}

router.get('/auth', function(req, res) {
  res.redirect(GoogleAuthUrl);
});

router.get('/authCallback', User.createUser);
// this is tricky to fix, probably want to serve up a static page

router.post('/calendar/addEvent', addEventAndAddTravel);
router.get('/calendar/getEvent', CalendarEvents.retrieveDayEvent);
router.get('/calendar/getAllEvents', getAllEventsFromCalendar);

module.exports = router;
