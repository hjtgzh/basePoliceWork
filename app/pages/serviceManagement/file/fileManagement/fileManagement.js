import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs,Modal,Popconfirm,message} from 'antd'
import TableList from 'components/tableList/tableList'
import RelateAddrModal from 'components/relateAddrModal/relateAddrModal'
import getConfigItems, {getItemByType}from 'utils/getGformConfigItems'
import {
  fetchFileList,
  fetchInsertDah,
  fetchDeleteDah,

} from 'actions/file'
import Panel from 'components/panel'
import {getAllRetrieval}from 'actions/common'//获取行政区划管辖单位
import Gform from 'components/gForm'
import '../style.css'
const TabPane = Tabs.TabPane;
const gxdwid=sessionStorage.getItem('divisionid')


//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
      fileListSearchResult:state.fileListSearchResult,
      fileExportList:state.fileExportList
    })
)

// 声明组件  并对外输出
export default class fileManagement extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      dah:"",
      bindAddressVisible:false,
      title:"绑定标准地址",
      loading:true
    }
    this.params ={
      gxdwid:gxdwid,
      currentPage : 1,
      pageSize : 10,
      key:"",
      dzsx:"",
      type:""
    }
    this.handleShowBind=this.handleShowBind.bind(this)
    this.handleOkBind=this.handleOkBind.bind(this)
    this.handleCancelBind=this.handleCancelBind.bind(this)
    this.handleDeleteDah=this.handleDeleteDah.bind(this)
    this.exportExcel=this.exportExcel.bind(this)

    this.gFormSubmit=this.gFormSubmit.bind(this)//点击搜索时触发函数
  }

  //数据查询
  getfileData(){
    this.props.dispatch(fetchFileList(this.params,(replay)=>{
      this.setState({loading:false})
    }))
  }
  // 组件已经加载到dom中
  componentDidMount() {
    getConfigItems(this,{
      Gxdw:gxdwid,
    })

  }
 // 表格展示项的配置
  columns() {
    const _self=this
    return[
      {
        title:'序号',
        key:'index',
        width:'5%',
        render:(text, record, index) => <span>{index + 1}</span>,
      },
      {
        title:'档案编号',
        dataIndex:'dah',
        key:'dah',
        width:'15%',
      },
      {
        title:'管辖单位',
        dataIndex:'pcsmc',
        key:'pcsmc',
        width:'10%',
      },{
        title:'参考地址',
        dataIndex:'ckdz',
        key:'ckdz',
        width:'15%',
      },{
        title:'绑定地址',
        dataIndex:'czfwdz',
        key:'czfwdz',
        width:'20%',
      },{
        title:'绑定警员',
        dataIndex:'addusername',
        key:'addusername',
        width:'8%',
      },{
        title:'地址属性',
        dataIndex:'dzsxmc',
        key:'dzsxmc',
        width:'8%',
      },{
        title:'操作',
        dataIndex:'action',
        width:'5%',
        render: function (text, record, index) {
              const objparam={
                type:record.type,
                bldid:record.bldid,
                fjid:record.fjid,
                userid:1

              }
              if(record.type==undefined){
                return (
                  <a onClick={_self.handleShowBind.bind(_self,record.dah)} >绑定</a>
                )
              }else{
                return (
                  <Popconfirm  title="是否解绑" placement="left" onConfirm={_self.handleDeleteDah.bind(_self,objparam)} >
                  <a >解绑</a>
                  </Popconfirm>
                )
              }
            }
      }
    ]
   }

  componentWillMount(){}

  gFormConfig(){
    const { config } = this.props
    return [
      {
        sort: 'superSelect',
        label: '管辖单位',
        items: config.Gxdw,
        key:'gxdw',
        numResKey:'gxdw',
        numReqKey:'gxdwids',
        needNum:false

      },
      {
        sort: 'singleSelect',
        label: '地址状态',
        items: [
          {name:"标准地址",id:1},
          {name:"非标准地址",id:2},
          {name:"虚拟地址",id:3},
          {name:"历史地址",id:4}
        ],
        key:'dzsx',
        needNum:false
      },
      {
        sort: 'superSelect',
        label: '绑定状态',
        items: [
          {name:"已绑定",id:1,pid:"",lv:1},
          {name:"未绑定",id:2,pid:"",lv:1},
          {name:"楼幢",id:3,pid:"1",lv:2},
          {name:"房间",id:4,pid:"1",lv:2},
        ],
        key:'type',
        needNum:false
      }
    ]
  }


  //判断对象是否为空
  isEmptyObj(obj){
    const length=Object.keys(obj).length
    if(length===0){
      return true
    }else{
      return false
    }
  }
  gFormSubmit(query){
    debugger
    this.setState({lading:true})
  if(query.gxdw.length!=0){
      const gxdwIndex=query.gxdw.length-1
      this.params.gxdwid=query.gxdw[gxdwIndex].id
    }else {
    this.params.gxdwid=gxdwid
    }
    if(!this.isEmptyObj(query.dzsx)){
      switch (query.dzsx.name){
        case "标准地址":
          this.params.dzsx=0
          break
        case "非标准地址 ":
          this.params.dzsx=1
          break
        case "虚拟地址":
          this.params.dzsx=3
          break
        case "历史地址":
          this.params.dzsx=5
          break
      }
    }else {
      this.params.dzsx=""
    }
    if(query.type.length!=0){
      const typeIndex=query.type.length-1
      const typeName=query.type[typeIndex].name
      switch (typeName){
        case "已绑定":
          this.params.type=3
          break
        case "未绑定":
          this.params.type=0
          break
        case "楼幢":
          this.params.type=1
          break
        case "房间":
          this.params.type=2
          break

      }
    }else {
      this.params.type=""
    }
    this.params.key=query.keyword
    this.getfileData()
  }


  //解绑
  handleDeleteDah(deleteparam){
    const _self=this
    console.log(deleteparam)
    this.props.dispatch(fetchDeleteDah(deleteparam,(result)=>{
      message.success("解绑成功")
      _self.getfileData()
    }))
  }

 //点击显示弹框的一系列操作
  handleShowBind(onclickParam){
    this.setState({
      dah:onclickParam,
      bindAddressVisible:true
    })
  }

  //点击确定回调函数绑定地址
  handleOkBind(paramObj){
    debugger
    const _self=this
    this.setState({bindAddressVisible:false})
    const postParam={
      bldid:paramObj.buildingcode,
      fjid:paramObj.roomcode,
      dah:this.state.dah,
      userid:1
    }
    this.props.dispatch(fetchInsertDah(postParam,(reply)=>{
      message.success("绑定成功！")
      _self.getfileData()
    }))
  }
 //点击取消或遮罩层回调函数
  handleCancelBind(){
    this.setState({
      bindAddressVisible:false
    })
  }
  //点击导出
  exportExcel(){
    const urlBase= this.props.config.$ctx//当前IP
    const token=sessionStorage.getItem('token')
    const exportObj={...this.params}
    exportObj.currentPage=1
    exportObj.pageSize=5000
    let strArr=[]
    Object.keys(exportObj).map((key,index)=>{
      strArr.push(key+"="+exportObj[key])
    })
    if(this.props.fileListSearchResult.totalCount>5000){
      message.warn("导出数据不能超过5000条")
      return
    }else  if(this.props.fileListSearchResult.totalCount==0){
      message.warn("无数据可导出")
      return
    }else{
      window.open(`${urlBase}/jcjw/dahExpExcel.json?${strArr.join('&')}&token=${token}`)
    }

  }
  pageSizeChange(e,pageSize){//改变每页显示条数回调函数
    this.setState({loading:true})
    this.params.pageSize=pageSize
    this.getfileData()
  }
  pageChange(currentPage){//点击每页返回函数
    this.setState({loading:true})
    this.setState({currentPage:currentPage})
    this.params.currentPage=currentPage
    this.getfileData()
  }
  render() {
    const {
      fileListSearchResult
    }=this.props
    return (
      <div className="nav-second-nextContent">
        <Gform
          gFormConfig={this.gFormConfig()}
          gFormSubmit={this.gFormSubmit}
          nums={{}}
          totalCount={fileListSearchResult.totalCount||0}
          loading={false}
          cacheKey="fileManagement"

        />
        <div className="list-tab">
          <TableList
            columns={this.columns()}
            dataSource={fileListSearchResult.list}
            totalCount={fileListSearchResult.totalCount}
            loading={this.state.loading}
            currentPage={this.params.currentPage}
            pageSize={this.params.pageSize}
            scroll={{x:1000,y: true}}
            onShowSizeChange={this.pageSizeChange.bind(this)}
            onChange={this.pageChange.bind(this)}
          />
        </div>
        <div className="ability-button">
           <Button type="button" onClick={this.exportExcel}>导出</Button>
        </div>
        {
          this.state.bindAddressVisible?
            <RelateAddrModal
              onOk={this.handleOkBind}
              onCancel={this.handleCancelBind}
              title="绑定标准地址"
              visible={true}
            />:null

        }
      </div>
    )
  }
}
