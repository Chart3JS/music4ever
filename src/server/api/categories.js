import express from 'express';
import _ from 'underscore';
import {_retrieveData, _validateExpiration, _updateMongoEntity, _insertMongoEntity, getEntityClassByName, EXTERNAL_API_ADDRESS} from './general';

const router = express.Router();
const CATEGORY_API_URL = EXTERNAL_API_ADDRESS + 'categories/';
const ALL_CATEGORIES_NAME = 'all_categories';
const EXPIRATION_PERIOD = 60*60*1000;

router.route('/all')
  .get((req, res, next) => {
    _processCategoriesData(ALL_CATEGORIES_NAME, (data) => {
      res.status(200).json(data.categories);
    }, (err) => {res.status(500).json(err);});
  });

router.route('/category/:id')
  .get((req, res, next) => {
    _retrieveData(CATEGORY_API_URL, {params: '/' + req.params.id, parse: false}, category => {
      res.status(200).json(category);
    }, err => {
      res.status(500).json({error: err});
    });
  });

function _processCategoriesData(categoriesName, success, fail) {
  _validateExpiration(categoriesName, getEntityClassByName('category'), (localResult) => {
    console.log('##### categories retrieved locally');
    let nowTime = (new Date()).getTime();
    let isLocalCategoriesValid = localResult && localResult.lastUpdated && (nowTime - localResult.lastUpdated) < EXPIRATION_PERIOD;
    if(localResult && !_.isEmpty(localResult.entry) && !!_.isArray(localResult.entry.categories) && localResult.entry.categories.length !== 0 && isLocalCategoriesValid) {
      console.log('!!!!! will use cached categories');
      success(localResult.entry);
    } else {
      _retrieveData(CATEGORY_API_URL, {}, remoteResult => {
        console.log('######## categories retrieved from the remote server ');
        success(remoteResult);
        if(!isLocalCategoriesValid) {
          console.log('!!!!!!! will update categories');
          _updateMongoEntity(categoriesName, getEntityClassByName('category'), remoteResult);
        } else {
          console.log('!!!!!!! will insert categories');
          _insertMongoEntity(categoriesName, getEntityClassByName('category'), remoteResult);
        }
      }, err => {
        fail({error: err});
      });
    }
  });
}
export default router;
