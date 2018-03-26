import React, { Component } from 'react';
import Container from './Container';
import { RepositorySelector } from '../components/RepositorySelector';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.onRepositoryChosen = this.onRepositoryChosen.bind(this);
  }

  onRepositoryChosen(repository) {
    // do xhr for metrics and for registering metrics
    // get the metrics id
    // this.props.history.push(`/metrics${metrics.id}`);
    this.props.history.push('/lol');
  }

  render() {
    return (
      <Container>
        <RepositorySelector onRepositoryChosen={this.onRepositoryChosen} />
      </Container>
    );
  }

}
