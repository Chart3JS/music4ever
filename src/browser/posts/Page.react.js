import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import fetch from '../components/fetch';
import {fetchPostById} from '../../common/posts/actions';

// This decorator (higher order component) fetches todos both in browser and
// on server side. It's true isomorphic data fetching and rendering.
@fetch(fetchPostById)
export default class Post extends Component {

  static propTypes = {
    actions: PropTypes.object,
    msg: PropTypes.object,
    post: PropTypes.object
  };

  render() {
    const {actions, msg} = this.props;
    const {post} = this.props.posts;
    return (
      <div className="container page">
        {post.title}
      </div>
    );
  }

}
