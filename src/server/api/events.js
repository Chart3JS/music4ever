import express from 'express';
import {_retrieveData, EXTERNAL_API_ADDRESS} from './general';
const router = express.Router();


const EVENT_API_URL = 'https://graph.facebook.com/v2.5/1710573989159126/events?access_token=CAAIQNQfopUgBAKgaZAaEMza7PKcLl3UJfr5yLKYXgr9jO5JzNxQhII5OjuRpJNG6VPPLmXlepVw1WKpFEuIeVnTczxqKLzGrZAoQTT1SwDTE48wJjFqjKtuR8Ofjk4DK4NpvSGtEK5U9opDEhL1jL996p7kmgffDsZBF0cH0w3FhHlSxU9ykpZATPsrER4cZD&debug=all&format=json&method=get&pretty=0&suppress_http_code=1&fields=picture,name,description,start_time';
router.route('/all')
  .get((req, res, next) => {
    _retrieveData(EVENT_API_URL, {}, resp => {
      res.status(200).json(resp.data);
    }, err => {
      res.status(500).json({error: err});
    });
  });
router.route('/event/:id')
  .get((req, res, next) => {
    _retrieveData(EVENT_API_URL, {params: '/' + req.params.id, parse: false}, event => {
      res.status(200).json(event);
    }, err => {
      res.status(500).json({error: err});
    });
  });
export default router;
