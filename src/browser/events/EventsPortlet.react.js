import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import {List, ListItem, Divider, Avatar, Paper} from 'material-ui';
import moment from 'moment';
export default class EventsPortlet extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
  };

  _buildListItem(event) {
    return <ListItem
      href={"/event/" + event.id + '/' + event.name}
      leftAvatar={<Avatar style={{size: '60px'}} src={event.picture.data.url} />}
      primaryText={event.name}
      secondaryText={
      <p>
        <span style={{color: 'red'}}>{moment(event.start_time).format('DD/MM/YYYY')}</span><br/>
        <span dangerouslySetInnerHTML={{__html: event.description}}/>
      </p>
    }
      secondaryTextLines={2} />;
  }
  render() {
    const {events} = this.props.events;
    const {title} = this.props;
    const rowsCount = events ? events.length : 0;
    let rows = [];
    let lastIndex = rowsCount - 1;
    rows.push(<Divider inset={true}/>);
    for (var index = 0; index < rowsCount; index++) {
      let event = events[index];
      rows.push(this._buildListItem(event));
      if(index !== lastIndex) {
        rows.push(<Divider inset={true}/>);
      }
    }
    return <Paper style={{display: 'block', float: 'left', width: '100%', margin: '20px 0 0 0'}} zDepth={1} rounded={false}><List style={{
      display: 'inline-block', padding: '0'
    }} subheader={title}>{rows}</List></Paper>;
  }

}
