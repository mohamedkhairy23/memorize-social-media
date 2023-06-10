import axios from "axios";

const url = "http://localhost:8888/posts";

export const fetchPosts = () => axios.get(url);
