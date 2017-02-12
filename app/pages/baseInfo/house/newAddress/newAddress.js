import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Table, Spin, Tabs ,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button,message} from 'antd'
import Panel from 'components/panel'
import AddressDetail from './addressDetail/index'
import AddressMap from './addressDetail/addressMap'
import { updateTabList } from 'actions/tabList'
import {
  hashHistory,
} from 'react-router'
//发送数据请求
import {
  fetchAddressSubmitResult
} from 'actions/house'
//引入地图
import AmapComponent from 'components/map/amap'
const TabPane = Tabs.TabPane;
let isSubmit=true
@connect(
  (state, props) => ({
    config: state.config,
  })
)
@Form.create({
  onFieldsChange(props, items) {
    // console.log(props)
    // console.log(items)
    // props.cacheSearch(items);
  },
})
export default class newAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ifSubmit:false,
      passwordDirty: false,
      activeTab: 'list' ,
      longitude:'',
      latitude:'',
      submitData:{},
    }
  }

  componentDidMount() {
    const nameId = this.props.nameId || this.props.params.nameId || 1
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: '新增地址',
        key: '/house$/newAddress',
      }))
    }
  }
  componentWillReceiveProps(nextProps) {

  }

  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  _typeChange(key){
    // console.log(key)
    // key=='map' ? this.setState({ifSubmit:true}):this.setState({ifSubmit:false})
    // this.setState({ activeTab: key })
  }
  getLocation(evt){
    // console.log(evt)
    this.setState({
      longitude:evt.lon,
      latitude:evt.lat,
    })
  }
  getFormData(formData){
    //重新设置state然后可以继续添加新的地址
    this.setState({ifSubmit:false})
    isSubmit=false
    // console.log(formData)
    const self = this
    formData.jd=this.state.longitude
    formData.wd=this.state.latitude
    // console.log(formData)
    // 提交表单数据，发送请求
    this.props.dispatch(fetchAddressSubmitResult({ fjdm:formData.fjdm,pcsdm:formData.pcsdm,qxdm:formData.qxdm,xzjddm:formData.xzjddm,
    cjwhdm:formData.cjwhdm,jlxdm:formData.jlxdm,xqbzwdm:formData.xqbzwdm,xqbzwbcdm:formData.xqbzwbcdm,czmc:formData.czmc,
    mph:formData.mph,sf:formData.sf,cs:formData.cs,lz:formData.lz,bzdz:formData.bzdz,jd:formData.jd,
    wd:formData.wd,bcdz:formData.bcdz,dzlx:formData.dzlx
     },function(res){
      // console.log(res)
      // console.log(res.status)
      if(res.status == 1){
        message.success('新增数据成功！')
        document.querySelector(".ant-tabs-tab-active .anticon-close").click()
        hashHistory.push('/house')
      }
     }))
  }
  formSubmit(){
    this.setState({ifSubmit:true})
    isSubmit=true
  }
  cancleSubmit(){
    document.querySelector(".ant-tabs-tab-active .anticon-close").click()
    hashHistory.push('/house')
  }
  render() {
    return (
      <Panel>
        <Tabs tabPosition="top" onChange={this._typeChange.bind(this)} className="list-tabs">
          <TabPane tab="列表" key="list">
            <AddressDetail getFormData={this.getFormData.bind(this)} isSubmit={isSubmit} ifSubmit={this.state.ifSubmit}/>
          </TabPane>
          <TabPane tab="地图" key="map">
            <div className="nav-second-nextContent hjt-addressMap">
              <AmapComponent getLocation={this.getLocation.bind(this)}></AmapComponent>     
            </div> 
          </TabPane>
        </Tabs>
        <div className="ability-button">
          <Button type="" onClick={this.formSubmit.bind(this)}>保存</Button>
          <Button type="" onClick={this.cancleSubmit.bind(this)}>取消</Button>
        </div>
      </Panel>
    )
  }
}
