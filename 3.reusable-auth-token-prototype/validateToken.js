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
