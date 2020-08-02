import React from 'react';

const RepoList = (props) => (
  <div style={divStyle}>
    <h4> Top 10 Most Watched Repos </h4>
    <div>There are {props.repos.length} repos.</div>
    {props.repos.map(repo => {
      return <div><li><a href={repo.repos_url}>{repo.full_name}</a></li><span><img width="35" src={repo.avatar_url} alt="boohoo"/></span></div>
    })}
  </div>
)

const divStyle = {
  fontFamily: 'Arial'
};

export default RepoList;