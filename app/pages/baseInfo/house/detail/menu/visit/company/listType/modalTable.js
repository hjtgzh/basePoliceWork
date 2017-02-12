import React, { Component } from 'react'
import { Button, Table } from 'antd'
import { Link } from 'react-router'
import TableList from 'components/tableList/tableList'

export default class TypeList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.transInsert = this.transInsert.bind(this)
  }

  componentDidMount() {
    // debugger
  }

  transInsert(onerecord){
    this.props.onInsert(onerecord)
  }
  render() {
    const _self = this
    const {
      dataSource,
      loading,
      scroll,
      } = this.props

    // 表格展示项的配置
    const columns = [
      {
        title: '机构名称',
        dataIndex: 'dwmc',
        key: 'dwmc',
      }, {
        title: '工商执照',
        dataIndex: 'bz',
        key: 'bz',
      }, {
        title: '注册地址',
        dataIndex: 'zcdz',
        key: 'zcdz',
      }, {
        title: '营业(开设日期)',
        dataIndex: 'yyrq',
        key: 'data',
      }, {
        title: '法人代表',
        dataIndex: 'frdb',
        key: 'frdb',
      }, {
        title: '法人联系电话',
        dataIndex: 'frlxdh',
        key: 'frlxdh',
      }, {
        title: '数据来源	',
        dataIndex: 'SJLY',
        key: 'SJLY',
      }, {
        title: '操作',
        key: 'opreat',
        fixed:'right',
        render: (text, record, index) => (
          <a style={{color:'#108ee9'}} onClick={this.transInsert.bind(this,record)}>调档</a>
        ),
      },
    ]
    return (
      <TableList
        columns={columns}
        dataSource={dataSource}
        scroll={{x:600, y:200 }}
        loading={loading}
      />
    )
  }
}
