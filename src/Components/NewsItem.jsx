import React from 'react'

export default function NewsItem(props) {
  return (
    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
      <div className="card h-100 d-flex flex-column">
        <img src={props.pic} height={200} className="card-img-top" alt="..." />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{props.title}</h5>
          <div className='source d-flex justify-content-between text-muted small'>
            <p className='mb-1'>{props.source}</p>
            <p className='mb-1'>{new Date(props.date).toLocaleDateString()}</p>
          </div>
          <p className="card-text">{props.description}</p>
          <div className="mt-auto">
            <a href={props.url} target='_blank' rel='noreferrer' className="btn btn-primary w-100 background">Read Full Article</a>
          </div>
        </div>
      </div>
    </div>
  )
}
