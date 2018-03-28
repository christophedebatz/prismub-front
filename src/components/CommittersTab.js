import React, { Component } from 'react';
import { Panel, Table, Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Loader from 'react-loader';

const CommittersTab = (props) => {
  const { isLoading, commits } = props;
  
  return (
    <Loader loaded={!isLoading}>
      <Panel style={{ marginTop: '10px' }}>
        <Panel.Heading>
          <Panel.Title componentClass="h3">
            Committers
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Table responsive>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Profile</th>
                <th>Implication</th>
              </tr>
            </thead>
            <tbody>
            {commits.map((commit, i) =>
              <tr key={i}>
                <td>
                  {commit.user.pictureUrl && <img
                    src={commit.user.pictureUrl}
                    style={{ borderRadius: '16px'}}
                    height={32}
                    width={32}
                  />}
                </td>
                <td>{commit.user.name}</td>
                <td>{commit.user.email}</td>
                <td>
                  {commit.user.profileUrl && <a href={commit.user.profileUrl}>
                    <Glyphicon glyph="glyphicon-home" />
                  </a>}
                </td>
                <td>{commit.commitsCount} commits ({commit.ratio} %)</td>
              </tr>
            )}
            </tbody>
          </Table>
        </Panel.Body>
      </Panel>
    </Loader>
  )
};

CommittersTab.propTypes = {
  isLoading: PropTypes.bool,
  commits: PropTypes.array.isRequired
};

CommittersTab.defaultProps = {
  isLoading: false
};

export default CommittersTab;
