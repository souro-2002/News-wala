import React from 'react'
import no_image from "../no_image.jpg"
function NewsItem(props) {
    return (
        <>
            <div className="card" style={{width: "18rem"}}>
                <img src={!props.imageUrl?no_image:props.imageUrl} className="card-img-top" alt="Access Denied"/>
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">{!props.description?"Click the Link below to know more":props.description}</p>
                        <a target="_blank" href={props.url} className="btn btn-primary">Read More</a>
                    </div>
            </div>
        </>
    )
}

export default NewsItem