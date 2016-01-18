import './App.styl';
import Component from 'react-pure-render/component';
import Footer from './Footer.react';
import Header from './Header.react';
import Helmet from 'react-helmet';
import fetch from '../components/fetch';
import React, {PropTypes} from 'react';
import {fetchAllCategories} from '../../common/categories/actions';
import RouterHandler from '../../common/components/RouterHandler.react';
import mapDispatchToProps from '../../common/app/mapDispatchToProps';
import mapStateToProps from '../../common/app/mapStateToProps';
import {connect} from 'react-redux';
import _ from 'underscore';


// // logRenderTime is useful for app with huge UI to check render performance.
// import logRenderTime from '../lib/logRenderTime';

@connect(mapStateToProps, mapDispatchToProps)
// @logRenderTime
@fetch(fetchAllCategories)
export default class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    categories: PropTypes.object
  };

  render() {
    const {categories: {categories}, location: {pathname}, msg, users: {viewer}} = this.props;
    return (
      // Pass data-pathname to allow route specific styling.
      <div className="col-md-12" data-pathname={pathname}>
        <Helmet
          meta={[{
            name: 'description',
            content: 'Сайт для всех кто любит и хочет научиться петь'
          }]}
          titleTemplate="%s - i-love-sing.com"
        />
        {/* Pathname enforces rerender so activeClassName is updated. */}
        <Header msg={msg} pathname={pathname} viewer={viewer} />
        <RouterHandler {...this.props} />
        <Footer msg={msg} />
      </div>
    );
  }

}
