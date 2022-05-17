import request from "../../utils/request";

export  function Createuser(data) {
    return request.post("/user/create",data)
}

export  function Checkuser(data) {
    return request.post("/user/check",data)
}

export  function Getuser(data) {
    return request.post("/user/listAll",data)
}

export  function Updateuser(data) {
    return request.put("/user/update",data)
}

export  function Deleteuser(data) {
    return request.delete("/user/delete",data)
}