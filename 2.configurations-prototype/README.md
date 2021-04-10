# configurations-prototype

1. `default.yml` is the default one which will be used for all the configuration.
2. Now the change is if some org configuration is different from the default one then it will be added in that org configuration file.
3. You can compare both **default.yml** and **neworg.yml** where **default.yml** will act as a template and **neworg.yml** will contain only the different configuration that doesn't matches with the default.yml configuration.
4. Now the `config/setup.js` will be changed to compare default.yml with the respective organisation configuration file to separate serverConfig and clientConfig by observing changes in between them.
config/setup.js
```
It will compare two files i.e. default.yml with <org-slug>.yml and generates new config.json file for client and server.
```
5. The configuration of neworg can contain null also to remove that config from default configuration.