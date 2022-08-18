// dom selectors
const quoteContaner = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Get Quote from API
async function getQuote() {
    const url = "https://quote-garden.herokuapp.com/api/v3/quotes/random";
    try {
        loading();
        const response = await fetch(url);
        let data = await response.json();
        data = data.data[0];
        // if quote is too long
        if (data.quoteText.length > 120) {
            quoteText.classList.add("long-quote");
        } else {
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data["quoteText"];
        quoteAuthor.innerText = data["quoteAuthor"];
        done();
    } catch (error) {
        console.log(error);
    }
}

// tweet
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const tweeterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweeterUrl, "_blank");
}

// Show loader and hide content
function loading() {
    console.log("Loading...");
    loader.hidden = false;
    quoteContaner.hidden = true;
}

// hide loader and show content
function done() {
    console.log("done");
    loader.hidden = true;
    quoteContaner.hidden = false;
}

// event handlers
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", getQuote);

// On Load
getQuote();
loading();
