import axios from "axios"

export default async function apikeySignin(apiKey: string, ssoUrl = "https://sso.etherna.io") {
  try {
    const [username, password] = apiKey.split(".")
    const {
      data: { access_token },
    } = await axios.post<{ access_token: string }>(
      `${ssoUrl}/connect/token`,
      new URLSearchParams({
        grant_type: "password",
        scope: "profile ether_accounts openid userApi.gateway userApi.sso",
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

    const {
      data: { etherManagedPrivateKey },
    } = await axios.get<{ etherManagedPrivateKey: string | null }>(`${ssoUrl}/api/v0.3/Identity`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    return {
      accessToken: access_token,
      managedPrivateKey: etherManagedPrivateKey,
    }
  } catch (error) {
    console.log(error)

    return null
  }
}
