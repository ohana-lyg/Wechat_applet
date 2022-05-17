import request from "../../utils/request";

export  function Createbusiness(data) {
    return request.post("/business/create",data)
}

export  function Checkbusiness(data) {
    return request.post("/business/check",data)
}

export  function Getbusiness(data) {
    return request.get("/business/listAll",data)
}

export  function Updatebusiness(data) {
    return request.post("/business/update",data)
}

// export  function Deletebusiness(data) {
//     return request.post("/business/delete/{id}",data)
// }