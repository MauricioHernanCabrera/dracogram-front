export default function({ app }) {
  const { $cookies, $axios, store } = app;

  $axios.setHeader("Authorization", `Bearer ${$cookies.get("token")}`);
}
