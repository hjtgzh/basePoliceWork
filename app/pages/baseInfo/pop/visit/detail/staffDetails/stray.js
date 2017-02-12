import React, {Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {Tabs, Row, Col, Button, message, Table, Form, Input, Select, Upload, Spin, DatePicker} from 'antd'
import {PEOPLE_SUB_MENUS} from 'utils/config'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
const Option = Select.Option;
import {
  fetchGetLlqtryxx,
  fetchSaveLlqtryxx
} from 'actions/people'
@connect(
  (state, props) => ({
    config: state.config,

    amList: state.amList,
  })
)
class Clue extends Component {
  constructor(props) {
    super(props)
  this.handlSubmit = this.handlSubmit.bind(this)
  }

  componentDidMount() {
    // debugger
    this.props.dispatch(fetchGetLlqtryxx({baseid:this.props.baseid},(result)=>{
      console.log(result)
      for (let i in result.data.base) {
        result.data.base[i] = result.data.base[i].toString()
      }
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
        'fxsj': fieldsValue['fxsj'] ? fieldsValue['fxsj'].format('YYYY-MM-DD HH:mm:ss') : '',
        'qlsj': fieldsValue['qlsj'] ? fieldsValue['qlsj'].format('YYYY-MM-DD HH:mm:ss') : '',
        'sbsj': fieldsValue['sbsj'] ? fieldsValue['sbsj'].format('YYYY-MM-DD HH:mm:ss') : '',
        baseid: this.props.baseid
      };
      this.props.dispatch(fetchSaveLlqtryxx({...values}, (result) => {
        message.success(result.msg)
        this.props.dispatch(fetchGetLlqtryxx({baseid:this.props.baseid},(result)=>{
           for (let i in result.data.base) {
           result.data.base[i] = result.data.base[i].toString()
           }
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
      <div className="nav-second-nextContent">
        <div className="detail-content trf-scroll ">
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
                <FormItem {...formItemLayout} label="发现时间">
                  {
                    getFieldDecorator('fxsj', {

                    })(
                      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="人员状况">
                  {
                    getFieldDecorator('ryzk', {})(
                      <Input placeholder=""/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="劝离时间">
                  {
                    getFieldDecorator('qlsj', {})(
                      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                    )
                  }
                </FormItem>
              </Col>

              <Col span="12">
                <FormItem {...formItemLayout} label="乞讨地点">
                  {
                    getFieldDecorator('qtdd', {})(
                      <Input placeholder=""/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="落脚点">
                  {
                    getFieldDecorator('ljd', {})(
                      <Input placeholder=""/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="乞讨方式">
                  {getFieldDecorator('qtfs', {})(
                    <Select>
                      <Option value="00">行走乞讨</Option>
                      <Option value="10">跪地乞讨</Option>
                      <Option value="20">强讨</Option>
                      <Option value="30">携带小孩</Option>
                      <Option value="40">卖艺乞讨</Option>
                      <Option value="50">骗讨</Option>
                      <Option value="60">其他</Option>
                    </Select>
                  )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="人员去向">
                  {getFieldDecorator('ryqx', {})(
                    <Select>
                      <Option value="00">六院</Option>
                      <Option value="10">红卫医院</Option>
                      <Option value="20">四院</Option>
                      <Option value="30">救助站</Option>
                      <Option value="40">安康医院</Option>
                      <Option value="50">七院</Option>
                    </Select>
                  )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="婚姻状况	">
                  {getFieldDecorator('hyzk', {})(
                    <Select>
                      <Option value="10">未婚</Option>
                      <Option value="20">已婚</Option>
                      <Option value="30">离婚</Option>
                      <Option value="40">丧偶</Option>
                      <Option value="90">未说明</Option>
                    </Select>
                  )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="信息来源">
                  {getFieldDecorator('xxly', {})(
                    <Select>
                      <Option value="10">电话举报</Option>
                      <Option value="20">上门举报</Option>
                      <Option value="30">巡查发现</Option>
                    </Select>
                  )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="网上查询">
                  {getFieldDecorator('wscx', {})(
                    <Select>
                      <Option value="10">是</Option>
                      <Option value="20">否</Option>
                    </Select>
                  )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="处理情况">
                  {getFieldDecorator('clqk', {})(
                    <Select>
                      <Option value="10">打击</Option>
                      <Option value="20">护送</Option>
                      <Option value="30">救助</Option>
                      <Option value="40">劝离</Option>
                    </Select>
                  )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="上报时间">
                  {
                    getFieldDecorator('sbsj', {})(
                      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="上报单位">
                  {
                    getFieldDecorator('sbdw', {})(
                      <Input type="text"/>
                    )
                  }
                </FormItem>
              </Col>

              <Col span="12">
                <FormItem {...formItemLayout} label="处理单位">
                  {
                    getFieldDecorator('cldw', {})(
                      <Input type="text"/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="处理人">
                  {
                    getFieldDecorator('clr', {})(
                      <Input type="text"/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="是否老户">
                  {
                    getFieldDecorator('sflh', {})(
                      <Input type="text"/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="幕后操控">
                  {
                    getFieldDecorator('mhck', {})(
                      <Input type="text"/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="与操控人员关系" style={{marginBottom: 0}}>
                  {getFieldDecorator('yckrgx', {})(
                    <Select>
                      <Option value="0">不是</Option>
                      <Option value="1">是</Option>
                    </Select>
                  )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="救助性质">
                  {
                    getFieldDecorator('jzxz', {})(
                      <Input type="text"/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="DNA编号">
                  {
                    getFieldDecorator('dnabh', {})(
                      <Input type="text"/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="备注">
                  {
                    getFieldDecorator('bz', {})(
                      <Input type="text"/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="单位名称">
                  {
                    getFieldDecorator('dwmc', {})(
                      <Input type="text"/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="联系电话">
                  {
                    getFieldDecorator('lxdh', {})(
                      <Input type="text"/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="性别">
                  {
                    getFieldDecorator('xb', {})(
                      <Input type="text"/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="户籍地">
                  {
                    getFieldDecorator('hjd', {})(
                      <Input type="text"/>
                    )
                  }
                </FormItem>
              </Col><Col span="12">
              <FormItem {...formItemLayout} label="出生日期">
                {
                  getFieldDecorator('qsrq', {})(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" disabled/>
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
export default  Clue = Form.create({})(Clue)
