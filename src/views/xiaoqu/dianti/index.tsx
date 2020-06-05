import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { STable } from '@/components';
import { getXiaoQubList, del } from '@/api/dianti';
import XiaoQuCreate from './form/create';
import { filterObjectMember, IsNullOrWhiteSpece } from '@/utils/util';
import { getAllXiaoQu } from '@/api/xiaoqu';

@Component({
  name: 'XiaoQuIndex',
  components: {
    STable,
    XiaoQuCreate
  }
})
export default class DianTiIndex extends Vue {
  $refs: {
    table: any,
    create: XiaoQuCreate
  };
  xiaoquList: any[] = [];
  currentXiaoQu: any = '';
  queryParam: any = {};
  selectedRowKeys: any = [];
  columns: any = [
    {
      title: '电梯名称',
      dataIndex: 'name'
    },
    {
      title: '编号',
      dataIndex: 'bian_hao'
    },
    {
      title: '地址',
      dataIndex: 'address'
    },
    {
      title: '状态',
      dataIndex: 'status',
      customRender: this.renderStatus
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      sorter: true
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '150px',
      customRender: this.renderAction
    }
  ];

  searchName = '';

  get XiaoQuList(){
    if (IsNullOrWhiteSpece(this.searchName)) {
      return this.xiaoquList;
    }
    return this.xiaoquList.filter(item => {
      return item.title.indexOf(this.searchName) !== -1;
    });
  }

  get hasSelectXq(){
    return !IsNullOrWhiteSpece(this.currentXiaoQu);
  }

  activated(){
    getAllXiaoQu().then(response => {
      if (response.code === 10000) {
        this.xiaoquList = response.data.map(r => {
          return {
            title: r.name,
            key: r.id
          };
        });
      }
    });
  }

  loadData(parameter){
    if (this.currentXiaoQu) {
      this.queryParam.xiaoqu_id = this.currentXiaoQu;
    } else {
      this.queryParam.xiaoqu_id = '';
    }
    return getXiaoQubList(filterObjectMember(Object.assign(parameter, this.queryParam)))
      .then(res => {
        return res;
      });
  }

  renderStatus(value, row, index){
    return value === 1 ? <a-button type="normal" size="small">正常</a-button> :
      <a-button type="danger" size="small">禁用</a-button>;
  }

  renderAction(value, row, index){
    return <span>
      <a onClick={this.handleEdit.bind(this, row)}>编辑</a>
      <a-divider type="vertical"/>
      <a onClick={this.handleDel.bind(this, row)}>删除</a>
    </span>;
  }

  handleSearch(){
    this.$refs.table.refresh(true);
  }

  handleAdd(){
    this.$refs.create.add(this.currentXiaoQu);
  }

  handleEdit(record){
    this.$refs.create.edit(record);
  }

  handleDel(record){
    this.$confirm({
      title: '确定删除' + record.name + '吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        del(record.id).then((res) => {
          this.toast(res);
          this.handleOk();
        });
      },
      onCancel(){
      }
    });
  }

  resetSearchForm(){
    this.queryParam = {};
    this.handleOk();
  }

  handleMultiDel(){
    this.$confirm({
      title: '确定批量删除吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        del(this.selectedRowKeys.join(',')).then((res) => {
          this.toast(res);
          this.selectedRowKeys = [];
          this.handleOk();
        });
      },
      onCancel(){
      }
    });
  }

  handleOk(){
    this.$refs.table.refresh(true);
  }

  onSelectChange(selectedRowKeys, selectedRows){
    this.selectedRowKeys = selectedRowKeys;
  }

  onCheck(r){
    if (Array.isArray(r) && r.length > 0) {
      this.currentXiaoQu = r[0];
      this.$nextTick(() => {
        this.handleSearch();
      });
    }
  }

  render(){
    return <a-card bordered={false}>
      <a-row type="flex" justify="start">
        <a-col span={6}>
          <div style={{ maxHeight: '600px', borderRight: '1px solid #ddd', paddingRight: '10px', marginRight: '10px' }}>
            <a-input-search style="margin-bottom: 8px" placeholder="输入小区名称进行搜索" vModel={this.searchName}/>
            <a-tree
              show-line
              checkStrictly
              treeData={this.XiaoQuList}
              onSelect={this.onCheck}
            >
            </a-tree>
          </div>
        </a-col>
        <a-col span={18}>
          {this.hasSelectXq &&
          <div>
            <div class="table-page-search-wrapper">
              <a-form layout="inline">
                <a-row gutter={48}>
                  <a-col md={6} sm={24}>
                    <a-input allowClear vModel={this.queryParam.name} placeholder="请输入电梯名称"/>
                  </a-col>
                  <a-col md={6} sm={24}>
                    <a-input allowClear vModel={this.queryParam.bian_hao} placeholder="请输入电梯编码"/>
                  </a-col>
                  <a-col md={6} sm={24}>
                    <a-select allowClear vModel={this.queryParam.status} placeholder="请选择状态" default-value="0">
                      <a-select-option value="1">启用</a-select-option>
                      <a-select-option value="2">禁用</a-select-option>
                    </a-select>
                  </a-col>
                  <a-col md={6} sm={24}>
                    <span class="table-page-search-submitButtons">
                      <a-button icon="search" type="primary" onClick={this.handleSearch}>查询</a-button>
                      <a-button icon="sync" style="margin-left: 8px" onClick={this.resetSearchForm}>重置</a-button>
                    </span>
                  </a-col>
                </a-row>
              </a-form>
            </div>

            <div class="table-operator">
              <a-button type="primary" icon="plus" onClick={this.handleAdd}>新建</a-button>
              {this.selectedRowKeys.length > 0 &&
              <a-dropdown {...{ directives: [{ name: 'action', value: true, modifiers: { edit: true } }] }}>
                <a-menu slot="overlay">
                  <a-menu-item onClick={this.handleMultiDel}>
                    <a-icon type="delete"/>
                    删除
                  </a-menu-item>
                </a-menu>
                <a-button style="margin-left: 8px">
                  批量操作 <a-icon type="down"/>
                </a-button>
              </a-dropdown>
              }
            </div>

            <s-table
              ref="table"
              size="default"
              rowKey="id"
              bordered={true}
              columns={this.columns}
              data={this.loadData}
              rowSelection={{ selectedRowKeys: this.selectedRowKeys, onChange: this.onSelectChange }}
              showPagination="auto">
            </s-table>
          </div>
          }
        </a-col>
      </a-row>

      <XiaoQuCreate ref="create" onOk={this.handleOk}/>
    </a-card>;
  }
}
