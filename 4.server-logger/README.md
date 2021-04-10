After adding this http request will log in console and log files will be created to monitor the health of the application.
It will be easy to debug the application after using this.

### Screenshot of implementation

![http](https://user-images.githubusercontent.com/56037184/114337712-410d5500-9b6f-11eb-95cf-88c97204f863.png)

### Implementation

1. After using winston `logInternalError` will be replaced by `Logger` defined in `utils/winstonLogger.js`.
2. The log info will contain : `timestamp - level - message`.
3. The code for winstonLogger is present in `utils/winstonLogger.js`.

4. Added morgan integration with winston logger to trace every http request even the timeout situation.
5. app will use morganMiddleware to log the request to console just like django does. Code for this is present in `morganMiddleware.js`

6. I have added a example in controllers for validate token which will log error when the token is not validated using the winston logger.