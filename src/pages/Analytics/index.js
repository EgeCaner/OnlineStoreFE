import React, {useEffect, Component} from "react"
import {useParams} from "react-router-dom"
import {
  getOrderDetailsStart,
  getOrderAnalytics,
} from "./../../redux/Orders/orders.actions"
import {useDispatch, useSelector} from "react-redux"
import OrderDetails from "./../../components/OrderDetails/indexadmin"
import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import {store} from "../../redux/createStore"
import {DateRangePicker} from "react-date-range"

import {XYPlot, LineSeries} from "react-vis"

let orderAnalyticsData
let state
let data2
class Analytics extends Component {
  handleSelect(ranges) {
    data2 = store.dispatch(getOrderAnalytics(ranges))

    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  }
  render() {
    state = store.getState()
    while (state.ordersData == undefined) {}

    orderAnalyticsData = state.ordersData.orderAnalytics

    console.log("asdasdas", orderAnalyticsData)
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    }
    const data = orderAnalyticsData.map((item, pos) => {
      return {x: pos, y: item}
    })
    console.log("baris", data)

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
