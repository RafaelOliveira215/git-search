import react, { useState, useRef } from "react";
import './styles.css'

const RepoListingCard = (props) => {
  const [copyMessage, setCopyMessage] = useState();
  const textAreaRef = useRef(null);
  const copyToClipboard = () => {
    textAreaRef.current.select();
    document.execCommand("copy");
    runCopyMessage();
  };

  const runCopyMessage = () => {
    setCopyMessage("copied");
    setTimeout(() => {
      setCopyMessage("");
    }, 1000);
  };
  return (
    <div className="repoListingCard">
      <p>{props.repo}</p>
      <textarea ref={textAreaRef} readOnly value={props.cloneUrl}>
        {props.cloneUrl}
      </textarea>
      <button onClick={() => copyToClipboard()}>copy</button>
      <p>{copyMessage}</p>
    </div>
  );
};

export default RepoListingCard;
