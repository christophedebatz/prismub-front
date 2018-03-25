import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Media } from 'react-bootstrap';

export default class RepositoryRenderer extends Component {

  constructor(props) {
    super(props);
    this.getHighlightedText = this.getHighlightedText.bind(this);
  }

  getHighlightedText(text, higlight) {
    return text.split(new RegExp(`(${higlight})`, 'gi'))
      .map((part, i) =>
        <span key={i} style={part.toLowerCase() === higlight.toLowerCase() ? { fontWeight: 'bold' } : {} }>
          {part}
        </span>
      );
  }

  render() {
    let { repository } = this.props;
    return (
      <div>
        <Media>
          <Media.Left>
            <img
              src={repository.owner.pictureUrl}
              width={64}
              height={64}
              style={{ borderRadius: '32px' }}
              alt="thumbnail"
            />
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              {this.getHighlightedText(repository.name, this.props.text)}&nbsp;
              <small style={{ color: 'gray' }}>by {repository.owner.name}</small>
            </Media.Heading>
            <p>
              {repository.description ? repository.description.substring(0, 125) + '...' : ''}<br />
              {repository.language &&
                <small>{repository.language}</small>
              }
            </p>
          </Media.Body>
        </Media>
      </div>
    );
  }
}

RepositoryRenderer.propTypes = {
  repository: PropTypes.object.isRequired,
  text: PropTypes.string
};
RepositoryRenderer.defaultProps = {
  text: ''
};
