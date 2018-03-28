import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import Loader from 'react-loader';

const ImplicationTab = (props) => {
  const { isLoading, chartOptions } = props;

  return (
    <Loader loaded={!isLoading}>
      <Panel style={{ marginTop: '10px' }}>
        <Panel.Heading>
          <Panel.Title componentClass="h3">
            Users implication ratio
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          {chartOptions && <Pie data={chartOptions} />}
        </Panel.Body>
      </Panel>
    </Loader>
  )
};

ImplicationTab.propTypes = {
  isLoading: PropTypes.bool,
  chartOptions: PropTypes.object.isRequired
};

ImplicationTab.defaultProps = {
  isLoading: false
};

export default ImplicationTab;
