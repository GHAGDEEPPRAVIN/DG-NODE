import axios from "axios"

export function fetchDataFromServer(){
    const res = axios.get("http://localhost:2000/api/get")
    const data = res.data
    console.log(res.data)
}

fetchDataFromServer()


