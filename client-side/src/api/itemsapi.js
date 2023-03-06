import client from '../Setup/axiosconfig/apiClient'
const getItems = () => client.get("/items/get");

const postItem=(data)=>client.post("/items/create", data);
const deleteItem=(id)=>client.delete(`/items/${id}`);

const getItemData=(id)=>client.get(`/items/${id}`);

const updateItem=(id, data)=>client.put(`/items/${id}`, data);

export default {
    getItems, 
    postItem,
    getItemData,
    deleteItem,
    updateItem
};