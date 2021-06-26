import React, {useState} from "react"
import axios from "axios"
import UserCard from "../../components/userCard"
import RepoListingCard from "../../components/repoListingCard";

const SearchUser = () => {
    const [userSearch,setUserSearch] = useState(undefined)
    const [currentUser,setCurrentUser] = useState(undefined)
    const [currentUserRepos,setCurrentUserRepos] = useState(undefined)
    const [currentUserStarred,setCurrentUserStarred] = useState(undefined)
    const [renderUserCard,setRenderUserCard] = useState(false)
    const [renderUserRepos,setRenderUserRepos] = useState(false)
    const [renderUserStarred,setRenderUserStarred] = useState(false)
    
    const onChangeUser = (event) => {
        setUserSearch(event.target.value)
    }

    const handleSearch = () =>{
        axios.get(`https://api.github.com/users/${userSearch}`).then(response=>{
            setCurrentUser(response.data)
            setRenderUserCard(true)
            setRenderUserRepos(false)
            setRenderUserStarred(false)
            setCurrentUserRepos(undefined)
            setCurrentUserStarred(undefined)
        }).catch(()=>{
            window.alert("Usuario não encontrado")
        })
        axios.get(`https://api.github.com/users/${userSearch}/repos`).then(response=>{
            setCurrentUserRepos(response.data)
        })
        axios.get(`https://api.github.com/users/${userSearch}/starred`).then(response=>{
            setCurrentUserStarred(response.data)
            
        })
    }

    const handleRepoCheck = () =>{
        setRenderUserCard(false)
            setRenderUserRepos(true)
            setRenderUserStarred(false)
    }

    const handleRepoStarred = () =>{
        setRenderUserCard(false)
        setRenderUserRepos(false)
        setRenderUserStarred(true)
    }
  return (
      <div>
   <input onChange={onChangeUser}/>
   <button onClick={()=>handleSearch()}>buscar</button>
   {currentUser ?<button onClick={()=>handleRepoCheck()}>repositorios</button>:<button disabled={true}>repositorios</button>}
    {currentUser ?<button onClick={()=>handleRepoStarred()}>favoritos</button>:<button disabled={true}>favoritos</button>}
    {renderUserCard ? <UserCard avatar={currentUser.avatar_url} name={currentUser.name} location ={currentUser.location}/> : null}
    {renderUserRepos ? currentUserRepos.map(repo =>{
        return(
            <RepoListingCard repo={repo.name} cloneUrl={repo.clone_url} /> 
        )
    }): null}
    {renderUserStarred ? currentUserStarred.map(repo =>{
        
        return(
            <RepoListingCard repo={repo.name} cloneUrl={repo.clone_url} /> 
        )
    }): null}
    
   </div>
   
  );
};
export default SearchUser