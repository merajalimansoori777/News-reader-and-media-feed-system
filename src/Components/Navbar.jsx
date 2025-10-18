import React, { useState, useEffect } from 'react'; 

import { Link, useNavigate, useSearchParams } from 'react-router-dom'

export default function Navbar() {
  let[q,setQ]= useState("")
  let[search,setSearch] = useState("")
  let[language,setLanguage]= useState("")

  let[searchParams] = useSearchParams()
  let navigate = useNavigate()

  function postSearch(e){
    e.preventDefault()
    navigate(`/?q=${search}&language=${language}`)
    setSearch("")

  }

  useEffect(()=>{
    setQ(searchParams.get("q")??"All")
    setLanguage(searchParams.get("language")??"hi")
  },[searchParams])
  return (
    <nav className="navbar navbar-expand-lg background sticky-top">
  <div className="container-fluid">
    <Link className="navbar-brand text-right" to={`/?q=All&language=${language}`}>Newsapp</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="material-symbols-outlined text-light fs-1">
menu
</span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className={`nav-link text-light ${q === "All" ?'active': ''}`} aria-current="page" href='#'>Home</a>
          {/* <Link className={`nav-link text-light${q === "All"?'active' :''}`} to={`/?q=Politics&language=${language}`} aria-current="page" href="#">Home</Link> */}
        </li>
        <li className="nav-item"><Link className= {`nav-link text-light${q === "Politics"?'active' :''}`} to={`/?q=Politics&language=${language}`}>Politics</Link></li>
        <li className="nav-item"><Link className= {`nav-link text-light${q === "Crime"?'active' :''}`} to={`/?q=Crime&language=${language}`}>Crime</Link></li>
        <li className="nav-item"><Link className= {`nav-link text-light${q === "Education"?'active' :''}`} to={`/?q=Education&language=${language}`}>Education</Link></li>
        <li className="nav-item"><Link className= {`nav-link text-light${q === "Science"?'active' :''}`} to={`/?q=Science&language=${language}`}>Science</Link></li>
        <li className="nav-item"><Link className= {`nav-link text-light${q === "Technology"?'active' :''}`} to={`/?q=Technology&language=${language}`}>Technology</Link></li>
        <li className="nav-item"><Link className= {`nav-link text-light${q === "Sports"?'active' :''}`} to={`/?q=Sports&language=${language}`}>Sports</Link></li>
        <li className="nav-item"><Link className= {`nav-link text-light${q === "Cricket"?'active' :''}`} to={`/?q=Cricket&language=${language}`}>Cricket</Link></li>
        <li className="nav-item dropdown">
          <a className=" nav-link text-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Other
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to={`/?q=Economics&language=${language}`}>Economics</Link></li>
            <li><Link className="dropdown-item" to={`/?q=World&language=${language}`}>World</Link></li>
            <li><Link className="dropdown-item" to={`/?q=India&language=${language}`}>India</Link></li>
            <li><Link className="dropdown-item" to={`/?q=Jokes&language=${language}`}>Jokes</Link></li>
            
          </ul>
        </li>

        <li className="nav-item dropdown">
          <a className=" nav-link text-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Language
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to={`/?q=${q}&language=hi`}>Hindi</Link></li>
            <li><Link className="dropdown-item" to={`/?q=${q}&language=en`}>English</Link></li>
          </ul>
        </li>
        
    
      </ul>
      <form className="d-flex" role="search" onSubmit={postSearch}>
        <input className="form-control me-2" type="search" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-light" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
  )
}
