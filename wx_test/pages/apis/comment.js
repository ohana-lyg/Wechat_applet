import request from "../../utils/request";

export  function Createcomment(data) {
    return request.post("/comment/create",data)
}

export  function Checkcomment(data) {
    return request.post("/comment/check",data)
}