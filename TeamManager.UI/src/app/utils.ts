import { environment } from 'src/environments/environment';

export function baseUri() {
    return window.location.protocol + '//' + window.location.host + '/';
}

export const protectedResourceMap = new Map<string, string[]>();
protectedResourceMap.set(environment.peopleServiceUrl, ["https://ferdinebievgmail.onmicrosoft.com/TeamManager/access_as_user", "profile"]);
protectedResourceMap.set(environment.feedbackServiceUrl, ["https://ferdinebievgmail.onmicrosoft.com/TeamManager/access_as_user", "profile"]);
