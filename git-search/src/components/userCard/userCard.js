import react from "react";
import './styles.css'

const UserCard = (props) => {
  return (
    <div className="userCard">
      <img src={`${props.avatar}`} alt={`Foto do usuario ${props.name}`}></img>
      <p>{props.name}</p>
      <p>{props.location}</p>
    </div>
  );
};

export default UserCard;
