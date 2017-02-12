import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Table} from 'antd';
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Input
} from 'antd';
import {DatePicker} from 'antd';


export default class FormDetail extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
  }

  columns() {
    return [{
      title: '有无航空器驾驶执照',
      className: 'column-money',
      dataIndex: 'money',
    }, {
      title: (<Select size="large" defaultValue="" style={{width: 180}}>
        <Select.Option value="jack">有</Select.Option>
        <Select.Option value="lucy">无</Select.Option>
      </Select>),
      dataIndex: 'address',
    }]
  }

  data() {
    return [{
      key: '1',
      money: '姓名',
      address: <Input type="text" autosize={{minRows: 1, maxRows: 6}}/>,
    }, {
      key: '2',
      money: '身份证',
      address: <Input type="text" autosize={{minRows: 1, maxRows: 6}}/>,
    },
      {
        key: '3',
        money: '身份证',
        address: <Input type="text" autosize={{minRows: 1, maxRows: 6}}/>,
      },
      {
        key: '4',
        money: '工作单位',
        address: <Input type="text" autosize={{minRows: 1, maxRows: 6}}/>,
      },
      {
        key: '5',
        money: '联系电话',
        address: <Input type="text" autosize={{minRows: 1, maxRows: 6}}/>,
      }
      , {
        key: '6',
        money: '操作时间',
        address: <DatePicker />,
      },
      {
        key: '8',
        money: '执照号码',
        address: <Input type="text" autosize={{minRows: 1, maxRows: 6}}/>,
      }

    ]
  }

  render() {
    return (
      <Table
        pagination={false}
        columns={this.columns()}
        dataSource={this.data()}
        bordered
      />
    )
  }
}









