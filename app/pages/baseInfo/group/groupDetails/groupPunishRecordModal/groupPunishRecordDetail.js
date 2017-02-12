/**
 * Created by 余金彪 on 2016/12/14.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Input, Button, Modal, message, Form, Select, DatePicker} from 'antd'
import moment from 'moment'
import {
  fetchQueryCfjlDetail,
  fetchDeleteCfjlDetail,
  fetchUpdateCfjlDetail,
} from 'actions/groupPunishRecord'
const FormItem = Form.Item
@connect(
  (state, props) => ({
    config: state.config,
  })
)
class GroupPunishRecordDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onCancel = this.onCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.disabledDate = this.disabledDate.bind(this)
  }

  componentDidMount() {
    if (this.props.detailValue.cfrq != undefined) {
      this.props.detailValue.cfrq = moment(this.props.detailValue.cfrq);
    }
    this.props.form.setFieldsValue(this.props.detailValue)
  }

  //保存检查记录详情
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = {
        ...fieldsValue,
        'cfrq': fieldsValue['cfrq'] ? fieldsValue['cfrq'].format('YYYY-MM-DD HH:mm:ss') : '',
        id: this.props.id,
        dptId: this.props.detId,
      };
      this.props.dispatch(fetchUpdateCfjlDetail({...values}, (result)=> {
        message.success(result.msg)
        this.props.onOk()
      }))
    });
  }

  //选择日期不能大于今天
  disabledDate(value) {
    if (!value) {
      return false
    }
    return value.valueOf() > moment(new Date()).valueOf()
  }

  onCancel() {
    this.props.onCancel()
  }

  footer() {
    return (
      <div>
        <Button type="primary" onClick={this.handleSubmit}>保存修改内容</Button>
        <Button type="" onClick={this.props.onCancel}>取消</Button>
      </div>
    )
  }

  render() {
    const {title = '处罚记录详情 '}=this.props
    const {getFieldDecorator}=this.props.form
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 15},
      hasFeedback: true
    }

    return (
      <div>

        <Modal
          onOk={this.onhandleOk}
          onCancel={this.onCancel}
          className='modal-body modal-header '
          visible={this.props.visible}
          title={title}
          footer={this.footer()}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label='案件记录编号'
              {...formItemLayout}
            >
              {
                getFieldDecorator('ajjlbh', {})(
                  <Input placeholder=""/>
                )
              }
            </FormItem>
            <FormItem
              label='处罚日期'
              {...formItemLayout}
            >
              {
                getFieldDecorator('cfrq', {
                  rules: [
                    {required: true, type: 'object', message: ''},
                  ],
                })(
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    disabledDate={this.disabledDate}
                  />
                )
              }
            </FormItem>
            <FormItem
              label='处罚原因'
              {...formItemLayout}

            >
              {
                getFieldDecorator('cfyy', {})(
                  <Input placeholder=""/>
                )
              }
            </FormItem>

            <FormItem
              label='承办民警'
              {...formItemLayout}
            >
              {
                getFieldDecorator('cbmj', {})(
                  <Input placeholder=""/>
                )
              }
            </FormItem>
            <FormItem
              label='处罚措施'
              {...formItemLayout}
            >
              {
                getFieldDecorator('cfcs', {})(
                  <Input placeholder=""/>
                )
              }
            </FormItem>
            <FormItem
              label='处理内容'
              {...formItemLayout}
            >
              {
                getFieldDecorator('clnr', {})(
                  <Input placeholder="" type='textarea' autosize/>
                )
              }
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default  GroupPunishRecordDetail = Form.create({})(GroupPunishRecordDetail)
