import http from "../http-common";

const create = data => {
    return http.post("/cancellationpolicies", data);
};


const CancellationPolicyService = {
    create
};

export default CancellationPolicyService;