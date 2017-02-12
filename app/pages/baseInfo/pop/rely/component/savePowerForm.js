import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {
  Form, Select, Button, Upload, Icon, Input, Modal, message
} from 'antd';
import { 
  fetchRelyList, 
  fetchIDcard,
  fetchRelyPower,
  fetchAddRelyPower,
  // updateIDcardQuery, 
} from 'actions/rely'
import ImportRelyDetail from './importRelyDetail'
const FormItem = Form.Item;
const Option = Select.Option;

let oneSaveRelyPowerForm=true
//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
      // IDcardSearchQuery: state.IDcardSearchQuery,
      relyListSearchResult: state.relyListSearchResult,
      IDcardDetailResult: state.IDcardDetailResult,
      addRelyPowerResult: state.addRelyPowerResult,
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
      value: "",
      relyType: "",
      wrongIDcard: false,
      teamShow: false,
      messengerShow: false,
      cadreShow: false,
      IDcardDetail :{},
      isImportDetail:false,
      saveRelyPowerForm:false,
    }
  }
  componentDidMount() {
    // console.dir(this.state.list[0])
  }

  valueChange(name,evt) {
    // console.log(name)
    // console.log(evt.target.value)
    switch(name){
      case 'IDcard':
        this.setState({IDcard:evt.target.value})
        break
      case 'phoneNumber':
        this.setState({phoneNumber:evt.target.value})
        break
      case 'livePlace':
        this.setState({livePlace:evt.target.value})
        break
      case 'workPlace':
        this.setState({workPlace:evt.target.value})
        break
    }
    this.setState({
      value: evt.target.value,
      // IDcardDetail: '',
      // teamShow: false,
      // messengerShow: false,
      // cadreShow: false,
    })
  }
  //身份证查询
  IDsearch() {
    // console.dir(this.state.value)
    const self = this
    this.props.dispatch(fetchIDcard({"sfzh":this.state.value},function(res){
      console.log(res.data)
      // console.log(self)
      if(res){
        // debugger
        // console.log(res.data)
        if(res.data == ''){
          message.error('请输入正确的身份证号码')
        }
        else{
          self.setState({
            IDcardDetail:res.data,
            teamShow: false,
            messengerShow: false,
            cadreShow: false,
          })
          self.props.form.setFieldsValue({
            ['name']:res.data.xm,
            ['sex']:res.data.xb == 1 ? '男' : '女',
            ['nation']:res.data.mz,
            ['province']:res.data.hksx,
            ['address']:res.data.hkxz,
            ['import']:res.data.sjly,
            ['escape']:res.data.swzt == 0 ? '否' : '是',
            ['escapeTime']:res.data.xmqp,
            ['phoneNumber']:res.data.dhhm,
            ['livePlace']:res.data.dhhm,
            ['workPlace']:res.data.dhhm,
          })
        } 
      }  
    }))
    //对身份证号码进行验证
    /*if(this.props.IDcardDetailResult != ''){
      
    }*/
  }
  relyClass(name,val) {
    console.log(name)
    console.log(val)
    switch(name){
      case 'relyClass':
        this.setState({relyType:val=='志愿者' ? 1 : val=='群防群治' ? 2 : val=='治安信息员' ? 3 : val=='社区（村）干部' ? 4 : 5})
        if(val == '群防群治'){
          this.setState({
            teamShow: true,
            messengerShow: false,
            cadreShow: false
          })
        }
        else if(val == '治安信息员'){
          this.setState({
            teamShow: false,
            messengerShow: true,
            cadreShow: false
          })
        }
        else if(val == '社区（村）干部'){
          this.setState({
            teamShow: false,
            messengerShow: false,
            cadreShow: true
          })
        }
        else{
          this.setState({
            teamShow: false,
            messengerShow: false,
            cadreShow: false
          })
        }
        break
      case 'identity':
        this.setState({identity:val})
    }
    
  }
  //导出模板
  exportTemplate() {
    var token = sessionStorage.getItem('token')
    const urlBase= this.props.config.$ctx//当前IP
    // console.log(urlBase)
    window.open(`${urlBase}/jcjw/template/ykll.xls?token=${token}`)
  }
  //导入依靠力量
  importDetail(){
    this.setState({isImportDetail:true})
    this.props.importDetail()
  }
  saveRelyPower(){
    this.setState({
      saveRelyPowerForm: true,
      isImportDetail:false
    })
    oneSaveRelyPowerForm=true
  }
  tabSave(){
    this.setState({
      saveRelyPowerForm:false
    })
    oneSaveRelyPowerForm=false
  }
  importDetailFooter(){
    return(<Button type="primary" onClick={this.saveRelyPower.bind(this)}>确定</Button>)
  }
  //取消导入
  cancleImportDetail (){
    this.setState({
      isImportDetail: false,
    });
  }
  rightIDcardFooter() {
    return(<Button type="primary" onClick={this.newIDcardOk.bind(this)}>确定</Button>)
  }
  newIDcardOk() {
    this.setState({
      wrongIDcard: false,
    });
  }
  IDCheckName(rule, value, callback) {
    if (value) {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!reg.test(value)) {
        callback("请输入正确身份证号码")
      }
    }
    callback()
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);//表单获取的所有数据
      const submitData={
              residentBaseId:this.state.IDcardDetail.id,
              type:this.state.relyType,
              zzmm:this.state.identity,
              dhhm:this.state.phoneNumber,
              xzdz:this.state.livePlace,
              gzcs:this.state.workPlace,
            }
      console.log(submitData)
      const _self = this
      this.props.dispatch(fetchAddRelyPower(submitData,function(res){
                if(res.status == 1){
                  message.success('新增成功！')
                  _self.props.addPowerSuccess()
                  _self.props.dispatch(fetchRelyList({ currentPage: 1 ,pageSize: 10}))
                  _self.props.form.resetFields()
                }
              }))
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const self = this
    const { 
            IDcardDetailResult, 
            addRelyPowerResult,
            addPowerSuccess,
            relyListSearchResult,
            importDetail
          } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      hasFeedback: true,
    };
    // console.log(this.state.IDcardDetail)
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <Modal visible={this.state.wrongIDcard} title="消息"
            onOk={this.newIDcardOk.bind(this)} footer={this.rightIDcardFooter()}
            className="ifSure"
          >
          <p className="isDelete">请输入正确的身份证号码</p>      
        </Modal>       
        <FormItem
          {...formItemLayout}
          label="身份证号"
        >
          {
            getFieldDecorator('IDcard',{
                rules: [{required: true, message: '请输入身份证号'}, {validator: this.IDCheckName}]
              })(
              <Input id="IDcard" type="text" onChange={this.valueChange.bind(this,'IDcard')} />
            )
          }
          <Button className="IDcardSearch" type="primary" onClick={this.IDsearch.bind(this)}>查询</Button>
        </FormItem> 
        <FormItem
          {...formItemLayout}
          label="依靠类型"
        >
          {
            getFieldDecorator('relyClass',{
                rules: [{required: true, message: '请选择依靠类型'}]
              })(
              <Select onChange={this.relyClass.bind(this,'relyClass')} placeholder="请选择">
                <Option value="志愿者">志愿者</Option>
                <Option value="群防群治">群防群治</Option>   
                <Option value="治安信息员">治安信息员</Option>   
                <Option value="社区（村）干部">社区（村）干部</Option>   
                <Option value="社会知名人士">社会知名人士</Option>   
              </Select>
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="姓名"
        >
          {
            getFieldDecorator('name')(
              <Input disabled />
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="性别"
        >
          {
            getFieldDecorator('sex')(
              <Input disabled />
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="身份证号"
        >
          {
            getFieldDecorator('sex')(
              <Input disabled />
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="民族"
        >
          {
            getFieldDecorator('nation')(
              <Input disabled />
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="户口省县"
        >
          {
            getFieldDecorator('province')(
              <Input disabled />
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="户口详址"
        >
          {
            getFieldDecorator('address')(
              <Input disabled />
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="重点人员类型"
        >
          {
            getFieldDecorator('import')(
              <Input disabled />
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="是否在逃"
        >
          {
            getFieldDecorator('escape')(
              <Input disabled />
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="在逃查询时间"
        >
          {
            getFieldDecorator('escapeTime')(
              <Input disabled />
            )
          }
        </FormItem>

        <div style={{display: this.state.teamShow ? 'block' : 'none'}}>
          <FormItem
            {...formItemLayout}
            label="使用部位"
            required
          >
            {
              getFieldDecorator('useSite',{
                  rules: [{required: this.state.teamShow ? true : false, message: '请选择使用部位'}]
                })(
                <Select placeholder="请选择">
                  <Option value="派出所内部管理">派出所内部管理</Option>
                  <Option value="社会面巡逻">社会面巡逻</Option>   
                  <Option value="专业反扒">专业反扒</Option>   
                  <Option value="流动人口管理">流动人口管理</Option>   
                  <Option value="安全防范宣传">安全防范宣传</Option> 
                  <Option value="纠纷调解">纠纷调解</Option> 
                  <Option value="其他">其他</Option> 
                </Select>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="人员类别"
          >
            {
              getFieldDecorator('peopleClass',{
                  rules: [{required: this.state.teamShow ? true : false, message: '请选择人员类别'}]
                })(
                <Select placeholder="请选择">
                  <Option value="协警">协警</Option>
                  <Option value="特保">特保</Option>   
                  <Option value="文职">文职</Option>   
                  <Option value="协管员">协管员</Option>   
                  <Option value="公安机关管理使用的其他专职巡防">公安机关管理使用的其他专职巡防</Option>
                  <Option value="其他">其他</Option> 
                </Select>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="来源"
          >
            {
              getFieldDecorator('peopleFrom',{
                  rules: [{required: this.state.teamShow ? true : false, message: '请选择人员来源'}]
                })(
                <Select placeholder="请选择">
                  <Option value="市、区两级财政">市、区两级财政</Option>
                  <Option value="区（县、市）">区（县、市）</Option> 
                  <Option value="乡镇（街道）聘用">乡镇（街道）聘用</Option>   
                  <Option value="社区（村）聘用">社区（村）聘用</Option>   
                  <Option value="经济合作社出资">经济合作社出资</Option>
                  <Option value="其他">其他</Option> 
                </Select>
              )
            }
          </FormItem>
        </div>

        <div style={{display: this.state.messengerShow ? 'block' : 'none'}}>
          <FormItem
            {...formItemLayout}
            label="信息员类别"
          >
            {
              getFieldDecorator('messagerClass',{
                  rules: [{required: this.state.messengerShow ? true : false, message: '请选择信息员类别'}]
                })(
                <Select placeholder="请选择">
                  <Option value="楼道（庭院）信息员、社区（村）干部">楼道（庭院）信息员、社区（村）干部</Option>
                  <Option value="小组长">小组长</Option> 
                  <Option value="单位（小区）值守人员">单位（小区）值守人员</Option>   
                  <Option value="特种行业业主从业人员">特种行业业主从业人员</Option>   
                  <Option value="娱乐服务场所业主从业人员">娱乐服务场所业主从业人员</Option>
                  <Option value="治安保卫重点单位业主从业人员">治安保卫重点单位业主从业人员</Option>
                </Select>
              )
            }
          </FormItem>
        </div>

        <div style={{display: this.state.cadreShow ? 'block' : 'none'}}>
          <FormItem
            {...formItemLayout}
            label="职务"
          >
            {
              getFieldDecorator('post',{
                  rules: [{required: this.state.cadreShow ? true : false, message: '请选择职务'}]
                })(
                <Select placeholder="请选择">
                  <Option value="社区（村）书记">社区（村）书记</Option>
                  <Option value="社区（村）主任">社区（村）主任</Option>
                  <Option value="社区（村）治保干部">社区（村）治保干部</Option>
                  <Option value="社区其他工作人员">社区其他工作人员</Option>
                </Select>
              )
            }
          </FormItem>
        </div>

        <FormItem
          {...formItemLayout}
          label="政治面貌"
        >
          {
            getFieldDecorator('identity')(
              <Select onChange={this.relyClass.bind(this,'identity')} placeholder="请选择">
                <Option value="中国共产党员">中国共产党员</Option>
                <Option value="中国共产党预备员">中国共产党预备员</Option>
                <Option value="中国共产主义青年团">中国共产主义青年团</Option>
                <Option value="中国革命委员会委员">中国革命委员会委员</Option>
                <Option value="中国民主同盟盟员">中国民主同盟盟员</Option>
                <Option value="中国民主建国会会员">中国民主建国会会员</Option>
                <Option value="中国民主促进会会员">中国民主促进会会员</Option>
                <Option value="中国农工民主党党员">中国农工民主党党员</Option>
                <Option value="中国致公党党员">中国致公党党员</Option>
                <Option value="九三学社社员">九三学社社员</Option>
                <Option value="台湾民主自治同盟盟员">台湾民主自治同盟盟员</Option>
                <Option value="无党派民主人士">无党派民主人士</Option>
                <Option value="群众">群众</Option>
                <Option value="民主党派">民主党派</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="电话号码"
        >
          {
            getFieldDecorator('phoneNumber')(
              <Input onChange={this.valueChange.bind(this,'phoneNumber')} placeholder='请输入'/>
            )
          }
        </FormItem><FormItem
          {...formItemLayout}
          label="现住地址"
        >
          {
            getFieldDecorator('livePlace')(
              <Input onChange={this.valueChange.bind(this,'livePlace')} placeholder='请输入' />
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="工作单位"
        >
          {
            getFieldDecorator('workPlace')(
              <Input onChange={this.valueChange.bind(this,'workPlace')} placeholder='请输入' />
            )
          }
        </FormItem>
        <div className="uploadWrap">
          {/*<Upload name="logo" action="/jcjw/ykll/insertExcel"  listType="text" onChange={this.handleUpload}>
            <Button type="primary" className="upload">
              <Icon type="upload" /> 导入
            </Button>
          </Upload>*/}
          <Button type="primary" className="upload" onClick={this.importDetail.bind(this)}>导入</Button>
          <Modal visible={this.state.isImportDetail} footer={this.importDetailFooter()}
                 onCancel={this.cancleImportDetail.bind(this)} title='导入依靠力量人员'
                 className="modal-header modal-body hjt-importDetailM"
          >
            <ImportRelyDetail oneSaveRelyPowerForm={oneSaveRelyPowerForm} saveRelyPowerForm={this.state.saveRelyPowerForm} tabSave={this.tabSave.bind(this)}/>
          </Modal>
          <Button type="primary" className="upload" onClick={this.exportTemplate.bind(this)}>导出模板</Button>
          <Button onClick={this.handleSubmit.bind(this)} type="primary" className="saveRelyPowerBt">保存</Button>  
        </div>
      </Form>
    )
  }
};



