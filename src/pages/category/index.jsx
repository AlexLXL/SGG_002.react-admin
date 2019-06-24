import React,{Component} from 'react';
import { Card, Button, Icon, Table } from 'antd';

import {reqCategory} from '../../api'
import MyButton from '../../components/my-button'

export default class Category extends Component{
  state = {
    category: []
  };

  async componentDidMount() {
    const result = await reqCategory('0');
    if(result) {
      this.setState({
        category:result
      })
    }
  }

  render() {
    const columns = [
      {
        title: '品类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: text => <div>
          <MyButton>修改名称</MyButton>
          <MyButton>查看其子品类</MyButton>
        </div>
      },
    ];

    /*const data = [
      {
        key: '1',
        name: 'John Brown',
      },
      {
        key: '2',
        name: 'Jim Green',
      },
      {
        key: '3',
        name: 'Jim Green3',
      },
      {
        key: '4',
        name: 'Jim Green4',
      },
    ];*/

    return <div>
      <Card title="一级分类列表" extra={<Button type="primary"><Icon type="plus" />添加品类</Button>} style={{ width: '100%' }}>
        <Table
          columns={columns}
          dataSource={this.state.category}
          bordered
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['3','6','9'],
            defaultPageSize: 3
          }}
        />
      </Card>
    </div>
  }
}