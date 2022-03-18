import "./App.css";
import axios from "axios";
import {useEffect, useState} from "react";

function App() {
    const [data, setData] = useState(null);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);
    const colors = [
        "rgb(22, 160, 133)",
        "rgb(39, 174, 96)",
        "rgb(41, 128, 185)",
        "rgb(142, 68, 173)",
        "rgb(44, 62, 80)",
        "rgb(241, 196, 15)",
        "rgb(230, 126, 34)",
        "rgb(231, 76, 60)",
        "rgb(236, 240, 241)",
        "rgb(149, 165, 166)",
        "rgb(243, 156, 18)",
        "rgb(211, 84, 0)",
        "rgb(192, 57, 43)",
    ];
    const [color, setColor] = useState(
        colors[Math.floor(Math.random() * colors.length)]
    );

    useEffect(() => {
        axios
            .get("https://friends-quotes-api.herokuapp.com/quotes/random")
            .then((response) => {
                setData(response.data);
                setError(null);
            })
            .catch((error) => {
                setData(null);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const changeColor = () => {
        setColor(colors[Math.floor(Math.random() * colors.length)]);
    };

    const newQuote = () => {
        changeColor();
        axios
            .get("https://friends-quotes-api.herokuapp.com/quotes/random")
            .then((response) => {
                setData(response.data);
                setError(null);
            })
            .catch((error) => {
                setData(null);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="App" style={{color: color, backgroundColor: color}}>
            <div id="quote-box">
                <div className="quote-text">
                    <i className="fa fa-quote-left"></i>
                    <span id="text"> {data?.quote}</span>
                </div>
                <div className="quote-author">
                    <span id="author">- {data?.character}</span>
                </div>
                <div className="buttons">
                    <div className="socials">
                        <a
                            id="tweet-quote"
                            href={`https://twitter.com/intent/tweet?text=${data?.quote.replace(
                                /\s/g,
                                "%20"
                            )}%0A-%20${data?.character}`}
                            target="_blank"
                            className="social-button"
                            rel="noopener noreferrer"
                            style={{backgroundColor: color}}>
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>
                    <button
                        style={{backgroundColor: color}}
                        id="new-quote"
                        onClick={newQuote}>
                        New quote
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
