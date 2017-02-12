import React, {Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {Tabs, Row, Col, Button, Icon, Table, Form, Input, Select, Upload, Spin, DatePicker} from 'antd'
import {PEOPLE_SUB_MENUS} from 'utils/config'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
import {
  fetchGetDxqzxhdry,
  fetchSaveDxqzxhdry
} from 'actions/people'

@Form.create({
  onFieldsChange(props, items) {
    console.log(props)
    console.log(items)
    // props.cacheSearch(items);
  },
})
@connect(
  (state, props) => ({
    config: state.config,

    amList: state.amList,
  })
)
class Masses extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handSubmit = this.handSubmit.bind(this)

  }

  componentDidMount() {
    // debugger
    this.props.dispatch(fetchGetDxqzxhdry({baseid:this.props.baseid},(result)=>{
      this.props.form.setFieldsValue(result.data)
    }))
  }

  handSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return
      // Should format date value before submit.
      const values = {
        ...fieldsValue,
        baseid: this.props.baseid
      };
      this.props.dispatch(fetchSaveDxqzxhdry({...values}, (result) => {
        message.success(result.msg)
      }))
    });
  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    console.log(name)
    console.log(value)
  }

  render() {
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 17},
    }
    const {getFieldDecorator}=this.props.form
    return (
      //大型群众性活动人员
      <div className="detail-content">
        <div className="main" style={{height:'205px'}}>
        <Form>
          <Row gutter={16}>
            <Col span="12">
              <FormItem {...formItemLayout} label="人员类别">
                {
                  getFieldDecorator('rylb', {})(
                    <Input placeholder=""/>
                  )
                }
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="网名">
                {
                  getFieldDecorator('wm', {})(
                    <Input placeholder=""/>
                  )
                }
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="前科劣迹情况">
                {
                  getFieldDecorator('qkljqk', {})(
                    <Input placeholder=""/>
                  )
                }
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="情况描述">
                {
                  getFieldDecorator('qkms', {})(
                    <Input placeholder=""/>
                  )
                }
              </FormItem>
            </Col>

          </Row>
        </Form>
          </div>
        <div className="ability-button">
          <Button type="button" onClick={this.handSubmit}>保存</Button>
        </div>
      </div>
    )
  }
}
export default  Masses = Form.create({})(Masses)