import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Checkbox, Button,Input,Modal,message,AutoComplete,Select} from 'antd';
import {
  fetchBuildingResult,
  fetchRoomResult
} from "actions/people"
import "./style.css"
const createForm = Form.create
const FormItem = Form.Item

const Option=AutoComplete.Option
var searchBuildData ={}
var searchRoomeData={}
var roomeArr=[]
var bzdzArr=[]


@Form.create({
  /*onFieldsChange(props, items) {
   console.log(props)
   console.log(items)
   // props.cacheSearch(items);
   },*/
})

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    searchBuildingResult:state.searchBuildingResult,
    searchRoomResult:state.searchRoomResult

  })

)

export default class bindAddress extends Component{
  constructor(props){
    super(props)
    this.state={
      info:{
        buildingcode:"",
        roomcode:"",
        xzdz:''
      },
      buildingResult:[],
      roomResult:[],
      buildingName:'',
      roomName:'',
      isShowBuildingResult:false,
      isShowRoomResult:false,
      buildingTimer:'',
      roomTimer:''
    }
    this.inputBuilding=this.inputBuilding.bind(this)
    this.inputRoom=this.inputRoom.bind(this)
    this._closeUnderList=this._closeUnderList.bind(this)
    this.handelSubmit=this.handelSubmit.bind(this)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.searchBuildingResult!=this.props.searchBuildingResult){
      if(nextProps.searchBuildingResult.state==1){
        this.setState({isShowBuildingResult:true})
      }
    }
    if(nextProps.searchRoomResult!=this.props.searchRoomResult){
      if(nextProps.searchRoomResult.state==1){
        this.setState({isShowRoomResult:true})
      }
    }
  }

  // 选择地址
  clickBuildingItem(value){
    for (let item in searchBuildData){
      if (searchBuildData[item].bzdz==value){
        this.setState({buildingName:searchBuildData[item].bzdz})
        this.state.info.buildingcode=searchBuildData[item].id
        this.state.info.xzdz=searchBuildData[item].bzdz+this.state.roomName

      }
    }
  }
  // 选择户室
  clickRoomItem(value){
    for(let item in searchRoomeData){
      if (searchRoomeData[item].dzmc==value){
        this.setState({roomName:searchRoomeData[item].dzmc})
        this.state.info.roomcode=searchRoomeData[item].id
        this.state.info.xzdz=this.state.buildingName+searchRoomeData[item].dzmc

      }
    }

  }

  // 输入并查询其匹配的地址
  inputBuilding(value){
     bzdzArr=[]
    const _self=this
    this.setState({buildingName:value})
    if(!value){
      return
    }
    _self.props.dispatch(fetchBuildingResult({ keyword: value },(data)=>{
      if(data.status===1){
        searchBuildData =data.data
        for(let item in data.data){
          bzdzArr.push(data.data[item].bzdz)
        }
        _self.setState({buildingResult:bzdzArr})
      }
    }))

  }
  // 输入并查询其匹配的户室
  inputRoom(value){
    const _self=this
    const bldid=this.state.info.buildingcode
    roomeArr=[]
    if (bldid==""||bldid==undefined){
      message.error("地址不能为空")
    }
    this.setState({roomName:value})
    if(!value){
      return
    }
    _self.props.dispatch(fetchRoomResult({bldid:bldid,fjmc:value},function(data){
      if(data.status===1){
        searchRoomeData=data.data.list
        for(let itme in searchRoomeData){
          roomeArr.push(searchRoomeData[itme].dzmc)
        }
        _self.setState({roomResult:roomeArr})
      }
    }))
  }
  // 关闭模糊查询的下拉栏
  _closeUnderList(){
     this.setState({isShowBuildingResult:false,isShowRoomResult:false})
  }

  //确定提交表单
  handelSubmit(){
    this.props.onOk(this.state.info)
  }

  footer(){
    return(
      <div>
        <Button type="primary" size={'large'} onClick={this.handelSubmit} loading={this.props.btnLoading}>确定</Button>
        <Button size={'large'} onClick={this.props.onCancel}>取消</Button>
      </div>
    )
  }
  render(){
    const formItemLayout={
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    }
    return (
      <Modal
        className='modal-header'
        title={this.props.title||'关联地址'}
        visible={this.props.visible}
        footer={this.footer()}
        onCancel={this.props.onCancel}
      >
        <section style={{height:'100%'}} onClick={this._closeUnderList}>
          <Form horizontal>
            <FormItem
              {...formItemLayout}
              label="地址信息"
              hasFeedback
              style={{position:'relative'}}
            >
              <AutoComplete
                dataSource={this.state.buildingResult}
                onSelect={this.clickBuildingItem.bind(this)}
                style={{width:360}}
                onChange={this.inputBuilding}
                placeholder="请输入地址"
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="户室信息"
              hasFeedback
              style={{position:'relative'}}
            >
              <AutoComplete
                dataSource={this.state.roomResult}
                onSelect={this.clickRoomItem.bind(this)}
                style={{width:360}}
                onChange={this.inputRoom}
                placeholder="请输户室信息"
              />

            </FormItem>
          </Form>
        </section>
      </Modal>

    )
  }
}
