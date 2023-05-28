import axios from 'axios'
import router from "@/router";
import setAuthHeader from "@/services/setAuthHeader"

let url = process.env.VUE_APP_API_URL_BASE

export function register(name, email, password) {
    event.preventDefault()
    axios.post('http://localhost/api/auth/register', {
        name: name.trim(),
        email: email.trim(),
        password: password.trim()
    }).then((response) => {
        window.location.replace('/');
    }).catch(error => {
        console.log(error)
    });
}

export function login(email, password) {
    event.preventDefault()
    axios.post('http://localhost/api/auth/login', {
        email: email.trim(),
        password: password.trim()
    }).then((response) => {
        localStorage.setItem('bearerToken', response.data.data.token)
        setAuthHeader(response.data.data.token)
        window.location.replace('/');
    }).catch(error => {
        console.log(error)
    });
}

export function logout() {
    event.preventDefault()
    axios.post('http://localhost/api/auth/logout').then((response) => {
        localStorage.removeItem('bearerToken');
        window.location.replace('/');
    }).catch(error => {
        console.log(error)
    });
}

export function postData(parameters) {
    axios.post(url, parameters).then((response) => {
        let status = response.data[0]['status'];
        if (status === 'success') {
            router.push('/')
        } else if (status === 'error') {
            let list = '';
            let errors = response.data[1]['errors'];
            Object.keys(errors).forEach(
                key => list += errors[key][0] + '.'
            );
            console.log(list)
            //alert(list, 'error');
        }
    }).catch(error => {
        console.log(error)
    });
}

export function putData(id, parameters) {
    axios.put(url + '/' + id, parameters).then((response) => {
        let status = response.data[0]['status'];
        if (status === 'success') {
            router.push('/')
        } else {
            let list = '';
            let errors = response.data[1]['errors'];
            Object.keys(errors).forEach(
                key => list += errors[key][0] + '.'
            );
            alert(list, 'error');
        }
    }).catch(error => {
        console.log(error)
    });
}

export function deleteData(id) {
    axios.delete(url + '/' + id).then((response) => {
        let message = response.data.message
        if (message === 'Product deleted') {
            router.push('/')
        } else {
            router.push('/')
        }
    }).catch(error => {
        if (error.response.data.message == 'Unauthenticated.') {
            router.push('/login')
        }
    });
}

//export function test() {
//    let oi = 'oi'
//    let hey = 'hey'
//    return { oi, hey }
//}