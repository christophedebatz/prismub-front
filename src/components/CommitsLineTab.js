import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import commitsService from '../services/commitsService';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import Loader from 'react-loader';

export default class CommitsLineTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      commits: []
    };
  }

  componentWillMount() {
    const { repositoryOwner, repositoryName } = this.props;
    this.setState({ isLoading: true }, () => {
      commitsService.getCommits(repositoryOwner, repositoryName, 1)
        .then(commits => this.setState({ isLoading: false, commits }))
        .catch(err => this.props.onError(err.code));
    });
  }

  render() {
    return (
      <Loader loaded={!this.state.isLoading}>
        <Panel style={{ marginTop: '10px' }}>
          <Panel.Heading>
            <Panel.Title componentClass="h3">
              Commits timeline
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Timeline>
              {this.state.commits.map((commit, i) => (
                <TimelineEvent
                  key={i}
                  title={commit.author.name}
                  createdAt={commit.creationDate}
                  icon={
                    <img
                      src={commit.author.pictureUrl}
                      style={{ borderRadius: '16px' }}
                      height={32}
                      width={32}
                    />
                  }
                >
                  {commit.message}
                </TimelineEvent>
              ))}
            </Timeline>
          </Panel.Body>
        </Panel>
      </Loader>
    );
  }
}

CommitsLineTab.propTypes = {
  repositoryName: PropTypes.string.isRequired,
  repositoryOwner: PropTypes.string.isRequired,
  onError: PropTypes.func
};

CommitsLineTab.defaultProps = {
  onError: () => void 0
};
