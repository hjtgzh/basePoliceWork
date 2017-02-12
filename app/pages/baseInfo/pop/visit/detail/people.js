import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Tabs, Row, Col, Button, message, Form} from 'antd'
import {PEOPLE_SUB_MENUS} from 'utils/config'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
import Basic from './staffDetails/basic'
import Stray from './staffDetails/stray'
import Masses from './staffDetails/masses'
import Patrol from './staffDetails/patrol'
import Other from './staffDetails/other'
import Small from './staffDetails/small'
import {
  fetchPeopleDetail,
  fetchGetPicBySfzh,
  fetchGetPicUpload
} from 'actions/people'
import returnIconBy from 'utils/transformToIcon'
@connect(
  (state, props) => ({
    config: state.config,
    peopleDetailResult: state.peopleDetailResult,
    amList: state.amList,
  })
  /*function(state, props){
   console.log(state)
   console.log(props)
   return {
   config: state.config,
   houseCheckSearchQuery: state.houseCheckSearchQuery,
   houseCheckSearchResult: state.houseCheckSearchResult,

   }
   }*/
)
export default class People extends Component {
  constructor(props) {
    super(props)
    const info = [];
    this.state = {
      activeSub: 'basic',
      visitId: this.props.visitId,
      sfzh: '',
      baseid: '',
      stateTabValues: [],
      isUpload:true,
      list:[],
      tpmcSrc:'',
      tpmc:'',
      offline:false,
      isShowPeople:true,
      baseValue:{},
      linkValue:{}
    }
    // this.typeChange = this.typeChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.searchPhoto = this.searchPhoto.bind(this)
    this.getPhoto = this.getPhoto.bind(this)
    this.getBase64 = this.getBase64.bind(this)
    this.searchDetails = this.searchDetails.bind(this)
  }

  componentDidMount() {
    // debugger
   this.searchDetails()
  }

  searchDetails(id){
    const visitId = id||this.props.visitId || this.props.params.visitId || 1
    this.setState({
      visitId:id||this.props.visitId
    })
    this.props.dispatch(fetchPeopleDetail({id: visitId,},
      (result)=> {
        this.setState({
          sfzh: result.data.base.sfzh,
          baseid: result.data.base.id,
          baseValue:result.data.base,
          linkValue:result.data.link
        })
        if(result.data){
          this.props.dispatch(fetchGetPicBySfzh({sfzh: result.data.base.sfzh, baseid: result.data.base.id}, (result)=> {
            this.setState({
              tpmcSrc:result.data.photopath
            })
          }))
        }
      }))
  }

  componentWillReceiveProps(nextProps){
    if(this.props.visitId!=nextProps.visitId){
      this.searchDetails(nextProps.visitId)
    }
  }

  searchPhoto() {
    this.setState({isUpload:false})
    this.props.dispatch(fetchGetPicUpload({baseid: this.state.baseid}, (result)=> {
      console.log(result)
      this.setState({
        tpmcSrc:result.data.photopath
      })
    }))
  }

  getPhoto() {
    this.props.dispatch(fetchGetPicBySfzh({sfzh: this.state.sfzh, baseid: this.state.baseid}, (result)=> {
      console.log(result)
      this.setState({
        tpmcSrc:result.data.photopath
      })
    }))
  }


  _getTabMenus() {
    const CURRENT_SUB_MENU = []
    CURRENT_SUB_MENU.push(PEOPLE_SUB_MENUS[0])
    CURRENT_SUB_MENU.push(PEOPLE_SUB_MENUS[1]);
    CURRENT_SUB_MENU.push(PEOPLE_SUB_MENUS[2]);
    CURRENT_SUB_MENU.push(PEOPLE_SUB_MENUS[3]);
    CURRENT_SUB_MENU.push(PEOPLE_SUB_MENUS[4]);
    CURRENT_SUB_MENU.push(PEOPLE_SUB_MENUS[5]);
    // console.log('CURRENT_SUB_MENU', CURRENT_SUB_MENU)
    return CURRENT_SUB_MENU
  }

