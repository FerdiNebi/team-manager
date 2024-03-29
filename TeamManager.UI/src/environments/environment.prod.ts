const windowAsAny = window as any;

export const environment = {
  production: true,
  peopleServiceUrl: windowAsAny._env_ && windowAsAny._env_.PEOPLE_API_URL ?  windowAsAny._env_.PEOPLE_API_URL : "http://teammanager-all.azurewebsites.net/p/people",
  feedbackServiceUrl: windowAsAny._env_ && windowAsAny._env_.FEEDBACK_API_URL ? windowAsAny._env_.FEEDBACK_API_URL : "http://teammanager-all.azurewebsites.net/f/feedback",
  appUrl: windowAsAny._env_ && windowAsAny._env_.APP_URL ? windowAsAny._env_.APP_URL : "https://teammanager-ui.azurewebsites.net/"
};
