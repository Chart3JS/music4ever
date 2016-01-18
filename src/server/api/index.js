import auth from './auth';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import posts from './posts';
import events from './events';
import categories from './categories';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/posts', posts);
app.use('/events', events);
app.use('/categories', categories);

app.on('mount', () => {
  console.log('Api is available at %s', app.mountpath);
});

export default app;
