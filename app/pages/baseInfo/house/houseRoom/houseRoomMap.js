/**
 * Created by Administrator on 2016-12-25.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs ,Icon,Pagination} from 'antd'
//引入地图
import TypeMap from 'components/map/typeMap'
import { getRoomMapPopContent } from 'components/map/mapUtils'
import { fetchMapRoomCount } from 'actions/house'  


//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    fetchMapRoomCountResult: state.houseCheckSearchQuery,
  })
)

// 声明组件  并对外输出
export default class houseAddrTypeList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
     
    }
    //地图处理
    this.buildDataForMap = this.buildDataForMap.bind(this)
    this.setWinContent = this.setWinContent.bind(this)
  }

  //处理地图数据
  buildDataForMap(marktype, data){
    const dataForHtml = []
    const dataForMap = []
    data.map((item,index) =>{
      let id = item.id
      let room = item.fjdm
      let lon = item.jd || ''
      let lat = item.wd || ''
      let num = index + 1
      //处理地图点位信息,确保地图点位坐标存在
      if(lon && lat){
        dataForMap.push({
            id: id, 
            title: item.bzdz || '',
            lon: lon, 
            lat: lat, 
            /*img: "",*/  
            marktype: marktype,  
            content : "",  
            num: num,  
            size: {x: 35, y: 35}, 
            sizeHover: {x: 35,y: 35}, 
        })
      }
      //处理地图左侧列表数据
      dataForHtml.push({
        id: id,  
        content: item.bzdz || '',
        lon: lon, 
        lat: lat, 
        num : num,
        linkTo : `/house$Detail/${id}`,
      })
    })
    return {dataForHtml :dataForHtml, dataForMap: dataForMap}
  }

  //设置地图弹窗内容,obj：点位信息对象，setContent:设置点位窗口文本接口
  setWinContent(obj,setContent){
    this.props.dispatch(fetchMapRoomCount({ roomId:  obj.id},(result)=>{
      const content = getRoomMapPopContent( result.data )
      // debugger
      setContent(content)
    }))
  }


  render(){
    const {
      roomCheckSearchResult,
      loading = false,
      } = this.props
    // console.log(roomCheckSearchResult)
    const marktype = "room"
    const { dataForHtml,dataForMap } = this.buildDataForMap(marktype,roomCheckSearchResult.list)  
    return(
      <TypeMap
        marktype = { marktype }
        dataForHtml = { dataForHtml }
        dataForMap = { dataForMap }
        setWinContent = { this.setWinContent }
        loading={loading}
      />
    )
  }
}