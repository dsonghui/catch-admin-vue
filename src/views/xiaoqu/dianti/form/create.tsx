import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { store, update } from '@/api/dianti';
import pick from 'lodash.pick';

@Component({
  name: 'DianTiCreate',
  components: {}
})
export default class DianTiCreate extends Vue {
  props: any;
  $refs: any;

  labelCol: any = {
    xs: { span: 24 },
    sm: { span: 7 }
  };
  wrapperCol: any = {
    xs: { span: 24 },
    sm: { span: 13 }
  };
  visible: boolean = false;
  confirmLoading: boolean = false;
  id: any = null;
  form: any = null;

  required: boolean = true;
  title: string = '录入电梯';
  sort: number = 1;
  status: number = 1;
  xiaoquId: number = null;

  created(){
    this.form = this.$form.createForm(this);
  }

  add(xiaoquId){
    if (xiaoquId) {
      this.xiaoquId = xiaoquId;
      this.visible = true;
    }
  }

  edit(record){
    this.visible = true;
    this.required = false;
    this.id = record.id;
    this.title = '编辑电梯信息';
    this.sort = record.sort;
    this.xiaoquId = record.xiaoqu_id;
    const { form: { setFieldsValue } } = this;
    this.$nextTick(() => {
      setFieldsValue(pick(record, ['name', 'xiaoqu_id', 'bian_hao', 'address', 'sort', 'status']));
    });
  }

  handleSubmit(){
    const { form: { validateFields } } = this;
    validateFields((errors, values) => {
      if (!errors) {
        this.confirmLoading = true;
        if (this.id) {
          update(this.id, values).then((res) => {
            this.refresh(res);
          });
        } else {
          values.xiaoqu_id = this.xiaoquId;
          store(values).then((res) => {
            this.refresh(res);
          });
        }
      }
    });
  }

  failed(errors){
    this.$notification.error({
      description: '',
      message: errors.message,
      duration: 4
    });
    this.handleCancel();
  }

  handleCancel(){
    this.id = null;
    this.visible = false;
    this.required = true;
    this.confirmLoading = false;
    this.form.resetFields();
    this.sort = 1;
    this.status = 1;
  }

  refresh(res){
    this.toast(res);
    this.handleCancel();
    (this.$parent.$parent as any).handleOk();
  }

  onChange(value, node, extra){
  }

  render(){
    return <a-modal
      title={this.title}
      width={640}
      visible={this.visible}
      confirmLoading={this.confirmLoading}
      onOk={this.handleSubmit}
      onCancel={this.handleCancel}
    >
      <a-spin spinning={this.confirmLoading}>
        <a-form form={this.form}>
          <a-form-item
            label="电梯名称"
            type="text"
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
          >
            <a-input allowClear v-decorator={['name', { rules: [{ required: true, min: 2, message: '请输入至少2个字符！' }] }]}/>
          </a-form-item>

          <a-form-item
            label="电梯编号"
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
          >
            <a-input allowClear v-decorator={['bian_hao']}/>
          </a-form-item>

          <a-form-item
            label="地址"
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
          >
            <a-input allowClear v-decorator={['address']}/>
          </a-form-item>
          <a-form-item
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            label="状态"
          >
            <a-radio-group v-decorator={['status', { initialValue: status }, { rules: [{ required: true }] }]}>
              <a-radio value={1}>启用</a-radio>
              <a-radio value={2}>禁用</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            label="排序"
          >
            <a-input-number min={1} v-decorator={['sort', { initialValue: this.sort }]}/>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>;
  }
}
