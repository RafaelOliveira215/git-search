import React from "react"
import {Route,BrowserRouter,Switch} from "react-router-dom"
import LandingPage from "../screens/landingPage/landingPage"
import SearchUser from "../screens/searchUser/searchUser"


const Router =()=>{

    return(
        <BrowserRouter>
        <Switch>

           <Route exact path="/">
            <LandingPage/>
           </Route>

           <Route exact path="/search">
            <SearchUser/>
           </Route>

        </Switch>
        </BrowserRouter>
    )

}
export default Router