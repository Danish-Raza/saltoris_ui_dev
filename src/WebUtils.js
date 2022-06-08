import axios from "axios"
import { notification } from "antd"
const setHeaderParams = () => {
    //let userDetails = localStorage.getItem("saltoris-userD")
    //axios.defaults.headers["Authorization"] = "Bearer"+ " " + localStorage.getItem("saltoris-userD")
}
const WebUtils = {
    downloadFile: function(url, fileName) {
    setHeaderParams()
    axios({
        url: url,
        method: 'GET',
        responseType: 'blob',
        })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${fileName}`);
            document.body.appendChild(link);
            link.click();
        })
        .catch(err=>{
            let args = {
                message: 'Failed to download',
                duration: 0
            };
            notification.error(args)
        })
    },
    httpOperations: function(url, data,  httpMethod = undefined, responseType = undefined) {
        setHeaderParams()
        if(httpMethod == "GET") {
            return axios.get(url,{params:  data})
            .then(success => Promise.resolve(success) , error =>  Promise.reject(error))
        } else if(httpMethod == "DELETE") {
          return axios.delete(url,{data})
          .then(success => Promise.resolve(success) , error =>  Promise.reject(error))
        } else if(httpMethod == "POST" && responseType != "formData") {
          return axios.post(url, data)
          .then(success => Promise.resolve(success) , error =>  Promise.reject(error))
        } else if(httpMethod == "POST" && responseType == "formData") {
          return axios.post(url, data, {headers: {
            'Content-Type': 'multipart/form-data'
          }})
          .then(success => Promise.resolve(success) , error =>  Promise.reject(error))
        } else if(httpMethod == "PUT") {
          return axios.put(url,data)
          .then(success => Promise.resolve(success) , error =>  Promise.reject(error))
        }
    },
}
export default WebUtils