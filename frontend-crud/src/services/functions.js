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

/*
export function postData(parameters) {
    axios.post(url, parameters).then((response) => {
        if (response.data.message === 'Product Created') {
            router.push('/')
        } else if (response.data.message === 'Something Error') {
            alert('Please Rewrite the Product');
        }
    }).catch(error => {
        if (error.response.data.message == 'Data Invalid') {
            let list = '';
            let errors = error.response.data.errors
            Object.keys(errors).forEach(
                key => list += errors[key][0] + '\n'
            );
            alert(list, 'error');
        }
    });
}
*/
/*
export function putData(id, parameters) {
    axios.put(url + '/' + id, parameters).then((response) => {
        if (response.data.message === 'Product Updated') {
            router.push('/')
        } else if (response.data.message === 'Something Error') {
            alert('Please Rewrite the Product');
        }
    }).catch(error => {
        if (error.response.data.message == 'Validation Failed') {
            let list = '';
            let errors = error.response.data.errors
            Object.keys(errors).forEach(
                key => list += errors[key][0] + '\n'
            );
            alert(list, 'error');
        }
    });
}
*/

export function deleteData(id) {
    axios.delete(url + '/' + id).then((response) => {
        if (response.data.message === 'Product Deleted') {
            router.push('/')
        } else if (response.data.message === 'Something Error') {
            alert('Please Redelete the Product');
        }
    }).catch(error => {
        if (error.response.data.message == 'Unauthenticated.') {
            router.push('/login')
        }
    });
}