import react from "react"

const UserCard = (props)=>{
return(
    <div>
        <img src={`${props.avatar}`} alt={`Foto do usuario ${props.name}`}></img>
        <p>{props.name}</p>
        <p>{props.location}</p>
    </div>
)
}

export default UserCard