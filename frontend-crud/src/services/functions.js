import axios from 'axios'
import router from "@/router";

export function postData(parameters) {
    axios.post('http://localhost/api/products', parameters).then((response) => {
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

export function putData(id, parameters) {
    axios.put('http://localhost/api/products/' + id, parameters).then((response) => {
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