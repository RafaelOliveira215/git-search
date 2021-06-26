import react from "react"

const UserCard = (props)=>{
return(
    <div>
        <img src={`${props.avatar}`}></img>
        <p>{props.name}</p>
        <p>{props.location}</p>
    </div>
)
}

export default UserCard