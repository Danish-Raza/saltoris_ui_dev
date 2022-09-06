import axios from "axios"
import { notification } from "antd"
import $ from "jquery";
let authEndPoint = "https://9090-103-15-255-63.in.ngrok.io"

const setHeaderParams = () => {
    //let userDetails = localStorage.getItem("saltoris-userD")
    //axios.defaults.headers.common["Content-Type"] = "application/json"
    // axios.defaults.headers.common["access-control-allow-origin"] = "http://localhost:3000"
   // axios.defaults.headers.common["Authorization"] = "Bearer"+ " " + localStorage.getItem("saltoris-userD")
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
            let api = authEndPoint + url
            return axios.get(api,{})
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
    loadUserDetails: function(data,  httpMethod = undefined, responseType = undefined) {
     // setHeaderParams()
      //  axios.defaults.headers["common"]["Content-Type"]="application/json"
      return axios.post(`${authEndPoint}/api/v1/user/login`,{...data})
      .then(success => Promise.resolve(success) , error =>  Promise.reject(error))
    },
}
export default WebUtils