  _tabChange = (key) => {
    this.setState({activeSub: key})
  }

  handleSelectChange(rule, value, callback) {
    console.log(rule)
  }

  getBase64(e){
    const self=this
    console.log(e.target.files)
    var file=e.target.files[0]
    const maxSize=2*1024*1024
    var isImg=/image\/*/.test(file.type),
      inSize=file.size<=maxSize
    if(!isImg){
      message.error('请上传图片')
      return
    }
    if(!inSize){
      message.error('图片大小不要大于2M')
      return
    }
    var oReader = new FileReader();
    oReader.onload = function(e){
      const temp={
        tpmcSrc:e.target.result,
        tp:file,
        tpmc:file.name,
        tplx:file.type.replace("image/",""),
        baseid:self.state.baseid
      }
      self.setState(temp,()=> self.uploadPic(temp))
    }
    oReader.readAsDataURL(file);
    e.target.value=''
  }

  uploadPic(value){
    var self=this
    var url=$GLOBALCONFIG.$ctx+'/jcjw/resident/picUpload.json'
    var request=new FormData()
    request.append('tp',value.tp)
    request.append('tpmc',value.tpmc)
    request.append('baseid',value.baseid)
    request.append('tplx',value.tplx)
    request.append('token',sessionStorage.getItem('token'))
    var xhr = new XMLHttpRequest();
    xhr.open('post', url, true)
    // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(request)
    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        return console.error("xhr.status",xhr.status)
      }
      onSuccess(getBody(xhr));
    };
    function getBody(xhr) {
      var text = xhr.responseText || xhr.response;
      if (!text) {
        return text;
      }

      try {
        return JSON.parse(text);
      }catch (e) {
        return text;
      }
    }
    function onSuccess(jsonObj){
      if(jsonObj.status==1){
        message.success('上传成功',3)

      }else{
        message.error('上传失败',3)
      }
    }
    // this.props.dispatch(uploadPic(request,(data)=>{
    //   if(data.status==1){
    //     message.success('上传成功',3)
    //     delete self.state.list[index].offline
    //     self.setState({list:self.state.list})
    //   }
    // }))
  }

  render() {
    const visitId = this.props.visitId || this.props.params.visitId || 1
    const {
      peopleDetailResult,
    } = this.props
    var hjlx = this.state.linkValue.hjlx
    switch (hjlx) {
      case 1:
        hjlx = '常住人口';
        break;
      case 2:
        hjlx = '暂住人口';
        break;
      case 3:
        hjlx = '境外人口';
        break;
      default:
        hjlx = ''
    }
    var sfztry = this.state.baseValue.sfztry
    switch (sfztry) {
      case 0:
        sfztry = '否';
        break;
      case 1:
        sfztry = '是';
        break;
      default:
        sfztry = ''
    }
    var xb = this.state.baseValue.xb
    switch (xb) {
      case 2:
        xb = '女';
        break;
      case 1:
        xb = '男';
        break;
      default:
        xb = ''
    }
    const templateConfig = {
      basic: (<Basic visitId={this.state.visitId} baseid={this.state.baseid} searchDetails={this.searchDetails} />),
      stray: (<Stray visitId={this.state.visitId} baseid={this.state.baseid}/>),
      masses: (<Masses visitId={this.state.visitId} baseid={this.state.baseid}/>),
      patrol: (<Patrol visitId={this.state.visitId} baseid={this.state.baseid}/>),
      other: (<Other visitId={this.state.visitId} baseid={this.state.baseid}/>),
      small: (<Small visitId={this.state.visitId} baseid={this.state.baseid}/>),
    }
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 17},
    }
    const infItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 12},
    };
    return (
      <div className="nav-second-nextContent">
        <div className='peopleInfo-basic-trf'>
          <div className="imgs-trf" >
            <img src={this.state.tpmcSrc} alt={this.state.tpmc} onClick={this.state.isUpload?null:(e)=>{this.refs.fileUpload.click()}} />
            <div className="picBtn">
              <input type='file' style={{display:'none'}} ref='fileUpload' onChange={this.getBase64}/>
              <Button type='button' onClick={this.getPhoto}>调档</Button>
              <Button type='button' className='rightBtn' onClick={this.searchPhoto}>上传</Button>
            </div>
          </div>
          <div className="basic-trf">
            <Form>
              <Row gutter={16}>
                <Col span="12">
                  <FormItem {...infItemLayout} label="姓名">
                    <span>{this.state.baseValue.xm}</span>
                  </FormItem>
                </Col>
                <Col span="12" className='leftBorder'>
                  <FormItem {...infItemLayout} label="性别">
                    <span>{xb}</span>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem {...infItemLayout} label="身份证号码">
                    <span>{this.state.baseValue.sfzh}</span>
                  </FormItem>
                </Col>
                <Col span="12" className='leftBorder'>
                  <FormItem {...infItemLayout} label="户籍类别">
                    <span>{hjlx}</span>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem {...infItemLayout} label="出生日期">
                    <span>{this.state.baseValue.csrq}</span>
                  </FormItem>
                </Col>
                <Col span="12" className='leftBorder'>
                  <FormItem {...infItemLayout} label="民族">
                    <span>{this.state.baseValue.mz}</span>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem {...infItemLayout} label="人员状态">
                    <span>{hjlx}</span>
                  </FormItem>
                </Col>
                <Col span="12" className='leftBorder'>
                  <FormItem {...infItemLayout} label="关注信息">
                    <span></span>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem {...infItemLayout} label="是否在逃">
                    <span>{sfztry}</span>
                  </FormItem>
                </Col>
                <Col span="12" className='leftBorder'>
                  <FormItem {...infItemLayout} label="关注类别">
                    <span>{returnIconBy('people', this.state.baseValue.rygzlb)}</span>
                  </FormItem>
                </Col>
                <Col span="12" className=''>
                  <FormItem {...infItemLayout} label="前科劣迹">
                    <span></span>
                  </FormItem>
                </Col>
                <Col span="12" className='leftBorder'>
                  <FormItem {...infItemLayout} label="暂住地址">
                    <span>{this.state.linkValue.zzdz}</span>
                  </FormItem>
                </Col>
                <Col span="12" className=''>
                  <FormItem {...infItemLayout} label="户籍地址	">
                    <span>{this.state.baseValue.hkxz}</span>
                  </FormItem>
                </Col>
                <Col span="12" className='leftBorder'>
                  <FormItem {...infItemLayout} label="现住地址">
                    <span>{this.state.linkValue.zzdz}</span>
                  </FormItem>
                </Col>
                <Col span="12" style={{borderBottom: 'none'}}>
                  <FormItem {...infItemLayout} label="核录日期">
                    <span>{this.state.linkValue.cjsj}</span>
                  </FormItem>
                </Col>
                <Col span="12" className='leftBorder'>
                  <FormItem {...infItemLayout} label="核录人">
                    <span>{this.state.linkValue.cjr}</span>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        <div className="">
          <Tabs className="right-nav-third" tabPosition="top" onChange={this._tabChange} style={{overflow: 'inherit'}}>
            <TabPane tab="基本信息" key="basic" />
            {
              this._getTabMenus().map((sub) => {
                let rygzlb=peopleDetailResult.base.rygzlb || "";
                return (
                  rygzlb.split(";").map((item)=> {
                    if (sub.name == item) {
                      return (
                        <TabPane tab={sub.name} key={sub.url}/>
                      )
                    }
                  })
                )
              })
            }
          </Tabs>
        </div>
        <div className="tab-main ">
          { templateConfig[this.state.activeSub]}
        </div>
      </div>
    )
  }
}
