import './Page.styl'
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import {FormattedHTMLMessage} from 'react-intl';
import {Link} from 'react-router';
import fetch from '../components/fetch';
import {fetchAllPosts} from '../../common/posts/actions';
import {fetchAllEvents} from '../../common/events/actions';
import PostPortlet from '../posts/PostsPortlet.react';
import EventsPortlet from '../events/EventsPortlet.react';
import _ from 'underscore';

@fetch(fetchAllPosts, fetchAllEvents)
export default class HomePage extends Component {

  static propTypes = {
    actions: PropTypes.object,
    msg: PropTypes.object,
    posts: PropTypes.object,
    events: PropTypes.object
  };


  render() {
    const {actions, msg, posts, events} = this.props;
    return (
      <div className="container page">
        <Helmet title={msg.title} />
         <div className="col-md-3 blocks-container">
             <PostPortlet title={msg.last_news} {...{actions, posts, msg}}/>
             <EventsPortlet title={msg.calendar_event} {...{actions, events, msg}}/>
         </div>
        <div className="col-md-9 main-section">
            main text
        </div>

      </div>
    );
  }

}
