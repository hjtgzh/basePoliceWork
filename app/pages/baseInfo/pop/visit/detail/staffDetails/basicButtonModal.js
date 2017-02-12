/**
 * Created by Administrator on 2016/11/24.
 */
import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'


import {Form,Button, notification, Modal,Checkbox} from 'antd';
const CheckboxGroup = Checkbox.Group;

import Demo from './basicModal'
import StateBtn from './stateButton'
import {
  fetchUpdateResidentState,
} from 'actions/people'
@connect(
  (state, props) => ({
    config: state.config,
    amList: state.amList,
  })
)
export default class BasicModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      btnArr: [],
    }
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange=this.onChange.bind(this)
  }

  componentDidMount() {

  }
  option(){
    return [
      {label:"流浪乞讨人员",value:"R04"},
      {label:"大型群众性活动人员",value:"R05"},
      {label:"巡逻盘查人员",value:"R06"},
      {label:"涉疆人员",value:"R20"},
      {label:"低慢小持有人",value:"dmxbgy"},
      {label:"信鸽持有人",value:"xgbgy"},
      {label:"烈性犬持有人",value:"lxqbgy"},
      {label:"境外重点关注人员",value:"R22"},
      {label:"其他人员",value:"R19"}
    ]
  }
  onChange(values){
    this.setState({
      btnArr:values
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch(fetchUpdateResidentState({gkzdry: this.state.btnArr.join(";"), id: this.props.baseid}, (result)=> {
      this.props.onCancel()
    }))
  }

  handleCancel() {
    this.props.onCancel()
  }

  footer() {
    return (
      <div>
        <Button type="" onClick={this.handleCancel}>取消</Button>
        <Button type="primary" onClick={this.handleSubmit}>确定</Button>
      </div>
    )
  }

  render() {
    return (
      <Modal title='类别标签' className="modal-body modal-header" visible={this.props.visible} onOk={this.handleOk}
             onCancel={this.handleCancel} footer={this.footer()}>
        <Form horizontal className="CheckboxGroup-cpp">
          <CheckboxGroup options={this.option()} defaultValue={this.props.gkzdry} onChange={this.onChange}/>
        </Form>
      </Modal>

    )
  }
}



  