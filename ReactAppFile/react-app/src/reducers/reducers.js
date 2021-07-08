import {
    CREATE_POLICY,
    UPDATE_POLICY,
    DELETE_POLICY,
    RETRIEVE_POLICY
} from "../actions/types";


//Intial State
const initialState = [];

function policyReducer(policies = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_POLICY:
            //adding new policy to policies using spread opeator in arrays
            return [...policies, payload];

        case UPDATE_POLICY:
            return policies.map((policy) => {
                if (policy.id === payload.id) {
                    return { ...policy, ...payload }
                }
                return policy;
            });

        case RETRIEVE_POLICY:
            return payload;

        case DELETE_POLICY:
            return policies.filter(({id}) => id !== payload.id);

        default:
            return policies;
    }
};

export default policyReducer;