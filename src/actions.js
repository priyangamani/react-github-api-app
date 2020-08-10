import {
    SELECT_USER,
    REQUEST_USERDATA,
    RECEIVE_USERDATA,
    RECEIVE_USERDATA_ERROR,
    REQUEST_REPOS,
    RECEIVE_REPOS,
    RECEIVE_REPOS_ERROR,
} from './constants/ActionTypes';

export function selectUser(user) {
    return {
        type: SELECT_USER,
        user,
    };
}

export function requestUserData() {
    return {
        type: REQUEST_USERDATA,
    };
}

function receiveUserData(json) {
    return {
        type: RECEIVE_USERDATA,
        userData: json,
    };
}

function receiveUserDataErr(error) {
    return {
        type: RECEIVE_USERDATA_ERROR,
        error,
    };
}

function requestRepos() {
    return {
        type: REQUEST_REPOS,
    };
}

function receiveRepos(json) {
    return {
        type: RECEIVE_REPOS,
        repos: json,
    };
}

function receiveReposErr(error) {
    return {
        type: RECEIVE_REPOS_ERROR,
        error,
    };
}

export function fetchUserData(user) {
    return async dispatch => {
        dispatch(requestUserData());
        try {
            const res = await fetch(`https://api.github.com/users/${user}`);
            const json = await res.json();
            return dispatch(receiveUserData(json));
        }
        catch (err) {
            return dispatch(receiveUserDataErr(err));
        }
    };
}

function fetchRepos(user) {
    return async dispatch => {
        dispatch(requestRepos());
        try {
            const res = await fetch(`https://api.github.com/users/${user}/repos`);
            const json = await res.json();
            return dispatch(receiveRepos(json));
        }
        catch (err) {
            return dispatch(receiveReposErr(err));
        }
    };
}

export function fetchUserAndRepos(user) {
    return (dispatch, getState) => {
        return dispatch(fetchUserData(user)).then(() => {
            const { currentUserData } = getState();
            if (
                !currentUserData.isFetching &&
                currentUserData.userData.message
            ) {
                return;
            }
            return dispatch(fetchRepos(user));
        });
    };
}
