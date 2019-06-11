export default async function getUserProfile(email) {
  const response = await fetch(
    "https://365proxy.azurewebsites.us/pghcerts/userProfile?user=" + email,
    {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + process.env.REACT_APP_365_API
      })
    }
  );
  const profile = await response.json();
  return profile[0];
}
