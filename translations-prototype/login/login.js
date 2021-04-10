export default class Login extends React.Component {

  // code was here.

  render() {
    const { t } = this.props;
    return (
      <>
        <div className="container content" id="login">
          <div className="inner">
            <form className="main-column" onSubmit={this.handleSubmit}>

              <div className="fieldset">

                <div className="row password">
                  <label htmlFor="password">
                    {t('component.login_form.input_fields.password.label')} //this can be reduced by using namespace.
                  </label>
                  {errors.password && (
                    <div className="error">
                      <span className="icon">!</span>
                      <span className="text">
                        {errors.password}
                      </span>
                    </div>
                  )}
                  <input
                    className={`input ${errors.password ? "error" : ""}`}
                    type={input_fields.password.type}
                    id="password"
                    required
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    placeholder={t('component.login_form.input_fields.password.placeholder')}  // this can be reduced by using namespace.
                    pattern={input_fields.password.pattern}
                    title={t('component.login_form.input_fields.password.pattern_description')}  // this can be reduced by using namespace.
                  />
                </div>
              </div>
            </form>

            <Contact />
          </div>
        </div>
        <Route
          path={`${match.path}/:name`}
          render={props => {
            return <Modal {...props} prevPath={match.url} />;
          }}
        />
      </>
    );
  }
}

// code was here.