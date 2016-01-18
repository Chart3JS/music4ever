import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import {List, ListItem, ListDivider, Avatar, Paper} from 'material-ui';

export default class PostsPortlet extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
  };

  _buildListItem(postMeta) {
    return <ListItem
      href={"/post/" + postMeta.ID + '/' + postMeta.slug}
      leftAvatar={<Avatar style={{size: '80px', borderRadius: '0'}} src={postMeta.featured_image?postMeta.featured_image.source:''} />}
      primaryText={postMeta.author.nickname}
      secondaryText={
      <p>
        <span style={{color: 'red'}}>{postMeta.title}</span><br/>
        <span dangerouslySetInnerHTML={{__html: postMeta.content}}/>
      </p>
    }
      secondaryTextLines={2} />;
  }
  render() {
    const {posts} = this.props.posts;
    const {title} = this.props;
    const rowsCount = posts ? posts.length : 0;
    let rows = [];
    let lastIndex = rowsCount - 1;
    rows.push(<ListDivider inset={true}/>);
    for (var index = 0; index < rowsCount; index++) {
      let post = posts[index];
      rows.push(this._buildListItem(post));
      if(index !== lastIndex) {
        rows.push(<ListDivider inset={true}/>);
      }
    }
    return <Paper style={{display: 'block', float: 'left', width: '100%'}} zDepth={1} rounded={false}><List style={{
      display: 'inline-block', padding: '0'
    }} subheader={title}>{rows}</List></Paper>;
  }

}
