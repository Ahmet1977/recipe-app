import React, { useState, useEffect } from "react";
import UserService from "../user.service";
import logo from "../components"

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
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

  return (
    <div className="container">
      <header className="header">
            <img src={logo} alt="Logo" className="header__logo"/>
            <div className="search">
                <input type="text" className="search__field" placeholder="Search over 1,000,000 recipes..."/>
                <h3>{content}</h3>
                <button className="btn search__btn">
                    <svg className="search__icon">
                        <use href="./img/search.svg"></use>
                    </svg>
                    <span>Search</span>
                </button>
            </div>
            <div className="likes">
                <div className="likes__field">
                    <svg className="likes__icon">
                        <use href="img/heart.svg"></use>
                    </svg>
                </div>
                <div className="likes__panel">
                    <ul className="likes__list">
                        <li>
                            <a className="likes__link" href="#23456">
                                <figure className="likes__fig">
                                    <img src="img/test-1.jpg" alt="Test"/>
                                </figure>
                                <div className="likes__data">
                                    <h4 className="likes__name">Pasta with Tomato ...</h4>
                                    <p className="likes__author">The Pioneer Woman</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    </div>
  );
};

export default Home;