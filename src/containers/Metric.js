import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import metricsService from '../services/metricsService';
import { Strings } from '../helpers/strings.js';
import Container from './Container';
import { RepositorySelector } from '../components/RepositorySelector';
import ImplicationTab from '../components/ImplicationTab';
import CommittersTab from '../components/CommittersTab';
import CommitsLineTab from '../components/CommitsLineTab';

export default class Metric extends Component {

  constructor(props) {
    super(props);
    this.getChartData = this.getChartData.bind(this);
    this.onRepositoryChosen = this.onRepositoryChosen.bind(this);
    this.fetchMetrics = this.fetchMetrics.bind(this);
    this.onDataError = this.onDataError.bind(this);

    this.state = {
      isLoading: false,
      data: null,
      metrics: [],
      key: this.props.match.params.key,
      repository: {}
    };
  }

  onDataError(error) {
    if (error && error.includes('unreachable.server')) {
      toast.error('Server not available.');
    } else if (error && error.includes('Too.many.requests')) {
      toast.error('Rate limit has been overpassed. Please retry in few minutes.');
    } else if (error && error.includes('Entity.not.found')) {
      toast.warn('Repository or owner name seems to be invalid.');
    } else if (error && error.includes('Empty.or.invalid.input')) {
      toast.warn('You have to use autocompleter to validate.');
    }
  }

  onRepositoryChosen(repository) {
    if (repository) {
      const key = btoa(`${repository.owner.name}#!!#${repository.name}`);
      this.setState({ key }, this.fetchMetrics);
    }
  }

  componentWillMount() {
    this.fetchMetrics();
  }

  fetchMetrics() {
    const key = atob(this.state.key).split('#!!#');
    if (key && key.length === 2) {
      const owner = key[0];
      const name = key[1];
      this.setState({ isLoading: true, repository: { name, owner } }, () => {
        metricsService.getCommitsMetrics(owner, name, 1)
          .then(metrics => {
            metrics.details.sort((c1, c2) => {
              if (c1.commitsCount === c2.commitsCount) return 0;
              return (c1.commitsCount < c2.commitsCount) ? 1 : -1;
            });
            this.setState({
              isLoading: false,
              data: this.getChartData(metrics),
              metrics: metrics.details
            });
          })
          .catch(err => this.onDataError(err.code));
      });
    }
  }

  getChartData(metrics) {
    if (metrics) {
      return {
        labels: metrics.details.map(detail => Strings.ucfirst(detail.user.name)),
        datasets: [{
          data: metrics.details.map(detail => detail.ratio),
          backgroundColor: metrics.details.map(detail =>
            `#${Strings.colorize(Strings.hashcode(detail.user.email + detail.user.name))}`
          ),
        }]
      };
    }
    return null;
  }

  render() {
    const { data, metrics, repository, isLoading } = this.state;
    return (
      <Container>
        <ToastContainer autoClose={3500} />
        <RepositorySelector onRepositoryChosen={this.onRepositoryChosen} />
        <div style={{ marginTop: '10px' }}>
          <div style={{ textAlign: 'right' }}>
            <h3>
            <small style={{ color: 'gray' }}>{repository.owner} /</small>
              &nbsp;{repository.name}
            </h3>
          </div>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Implication">
              {!isLoading &&
                <ImplicationTab isLoading={isLoading} chartOptions={data} />
              }
            </Tab>
            <Tab eventKey={2} title="Committers">
              {!isLoading &&
                <CommittersTab isLoading={isLoading} commits={metrics} />
              }
            </Tab>
            <Tab eventKey={3} title="Commits line">
              {!isLoading &&
                <CommitsLineTab
                  repositoryName={repository.name}
                  repositoryOwner={repository.owner}
                  onError={this.onDataError}
                />
              }
            </Tab>
          </Tabs>
        </div>
      </Container>
    );
  }

}
