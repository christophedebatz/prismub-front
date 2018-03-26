import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Image } from 'react-bootstrap';
import logoPicture from '../../public/logo.png';

export default class Container extends Component {

  render() {
    return (
      <div>
        <PageHeader>
          <Image responsive src={logoPicture} className="logo" width={50} height={50} />
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
