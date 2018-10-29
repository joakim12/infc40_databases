import axios from './axios-instance';

class ApiPost {

    getPosts = () => {
        return axios
            .get('/posts', {headers: {'Content-Type': 'application/json'}})
            .then(response => response.data);
    };

    addPost = (data) => {
        return axios
            .post('/create-post', data, {
                headers: {'Content-Type': 'application/json'}
            })
            .then(response => response.data);
    };

    editPost = (data) => {
        return axios
            .put('/update-post', data, {
                headers: {'Content-Type': 'application/json'}
            })
            .then(response => response.data);
    };

    deletePost = (id) => {
        console.log(id);
        return axios
            .delete('/delete-post/' + id, {
                headers: {'Content-Type': 'application/json'}
            })
            .then(response => response.data);
    };
}

const apiPost = new ApiPost();
export default apiPost;