/**
 * Created by Administrator on 2017-1-11.
 */
import React, { Component } from 'react'
import { Pagination  } from 'antd'

export default class pagination extends Component{
  render(){
    const {
      currentPage,
      pageSize,
      totalCount,
      onShowSizeChange,
      onChange,
      }=this.props
    return(
      <Pagination
        total={totalCount}
        showSizeChanger={true} //是否可以改变pageSize
        showQuickJumper={false}//是否可以快速跳转某一页
        onShowSizeChange={onShowSizeChange}
        onChange={onChange}
        showTotal={(totalCount) => `共 ${totalCount} 条`}
        current={currentPage || 1}
        pageSize={pageSize || 10}
      />
    )
  }
}