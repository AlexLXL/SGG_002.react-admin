import React,{Component} from 'react';
import { Button, Card, Table, Input, Select, Icon } from 'antd';
import MyButton from '../../../components/my-button'

import { reqProduct, reqSearchProduct } from '../../../api'
import './index.less'

const { Option } = Select;

export default class Index extends Component{
  state = {
    products: [],
    total: '',
    loading: true,
    searchName: 'productName',
    searchContent: '',
    pageNum: 1,
    pageSize: 3,
  };

  componentDidMount() {
    this.getProducts(1, 3);
  }

  getProducts = async (pageNum, pageSize) => {
    this.setState({
      loading: true
    });

    const { searchContent, searchName } = this.state;
    let promise = null;
    if(this.isSearch && searchContent) {
      promise = reqSearchProduct({ searchName, searchContent, pageNum, pageSize });
    }else {
      promise = reqProduct(pageNum, pageSize);
    }
    const result = await promise;
    if(result) {
      this.setState({
        total: result.total,
        products: result.list,
        loading: false,
        pageNum,
        pageSize
      });
    }
  };

  addProduct = () => {
    this.props.history.push('/product/saveupdate')
  };

  modifyProductDetail = (text) => {
    return () => {
      this.props.history.push("/product/saveupdate",text)
    }
  };

  handleChange = (stateKey) => {
    return (e) => {
      let value = '';
      if(stateKey === 'searchName') {
        value = e;
      }else {
        value = e.target.value;
        if(!value) this.isSearch = false;
      }
      this.setState({
        [stateKey]: value
      });
    };
  };

  seachProduct = async () => {
    const { searchName, searchContent, pageNum, pageSize } = this.state;
    const result = await reqSearchProduct({ searchName, searchContent, pageNum, pageSize });
    this.isSearch = true;
    if(result) {
      this.setState({
        products: result.list,
        total: result.total,
        pageNum,
        pageSize,
        loading: false,
      })
    }

  };

  render() {
    const { products, total, loading } = this.state;

    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',

      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: status => {
          return status === 1
            ? <div><Button type="primary">上架</Button>&nbsp;&nbsp;&nbsp;已下架</div>
            : <div><Button type="primary">下架</Button>&nbsp;&nbsp;&nbsp;在售</div>
        }
      },
      {
        title: '操作',
        // dataIndex: 'operator',
        render: text => <div>
          <MyButton>详情</MyButton>
          <MyButton onClick={this.modifyProductDetail(text)}>修改</MyButton>
        </div>,
      },
    ];

    return <div>
      <Card
        title={
          <div>
          <Select defaultValue="productName" style={{ width: 120 }} onChange={this.handleChange('searchName')}>
            <Option key={0} value="productName">根据商品名称</Option>
            <Option key={1} value="productDesc">根据商品描述</Option>
          </Select>
          <Input placeholder="关键字" className="seach-input"  onChange={this.handleChange('searchContent')}/>
          <Button type="primary" onClick={this.seachProduct}>搜索</Button>
        </div>}
        extra={<Button type="primary" onClick={this.addProduct}><Icon type="plus" />添加产品</Button>}
        style={{ width: '100%' }}
      >
        <Table
          columns={columns}
          dataSource={products}
          bordered
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['3','6','9'],
            defaultPageSize: 3,
            total,
            onChange: this.getProducts,
            onShowSizeChange: this.getProducts
          }}
          rowKey="_id"
          loading={loading}
        />
      </Card>
    </div>
  }
}