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
    this.search = this.search.bind(this);
    this.sorting = this.sorting.bind(this);
  }

  sorting(data) {
    var sorted = data.sort((a, b) => {return b.watchers - a.watchers});
    for (var i = 0; i < sorted.length - sorted.length + 20; i++) {
      console.log('setting state');
      this.setState({repos: [...this.state.repos, sorted[i]]});
    }
  }

  componentDidMount() {
    axios.get('/repos')
    .then((res) => {
      this.sorting(res.data);
      // var sorted = res.data.sort((a, b) => {return b.watchers - a.watchers});
      // // console.log('sorted:', sorted)
      // for (var i = 0; i < sorted.length - sorted.length + 20; i++) {
      //   this.setState({repos: [...this.state.repos, sorted[i]]});
      // }
    })
    .catch((err) => console.log("client: failed to get repos", err));
  }

  search(term) {
    axios.post('/repos', {name:term})
    .then((res) => {
      console.log("client: got resp from server!", res.data);
      this.sorting(res.data);
    })
    .catch(() => console.log("failed to make post T T"));
    // to re-render without refreshing, need to set state with latest repos...
  }

  render() {
    return (<div>
      <h2 style={{fontFamily:'Arial'}}>Github Fetcher</h2>
      <Search onSearch={this.search} repos={this.state.repos}/>
      <RepoList repos={this.state.repos} key={this.state.repos._id}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// test usernames:
// acdlite
// phillipalexander
// shergin
// sophiebits
// ejanzer