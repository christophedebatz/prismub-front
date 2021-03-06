import React, { Component } from 'react';
import Container from './Container';
import { RepositorySelector } from '../components/RepositorySelector';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.onRepositoryChosen = this.onRepositoryChosen.bind(this);
  }

  onRepositoryChosen(repository) {
    const key = btoa(`${repository.owner.name}#!!#${repository.name}`);
    this.props.history.push(`/metrics/${key}`);
  }

  render() {
    return (
      <Container>
        <RepositorySelector onRepositoryChosen={this.onRepositoryChosen} />
      </Container>
    );
  }

}
