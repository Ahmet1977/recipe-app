import axios from "axios";

const API_URL = "http://localhost:8080/api/recipes/";

const getRecipe = () => {
  return axios.get(API_URL);
};


export default {
    getRecipe
}