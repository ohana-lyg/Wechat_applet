import request from "../../utils/request";

export  function Createshopcar(data) {
    return request.post("/shopcar/create",data)
}

export  function Checkshopcar(data) {
    return request.post("/shopcar/check",data)
}

export  function Getshopcar(data) {
    return request.post("/shopcar/listAll",data)
}

export  function Updateshopcar(data) {
    return request.put("/shopcar/update",data)
}

export  function Deleteshopcar(data) {
    return request.post("/shopcar/delete",data)
}