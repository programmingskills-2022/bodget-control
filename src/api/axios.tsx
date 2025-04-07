import axios from "axios";

export const api=axios.create({
    baseURL:'https://jsonplaceholder.typicode.com'
})

export const getProjectPage= async(pageParam=1,options={})=>{
    const response=await api.get(`/posts?_page=${pageParam}`,options)
    return response.data
}