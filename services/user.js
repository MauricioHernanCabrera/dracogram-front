const basePath = "users";

export default ($axios, $cookies) => ({
  createOne: data => {
    return $axios.$post(`/${basePath}`, data);
  },

  getAll: () => {
    return $axios.$get(`/${basePath}`);
  },

  getOne: _id => {
    return $axios.$get(`/${basePath}/${_id}`);
  },

  updateOne: (_id, data) => {
    return $axios.$patch(`/${basePath}/${_id}`, data);
  },

  deleteOne: _id => {
    return $axios.$delete(`/${basePath}/${_id}`);
  }
});
