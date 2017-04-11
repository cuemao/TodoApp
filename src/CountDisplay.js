import React, { Component } from 'react';
import './App.css';

class CountDisplay extends Component {
  render() {
    return (
      <div>
        {(this.props.display === 'ALL' || this.props.display === 'DONE') ?
          <span className="Count"> Done &#58; {this.props.numDone}</span> : null}
        {(this.props.display === 'ALL' || this.props.display === 'UNDONE') ?
          <span className="Count"> Left &#58; {this.props.numLeft}</span> : null}
      </div>
    );
  }
}

CountDisplay.propTypes = {
  display: React.PropTypes.string,
  numDone: React.PropTypes.number,
  numLeft: React.PropTypes.number,
};

export default CountDisplay;

