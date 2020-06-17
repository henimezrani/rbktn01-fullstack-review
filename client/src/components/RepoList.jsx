import React from "react";

const RepoList = (props) => {
  const listItems = props.repos.map((repo, index) => (
    <div style={{ display: "flex", border: "2px solid black", height: "150px", padding: "20px", width: "80%", margin: "20px auto" }}>
      <div style={{ marginRight: "20px" }}>
        <img src={repo.owner.avatar_url} alt="avatar" style={{ width: "150px", borderRadius: "50%" }} />
      </div>
      <div>
        <h4>
          <b>@{repo.owner.login}</b> -{" "}
          <a href={repo.html_url} target="_blank">
            {repo.name}
          </a>
          - {repo.forks_count} forks
        </h4>
        <p>{repo.description}</p>
        <span>
          See this users repos{" "}
          <a href={repo.owner.repos_url} target="_blank">
            here
          </a>
        </span>
      </div>
    </div>
  ));

  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      <br></br>
      <div className="row">{listItems}</div>
    </div>
  );
};
export default RepoList;
