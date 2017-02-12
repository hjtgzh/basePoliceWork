import React, { Component } from 'react'
import { Form, Input,} from 'antd';
const createForm = Form.create


@Form.create({

})

export default class roleSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.form.setFieldsValue(this.props.defaVal)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <table>
        <thead>
        <tr><th colSpan="4">{this.props.title}</th></tr>
        </thead>
        <tbody>
        <tr>
          <td>单位名称</td>
          <td>
            {getFieldDecorator('dwmc')(<Input disabled />)}
          </td>
          <td>单位地址</td>
          <td>
            {getFieldDecorator('dwdz')(<Input disabled />)}
          </td>
        </tr>
        <tr>
          <td>单位法人</td>
          <td>
            {getFieldDecorator('jyfzr')(<Input disabled />)}
          </td>
          <td>法人联系方式</td>
          <td>
            {getFieldDecorator('lxdh')(<Input disabled />)}
          </td>
        </tr>
        </tbody>
      </table>
    )
  }
}
