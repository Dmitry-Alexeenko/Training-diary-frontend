import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {authorizeOnService, loginOnService, registrationOnService} from "../../redux/thunkCreators/initializeApp";
import styles from '../../styles/Login.module.scss';
import {useHttp} from "../http.hook";

export const Login = () => {
    const dispatch = useDispatch();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const {loading, error, request, clearError} = useHttp()

    const loginHandler = () => {
        dispatch(authorizeOnService({name: login, password: password}))
    };
    const registerHandler = async () => {
        dispatch(registrationOnService({login, password}))
    }
    const loginHandler2 = () => {
        dispatch(loginOnService({login, password}))
    }
    return (
        <div className={styles.login}>

            <h4>Дневник тренировок</h4>

            <div className={styles.login__authContainer}>
                <span className={styles.login__auth}>Логин*</span>
                <input className={styles.login__input} type="text" value={login} onChange={(e) => {
                    setLogin(e.target.value)
                }}/>
            </div>

            <div className={styles.login__authContainer}>
                <span className={styles.login__auth}>Пароль*</span>
                <input className={styles.login__input} type="password" value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }}/>
            </div>

            <button className={styles.login__btn} onClick={loginHandler}
                    disabled={login === "" || password === ""}>Войти
            </button>
            <button className={styles.login__btn} onClick={registerHandler}
                    disabled={login === "" || password === ""}>Зарегестрироваться
            </button>
            <button className={styles.login__btn} onClick={loginHandler2}
                    disabled={login === "" || password === ""}>Войти2
            </button>


            <p className={styles.login__note}>
                * - Данное приложение работает без BackEnd и все данные сохраняются в LocalStorage, в том числе и
                логин/пароль. Поэтому Вы можете вводить любые значения.
            </p>
        </div>
    )
};


