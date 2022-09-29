import jwtDecode from 'jwt-decode';
import axios from 'axios';

export const isLoggedIn = function () {
    let user = localStorage.getItem('loggedUser')
    if (user) {
    var token = JSON.parse(user).token
    }
    else {
        var token = null
    }

    if (token) {
        let tokenExpiration = jwtDecode(token).exp;
        let dateNow = new Date();

        if (tokenExpiration < dateNow.getTime() / 1000) {
            delete axios.defaults.headers.common["auth-token"];
            return false
        } else {
            axios.defaults.headers.common["auth-token"] = getToken();
            return true
        }
    } else {
        delete axios.defaults.headers.common["auth-token"];
        return false
    }
}

export const getName = function () {
    if (isLoggedIn()) {
        let user = localStorage.getItem('loggedUser')
        let name = JSON.parse(user).user.name
        return name
        
    } else {
        return null
    }
}

export const getToken = function () {
    let user = localStorage.getItem('loggedUser')
    var token = JSON.parse(user).token
    return token
}

export const getEmail = function () {
    let user = localStorage.getItem('loggedUser')
    var email = JSON.parse(user).user.email
    return email
}

export const getType = function() {
    if (isLoggedIn()) {
        let user = localStorage.getItem('loggedUser')
        let type = JSON.parse(user).user.type
        return type
    } else {
        return null
    }
}