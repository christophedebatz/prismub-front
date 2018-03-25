import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import RepositoryRenderer from './RepositoryRenderer';
import searchService from '../services/searchService';

export class RepositorySelector extends Component {

   static MIN_SEARCH_LENGTH = 2;

  constructor(props) {
    super(props);
    this.onType = this.onType.bind(this);
    this.state = {
      isLoading: false,
      input: '',
      options: []
    };
  }

  componentDidMount() {
    if (this._typeahead) {
      this._typeahead.getInstance().focus();
    }
  }

  onType(input) {
    this.setState({ isLoading: true, input });
    searchService.searchRepositories(input)
      .then(options => this.setState({ isLoading: false, options }));
  }

  render() {
    return (
      <AsyncTypeahead
        {...this.state}
        bsSize="large"
        labelKey="name"
        submitFormOnEnter
        ref={(ref) => this._typeahead = ref}
        onSearch={this.onType}
        isLoading={this.state.isLoading}
        minLength={RepositorySelector.MIN_SEARCH_LENGTH}
        placeholder="Search for Github repository..."
        onChange={selected => this.props.onRepositoryChosen(selected[0])}
        renderMenuItemChildren={(option, props) => (
          <RepositoryRenderer
            key={option.id}
            repository={option}
            text={this.state.input}
          />
        )}
      />
    );
  }
}

RepositorySelector.propTypes = {
  onRepositoryChosen: PropTypes.func,
};
RepositorySelector.defaultProps = {
  onRepositoryChosen: () => void 0
};
