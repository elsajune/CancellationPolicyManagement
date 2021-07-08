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
        return Promise.reject(error)
    }
};