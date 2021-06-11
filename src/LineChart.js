import React, {Component} from "react"
import "./LineChart.css"
class LineChart extends Component {
  render() {
    return (
      <svg>
      </svg>
    );
  }
}
LineChart.defaultProps = {
  data: [],  
  color: '#2196F3',  
  svgHeight: 300,  
  svgWidth: 700
}
export default LineChart;