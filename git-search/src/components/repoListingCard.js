import react from "react"

const RepoListingCard = (props)=>{
return(
    <div>
        <p>{props.repo}</p>
        <p>{props.cloneUrl}</p>
        <button  onClick={() =>  navigator.clipboard.writeText('ea')}>copy</button>
    </div>
)
}

export default RepoListingCard