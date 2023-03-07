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

   async deleteItem(id, loggedUser){
    try {
        const response= await apiClient.delete(`/items/delete/${id}`, loggedUser);
        return response;
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