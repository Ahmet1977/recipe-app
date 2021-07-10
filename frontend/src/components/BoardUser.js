import React, { useState, useEffect, useReducer } from "react";
import axios from "axios"
import UserService from "../services/user.service";


let initialState={ ingredients:[], title: "", image_url: "", publisher: "" }

const reducer = (state, action) => {
    switch(action.type){
        case "recipeTitle" : return {...state, title: action.payload}
        case "recipeImage" : return {...state, image_url: action.payload}
        case "recipePublisher" : return {...state, publisher: action.payload}
        default: 
            return state;
    }
}


const BoardUser = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //dispatch({type: "recipe", payload: jsonResponse})

  const [content, setContent] = useState("");
  


  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
    dispatch({type: "recipePublisher", payload: props.currentUser.username});
  }, []);

  const createRecipe = () => {
    axios.post("http://localhost:8080/api/recipes", state)
    .then(res=>{
      console.log(res.data)
    })
    .catch(err=>console.log(err))
    
    console.log(state);
  }

  const handleChange = (e) => {
    dispatch({type: e.target.name, payload: e.target.value})
  }

  return (
    <>
      {/* <header className="jumbotron"> */}
      <div>
        <h2>My Recipes</h2>
        <ul>
          <li>one</li>
          <li>two</li>
          <li>three</li>
        </ul>
      </div>
      
      
      <div id="createRecipeDiv">
          <h2>Create a new recipe...</h2>
          <label style={{width: "100px"}}>Recipe Title: </label>
          <input type="text" className="createRecipeInputs" name="recipeTitle" onChange={handleChange} />
          <br />
          <label style={{width: "100px"}}>Recipe Image URL: </label>
          <input type="text" className="createRecipeInputs" name="recipeImage" onChange={handleChange} />
          <br />
          <label style={{width: "100px"}}>Ingredients: </label>
          <input type="text" className="createRecipeInputs" name="recipeImage" onChange={handleChange} />
          <p>{}</p>
          <br />
          <label style={{width: "100px"}}>Recipe Publisher: </label>
          <input type="text" className="createRecipeInputs" name="recipePublisher" onChange={handleChange} value={props.currentUser.username} style={{border: "none"}}/>
          <br />
          <button onClick={createRecipe} className="createRecipeButton">Add your recipe...</button>
      </div>
      
    </>
  );
};

export default BoardUser;