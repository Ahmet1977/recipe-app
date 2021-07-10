import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';
// import RecipeService from "../services/recipe.service"

let initialState={ recipe:[] }

const reducer = (state, action) => {
    switch(action.type){
        case "recipe" : return {...state, recipe: [action.payload]};
        default: 
            return state;
    }
}

export default function Recipe() {

    const [state, dispatch] = useReducer(reducer, initialState);
    // const [content, setContent] = useState([]);

    let {id} = useParams();
    useEffect(() => {
        fetch("http://localhost:8080/api/recipes/" + id)
        .then(res=> res.json())
        .then(jsonResponse=>{
            dispatch({type: "recipe", payload: jsonResponse})
            console.log(jsonResponse)
        })
        .catch(err=>console.log(err))
        
      }, []);
    return (
        
        <div>
            {state.recipe.map((content,index)=>{
                return (
                    <h1>{content.title}</h1>
                )
            })}
        </div>
    )
}