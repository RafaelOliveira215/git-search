import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "../../components/userCard/userCard";
import RepoListingCard from "../../components/repoListingCard/repoListingCard";
import { BaseURL } from "../../services/contants";
import "./styles.css";

const SearchUser = () => {
  const [userSearch, setUserSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserRepos, setCurrentUserRepos] = useState(null);
  const [currentUserStarred, setCurrentUserStarred] = useState(null);
  const [switcher, setSwitcher] = useState();

  useEffect(() => {
    if (currentUser?.name) {
      document.title = `Inpecting: ${currentUser.name}`;
    } else {
      document.title = "Github searcher";
    }
  }, [currentUser]);

  const onChangeUser = (event) => {
    setUserSearch(event.target.value);
  };

  const handleSearch = () => {
    const authorization = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
    };
    axios
      .get(
        `${BaseURL}/${userSearch}?client_id=${authorization.client_id}&client_secret=${authorization.client_secret}`
      )
      .then((response) => {
        setCurrentUser(response.data);
        setSwitcher("userDetails");
        setUserSearch("");
      })
      .catch(() => {
        window.alert("Usuario não encontrado");
      });
    axios
      .get(
        `${BaseURL}/${userSearch}/repos?client_id=${authorization.client_id}&client_secret=${authorization.client_secret}`
      )
      .then((response) => {
        setCurrentUserRepos(response.data);
      });
    axios
      .get(
        `${BaseURL}/${userSearch}/starred?client_id=${authorization.client_id}&client_secret=${authorization.client_secret}`
      )
      .then((response) => {
        setCurrentUserStarred(response.data);
      });
  };

  const handleMenu = () => {
    switch (switcher) {
      case "userDetails":
        return (
          <UserCard
            avatar={currentUser.avatar_url}
            name={currentUser.name}
            location={currentUser.location}
          />
        );

      case "userRepos":
        if (currentUserRepos) {
          return currentUserRepos.map((repo) => {
            return (
              <RepoListingCard
                key={repo.id}
                repo={repo.name}
                cloneUrl={repo.clone_url}
              />
            );
          });
        } else {
          return <p>Este usuario ainda não possui repositorios</p>;
        }

      case "userStarred":
        if (currentUserStarred) {
          return currentUserStarred.map((repo) => {
            return (
              <RepoListingCard
                key={repo.id}
                repo={repo.name}
                cloneUrl={repo.clone_url}
              />
            );
          });
        } else {
          return <p>Este usuario ainda não possui repositorios favoritos</p>;
        }

      default:
        break;
    }
  };

  const handleSwitcher = (menu) => {
    setSwitcher(menu);
  };

  return (
    <div className="searchUser">
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input
          value={userSearch}
          placeholder="Encontre um repositorio"
          onChange={onChangeUser}
        />
        <button onClick={() => handleSearch()}>Buscar</button>
      </form>
      <div>
        <button
          onClick={() => handleSwitcher("userDetails")}
          disabled={!!!currentUser}
        >
          Usuario
        </button>
        <button
          onClick={() => handleSwitcher("userRepos")}
          disabled={!!!currentUser}
        >
          Repositorios
        </button>
        <button
          onClick={() => handleSwitcher("userStarred")}
          disabled={!!!currentUser}
        >
          Favoritos
        </button>
      </div>
      {handleMenu()}
    </div>
  );
};
export default SearchUser;
