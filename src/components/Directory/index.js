import React from "react"
import {Link} from "react-router-dom"
import "./styles.scss"

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{
            backgroundImage: `url(https://www.techadvisor.com/cmsdata/slideshow/3214618/best_laptops_thumb800.jpg)`,
          }}
        >
          <Link to="/search/0">Shop Laptops</Link>
        </div>
        <div
          className="item"
          style={{
            backgroundImage: `url(https://azcd.harveynorman.com.au/media/wysiwyg/buying-guides/tvs-blue-ray-home-theatre/Samsung-smart-tv.jpg)`,
          }}
        >
          <Link to="/search/1">Shop Televisions</Link>
        </div>
      </div>
    </div>
  )
}

export default Directory
