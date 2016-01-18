import messages from './messages';
import {Record} from 'immutable';

const InitialState = Record({
  availableLanguages: ['en', 'ru'],
  messages,
  selectedLanguage: 'ru'
});
const initialState = new InitialState;

const revive = state => initialState
  .set('selectedLanguage', state.selectedLanguage);

export default function intlReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);

  return state;
}
