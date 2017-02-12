/**
 * Created by Administrator on 2016-12-25.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs ,Icon,Pagination} from 'antd'
//引入地图
import AmapComponent from 'components/map/amap'
import { getBuildingMapPopContent } from 'components/map/mapUtils'

import {
  fetchHouseCheckList,
  updateHouseCheckListQuery,
  resetHouseCheckListQuery } from 'actions/house'

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    houseCheckSearchQuery: state.houseCheckSearchQuery,
    houseCheckSearchResult: state.houseCheckSearchResult
  })
)

// 声明组件  并对外输出
export default class houseAddrTypeList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }
  getLocation(evt){
    console.log(evt)
  }
  render(){
    const {
      } = this.props

    return(
      <div className="nav-second-nextContent hjt-addressMap">
        <AmapComponent getLocation={this.getLocation}></AmapComponent>
        <div className="ability-button">
          <Button type="" >保存</Button>
          <Button type="" >取消</Button>
        </div>
      </div>   
    )
  }
}

