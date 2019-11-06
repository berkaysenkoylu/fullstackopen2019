import React from 'react';

import { connect } from 'react-redux';

const Notification = (props) => {
  const style = {
    display: 'none',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  let content = props.notifications.message;
  if(content !== '' && content && content !== undefined) {
    style.display = 'unset';
  };

  return (
    <div style={style}>
      {content}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

export default connect(mapStateToProps, null)(Notification);