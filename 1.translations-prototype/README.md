# Translation-Prototype

1. All the translations will be stored in a central place i.e. `public/locales/en`.
2. There will be different locales for different languages. The default one is English.
3. `i18n.js` here represents the prototype i18n config which will be customized later on according to the need to make translations. This is imported in index.js.
4. Using Translation HOC to pass translate as props in Components (used in login/login.js).
Example: 
```
const { t } = this.props;
placeholder={t('component.login_form.input_fields.password.placeholder')}
```
This can be reduced and cleaned also by using namespaces.
5. Being able to customize the text for each organization is a great feature and should still be possible if needed. This feature will also exist by making a slight change to org-configurations i.e. at the time of creating org configuration it will ask for customizing text option if this will be true then a new translate.json will be used else the default one will be used.