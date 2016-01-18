import http from 'http';
import https from 'https';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/ilovesing');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// declare structures to persist with NOSQL
let PostEntry, CategoryEntry;
const CategoryEntrySchema = mongoose.Schema({
  name: String,
  entry: Object,
  lastUpdated: Number
});
const PostEntrySchema = mongoose.Schema({
  name: String,
  entry: Object,
  lastUpdated: Number
});

db.once('open', function () {
  console.log('mongoose connected');
  CategoryEntry = db.model('CategoryEntrySchema', CategoryEntrySchema);
  PostEntry = db.model('PostEntrySchema', PostEntrySchema);
});

export function getEntityClassByName(entityClassName) {
  switch (entityClassName) {
    case 'post':
          return PostEntry;
          break;
    case 'category':
          return CategoryEntry;
          break;
    default:
          return null;
          break;
  }
}
export const EXTERNAL_API_ADDRESS = 'https://public-api.wordpress.com/rest/v1.1/sites/ilovesingblog.wordpress.com/';
export function _retrieveData(URL_TEMPLATE, options = {}, success, fail) {
  let url = URL_TEMPLATE + (options.params || '');
  let parseBody = options.params ? options.params.parse : true;
  https.get(url, (res) => {
    var body = '';

    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      if(!!parseBody) {
        success(JSON.parse(body));
      } else {
        success(body);
      }

    });
  }).on('error', (e) => {
    console.error("Got an error: ", e);
    fail(e);
  });
}


export function _updateMongoEntity(name, EntryClass, entry, callback = () => {}) {
  let instance = new EntryClass({name: name, entry: entry, lastUpdated: (new Date()).getTime()});
  instance.update({name: name},(err, obj) => {
    if(err) {
      console.error(err);
      return;
    }
    callback(obj);
  });
}
export function _insertMongoEntity(name, EntryClass, entry, callback = () => {}) {
  let instance = new EntryClass({name: name, entry: entry, lastUpdated: (new Date()).getTime()});
  instance.save((err, obj) => {
    if(err) {
      console.error(err);
      return;
    }
    console.log('entries ' + EntryClass + ' inserted');
    callback(obj);
  });
}

export function _removeMongoEntity(name, EntryClass, callback) {
  EntryClass.remove({name: name}, callback());
}

export function _validateExpiration(name, EntryClass, callback) {
  EntryClass.findOne({name: name}, (err, res) => {
    if(err) {
      callback(null);
      return;
    }
    callback(res);
  })
}
