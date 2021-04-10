Current Implementation of validate token.
```
async validateToken() {
    const { setLoading } = this.context;
    const {cookies, orgSlug, logout, verifyMobileNumber} = this.props;
    const token = cookies.get(`${orgSlug}_auth_token`);
    const url = validateApiUrl(orgSlug);
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        url,
        data: qs.stringify({
          token,
        }),
      });
      setLoading(false);
      if (response.data.response_code !== "AUTH_TOKEN_VALIDATION_SUCCESSFUL") {
        logout(cookies, orgSlug);
        toast.error(genericError, {
          onOpen: () => toast.dismiss(mainToastId),
        });
        logError(
          response,
          '"response_code" !== "AUTH_TOKEN_VALIDATION_SUCCESSFUL"',
        );
      } else {
        const {phone_number} = response.data;
        this.setState({phone_number});
        verifyMobileNumber(true);
      }
      return true;
    } catch (error) {
      logout(cookies, orgSlug);
      toast.error(genericError, {
        onOpen: () => toast.dismiss(mainToastId),
      });
      logError(error, genericError);
      return false;
    }
  }
```
Prototype of changes that will be made:

Frontend (This will be a utils function):
```
async validateToken(cookies){
    //initial-check for session storage
    // if validated token state is already present in session storage then return true.
    // if auth-token-cookie is None
    // then clear all session storages and cookies.
    // if auth-token-cookie is not None
    // make a post request with that token using axios on validateApiUrl.
    // if response is validation_successfull then it will store the state in session storage and then it will return True
    // else it will return false.
}
```

More precisely:
```
function validateToken() {
    // if token is already validated then it will return true and skip making post request.
    if (sessionStorage.getItem("isValidated")) {
        return true;
    }
    const { setLoading } = this.context;
    const { cookies, orgSlug, logout } = this.props;
    const token = cookies.get(`${orgSlug}_auth_token`);
    const url = validateApiUrl(orgSlug);
    setLoading(true);
    try {
        const response = await axios({
            method: "post",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            url,
            data: qs.stringify({
                token,
            }),
        });
        setLoading(false);
        if (response.data.response_code !== "AUTH_TOKEN_VALIDATION_SUCCESSFUL") {
            logout(cookies, orgSlug);
            return false;
            logError(
                response,
                '"response_code" !== "AUTH_TOKEN_VALIDATION_SUCCESSFUL"',
            );
        } else {
            // use the session storage to make this function reusable.
            sessionStorage.setItem("isValidated", "true");
            return true;
        }
    } catch (error) {
        logout(cookies, orgSlug);
        logError(error, genericError);
        return false;
    }
};
```

We will use the above utils method in every component to decide the flow from component as mentioned in https://github.com/openwisp/openwisp-wifi-login-pages/issues/100

like this (mobile phone verification): 

```
if (not authenticated && not validateToken ){
  redirect to login
} else if (authenticated && validateToken && active) {
  redirect to status
} else if (authenticated && validateToken && not active) {
  redirect to identity verification
}
```
This can also be implemented using custom route switcher with redux to reduce the boilerplate code.
This will make organizationWrapper a simple list of routes and flow will not be dependent on organizationWrapper which will make it simple to debug and test.

