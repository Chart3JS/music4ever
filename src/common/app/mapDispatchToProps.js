import * as authActions from '../auth/actions';
import * as postsActions from '../posts/actions';
import * as eventsActions from '../events/actions';
import * as uiActions from '../ui/actions';
import {Map} from 'immutable';
import {bindActionCreators} from 'redux';

const actions = [
  authActions,
  postsActions,
  eventsActions,
  uiActions
];

export default function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}
