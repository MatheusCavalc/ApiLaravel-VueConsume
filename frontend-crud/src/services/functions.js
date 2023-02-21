import axios from 'axios'
import router from "@/router";

let url = process.env.VUE_APP_API_URL_BASE

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