import React, {Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {Tabs, Row, Col, Button, message, Table, Form, Input, Select, Upload, Spin, DatePicker} from 'antd'
import {PEOPLE_SUB_MENUS} from 'utils/config'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
import {
  fetchGetByBaseId,
  fetchUpdate
} from 'actions/people'
@connect(
  (state, props) => ({
    config: state.config,
    amList: state.amList,
  })
)
class Patrol extends Component {
  constructor(props) {
    super(props)
    this.handlSubmit = this.handlSubmit.bind(this)

  }

  componentDidMount() {
    // debugger
    this.props.dispatch(fetchGetByBaseId({ baseId:this.props.baseid},(result)=>{
      this.props.form.setFieldsValue(result.data)
    }))
  }
  handlSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return
      // Should format date value before submit.
      const values = {
        ...fieldsValue,
        baseId: this.props.baseid
      };
      console.log('Received values of form: ', values);
      this.props.dispatch(fetchUpdate({...values}, (result) => {
        message.success(result.msg)
        this.props.dispatch(fetchGetByBaseId({ baseId:this.props.baseid},(result)=>{
          console.log(result)
          this.props.form.setFieldsValue(result.data)
        }))
      }))
    });
  }

  render() {
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 17},
    }
    const {getFieldDecorator}=this.props.form
    return (
      //巡逻盘查人员
      <div className="detail-content">
        <div className="main" style={{height: '205px'}}>
          <Form>
            <Row gutter={16}>
              <Col span="12">
                <FormItem {...formItemLayout} label="户籍地址">
                  {
                    getFieldDecorator('hjdz', {})(
                      <Input placeholder=""/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="现住地址">
                  {
                    getFieldDecorator('xzdz', {})(
                      <Input placeholder=""/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="职业">
                  {
                    getFieldDecorator('zy', {})(
                      <Input placeholder=""/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="联系方式">
                  {
                    getFieldDecorator('lxfs', {})(
                      <Input placeholder=""/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="服务处所">
                  {
                    getFieldDecorator('fwcs', {})(
                      <Input placeholder=""/>
                    )
                  }
                </FormItem>
              </Col>

            </Row>
          </Form>
        </div>
        <div className="ability-button">
          <Button type="button" onClick={this.handlSubmit}>保存</Button>
        </div>
      </div>
    )
  }
}
export default  Patrol = Form.create({})(Patrol)
