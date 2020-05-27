import React, {useEffect} from 'react';
import styles from './styles/App.module.scss';
import Header from './components/Header/Header'
import {connect, Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from "./redux/redux-store";
import {initializeApp} from "./redux/thunkCreators/initializeApp";
import Preloader from "./components/common/Preloader";
import {useRoutes} from "./routes";

function App(props) {
    const {isAuth, initialized, initializeApp} = props;
    const routes = useRoutes(isAuth)
    useEffect(() => {
        initializeApp()
    }, [initializeApp]);

    if (!initialized) {
        return <Preloader/>
    }

    return (
        <div className={styles.appContainer}>
            <div className={styles.app}>
                {isAuth && <Header/>}
                <main className={styles.main}>
                    {routes}
                </main>
            </div>
        </div>
    );
}

const mapSateToProps = (state) => {
    return {
        isAuth: state.mainReducer.isAuth,
        initialized: state.mainReducer.initialized
    }
};

const AppContainer = connect(mapSateToProps, {initializeApp})(App);


export const TrainingDiaryApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>);
};

