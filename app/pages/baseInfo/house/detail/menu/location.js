import React, { Component } from 'react'
import { Row, Col, Tabs ,message} from 'antd'
import Map from 'components/map/amap'
import Index from './location/index'
import { connect } from 'react-redux'
import {
  fetchHouseAddressDetail,
  fetchHouseUpdateJwd,
} from 'actions/houseAddressDetail'
import "./loaction.css"
const TabPane = Tabs.TabPane;

@connect(
  (state) => ({
    config: state.config,
    houseAddressDetailSearchResult: state.houseAddressDetailSearchResult,
    houseUpdateJwdResult:state.houseUpdateJwdResult
  })
)

export default class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'map',
     }
     this.typeChange = this.typeChange.bind(this)
     this.saveLocate = this.saveLocate.bind(this)
  }
  componentDidMount() {
    this.props.dispatch(fetchHouseAddressDetail({id:this.props.houseId}))
  }
  componentWillReceiveProps(nextProps){
    if(this.props.houseId!=nextProps.houseId)
      this.props.dispatch(fetchHouseAddressDetail({id:nextProps.houseId}))
  }
  saveLocate(location){
    console.log(location)
    const value={
      id:this.props.houseId,
      jd:location.lon,
      wd:location.lat
    }
    this.props.dispatch(fetchHouseUpdateJwd(value,()=>{
      message.success('保存成功')
    }))
  }

  typeChange(key){
    this.setState({
      activeTab: key
    })
  }

  render() {
    const {houseAddressDetailSearchResult,} =this.props
    const build = houseAddressDetailSearchResult.build || {}
    return (
      <div className="nav-third-nextContent location-line-height">
          <Tabs className="list-map-tabs list-tabs box-right" defaultActiveKey="table" onChange={this.typeChange}>
            <TabPane tab="地图" key="map">
              <Map
                marktype='buildDetail'
                location={{lon:build.jd,lat:build.wd}}
                setLocate={this.saveLocate}
                loading={this.props.houseUpdateJwdResult.loading}
              />
            </TabPane>
            <TabPane tab="地址" key="table">
              <Index houseId={this.props.houseId} deleteTab={this.props.deleteTab} updataHouseName={this.props.updataHouseName}/>
            </TabPane>
          </Tabs>
      </div>
    )
  }
}
