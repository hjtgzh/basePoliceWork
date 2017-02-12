import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {
  Form, Select, Button, Upload, Icon, Input, Modal, message
} from 'antd';
import { 
  fetchExportRelyPower,
} from 'actions/rely'

const FormItem = Form.Item;
const Option = Select.Option;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
      exportRelyPowerResult: state.exportRelyPowerResult,
    })   
)
@Form.create({
    onFieldsChange(props, items) {
        // console.log(props)
        // console.log(items)
        // props.cacheSearch(items);
    },
})

export default class TypeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList:[],
      isShowUploadList:true
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.oneSaveRelyPowerForm && this.props.saveRelyPowerForm!==nextProps.saveRelyPowerForm){
      this.props.tabSave()
      this.setState({ 
        fileList:[],
        isShowUploadList:false
      })
    }
  }
  componentDidMount() {
    // console.dir(this.state.list[0])
  }
  handleSubmit(e) {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      // console.log('Submit!!!');
      // console.log(values);//表单获取的所有数据
      // this.props.dispatch(fetchExportRelyPower({file:values.chooseFile,type:1}))
      // this.props.tabSave()
    });

  }
  uploadFile(value){
    const file = value.file
    const url=$GLOBALCONFIG.$ctx+'/jcjw/ykll/insertExcel.json'
    const request=new FormData()
    // request.append('picname',file.name)
    request.append('file',file)
    request.append('type',1)
    request.append('token',sessionStorage.getItem('token'))
    const xhr = new XMLHttpRequest();
    xhr.open('post', url, true)
    xhr.send(request)
    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        message.error('导入依靠力量失败！')
        return console.error("xhr.status",xhr.status)
      }
      if(xhr.status==200){
        message.info('导入依靠力量成功！')
      }
    }
    return {abort:()=>111}
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const self = this
    const {
            saveRelyPower,
            saveRelyPowerForm,
            tabSave,
            exportRelyPowerResult,
            sureImportDetail,
          } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      hasFeedback: true,
    };
    // console.log(sureImportDetail)
    var token = sessionStorage.getItem('token')
    // window.open(`http://10.118.164.206:8080/jcjw/cyry/exportTemplate.json?token=${token}`)
    const uploadProps = {
      name: 'logo',
      action: $GLOBALCONFIG.$ctx+'/jcjw/ykll/insertExcel.json',
      customRequest:this.uploadFile,
      fileList:this.state.fileList,
      beforeUpload(file) {
        const isXLS = file.type === 'application/vnd.ms-excel';
        if(!isXLS){
          message.error('请选择xls格式的文件！')
        }
        return isXLS
      },
      onChange(info){
        const fileArr = info['fileList']
        self.setState({ fileList:fileArr })
      },
      /*onRemove(){
        console.log('移除')
      },*/
      showUploadList:this.state.isShowUploadList
    }
    // console.log(this.state.IDcardDetail)
    return (
      <Form horizontal onSubmit={this.handleSubmit} encType='multipart/form-data'>       
        <FormItem
          {...formItemLayout}
          label="身份证号："
        >
          {
            getFieldDecorator('relyClass',{
              initialValue: '志愿者',
            })(
              <Select>
                <Option value="志愿者">志愿者</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="选择文件："
        >
          {
            getFieldDecorator('chooseFile')(
              // <Input type='file' accept='application/vnd.ms-excel'/>
              <Upload {...uploadProps}>
                <Button>
                  <Icon type='upload' />上传
                </Button>
              </Upload>
            )
          }
        </FormItem>
        {/*<div className="saveRelyPowerWrap">
          <Button onClick={this.handleSubmit.bind(this)} type="primary">保存</Button>  
        </div>*/}
      </Form>
    )
  }
};



