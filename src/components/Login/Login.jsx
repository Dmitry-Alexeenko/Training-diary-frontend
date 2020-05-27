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

        <div className="row">
            <div className="col s12 m8 offset-m2">
                <div className="card blue-grey darken-1">

                    <div className="card-content white-text ">
                        <span className="card-title">Дневник тренировок</span>
                        <div style={{marginTop: '30px'}}>
                            <div className="input-field">
                                <input id="first_name2" type="email" className="validate"/>
                                <label className="active" htmlFor="first_name2">Email</label>
                            </div>

                            <div className="input-field ">
                                <input id="first_name2" type="password" className="validate"/>
                                <label className="active" htmlFor="first_name2">Password</label>
                            </div>
                        </div>
                    </div>

                    <div className="card-action">
                        <button
                            className='btn yellow darken-4'
                            style={{marginRight: 10}}
                            //disabled={loading}
                            //onClick={loginHandler}
                        >
                            Войти
                        </button>

                        <button
                            className='btn grey lighten-1 dark-text'
                            //onClick={registerHandler}
                            //disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>

            </div>


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


