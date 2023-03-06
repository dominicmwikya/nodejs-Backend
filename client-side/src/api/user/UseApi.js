import apiClient from "../../Setup/axiosconfig/apiClient";
class UseApi {
  async createUser(user) {
    try {
      const response = await apiClient.post("/users/post", user);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
  async getUser() {
    try {
      const response = await apiClient.get('/users');
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async deleteUser(id) {
    try {
      const response = await apiClient.delete(`/users/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
  async updateUser(id) {
    try {
      const response = await apiClient.put(`/users/update/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async userLogin(data) {
    try {
      const response = await apiClient.post('/users/login', data);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

}

export const usePost = () => {
  const api = new UseApi();
  return {
    createUser: api.createUser.bind(api)
  };
};

export const useFetchData = () => {
  const api2 = new UseApi();
  return {
    getUser: api2.getUser.bind(api2)
  }
}
export const useDeleteUser = () => {
  const api3 = new UseApi();
  return {
    deleteUser: api3.deleteUser.bind(api3)
  }
}

export const useUpdateUser = () => {
  const api4 = new UseApi();
  return {
    deleteUser: api4.updateUser.bind(api4)
  }


}
export const useLogin = () => {
  const api5 = new UseApi();
  return {
    LoginUser: api5.userLogin.bind(api5),
  }
}