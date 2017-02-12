import React, { Component } from 'react'
import { Button,Table,Popconfirm,Icon} from 'antd';
import  '../../jxy.css'
import TableList from 'components/tableList/tableList'
export default class roleSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
  }

  render() {
    const _self = this
    const {
      dataSource,
      deleteInfo,
      updateBox
    } = this.props

    // 表格展示项的配置
    const columns = [{
      title: '所属品牌公司',
      dataIndex: 'ssppgs',
      key: 'ssppgs',
    }, {
      title: '快件箱地址',
      dataIndex: 'kjxdz',
      key: 'kjxdz',
    }, {
      title: '放置地管理单位',
      dataIndex: 'zcdz',
      key: 'zcdz',
     }, {
      title: '放置地负责人',
      dataIndex: 'fzdfzr',
      key: 'fzdfzr',
    }, {
      title: '放置地负责人联系方式',
      dataIndex: 'fzdfzrlxfs',
      key: 'fzdfzrlxfs',
    }, {
      title: '操作',
      key: 'operate',
      render: (text, record, index) => {
        return(
          <span className="a-jxy">
            <a onClick={updateBox.bind(_self,record.id)}>修改</a>
            <span className="ant-divider"/>
            <Popconfirm title="删除?" placement="left" onConfirm={deleteInfo.bind(_self,record.id)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        )
      },
    }]
    return (
      <div className="intelligentBox">
        <TableList
            columns={columns}
            dataSource={dataSource.list}
            loading={dataSource.loading}
            scroll={{y: 300}}
            bordered
        />
      </div>
    )
  }
}
