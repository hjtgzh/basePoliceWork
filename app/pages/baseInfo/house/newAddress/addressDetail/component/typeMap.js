import React, { Component } from 'react'
import { Row, Col, message } from 'antd'
//引入地图
import AmapComponent from 'components/map/amap'
export default class TypeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
     }
  }
  componentDidMount() {
   
  }

  componentWillReceiveProps(nextProps) {

  }
  render() {
    return (
      <div className="detail-content-map hjt-addressMap">
        <AmapComponent></AmapComponent>
      </div>
    )
  }
}
