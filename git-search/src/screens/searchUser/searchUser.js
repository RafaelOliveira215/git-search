import React, {useState,useEffect} from "react"
import axios from "axios"
import UserCard from "../../components/userCard"
import RepoListingCard from "../../components/repoListingCard";
import { BaseURL } from "../../services/contants";

const SearchUser = () => {
    const [userSearch,setUserSearch] = useState(null)
    const [currentUser,setCurrentUser] = useState(null)
    const [currentUserRepos,setCurrentUserRepos] = useState(null)
    const [currentUserStarred,setCurrentUserStarred] = useState(null)
    const [switcher,setSwitcher] = useState()

    useEffect(() => {
        if(currentUser?.name){
            document.title = `Inpecting: ${currentUser.name}`
        }else{
            document.title = "Github searcher"
        }
        
      }, [currentUser])
    
    const onChangeUser = (event) => {
        setUserSearch(event.target.value)
    }

    const handleSearch = () =>{
        axios.get(`${BaseURL}/${userSearch}`).then(response=>{
            setCurrentUser(response.data)
            setCurrentUserRepos(undefined)
            setCurrentUserStarred(undefined)
            setSwitcher("userDetails")
        }).catch(()=>{
            window.alert("Usuario não encontrado")
        })
        axios.get(`${BaseURL}/${userSearch}/repos`).then(response=>{
            setCurrentUserRepos(response.data)
        })
        axios.get(`${BaseURL}/${userSearch}/starred`).then(response=>{
            setCurrentUserStarred(response.data)
            
        })
    }
    

    const handleMenu = () =>{
        
        switch (switcher) {
            case "userDetails":
               return <UserCard avatar={currentUser.avatar_url} name={currentUser.name} location ={currentUser.location}/>
               
             case "userRepos":
                 if(currentUserRepos){
                    return (currentUserRepos.map(repo =>{
                        return(
                            <RepoListingCard key={repo.id} repo={repo.name} cloneUrl={repo.clone_url} /> 
                        )
                    }))
                 }else{
                    return <p>Este usuario ainda não possui repositorios</p>
                }
                
            case "userStarred":
                if(currentUserStarred){
                    return (currentUserStarred.map(repo =>{
        
                        return(
                            <RepoListingCard key={repo.id} repo={repo.name} cloneUrl={repo.clone_url} /> 
                        )
                    }))
                }else{
                    return <p>Este usuario ainda não possui repositorios favoritos</p>
                }
                
        
            default:
                break;
        }
    }
 
    const handleSwitcher = (menu) =>{
      setSwitcher(menu)
    }

  return (
      <div>
          <form onSubmit={event=>{event.preventDefault()}}>
   <input onChange={onChangeUser}/>
   <button onClick={()=>handleSearch()}>buscar</button>
   </form> 
   <button onClick={()=>handleSwitcher("userDetails")} disabled={!!!currentUser}>usuario</button>
   <button onClick={()=>handleSwitcher("userRepos")} disabled={!!!currentUser}>repositorios</button>
   <button onClick={()=>handleSwitcher("userStarred")} disabled={!!!currentUser}>favoritos</button>
   
        {handleMenu()}
    
   </div>
   
  );
};
export default SearchUser