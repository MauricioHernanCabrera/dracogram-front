const basePath = "auth";

export default ($axios, $cookies) => ({
  login: data => {
    return $axios.$post(`/${basePath}/login`, data);
  },

  register: data => {
    return $axios.$post(`/${basePath}/register`, data);
  },

  verify: token => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return $axios.$get(`/${basePath}/verify`, config);
  }
});
