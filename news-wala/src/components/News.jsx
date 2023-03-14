import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import "../App.css"
import Spinner from './Spinner'

function News(props) {
    // States initialization
    const [articles, setarticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    // ||----------------||

    // Fetching Data from API
    
    async function getData() {
        setLoading(true)
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=41afed04db1e4af59c52f84e533679dc&page=${page}`
        let data = await fetch(url)
        let parsed = await data.json()
        setarticles(parsed.articles)
        setLoading(false)
        setTotal(parsed.totalResults)
    }
    useEffect(() => {
        getData()
    }, [])
    /////////////////////////
    
    // Next and Previous arrow functions

    const changeNextpage = async () => {
        if (page < Math.ceil(total / 20)) {
            setPage(page + 1)
        }
        setLoading(true)
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=41afed04db1e4af59c52f84e533679dc&page=${page}`
        let data = await fetch(url)
        let parsed = await data.json()
        setarticles(parsed.articles)
        setLoading(false)
    }
    const changePrevpage = async () => {
        if (page > 1) {
            setPage(page - 1)
        }
        setLoading(true)
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=41afed04db1e4af59c52f84e533679dc&page=${page}`
        let data = await fetch(url)
        let parsed = await data.json()
        setarticles(parsed.articles)
        setLoading(false)
    }
    ///////////////////////////////

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // Main JSX for the page
    return (
        <>
            <h1 style={{ display: "block", textAlign: "center", marginBlockStart: "1em" }}>Top Headlines - {capitalizeFirstLetter(props.category)}</h1>
            {loading && <Spinner />}
            <div className="container" style={{ paddingTop: "2rem" }}>
                {articles.map((element) => {
                    return <NewsItem imageUrl={element.urlToImage} title={element.title} description={element.description} url={element.url} />
                })}
            </div>
            {!loading && <div className='container d-flex justify-content-center'>
                <button disabled={page<=1} onClick={changePrevpage} type="button" class="btn btn-dark m-3"><i class="fa-solid fa-arrow-left"></i>  Previous</button>
                <button disabled={page===Math.ceil(total/20)} onClick={changeNextpage} type="button" class="btn btn-dark m-3">Next    <i class="fa-solid fa-arrow-right"></i></button>
            </div>}
        </>
    )
}

export default News