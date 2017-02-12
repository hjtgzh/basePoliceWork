/**
 * Created by Administrator on 2016-12-25.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs ,Icon,Pagination} from 'antd'
//引入地图
import TypeMap from 'components/map/typeMap'
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
      currentPage: 1,
      pageSize: 10,
      addNewAddress: false,
      exportData: false,
      //地图模拟列表数据
      list: [
        {
          buildingcode: "354",
          lx: "",
          ly: "30.11302",
          roomcode: "D2810FF79B43412A8BE2",
          roomname: "101室",
          standardaddress: "长沙市望城区东城镇金钩寺村东屋组144号姚菊兵私宅",
          state : "5",
          state_mark : "1",
          uniteshowname : "1单元",
        },
        {
          buildingcode: "918",
          lx: "120.3558",
          ly: "30.51473",
          roomcode: "DB6BBAAC65F140368023",
          roomname: "102室",
          standardaddress: "长沙市望城区东城镇金钩寺村东屋组150号姚兴荣私宅",
          state : "5",
          state_mark : "1",
          uniteshowname : "1单元",
        },
         {
          buildingcode: "B9C2E81C86494013812B",
          lx: "120.81060099601746",
          ly: "30.36573778175354",
          roomcode: "457E86C85A864902887B",
          roomname: "102室",
          standardaddress: "长沙市望城区东城镇大龙村12组105号",
          state : "3",
          state_mark : "1",
          uniteshowname : "1单元",
        },
        {
          buildingcode: "2447",
          lx: "120.75551",
          ly: "30.51539",
          roomcode: "37CE15781232430FAF18",
          roomname: "101室",
          standardaddress: "长沙市望城区东城镇金钩寺村东屋组159号姚喜阶私宅",
          state : "5",
          state_mark : "1",
          uniteshowname : "1单元",
        },
        {
          buildingcode: "3294",
          lx: "120.75804",
          ly: "30.51301",
          roomcode: "93562B465B1445C7AFBE",
          roomname: "103室",
          standardaddress: "长沙市望城区东城镇金钩寺村东屋组143号姚亮芝私宅",
          state : "5",
          state_mark : "1",
          uniteshowname : "2单元",
        },
        {
          buildingcode: "542102",
          lx: "120.69814",
          ly: "30.39733",
          roomcode: "253211BE90514F82979D",
          roomname: "213室",
          standardaddress: "长沙市望城区格塘镇杨家山村立新组74号",
          state : "4",
          state_mark : "1",
          uniteshowname : "2单元",
        },
        {
          buildingcode: "5422102",
          lx: "120.69814",
          ly: "30.39733",
          roomcode: "A04D5DE044CD4C63BFA3",
          roomname: "102室",
          standardaddress: "长沙市望城区东城镇金钩寺村东屋组176号姚寿阶私宅",
          state : "2",
          state_mark : "1",
          uniteshowname : "4单元",
        },
      ],
      //地图地图详情
      detail : {
        fjmc : '',
        pcsmc : "丁字派出所",
        czrkcount : 2,
        zzrkcount : 0,
        jwrycount : 0,
        dwcount : 2,
        zdrycount : 0,
        bz : [],
        gldz : [],
      },
    }
    //地图处理
    this.buildDataForMap = this.buildDataForMap.bind(this)
    this.setWinContent = this.setWinContent.bind(this)

  }

  //处理地图数据
  buildDataForMap(marktype, data = [] ){
    const dataForHtml = []
    const dataForMap = []
    data.map((item,index) =>{
      let id = item.buildingcode
      let lon = item.lx
      let lat = item.ly
      let num = index + 1
      //处理地图点位信息,确保地图点位坐标存在
      if(lon && lat){
        dataForMap.push({
            id: id, //[type:string]点位信息唯一标示，检索地图内容(content) 标示id，必要、唯一性
            title: item.standardaddress,//[type:string]地图弹窗titile内容,必要
            lon: lon, //[type:number]地图经度，必要
            lat: lat, //[type:number]地图纬度，必要
            /*img: "",*/  //[type:string]可以放绝对地址以“http:”形式存放，可缺省为默认值
            marktype: marktype,  //[type:string] 图层唯一标示,这个字段跟infowindow有关系，必要
            content : "",  //[type:string] 弹框的内容，必要
            num: num,  //[type:number] 点位的数字标注, 必要
            size: {x: 35, y: 35}, // [type:json] 图标大小，必要
            sizeHover: {x: 35,y: 35}, //[type:json]鼠标放置到点位上时，图标将要改变的大小，可缺省。
        })
      }
      //处理地图左侧列表数据
      dataForHtml.push({
        id: id,  //点位信息唯一标示，检索地图内容(content) 标示id，与地图id值对应 必要
        content: item.standardaddress,//列表展示内容 必要
        lon: lon, //经度，必要
        lat: lat, //纬度，必要
        num : num,//列表展示索引值,与地图num值对应 必要
        linkTo : `/house$Detail/${item.buildingcode}`,//路由地址 必要
      })
    })
    return {dataForHtml :dataForHtml, dataForMap: dataForMap}
  }

  //设置地图弹窗内容,obj：点位信息对象，setContent:设置点位窗口文本接口
  setWinContent(obj,setContent){
    this.props.dispatch(fetchMapBuildingDetail({ buildingcode:  obj.id},()=>{
      const { fetchMapBuildingDetail } = this.props
      const content = getBuildingMapPopContent( fetchMapBuildingDetail.data )
      setContent(content)
    }))
    //测试代码
    const content = getBuildingMapPopContent( this.state.detail )
    setContent(content)
  }


  render(){
    const {
      houseCheckSearchQuery,
      houseCheckSearchResult,
      hasSubmitBtn,
      hasResetBtn,
      } = this.props
    //模拟地图数据
    const marktype = "building"
    const dataSource = this.state.list
    const { dataForHtml,dataForMap } = this.buildDataForMap(marktype,dataSource)  

    return(
        <TypeMap
          marktype = { marktype }
          dataForHtml = { dataForHtml }
          dataForMap = { dataForMap }
          setWinContent = { this.setWinContent }
        />
    )
  }
  }