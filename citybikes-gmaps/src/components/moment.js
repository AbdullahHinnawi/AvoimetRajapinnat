import React from 'react';
import Moment from 'react-moment';

export default class MomentComponent extends React.Component {
  render() {
    return (
        <Moment format="DD.MM.YYYY HH:mm">

        </Moment>
    );
  }
}