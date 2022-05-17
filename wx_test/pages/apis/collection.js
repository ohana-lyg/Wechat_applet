import request from "../../utils/request";

export  function Createcollection(data) {
    return request.post("/collection/create",data)
}

export  function Checkcollection(data) {
    return request.post("/collection/check",data)
}

export  function Deletecollection(data) {
    return request.post("/collection/delete",data)
}