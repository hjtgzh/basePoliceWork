import React, { Component } from 'react'
import {Carousel,Modal} from 'antd'
export default class imageView extends Component {
	constructor(props) {
    super(props)
  }
   render(){
    const imgs = this.props.imgs || []
  	return (
      <Modal 
        visible={true} 
        footer='' 
        onCancel={this.props.onCancel}
        className='imageViewModal-lzr'
      >
    	{imgs.length>0?
        <Carousel>
          {imgs.map((arr,i)=><div key={i}><img src={arr.tp ||arr}/></div>)}
    		</Carousel>:null
      }
      </Modal>
  	)
  }
}