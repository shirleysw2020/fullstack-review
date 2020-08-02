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
  }

  componentDidMount() {
    axios.get('/repos')
    .then((res) => {
      // console.log("client: receving all repo:", res.data);
      var sortedData = res.data.sort(function (a, b) {
        return b.watchers - a.watchers;
      });
      console.log('sorteddata:', sortedData)
      for (var i = 0; i < sortedData.length - sortedData.length + 15; i++) {
        this.setState({repos: [...this.state.repos, sortedData[i]]});
      }
    })
    .catch((err) =>console.log("client: failed to get repos", err));
  }

  // componentDidMount() {
  //   axios.get('/repos')
  //   .then((res) => {
  //     // console.log("client: receving all repo:", res.data);
  //     var sortedData = res.data.sort(function (a, b) {
  //       return b.watchers - a.watchers;
  //     });
  //     var topTen = sortedData.length - sortedData.length + 10;
  //     for (var i = 0; i < sortedData.length - sortedData.length + 10; i++) {
  //       // console.log('sorteddata:', sortedData[i].full_name)
  //       this.setState({repos: [...this.state.repos, sortedData[i].full_name]});
  //     }
  //     // console.log("whats state of repos?", this.state.repos)
  //   })
  //   .catch((err) =>console.log("client: failed to get repos", err));
  //   // setstate to have all repos from db/ resposne fo teh get request
  // }

  search (term) {
    axios.post('/repos', {name:term})
    .then((res) => console.log("client: got a response from server!", res.data))
    .catch(() => console.log("failed to make post T T"));
  }
  render () {
    return (<div>
      <h2 style={{fontFamily:'Arial'}}>Github Fetcher</h2>
      <Search onSearch={this.search} repos={this.state.repos}/>
      <RepoList repos={this.state.repos} key={this.state.repos._id}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));