import {combineReducers} from 'redux';

// Note we are composing all reducers. Web, native, whatever. Of course we can
// pass platform specific reducers in configureStore, but there is no reason to
// do that, until app is really large.
import auth from '../auth/reducer';
import device from '../device/reducer';
import intl from '../intl/reducer';
import posts from '../posts/reducer';
import categories from '../categories/reducer';
import events from '../events/reducer';
import ui from '../ui/reducer';
import users from '../users/reducer';

const appReducer = combineReducers({
  auth,
  device,
  intl,
  posts,
  categories,
  events,
  ui,
  users
});

export default appReducer;
