import request from "../../utils/request";

export  function Createfood(data) {
    return request.post("/food/create",data)
}

export  function Checkfood(data) {
    return request.post("/food/check",data)
}

export  function Getfood(data) {
    return request.get("/food/listAll",data)
}

export  function Updatefood(data) {
    return request.post("/food/update",data)
}

export  function Deletefood(data) {
    return request.post("/food/delete",data)
}