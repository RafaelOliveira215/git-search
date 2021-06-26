import react, {useRef} from "react"

const RepoListingCard = (props)=>{
    const textAreaRef = useRef(null)
    const copyToClipboard = () =>{
        textAreaRef.current.select();
        document.execCommand('copy');
    }
return(
    <div>
        
        <p>{props.repo}</p>
        <textarea ref={textAreaRef}
          value={props.cloneUrl}>{props.cloneUrl}</textarea>
        <button  onClick={() =>  copyToClipboard()}>copy</button>
    </div>
)
}

export default RepoListingCard