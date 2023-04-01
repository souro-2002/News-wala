import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import "../App.css"
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingBar from 'react-top-loading-bar'
import Spinner from './Spinner'

function News(props) {
    // States initialization
    const [articles, setarticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [progress, setProgress] = useState(0)
    // ||----------------||

    // Fetching Data from API

    async function getData() {
        setLoading(true)
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=41afed04db1e4af59c52f84e533679dc&page=${page}`
        setProgress(20)
        let data = await fetch(url)
        setProgress(50)
        let parsed = await data.json()
        setarticles(parsed.articles)
        setLoading(false)
        setProgress(86)
        setTotal(parsed.totalResults)
        setProgress(100)
    }
    useEffect(() => {
        getData()
    }, [])
    /////////////////////////

    // Next and Previous arrow functions

    async function fetchData() {
        if (page < Math.floor(total / 20)) {
            setPage(page + 1)
            const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=41afed04db1e4af59c52f84e533679dc&page=${page}`
            setLoading(true)
            let data = await fetch(url)
            let parsed = await data.json()
            setarticles(articles.concat(parsed.articles))
            setTotal(parsed.totalResults)
            setLoading(false)
        }
    }
    ///////////////////////////////

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // Main JSX for the page
    return (
        <>
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <h1 style={{ display: "block", textAlign: "center", marginBlockStart: "1em" }}>Top Headlines - {capitalizeFirstLetter(props.category)}</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchData}
                hasMore={articles.length < total ? true : false}
            >
                <div className="container" style={{ padding: "2rem 0", gap: "1rem 1rem" }}>
                    {articles.map((element) => {
                        return <NewsItem imageUrl={element.urlToImage} title={element.title} description={element.description} url={element.url} />
                    })}
                </div>
            </InfiniteScroll>
        </>
    )
}

export default News