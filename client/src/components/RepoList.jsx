import React from 'react';
import RepoItem from './RepoItem.jsx';

const RepoList = (props) => (

  <div>

    {
      props.repos.map((elem,i) => (
        <RepoItem repo={elem} key={i}/>
      ))
    }

  </div>
)

export default RepoList;