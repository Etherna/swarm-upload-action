import axios from "axios"

export default async function apikeySignin(
  apiKey: string,
  ssoUrl = "https://sso.etherna.io"
) {
  try {
    const [username, password] = apiKey.split(".")
    const { data } = await axios.post<{ access_token: string }>(
      `${ssoUrl}/connect/token`,
      new URLSearchParams({
        grant_type: "password",
        scope: "openid userApi.gateway userApi.sso",
        username,
        password,
      }),
      {
        headers: {
          Authorization: `Basic ${btoa("apiKeyClientId:")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )

    return data.access_token
  } catch (error) {
    console.log(error)
    throw error
  }
}
