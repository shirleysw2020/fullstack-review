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
    // console.log("whats apps this binding to?", this)
    this.search = this.search.bind(this);
  }
  componenDidMount() {
    // make get request.
    axios.get('/repos')
    .then((res) => {
      console.log("client: success getting repos!", res.full_name);
      // ststate likely has error... fix later
      this.setState({repos: [...this.state.repos, res.full_name]});
    }).catch((err) => {
      console.log("client: failed to get repos", err)
    })
    // setstate to have all repos from db/ resposne fo teh get request
  }

  search (term) {
    // console.log(`${term} was searched`);
    axios.post('/repos', {name:term})
    .then((res) => console.log("client: got a response from server!", res.data))
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