import http from "../http-common";

const getAll = () => {
    return http.get("/cancellationpolicies");
};

const get = id => {
    return http.get(`/cancellationpolicies/${id}`);
};

const create = data => {
    return http.post("/cancellationpolicies", data);
};

const update = (id, data) => {
    return http.put(`/cancellationpolicies/${id}`, data);
};

const deletePolicy = id => {
    return http.delete(`/cancellationpolicies/${id}`);
};



const CancellationPolicyService = {
    getAll,
    get,
    create,
    update,
    deletePolicy
};

export default CancellationPolicyService;