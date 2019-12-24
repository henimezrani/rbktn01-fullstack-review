import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      type: "POST",
      url: "http://localhost:1128/repos",
      contentType: 'application/json',
      data: JSON.stringify({term}),
      success: (data) => {
        this.setState({
          repos : data
        })
      }
    })
  }

  render () {
    if (this.state.repos.length === 0) {
      $.ajax({
        type: "GET",
        url: "http://localhost:1128/repos",
        contentType: 'application/json',
        data: JSON.stringify(""),
        success: (data) => {
          this.setState({
            repos : data
          })

        }
      })
    }
    return (<div >
      <div style={{display: "flex", margin: "0 50px"}}>
        <div style={{margin: "0 auto"}}>
          <h1>Github Fetcher</h1>
          <h4> Repo List Component </h4>
          <p>There are {this.state.repos.length} repos.</p>
        </div>
        <div style={{margin: "0 auto"}}>
          <Search onSearch={this.search.bind(this)}/>
        </div>
      </div>
      <div><RepoList repos={this.state.repos}/></div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));