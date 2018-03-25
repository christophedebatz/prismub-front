import React, { Component } from 'react';
import Container from './Container';
import { RepositorySelector } from '../components/RepositorySelector';
import connectPicture from '../../public/github-connect.png';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.onRepositoryChosen = this.onRepositoryChosen.bind(this);
  }

  onRepositoryChosen(repository) {
    console.log('repo=', repository);
  }

  render() {
    return (
      <Container>
        <RepositorySelector onRepositoryChosen={this.onRepositoryChosen} />
      </Container>
    );
  }

}
