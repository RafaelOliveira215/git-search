import React, {useState} from "react"
import axios from "axios"
import UserCard from "../../components/userCard"

const SearchUser = () => {
    const [userSearch,setUserSearch] = useState(undefined)
    const [currentUser,setCurrentUser] = useState(undefined)
    const [currentUserRepos,setCurrentUserRepos] = useState(undefined)
    const [currentUserStarred,setCurrentUserStarred] = useState(undefined)
    
    const onChangeUser = (event) => {
        setUserSearch(event.target.value)
    }

    const handleSearch = () =>{
        axios.get(`https://api.github.com/users/${userSearch}`).then(response=>{
            setCurrentUser(response.data)
            setCurrentUserRepos(undefined)
            setCurrentUserStarred(undefined)
        }).catch(()=>{
            window.alert("Usuario não encontrado")
        })
    }

    const handleRepoCheck = () =>{
        axios.get(`https://api.github.com/users/${currentUser.login}/repos`).then(response=>{
            setCurrentUserRepos(response)
        })
    }

    const handleRepoStarred = () =>{
        axios.get(`https://api.github.com/users/${currentUser.login}/starred`).then(response=>{
            setCurrentUserStarred(response)
        })
    }
console.log(currentUser)
  return (
      <div>
   <input onChange={onChangeUser}/>
   <button onClick={()=>handleSearch()}>buscar</button>
   {currentUser ?<button onClick={()=>handleRepoCheck()}>repositorios</button>:<button disabled={true}>repositorios</button>}
    {currentUser ?<button onClick={()=>handleRepoStarred()}>favoritos</button>:<button disabled={true}>favoritos</button>}
    {currentUser ? <UserCard avatar={currentUser.avatar_url} name={currentUser.name} location ={currentUser.location}/> : null}
   </div>
   
  );
};
export default SearchUser