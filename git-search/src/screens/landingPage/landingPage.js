import React from "react"
import { useHistory } from "react-router";

const SearchUser = () => {
    const history = useHistory()

    const goToSearchPage = () => {
        history.push("/search");
      };
  return (
    <div>
       <button onClick={()=>goToSearchPage()}>ir para pesquisa</button>
   </div>
  );
};
export default SearchUser