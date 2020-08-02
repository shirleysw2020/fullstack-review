import React from 'react';

const RepoList = (props) => (
  <div>
    <div className="words"> <h3>Top 15 Most Watched Repos </h3></div>
    {/* <div>There are {props.repos.length} repos.</div> */}
    {props.repos.map(repo => {
      return <div><li ><a href={repo.repos_url}>{repo.full_name}</a></li><span><img width="30" src={repo.avatar_url}/></span></div>
    })}
  </div>
)

export default RepoList;