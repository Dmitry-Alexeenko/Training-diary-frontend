import {mainReducerAPI} from "../../api/api";
import {actions} from "../actions/actions";

const initializedSuccess = () => ({type: actions.SET_INITIALIZED_SUCCESS});
const setAuthUserData = (userData, isAuth) => ({type: actions.SET_USER_DATA, userData: userData, isAuth: isAuth});

export const initializeApp = () => (dispatch) => {
    let result = dispatch(setAuthUser());
    Promise.all([result]).then(() => {
        dispatch(initializedSuccess())
    })
};

const setAuthUser = () => {
    return async (dispatch) => {
        let response = await mainReducerAPI.setAuthUser();
        if (response.resultCode === 0) {
            dispatch(setAuthUserData(response.data, true))
        }
    }
};

export const authorizeOnService = (authorizeData) => {
    return async (dispatch) => {
        let response = await mainReducerAPI.authorizeOnService(authorizeData);
        if (response === 0) {
            dispatch(setAuthUser())
        }
    }
};

export const registrationOnService = (registerData) => {
    return async (dispatch) => {
        let response = await mainReducerAPI.registrationOnService(registerData);
        console.log(response, 'response')
    }
}

export const loginOnService = (registerData) => {
    return async (dispatch) => {
        let response = await mainReducerAPI.login(registerData);
        console.log(response, 'response')
    }
}

export const logoutOnService = () => {
    return async (dispatch) => {
        let response = await mainReducerAPI.logout();
        if (response === 0) {
            dispatch(setAuthUserData({
                profile: null,
                lastIdBoard: null,
                lastIdList: null,
                lastIdCard: null,
            }, false))
        }
    }
};