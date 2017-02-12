import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Tabs, Row, Col, Form} from 'antd'
import { ARCHIVES_SUB_MENUS } from 'utils/config'
import LiveAddress from './archivesDetails/liveAddress'
import HistoryInformation from './archivesDetails/historyInformation'
import EmploymentSituation from './archivesDetails/employmentSituation'
import PractitionerHistory from './archivesDetails/practitionerHistory'
import {
  fetchGetRyda,
  fetchPeopleDetail
} from 'actions/people'
const FormItem = Form.Item
const TabPane = Tabs.TabPane
@connect(
  (state, props) => ({
    config: state.config,
    archivesCheckSearchResult: state.archivesCheckSearchResult,
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
class Archives extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSub: 'liveAddress',
      peopleDetail:{},
      addressDetail:[],
      addressHisDetail:[],
      popDetail:[],
      popHisDetail:[],
    }
    this.typeChange = this.typeChange.bind(this)
  }

  componentDidMount() {
    // debugger
    const self = this
    const visitId = this.props.visitId || this.props.params.visitId || 1
    this.props.dispatch(fetchPeopleDetail({ id: visitId},(result)=>{
      switch (result.data.base.xb){
        case 1:
          result.data.base.xb = "男";break;
        case 2:
          result.data.base.xb = "女";break;
        default :
          result.data.base.xb = "";break;
      }
      this.setState({
        peopleDetail:result.data.base
      })
     if(result.data){
       self.props.dispatch(fetchGetRyda({ id:result.data.base.id},(result)=>{
         console.log(result)
         self.setState({
           addressDetail: result.data.links,
           addressHisDetail: result.data.lsrys,
           popDetail: result.data.cyrys,
           popHisDetail: result.data.lscyrys,
         })
       }))
     }
    }))

  }
  _getTabMenus(){
    const CURRENT_SUB_MENU = []
    CURRENT_SUB_MENU.push(ARCHIVES_SUB_MENUS[0])

    CURRENT_SUB_MENU.push(ARCHIVES_SUB_MENUS[1]);
    CURRENT_SUB_MENU.push(ARCHIVES_SUB_MENUS[2]);
    CURRENT_SUB_MENU.push(ARCHIVES_SUB_MENUS[3]);
    return CURRENT_SUB_MENU
  }
  _tabChange = (key) => {
    this.setState({ activeSub: key })
  }

  typeChange(key) {
    this.setState({
      activeTab: key
    })
  }

  handleSelectChange(rule, value, callback) {
    console.log(rule)
  }

  render() {
    const visitId = this.props.visitId || this.props.params.visitId || 1
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 17},
    }
    const infItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 12},
    };
    const {getFieldDecorator}=this.props.form
    const {
      archivesCheckSearchResult,
    } = this.props
    const templateConfig = {
      liveAddress: (<LiveAddress visitId={visitId} addressDetail={this.state.addressDetail } />),
      historyInformation: (<HistoryInformation visitId={visitId} addressHisDetail={this.state.addressHisDetail} />),
      employmentSituation: (<EmploymentSituation visitId={visitId} popDetail={this.state.popDetail} />),
      practitionerHistory: (<PractitionerHistory visitId={visitId}  popHisDetail={this.state.popHisDetail} />),
    }
    return (
      <div className='nav-second-nextContent' style={{marginLeft:'10px',marginTop:'10px'}}>
        <div className='peopleInfo-basic-trf'>
          <div className="basic-trf" style={{width:'100%', paddingRight:'10px'}}>
            <Form>
              <Row gutter={16}>
                <Col span="12">
                  <FormItem {...infItemLayout} label="姓名">
                    <span>{this.state.peopleDetail.xm}</span>
                  </FormItem>
                </Col>
                <Col span="12" className='leftBorder'>
                  <FormItem {...infItemLayout} label="性别">
                    <span>{this.state.peopleDetail.xb}</span>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem {...infItemLayout} label="证件号码">
                    <span>{this.state.peopleDetail.sfzh}</span>
                  </FormItem>
                </Col>
                <Col span="12" className='leftBorder'>
                  <FormItem {...infItemLayout} label="人口类型">
                    <span></span>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem {...infItemLayout} label="户籍详址">
                    <span>{this.state.peopleDetail.hkxz}</span>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        <div className="">
          <Tabs className="right-nav-third " tabPosition="top" onChange={this._tabChange} style={{overflow:'inherit'}}>
            {
              this._getTabMenus().map((sub) => (
                <TabPane tab={sub.name} key={sub.url}/>
              ))
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
export default  Archives = Form.create({})(Archives)
