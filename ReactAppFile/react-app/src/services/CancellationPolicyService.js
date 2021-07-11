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

const remove = id => {
    return http.delete(`/cancellationpolicies/${id}`);
};



const CancellationPolicyService = {
    getAll,
    get,
    create,
    update,
    remove
};

export default CancellationPolicyService;