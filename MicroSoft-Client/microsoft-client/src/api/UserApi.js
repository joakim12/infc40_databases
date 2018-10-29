import axios from './axios-instance';

class ApiUser {

    getUser = (data) => {
        return axios.post('/user', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.data);
    };

    addUser = (data) => {
        return axios
            .post('/create-user', data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.data);
    };

    //editUser = (data) => {
    //    return axios
    //        .put('/users/update-user', data, {
    //            headers: {
    //                'Content-Type': 'application/json',
    //            }
    //        })
    //        .then(response => response.data);
    //};

    //deleteUser = (id) => {
    //    return axios
    //        .delete('/delete-user/' + id, {
    //            headers: {
    //                'Content-Type': 'application/json',
    //            }
    //        })
    //        .then(response => response.data);
    //};
}

const apiUser = new ApiUser();
export default apiUser;