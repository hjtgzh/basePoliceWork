import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Button,Table} from 'antd'
import Panel from 'components/panel'
import {updateTabList} from 'actions/tabList'
import TableList from 'components/tableList/tableList'
import AddTaskDetail from './modal/addTaskDetail'
import {
  fetchTaskDetail,
  //fetchChildTaskList
} from 'actions/task'
import './style.css'

@connect(
  (state) => ({
    config: state.config,
    taskDetailSearchResult: state.taskDetailSearchResult,
    //childTaskListSearchResult:state.childTaskListSearchResult,
  })
)

export default class taskDetail extends Component{
  constructor(props){
    super(props)
    this.state={
      addTaskDetail:false,
      currentPage:1,
      pageSize:10

    }
    this.handleCancelAddTaskDetail=this.handleCancelAddTaskDetail.bind(this)
    this.handleShowAddTaskDetail=this.handleShowAddTaskDetail.bind(this)
  }

// 组件已经加载到dom中
  componentDidMount() {
    const taskId = this.props.taskId || this.props.params.taskId || 1
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: `任务详情`,
        key: `/task$Detail/${taskId}`,
      }))
    }
    this.props.dispatch(fetchTaskDetail({id:taskId}),(result)=>{
      console.log(result)
    })
  }
  //父级页面传参发生变化时进行比较查询数据
  componentWillReceiveProps(nextProps){
    if(nextProps.params.taskId!=this.props.params.taskId){
      this.props.dispatch(fetchTaskDetail({id:nextProps.params.taskId}),(result)=>{
        console.log(result)
      })
    }
  }
  //列表表头配置
  columns(){
    const _slef=this
    return [
      {
        title:"序号",
        key:"index",
        width:"5%",
        render:function(text, record, index){
          return(
            <span>{index + 1}</span>
          )
        }
      },
      {
        title:"任务名称",
        dataIndex:"taskname",
        key:"taskname",
        width:"15%",
      },
      {
        title:"起始时间",
        dataIndex:"startdate",
        key:"startdate",
        width:"10%",
      },
      {
        title:"结束时间",
        dataIndex:"enddate",
        key:"enddate",
        width:"10%",
      },
      {
        title:"完成情况",
        dataIndex:"isfinish",
        key:"isfinish",
        width:"20%",
      },
      {
        title:"有效性",
        dataIndex:"yxx",
        key:"yxx",
        width:"10%",
      },

    ]
  }
  bottomColumns(){
    const _slef=this
   return[
     {
       title:"序号",
       key:"index",
       width:"5%",
       render:function(text, record, index){
         return(
           <span>{index + 1}</span>
         )
       }
     },{
       title:"任务名称",
       dataIndex:"taskname",
       key:"taskname",
       width:"10%",
     },
     {
       title:"任务对象类型",
       dataIndex:"taskdx",
       key:"taskdx",
       width:"10%",
     },
     {
       title:"对象细分",
       dataIndex:"taskxf",
       key:"taskxf",
       width:"10%",
     },
     {
       title:"考核指标",
       dataIndex:"khzb",
       key:"khzb",
       width:"10%",
     },
     {
       title:"目标值",
       dataIndex:"mb",
       key:"mb",
       width:"10%",
     },
     {
       title:"起始时间",
       dataIndex:"startime",
       key:"startime",
       width:"10%",
     },
     {
       title:"结束时间",
       dataIndex:"endtime",
       key:"endtime",
       width:"10%",
     },
     {
       title:"完成情况",
       dataIndex:"finish",
       key:"finish",
       width:"10%",
     },
     {
       title:"有效性",
       dataIndex:"taskyxx",
       key:"taskyxx",
       width:"5%",
     },
     {
       title:"操作",
       dataIndex:"action",
       key:"action",
       width:"10%",
       render:function(text, record, index){
         return(<a></a>)
       }
     },
   ]
  }

  pageSizeChange(e,pageSize){//改变每页显示条数回调函数
    this.setState({
      pageSize:pageSize
    })
    //this.props.dispatch(fetchPoliceList({ currentPage: 1 ,pageSize: pageSize,gxdwid:330106}))
  }
  pageChange(currentPage) {//点击每页回调函数
    this.setState({
      currentPage: currentPage
    })
    //const  pageSize=this.state.pageSize
    //this.props.dispatch(fetchPoliceList({ currentPage: currentPage ,pageSize: pageSize,gxdwid:330106}))
  }
  handleShowAddTaskDetail(){//点击显示新增任务弹框
    debugger;
    this.setState({
      addTaskDetail:true
    })
  }
  handleCancelAddTaskDetail(){
    this.setState({
      addTaskDetail:false
    })
  }
  render(){
    const {
      taskDetailSearchResult,
      //childTaskListSearchResult
      }=this.props
    return(
      <Panel>
        <div className="" style={{marginTop:"10px"}}>
          <TableList
            columns={this.columns()}
            dataSource={taskDetailSearchResult.data}
            pagination={false}

          />
        </div>
        {/*<div className="taskDetail-info" style={{display:"none"}}>
          <TableList
            columns={this.bottomColumns()}
            dataSource={childTaskListSearchResult.list}
            totalCount={childTaskListSearchResult.count}
            loading={childTaskListSearchResult.loading}
            currentPage={this.state.currentPage}
            pageSize={this.state.pageSize}
            scroll={{y: true}}
            onShowSizeChange={this.pageSizeChange.bind(this)}
            onChange={this.pageChange.bind(this)}
          />
        </div>
        <div className="ability-button" style={{display:"none"}}>
          <Button type="button" onClick={this.handleShowAddTaskDetail}>新增任务</Button>
        </div>*/
        }
        {
          /*this.state.addTaskDetail?
            <AddTaskDetail
              visible={true}
              taskId={this.state.taskId}
              onCancel={this.handleCancelAddTaskDetail}
            />:null*/
        }
      </Panel>
    )
  }
}
