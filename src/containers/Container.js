import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap';

export default class Container extends Component {

  render() {
    return (
      <div>
        <PageHeader>
          Prismub <small>Github metrics, simplified.</small>
        </PageHeader>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Container.propTypes = {
  children: PropTypes.node.isRequired
};
