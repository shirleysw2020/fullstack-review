import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
axios.defaults.baseURL = "http://localhost:1128"; //if no base url provided (to make http to local host), will make req to local file, we dont want that

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    console.log("whats apps this binding to?", this)
    this.search = this.search.bind(this);
  }
  search (term) {
    console.log(`${term} was searched`);
    // TODO: make post request to server
    axios.post('/repos', term)
    .then((res) => console.log(res, "got a response from server!"))
    .catch(() => console.log("failed to make post T T"));
  }
  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search} repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));