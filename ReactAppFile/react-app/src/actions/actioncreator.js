import {
    CREATE_POLICY,
    UPDATE_POLICY,
    DELETE_POLICY,
    RETRIEVE_POLICY
} from "./types";

import CancellationPolicyService from "../services/CancellationPolicyService";

//Async inside Synchronoue function
export const createCancellationPolicy = (policy) => async (dispatch) => {
    try {
        const response = await CancellationPolicyService.create(policy);
        dispatch({
            type: CREATE_POLICY,
            payload: response.data,
        });
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

//Retrieve data using data from DB using axios;
export const retrievePolicy = () => async (dispatch) => {
    try {
        const response = await CancellationPolicyService.getAll();
        console.log("Inside Action Creator", JSON.parse(JSON.stringify(response.data)));
        dispatch({
            type: RETRIEVE_POLICY,
            payload: JSON.parse(JSON.stringify(response.data))
        });

    } catch (error) {
        console.log(error);
    }
};

export const updatePolicy = (id, policy) => async (dispatch) => {
    try {
        const response = await CancellationPolicyService.update(id, policy);
        dispatch({
            type: UPDATE_POLICY,
            payload: response.data,
        });
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deletePolicy = (id) => async (dispatch) => {
    try {
        await CancellationPolicyService.deletePolicy(id);
        dispatch({
            type: DELETE_POLICY,
            payload: { id }
        });
    } catch (error) {
        console.log(error);
    }
}