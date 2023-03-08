import apiClient from "../../Setup/axiosconfig/apiClient"
class useItemApi{
     async getItems(){
      try {
        const response= await apiClient.get('/items')
        return response;
      } catch (error) {
        throw new Error(error);
      }
   }

   async addItem(data){
      try {
        const response= await apiClient.post('/items/create',data);
        return response;
      } catch (error) {
        throw new Error(error);
      }
   }

   async deleteItem(id){
    try {
        const response= await apiClient.delete(`/items/${id}`);
        return response;
    } catch (error) {
      throw new Error(error);
    }
   }
   async  getUpdateItem(id){
    try {
         const response= await apiClient.get(`/items/${id}`);
         return response
    } catch (error) {
      throw new Error(error);
    }
   }
}


export const useFetchItems=()=>{
    const api= new useItemApi();
    return {
        getItems:api.getItems.bind(api)
    }
}


export const useItemAdd=()=>{
  const api3= new useItemApi();
  return {
    addItem:api3.addItem.bind(api3)
  }
}


export const useItemRemove=()=>{
  const api= new useItemApi();
  return {
    removeItem:api.deleteItem.bind(api)
  }
}


export const useFetchUpdateItem=()=>{
  const api= new useItemApi();
  return {
    getUpdateItem:api.getUpdateItem.bind(api)
  }
}