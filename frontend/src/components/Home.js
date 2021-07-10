import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import RecipeService from "../services/recipe.service";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Recipe from "./Recipe";
import "./home.css"

//import Recipe from "../components/Recipe";
import {Link} from "react-router-dom";

const Home = () => {
  const [content, setContent] = useState([]);
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    RecipeService.getRecipe().then(
      (response) => {
        setContent(response.data);
        console.log(response.data)
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
      
    );
  }, []);

  const runRecipe = (e) => {
    console.log(e.target.id)
    setRecipe(content.filter(item=>item._id===e.target.id))
  }

  return (
    <BrowserRouter> 
    <div className="result" style={{overflow: "auto", height: "100rem"}}>
      <ul className="results__list">
        {content.map((data, index)=>{
               return <li key={index} >
                    <Link className="results__link results__link--active recipeLinks">
                        <figure className="results__fig recipeHover" id={data._id} onClick={runRecipe}>
                            <img src={data.image_url} alt={data.title}/>
                        </figure>
                        <div className="results__data">
                            <h4 className="results__name recipeHover" id={data._id} onClick={runRecipe}>{data.title}</h4>
                            <p className="results__author recipeHover" id={data._id} onClick={runRecipe}>{data.publisher}</p>
                        </div>
                    </Link>
                </li>
        })}
      </ul>
    </div>
    
    {/* <Switch>
      <Route exact path="/recipe/:id" component={Recipe} />
    </Switch> */}
    {recipe.map((data,index)=>{
      return (
        <div className="recipe-card" key={index}>
          <img src={data.image_url} alt="recipes" style={{width: "500px"}}/>
          <h2>{data.title}</h2>
          <p>{data.publisher}</p>
        </div>
      )
    })}
    
    </BrowserRouter>
  );
};

export default Home;