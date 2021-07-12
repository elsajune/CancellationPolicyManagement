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

        case RETRIEVE_POLICY:
            console.log("Inside Reducer", JSON.parse(JSON.stringify(payload)))
            return JSON.parse(JSON.stringify(payload));


        case CREATE_POLICY:
            //adding new policy to policies using spread opeator in arrays
            return (policies.concat(JSON.parse(JSON.stringify(payload))));

        case UPDATE_POLICY:
            //Check again the deep copy
            return policies.map((policy) => {
                if (policy.id === payload.id) {
                    policy = { ...policy, ...payload }
                    //return { ...policy, [rules] : {...payload.rules} }
                    return ({ ...policy, ...payload });
                }
                return policy;
            });

        case DELETE_POLICY:
            return policies.filter(({ id }) => id !== payload.id);

        default:
            return JSON.parse(JSON.stringify(policies));
    }
};

export default policyReducer;