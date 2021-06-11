import React, {useEffect,Component} from "react"
import {useParams} from "react-router-dom"
import {getOrderDetailsStart,getOrderAnalytics} from "./../../redux/Orders/orders.actions"
import {useDispatch, useSelector} from "react-redux"
import OrderDetails from "./../../components/OrderDetails/indexadmin"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { store } from '../../redux/createStore';
import { DateRangePicker } from 'react-date-range';
import {LineChart,XAxis,Tooltip,CartesianGrid,Line} from "recharts";

//import "../../../node_modules/react-vis/dist/style.css"
import {XYPlot, LineSeries} from 'react-vis';
let data2;
let orderAnalyticsData;
let state;
let sad = [1,2300,5666,213,123123]
const mapState = ({ordersData}) => ({
  orderAnalytics: ordersData.orderAnalytics,

})


class Analytics extends Component {
  

  handleSelect(ranges){
    
    data2 = store.dispatch((getOrderAnalytics(ranges)))
    
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  }
  render(){
    state = store.getState()
    while(state.ordersData == undefined){}
    
    orderAnalyticsData = state.ordersData.orderAnalytics
    while(orderAnalyticsData == null){
    this.forceUpdate()
    }
    console.log("asdasdas",orderAnalyticsData);
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }
    const data = orderAnalyticsData
    
    return (
      


      <div>
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={this.handleSelect}
      />
      <XYPlot height={300} width={300}>
          <LineSeries data={data} />
        </XYPlot>
     
    </div>
    )
  }
}
export default Analytics
