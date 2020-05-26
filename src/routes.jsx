import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {Login} from "./components/Login/Login";
import Home from "./components/Home/Home";
import Board from "./components/Board/Board";
import CardView from "./components/CardContent/CardView";

export const useRoutes = (isAuth) => {
    if (isAuth) {
        return (
            <Switch>
                <Route exact path={'/boards'} render={() => <Home/>}/>
                <Route path={'/b/:boardId?'} render={() => <Board/>}/>
                <Route path={'/c/:cardList/:cardName?'} render={() => <CardView/>}/>
                <Redirect to={'/boards'}/>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route exact path={'/'} render={() => <Login/>}/>
                <Redirect to={'/'}/>
            </Switch>
        )
    }
}