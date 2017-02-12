import React, { Component } from 'react'
import { Row, Col, Modal, Input, Icon, message, Form, Button} from 'antd'
const FormItem = Form.Item;


@Form.create({
  onFieldsChange(props, items) {

  },
})
export default class EditUniteNameModal extends Component{
  constructor(props){
		super(props)
	  this.state = {
	    showModal : false,
	  }
	  this.editUniteNameOk = this.editUniteNameOk.bind(this)
	  this.editUniteNameCancle = this.editUniteNameCancle.bind(this)
    this.checkUniteName = this.checkUniteName.bind(this)
  }
  //组件加载完毕
  componentDidMount(){

  }
  //props更新函数
  componentWillReceiveProps(nextProps){
  	if (this.state.showModal !== nextProps.visiable) {
  		this.setState({showModal : nextProps.visiable})
  	}
  }

  checkUniteName(rule, value, callback){
    if(value){
      const { data,uniteObj} = this.props
      if (value.trim() == '') {
        callback("请输入单元名称。")
        return
      }
      if (value === uniteObj.dyjc) {
        callback("请更改单元名称")
        return
      }
      data.forEach(function(uniteObj,index){
        if (value === uniteObj.dyjc) {
          callback("该单元名称已存在,请重新输入")
          return
        }
      })
    }
    callback()
  }

  //弹窗取消
  editUniteNameCancle(){
    this.props.onEditUniteNameCancle()
  }
  //弹窗确认
  editUniteNameOk(){
  	const _self = this
    this.props.form.validateFields((err, values) => {
      if(!err){
        const { uniteObj } = this.props
        const dy = uniteObj.dy
        const dyjc = values["uniteName"]
        const params = { "dy" : dy, "dyjc" : dyjc}
        _self.props.onEditUniteNameOk(params)
      }
    })
  }

  render(){
  	const { getFieldDecorator } = this.props.form
    const { uniteObj } = this.props
  	const formItemLayout = {
  	  labelCol: {span: 6},
      wrapperCol: {span: 14},
  	}
  	return(
  		<div>
	  	  {this.state.showModal? 
		  	  <Modal 
		        className="editRoomInfoModal" 
		        title="修改单元信息" 
		        visible={true}
		        footer = { <div> 
                          <Button type="primary" loading={ this.props.loading } onClick={ this.editUniteNameOk }>确定</Button> 
                          <Button onClick={ this.editUniteNameCancle }>取消</Button> 
                        </div>  
                     }
		      >
		      	<Form horizontal>
		      	  <FormItem
		      	    {...formItemLayout}
		      	    label="单元名称"
		      	    hasFeedback
		      	   >
		      	  {getFieldDecorator('uniteName',{
		      	  	rules: [
                  {required : true, message: "请输入单元名称"},
                  {validator: this.checkUniteName},
                ],
		      	  	initialValue : uniteObj.dyjc,
		      	  })(
		      	  	<Input type="text" />
		      	  )}
		      	  </FormItem>
		      	</Form>
		      </Modal> : null
	  	  }
  	  </div>
  	)
  }
}