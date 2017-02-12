import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input,Checkbox,Button,message} from 'antd';
import { regExpConfig } from 'utils/config'
import {
  fetchGroupControlledKnife,
  fetchUpdateGroupControlledKnife,
} from 'actions/groupControlledKnife'
const FormItem = Form.Item
const createForm = Form.create
const CheckboxGroup = Checkbox.Group;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    groupControlledKnifeResult: state.groupControlledKnifeResult,
  })
)


@Form.create({
  onFieldsChange(props, items) {
  },
})

export default class roleSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value:{},
      qylx:[],
    }
   
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    // this.qyqk = this.state.value.qylx

  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchGroupControlledKnife({dptId:32},()=>{
      this.setState({
        value:this.props.groupControlledKnifeResult,
        qylx:this.props.groupControlledKnifeResult.qylx?this.props.groupControlledKnifeResult.qylx.split(";"):[]
      })
      this.props.form.setFieldsValue(this.props.groupControlledKnifeResult)
    }))
  }

  onChange(checkedValues) {
    this.setState({
      qylx:checkedValues
    })
  }
  handleSubmit() {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        if(errors.lxdh){
          message.error("联系电话格式不对")
        }else if(errors.cyrs){
          message.error("从业人数格式不对")
        }
        console.log('Errors in form!!!');
        return;
      }
      this.props.dispatch(fetchUpdateGroupControlledKnife({
        ...values,
        dptId:32,
        qylx:this.state.qylx.join(";")
      },() =>{
        this.props.dispatch(fetchGroupControlledKnife({dptId:32},()=>{
          this.setState({
            value:this.props.groupControlledKnifeResult,
            qylx:this.props.groupControlledKnifeResult.qylx?this.props.groupControlledKnifeResult.qylx.split(";"):[]
          })
          this.props.form.setFieldsValue(this.props.groupControlledKnifeResult)
        }))
      }))
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const plainOptions = [
      {
        label:'制造',value:'1'
      },
      {
        label:'销售',value:'2'
      },
    ]
    return (
      <div className='nav-second-nextContent '>
        <div className="detail-content group-jxy ">
          <Form>
            <table>
              <tbody>
                <tr>
                  <td>企业类型</td>
                  <td>
                    <CheckboxGroup
                      options={plainOptions}
                      value={this.state.qylx}
                      onChange={this.onChange}
                    />
                  </td>
                  <td>经营地(网)点</td>
                  <td>
                    {getFieldDecorator('jydd')(<Input />)}
                  </td>
                </tr>
                <tr>
                  <td>安全负责人</td>
                  <td>
                    {getFieldDecorator('aqfzr')(<Input  />)}
                  </td>
                  <td>联系电话</td>
                  <td>
                    {getFieldDecorator('lxdh',{
                      rules:[
                        {pattern:regExpConfig.phoneNo}
                      ]
                    })(<Input />)}
                  </td>
                </tr>
                <tr>
                  <td>从业人数</td>
                  <td colSpan="3">
                    {getFieldDecorator('cyrs',{
                      rules:[
                        {pattern:regExpConfig.num}
                      ]
                    })(<Input />)}
                  </td>
                </tr>
                <tr>
                  <td>企业情况</td>
                  <td colSpan="3">
                    {getFieldDecorator('qyqk')(<Input type="textarea"  autosize={true} />)}
                  </td>
                </tr>
              </tbody>
            </table>
          </Form>
        </div>
        <div className="ability-button">
          <Button type="button" onClick={this.handleSubmit}>保存</Button>
        </div>
      </div>
    )
  }
}
