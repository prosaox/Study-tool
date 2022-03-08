import axios from "axios";
import {SET_CURRENT_USER, SUCCESSFULL_REGISTER, FAILURE_REGISTER, ERRORS, AUTH_ERROR} from "./types"
import {setAuthToken} from "../util/setAuthToken";
import { getServer } from "../util";

export const setCurrentUser = (user) => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try{
        const res = await axios.get(`${getServer}/api/auth`);
        dispatch({
            type: SET_CURRENT_USER,
            payload: res.data,
        });
    }catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }

    return {
        type: SET_CURRENT_USER,
        payload: user,
    };
};

export const register = (userData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        },
    };
 
    try {
        const res = await axios.post(`${getServer}/api/users`, userData, config);
        dispatch({
            type: SUCCESSFULL_REGISTER,
            payload: res.data
        });
        
    } catch(err) {
        const error = err.response.data.errors;

        if (error) {
            dispatch({
                type: ERRORS,
                payload: error,
            });
        }

        else {
            dispatch({
                type: FAILURE_REGISTER,
            });
        }

        
    }
};