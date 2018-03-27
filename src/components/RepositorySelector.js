import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import RepositoryRenderer from './RepositoryRenderer';
import searchService from '../services/searchService';

export class RepositorySelector extends Component {

   static MIN_SEARCH_LENGTH = 2;
   static ITEMS_PER_PAGE = 10;

  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onPaginate = this.onPaginate.bind(this);
    this.cache = {};
    this.state = {
      isLoading: false,
      query: '',
      options: []
    };
  }

  componentDidMount() {
    if (this._typeahead) {
      this._typeahead.getInstance().focus();
    }
  }

  onInputChange(query) {
    this.setState({ query });
  }

  onPaginate() {
    const { query } = this.state;
    const cachedQuery = this.cache[query];
    const page = cachedQuery.page + 1;

    this.setState({ isLoading: true }, () => {
      searchService.searchRepositories(query, page)
        .then(repositories => {
          const options = cachedQuery.options.concat(repositories);
          this.cache[query] = { ...cachedQuery, options, page };
          this.setState({ isLoading: false, options });
        });
    });
  }

  onSearch(query) {
    if (this.cache[query]) {
      return this.setState({ options: this.cache[query].options });
    }
    this.setState({ isLoading: true, query });
    searchService.searchRepositories(query)
      .then(options => {
        this.cache[query] = { options, page: 1 };
        this.setState({ isLoading: false, options });
      });
  }

  render() {
    return (
      <AsyncTypeahead
        {...this.state}
        bsSize="large"
        labelKey="name"
        useCache={false}
        maxResults={RepositorySelector.ITEMS_PER_PAGE - 1}
        paginate
        submitFormOnEnter
        ref={ref => this._typeahead = ref}
        onSearch={this.onSearch}
        onInputChange={this.onInputChange}
        onPaginate={this.onPaginate}
        isLoading={this.state.isLoading}
        minLength={RepositorySelector.MIN_SEARCH_LENGTH}
        placeholder="Search for Github repository..."
        onChange={selected => this.props.onRepositoryChosen(selected[0])}
        renderMenuItemChildren={(option, props) => (
          <RepositoryRenderer
            key={option.id}
            repository={option}
            text={this.state.query}
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
