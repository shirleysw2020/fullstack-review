import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  onChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
    this.setState({term: ''})
  }

  render() {
    return (<div className="words">
      Enter a github username: <input value={this.state.terms} onChange={this.onChange}/>
      <button onClick={this.search}> Add More Repos! </button>
    </div>)
  }
}

export default Search;