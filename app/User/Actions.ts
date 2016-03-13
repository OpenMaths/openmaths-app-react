import * as Api from '../Utils/Api'

export const REQUEST_SIGN_USER_IN = 'REQUEST_SIGN_USER_IN';
function requestSignUserIn() {
    return {
        type: REQUEST_SIGN_USER_IN
    };
}

export const RECEIVE_SIGN_USER_IN = 'RECEIVE_SIGN_USER_IN';
function receiveSignUserIn(signedIn:boolean, data:User) {
    //logAction(RECEIVE_SIGN_USER_IN, data);

    return {
        type: RECEIVE_SIGN_USER_IN,
        signedIn: signedIn,
        data: data
    };
}

export function signUserIn(token:string) {
    return function (dispatch:Redux.Dispatch) {
        dispatch(requestSignUserIn());

        if (_.isNull(token)) {
            dispatch(receiveSignUserIn(false, null));
            return false;
        }

        const
            url = '/user/sign-in',
            signUserInPromise = Api.ServerInstance.post(url, {authToken: token});

        Rx.Observable.fromPromise(signUserInPromise)
            .map((response:any):GoogleUser => new GoogleUser(response.data))
            .subscribe((response:GoogleUser) => {
                const
                    userData = response,
                    isUserValid = User.isUserValid(response.email);

                    window.sessionStorage.setItem('csrf', response.csrf);

                    if (!isUserValid)
                        dispatch(showNotification('Could not sign in under adbrain.com', NotificationType.Error));

                    dispatch(receiveSignUserIn(isUserValid, userData));
            }, () => {
                dispatch(receiveSignUserIn(false, null));
                dispatch(showNotification('Could not sign in under adbrain.com', NotificationType.Error));
            });
    }
}