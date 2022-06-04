
import React from 'react';
import { Spin } from 'antd';

function AppLoader() {
    return (
      <div className='app-loader'>
        <Spin size='large' spinning={true} >
        </Spin>
      </div>
    );
  }
  
  export default AppLoader;
  