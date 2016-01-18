import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

export default class NotFound extends Component {

  static propTypes = {
    msg: PropTypes.object
  }

  render() {
    const {msg} = this.props;

    return (
      <div className="container page">
        <Helmet title={msg.title404} />
        <h1>{msg.header404}</h1>
        <p>{msg.message404}</p>
        <Link to="/">{msg.continueMessage404}</Link>
      </div>
    );
  }

}
