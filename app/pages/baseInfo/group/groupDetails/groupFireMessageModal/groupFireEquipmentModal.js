/**
 * Created by 余金彪 on 2016/12/14.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Input, Button, Modal, message, Form} from 'antd'
import {regExpConfig} from 'utils/config'
import {
  fetchSaveXfxxXfqc
} from 'actions/groupFireMessage'
const FormItem = Form.Item
@connect(
  (state, props) => ({
    updateGroupFireEquipment: state.updateGroupFireEquipment
  })
)
class GroupFireEquipmentModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      addressInfo: {},
      searchLoading: false
    }

    this.onCancel = this.onCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onhandleOk = this.onhandleOk.bind(this)
  }

  componentDidMount() {

  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      this.setState({loading: true})
      this.props.dispatch(fetchSaveXfxxXfqc({...values, dptId: this.props.dptId}, (result) => {
        message.success(result.msg)
        this.props.form.resetFields()
        this.props.onOk()
      }))
      this.setState({loading: false})
    });
  }

  onCancel() {
    this.props.onCancel()
    this.props.form.resetFields()
  }

  onhandleOk() {
    this.setState({
      visible: false,
    })
  }

  footer() {
    return (
      <div>
        <Button type="primary" onClick={this.handleSubmit}>确定</Button>
        <Button type="" onClick={this.onCancel}>取消</Button>
      </div>
    )
  }

  render() {
    const {title = '新增消防器材'}=this.props
    const {getFieldDecorator}=this.props.form
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 15},
      hasFeedback: true
    }

    return (
      <Modal
        onOk={this.onhandleOk}
        onCancel={this.onCancel}
        className='modal-body modal-header '
        visible={this.props.visible}
        title={title} footer={this.footer()}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label='灭火器型号'
            {...formItemLayout}
          >
            {
              getFieldDecorator('mhqxh', {
                rules: [
                  {required: true, message: '请输入灭火器型号'},
                  {pattern: regExpConfig.isNumAlpha, message: '请输入正确的灭火器型号'}
                ],
              })(
                <Input placeholder=""/>
              )
            }
          </FormItem>
          <FormItem
            label='灭火器数量'
            {...formItemLayout}
          >
            {
              getFieldDecorator('mhqsl', {
                rules: [
                  {required: true, message: '请输入灭火器数量'},
                  {pattern: regExpConfig.isNumAndThanZero, message: '请输入正确的灭火器数量'}
                ],
              })(
                <Input placeholder=""/>
              )
            }
          </FormItem>
          <FormItem
            label='保存年限'
            {...formItemLayout}

          >
            {
              getFieldDecorator('bcnx', {
                rules: [
                  {pattern: regExpConfig.isNumAndThanZero, message: '格式不正确'}
                ],
              })(
                <Input placeholder=""/>
              )
            }
          </FormItem>

          <FormItem
            label='备注'
            {...formItemLayout}
          >
            {
              getFieldDecorator('bz', {})(
                <Input placeholder="" type='textarea' autosize/>
              )
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default  GroupFireEquipmentModal = Form.create({})(GroupFireEquipmentModal)