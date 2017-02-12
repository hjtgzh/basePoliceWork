import React, { Component } from 'react'
import { Link } from 'react-router'
import { Tabs, Row, Col, Button, Spin } from 'antd'
import { connect } from 'react-redux'
import { fetchVisitContent,fetchVisitBuildingCount, fetchVisitUniteCount } from 'actions/house'
import './visit.css'
const TabPane = Tabs.TabPane

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    fetchVisitConResult : state.fetchVisitConResult,
    fetchBuildingCountResult : state.fetchBuildingCountResult,
    fetchUniteCountResult : state.fetchUniteCountResult,
  })
)

export default class Check extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKey : "-3",
      showCount : false,
      loading : false,
      countLoading : false,
    }
    this.countObj = {}
    this.fwzt = {"1" : {title:"自住",color:"#f5d329"},
                 "2" : {title:"出租",color:"#70bf40"},
                 "3" : {title:"群租",color:"#51a7fa"}, 
                 "4" : {title:"空置",color:"#4d504e"}, 
                 "5" : {title:"单位",color:"#ec5d57"},
                 "6" : {title:"落户待查",color:"#e8c4c2"},
                 "7" : {title:"出租",color:"#7d9e60"},
                 "8" : {title:"宿舍",color:"#b46ae3"},
               }
    this.onChange = this.onChange.bind(this)
    this.showCount = this.showCount.bind(this)
    this.buildCountObj = this.buildCountObj.bind(this)
    this.buildTitle = this.buildTitle.bind(this)
  }
  componentDidMount() {
    this.setState({"loading" : true})
    this.props.dispatch(fetchVisitContent({ "bldid" : this.bldid}))
  }

  //props状态更新回调
  componentWillReceiveProps(nextProps){
    if (this.props.fetchVisitConResult !== nextProps.fetchVisitConResult) {
      this.setState({"loading" : false})
    }else if (this.props.fetchBuildingCountResult !== nextProps.fetchBuildingCountResult) {
      this.setState({"countLoading" : false})
    }else if (this.props.fetchUniteCountResult !== nextProps.fetchUniteCountResult) {
      this.setState({"countLoading" : false})
    }

  }

  onChange(activeKey) {
    this.setState({ activeKey : activeKey,showCount:false });
  }

  showCount(e){
    const bldid = this.bldid
    const dy = this.state.activeKey
    if (!this.state.showCount) {
      this.setState({"countLoading" : true})
      if (dy == "-3") {
        this.props.dispatch(fetchVisitBuildingCount( { "bldid" : bldid},(result) =>{
          this.countObj = {bldid : result.data.ryCount}
          this.setState({countLoading : false,showCount:true})
        }))
      }else{
        this.props.dispatch(fetchVisitUniteCount({ "bldid" : bldid ,"dy" : dy},(result) =>{
          this.countObj = this.buildCountObj(result.data.list)
          this.setState({countLoading : false,showCount:true})
        }))
      }
    }else{
      this.setState({"showCount" : false})
    }
   
  }
  buildCountObj(list){
    const countObj = {}
    list.map((unite,index) =>{
      unite.floors.map((floor,index) =>{
        floor.rooms.map((room,index) =>{
          if (room.fjid) {
             countObj[room.fjid] = room.ryCount
          }
        })
      })
    })
    return countObj
  }

  buildTitle(){
    const titleArr = []
    for(let zt in this.fwzt){
      titleArr.push(
        <div key={zt} className="dot-a">
          <span className="dot" style={{ background : this.fwzt[zt].color }}></span>
          <a>{this.fwzt[zt].title}</a>
        </div>  
      )
    }
    return titleArr
  }

  render() {
    this.bldid =  this.props.houseId || this.props.params.houseId || 1
    const _self = this
    const { fetchVisitConResult } = this.props
    const title = this.buildTitle()
    const content = fetchVisitConResult.list.map(unite => (
      <TabPane tab={unite.dyjc} key={String(unite.dy)} className="unite-content">
        {
          unite.floors.map((floor, index) => (
            (
              <ul className="floor" key={index}>
                {
                  floor.rooms.map((room, index) => (
                    <li className="room-content" key={index}>
                      <Link to={ unite.dy == "-3" ?  `/house$Detail/${_self.bldid}` : `/house$/room/${_self.bldid}/${room.fjid}`}>
                        <span className="room-name" style={{ background : (_self.fwzt[room.state] || {}).color || '' }}>{room.roomname}</span>
                        { _self.state.showCount ?
                          <span className="room-counts">
                          <p>
                            <em>常:&nbsp;{(_self.countObj[room.fjid] || {}).czCount || 0}</em>
                            <em>暂:&nbsp;{(_self.countObj[room.fjid] || {}).zzCount || 0}</em>
                            <em>外:&nbsp;{(_self.countObj[room.fjid] || {}).jwCount || 0}</em>
                            <em className="imp-count">重:&nbsp;{(_self.countObj[room.fjid] || {}).zdCount || 0}</em>
                          </p>
                          <p>
                            <em>总:&nbsp;{(_self.countObj[room.fjid] || {}).jzCount || 0}</em>
                            <em>企:&nbsp;{(_self.countObj[room.fjid] || {}).dpCount || 0}</em>
                            <em>线索:&nbsp;{(_self.countObj[room.fjid] || {}).jsCount || 0}</em>
                          </p>
                          </span> : null
                        }
                      </Link>
                    </li>
                  ))
                }
              </ul>
            )
          ))
        }
      </TabPane>
    ))
    return (
      <div className="visit-content nav-second-nextContent">
        <Spin tip="Loading..." spinning={false}>
          <div className="detail-box">
            <div className="dot-list">
              {title}
            </div>
          </div>
          <Tabs
            className="list-tabs"
            hideAdd={true}
            onChange={this.onChange}
            type="line"
            activeKey={String(this.state.activeKey)}
          >
          {content}
          </Tabs>
          <div className="ability-button floor-ability-button">
            { fetchVisitConResult.list.length ?
              <Button className="btn-left" loading={ this.state.countLoading } onClick={this.showCount}>统计值</Button> : null
            }
          </div>
        </Spin>
      </div>
    )
  }
}
