import express from 'express';
import {_retrieveData, _validateExpiration, _updateMongoEntity, _insertMongoEntity, _removeMongoEntity, getEntityClassByName, EXTERNAL_API_ADDRESS} from './general';
import _ from 'underscore';
const router = express.Router();

const POST_API_URL = EXTERNAL_API_ADDRESS + 'posts/';
const ALL_POSTS_NAME = 'all_posts';
const EXPIRATION_PERIOD = 60*60*1000;
router.route('/all')
  .get((req, res, next) => {
    _processPostsData(ALL_POSTS_NAME, (data) => {
      res.status(200).json(data.posts);
    }, (err) => {res.status(500).json(err);});
  });

router.route('/post/:id')
  .get((req, res, next) => {

    _retrieveData(POST_API_URL, {params: '/' + req.params.id, parse: false}, post => {
      res.status(200).json(post);
    }, err => {
      res.status(500).json({error: err});
    });
  });

function _processPostsData(postsName, success, fail) {
  _validateExpiration(postsName, getEntityClassByName('post'), (localResult) => {
    console.log('##### posts retrieved locally');
    let nowTime = (new Date()).getTime();
    let isLocalPostsValid = localResult && localResult.lastUpdated && (nowTime - localResult.lastUpdated) < EXPIRATION_PERIOD;
    if(localResult && !_.isEmpty(localResult.entry) && !!_.isArray(localResult.entry.posts) && localResult.entry.posts.length !== 0 && isLocalPostsValid) {
      console.log('!!!!! will use cached posts');
      success(localResult.entry);
    } else {
      _retrieveData(POST_API_URL, {}, remoteResult => {
        console.log('######## posts retrieved from the remote server');
        success(remoteResult);
        _removeMongoEntity(postsName, getEntityClassByName('post'), () => {
          _insertMongoEntity(postsName, getEntityClassByName('post'), remoteResult);
        });
      }, err => {
        fail({error: err});
      });
    }
  });
}

export default router;
