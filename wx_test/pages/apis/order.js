import request from "../../utils/request";

export  function Createorder(data) {
    return request.post("/order/create",data)
}

export  function Checkorder(data) {
    return request.post("/order/check",data)
}

export  function Getorder(data) {
    return request.get("/order/listAll",data)
}

export  function Updateorder(data) {
    return request.put("/order/update",data)
}

export  function Deleteorder(data) {
    return request.delete("/order/delete",data)
}