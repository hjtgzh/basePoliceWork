/**
 * Created by Administrator on 2016/12/27.历史信息
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Tabs,
  Row,
  Col,
  Button,
  Icon,
  Table,
  Form,
} from 'antd'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
import TypeList from '../../../../house/common/typeList'


@connect(
  (state, props) => ({
    config: state.config,

    amList: state.amList,
  })
)
export default class historyInformation extends Component {
  constructor(props){
    super(props)
    this.state={
      list: [

      ]
    }
  }
  // 组件已经加载到dom中
  componentDidMount() {

  }
  // 表格展示项的配置
  columns() {
    return [
      {
        title: '序号',
        key: 'index',
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '现住地址',
        dataIndex: 'xzdz',
        key: 'xzdz',
      },
      {
        title: '人员标签',
        dataIndex: 'peopleState',
        key: 'peopleState',
      },
      {
        title: '居住状态',
        dataIndex: 'liveState',
        key: 'liveState',
      },
      {
        title: '最近访查',
        dataIndex: 'fcsj',
        key: 'fcsj',
      },
      {
        title: '录入人',
        dataIndex: 'cjr',
        key: 'cjr',
      },
      {
        title: '录入单位',
        dataIndex: 'deparment',
        key: 'deparment',
      },
      {
        title: '录入时间',
        dataIndex: 'cjsj',
        key: 'cjsj',
      },
      {
        title: '联系电话',
        key: 'phone',
      },
    ]
  }
  render() {


    return (
      <TypeList
        columns={this.columns()}
        dataSource={this.props.addressHisDetail}
      />
    )
  }
}