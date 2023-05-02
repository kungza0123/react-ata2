import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './Auth'
import logo from '../Img/logo.png'
import NavInshorts from "./NavInshorts";
import NewsContent from "./NewsContent/NewsContent";
import apikey from "../data/config";
import axios from 'axios';

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const [category, setCategory] = useState("general");
    const [newsArray, setnewsArray] = useState([]);
    const [newsResults, setnewsResults] = useState();
    const [loadmore, setloadmore] = useState(20);

    const newsApi = async () => {
        try {
          const proxyUrl = "https://cors-anywhere.herokuapp.com/";
          const news = await axios.get(
            "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json"
          );
          setnewsArray(news.data.articles);
          setnewsResults(news.data.totalResults);
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        newsApi();
        
      }, [newsResults, category, loadmore]);

    return (
        <>
        <NavInshorts setCategory={setCategory} />
        <NewsContent
        setloadmore={setloadmore}
        loadmore={loadmore}
        newsArray={newsArray}
        newsResults={newsResults}
      />
            <div className="container mt-5" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

                {currentUser ? (
                    <p>You are logged in - View NewsFeed</p>
                ) : (
                    <p>
                        <Link to="/login" className="btn btn-primary">Log In</Link>
                    </p>
                )}
            </div>

        </>
    )
}

export default Home;
