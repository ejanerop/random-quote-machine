import "./App.css";
import axios from "axios";
import {useEffect, useState} from "react";

function App() {
    const [data, setData] = useState(null);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

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

    const newQuote = () => {
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
        <div className="App">
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
                            rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>
                    <button id="new-quote" onClick={newQuote}>
                        New quote
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
