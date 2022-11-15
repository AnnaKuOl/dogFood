const onResponce = (res)=>{
    return res.ok ? res.json(): Promise.reject(`Ошибка ${res.status}`)}

class Api {
    constructor({baseURL, headers}) {
        this._baseURL = baseURL;
        this._headers = headers
    }
    getProductsList(){
        return fetch(`${this._baseURL}/products`, {
            headers: this._headers
        }).then(onResponce)
    }
    getProductbyId(prodId){
        return fetch(`${this._baseURL}/products/${prodId}`, {
            headers: this._headers
        }).then(onResponce)
    }
    getUserInfo(){
        return fetch(`${this._baseURL}/v2/group-7/users/me`, {
            headers: this._headers
        }).then(onResponce)
    }
    setUserInfo(dataUser){
        return fetch(`${this._baseURL}/v2/group-7/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(dataUser)
        }).then(onResponce)
    }

    search(searchQuery) {
        return fetch(`${this._baseURL}/products/search?query=${searchQuery}`, {
            headers: this._headers
        }).then(onResponce)

    }
    changeLikePoduct (productID, isLike){
        return fetch(`${this._baseURL}/products/likes/${productID}`, {
            method: isLike ? "DELETE" : "PUT",
            headers : this._headers
        }).then(onResponce)


    }
}
const config = {
    baseURL: 'https://api.react-learning.ru',
    headers: {
        'Content-Type': 'application/json',
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZhNTEwNjU5Yjk4YjAzOGY3NzlkMDAiLCJncm91cCI6Imdyb3VwLTciLCJpYXQiOjE2Njc5MTE5NDcsImV4cCI6MTY5OTQ0Nzk0N30.PjEE-bHQYMqobTD35rpcgqq4td7Shy5NhudFwDxWN_w'
    }
}
const api = new Api(config);
export default api;
