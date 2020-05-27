import React from 'react';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {logoutOnService} from "../../redux/thunkCreators/initializeApp";
import styles from '../../styles/Header.module.scss';


function Header(props) {

    const {profile, logoutOnService} = props;

    return (
        <div className={styles.Header}>
            <div className={styles.Header__nav}>
                <div className={styles.nav__item}>
                    <NavLink to={'/'}>Главная</NavLink>
                </div>
            </div>
            <div className={styles.Header__profile}>
                {profile &&
                <div>
                    <span className={styles.Header__name}>{profile.name}</span>
                    <button type="default"  onClick={logoutOnService}
                            className={styles.Header__btn}>
                       выйти
                    </button>
                </div>}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        profile: state.mainReducer.profile
    }
};

export default connect(mapStateToProps, {logoutOnService})(Header);
