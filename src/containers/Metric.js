import { Panel, Tab, Tabs } from 'react-bootstrap';
import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import Loader from 'react-loader';
import Container from './Container';
import { RepositorySelector } from '../components/RepositorySelector';
import metricsService from '../services/metricsService';
import { Strings } from '../helpers/strings.js';

export default class Metric extends Component {

  constructor(props) {
    super(props);
    this.getChartData = this.getChartData.bind(this);
    this.onRepositoryChosen = this.onRepositoryChosen.bind(this);
    this.fetchMetrics = this.fetchMetrics.bind(this);
    this.state = {
      isLoading: false,
      data: null,
      key: this.props.match.params.key
    };
  }

  onRepositoryChosen(repository) {
    if (repository) {
      const key = btoa(`${repository.owner.name}#!!#${repository.name}`);
      this.setState({ key }, this.fetchMetrics);
    }
  }

  componentDidMount() {
    this.fetchMetrics();
  }

  fetchMetrics() {
    const key = atob(this.state.key).split('#!!#');
    if (key && key.length === 2) {
      this.setState({ isLoading: true}, () => {
        metricsService.getCommitsMetrics(key[0], key[1], 1)
          .then(metrics => {
            this.setState({
              isLoading: false,
              data: this.getChartData(metrics)
            });
          });
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
    const { data, isLoading } = this.state;
    return (
      <Container>
        <RepositorySelector onRepositoryChosen={this.onRepositoryChosen} />
        <div style={{ marginTop: '10px' }}>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Implication">
              <Loader loaded={!isLoading}>
                <Panel style={{ marginTop: '10px' }}>
                  <Panel.Heading>
                    <Panel.Title componentClass="h3">Users implication ratio</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    {data && <Pie data={data} />}
                  </Panel.Body>
                </Panel>
              </Loader>
            </Tab>
            <Tab eventKey={2} title="Committers">
              Tab 2 content
            </Tab>
            <Tab eventKey={3} title="Commits flow" disabled>
              Tab 3 content
            </Tab>
          </Tabs>
        </div>
      </Container>
    );
  }

}
