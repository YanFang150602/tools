

## 方框

```html
<div class="box-cls">
    <div class="box-icon">Local</div>
    <a-row type="flex" justify="start" align="top">
        <a-col>
            <a-form-model-item>
                <a-radio-group
                               v-model="localIP"
                               :options="localOptions[0]"
                               @change="changeRadio"
                               />
            </a-form-model-item>
            <a-form-model-item>
                <a-input
                         size="small"
                         v-model="cVPNCfgFile.localIP"
                         prop="name"
                         style="width:250px;"
                         :disabled="disableLocalIP"
                         />
            </a-form-model-item>
        </a-col>
    </a-row>
</div>
```

```scss
.box-cls {
    min-height: 78px;
    border-radius: 5px;
    border: solid 3px #456880;
    position: relative;
    padding: 10px;
    .box-icon {
      width: 80px;
      height: 21px;
      background-color: #507691;
      border-radius: 5px;
      position: absolute;
      left: 29px;
      top: -12px;
      line-height: 21px;
      text-align: center;
      color: #fff;
    }
  }
```



## 表单

```html
    <a-form-model
      layout="vertical"
      :model="表单数据对象"
      :rules="表单校验对象"
      ref="refObj"
    >
      <a-form-model-item :label="$t('VPNIKEDHGroup')">
        <a-input
          size="small"
          v-model="schedule.name"
          :disabled="schedule.disabled"
        />
      </a-form-model-item>
      <a-form-model-item :label="$t('VPNIKEDHGroup')">
        <a-input size="small" v-model="schedule.description" />
      </a-form-model-item>
      <a-form-model-item label="Tags">
        <a-input size="small" v-model="schedule.tags" />
      </a-form-model-item>
      <a-form-model-item label="Recurrence">
        <a-input size="small" v-model="schedule.recurrence" />
      </a-form-model-item>
    </a-form-model>
```

### 表单+行列+input

```html
    <a-form-model layout="vertical" :model="cVPNCfgFile">
      <a-row type="flex" justify="start" align="middle">
        <a-col>
          <a-form-model-item :label="$t('VPNStrategyName')">
            <a-input
              size="small"
              v-model="cStrategy.name"
              prop="name"
              style="width:250px;"
              :disabled="cStrategy.disabledName"
            />
          </a-form-model-item>
        </a-col>
        <a-col>
          <a-form-model-item :label="$t('VPNStrategyAgreement')">
            <a-input
              size="small"
              v-model="cStrategy.agreement"
              style="width:250px;"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
```

### 表单+行列+select

```html
    <a-form-model layout="vertical" :model="cVPNCfgFile">
      <a-row type="flex" justify="start" align="middle">
        <a-col>
          <a-form-model-item :label="$t('VPNStrategyName')" prop="name">
            <a-select
              v-model="默认展示的内容"
              placeholder="--Select--"
              style="width:250px"
              size="small"
              @change="change"
            >
              <a-select-option
                :value="item.value"
                v-for="(item, index) in optionList"
                :key="index"
              >
                 {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
```



### 校验

```html
<a-form-model :model="cSchedule" :rules="rules" ref="ruleForm">
     <a-form-model-item label="Name" props="name" required>
        <a-input
          size="small"
          v-model="cSchedule.name"
          :disabled="cSchedule.disabled"
        />
      </a-form-model-item>
</a-form-model>
```

```json
rules: {
    name: [
        {
            required: true,
            message: 'Name is required',
            trigger: 'blur'
        }
    ]
}

rules: {
    siteId: [{ validator: this.validateDeviceId, trigger: 'blur' }]
}

validateDeviceId(rule, value, callback) {
    if (!value) {
        callback(new Error('Global Device ID is required'));
    } else {
    	callback();
	}
}
```

```js
this.$refs.win.$refs.ruleForm.validate(valid => {
    if (!valid) {
        isOK = false;
        return false;
    }
});
```

注意：

**:model="cSchedule"最好不要在计算属性里定义！！！**

可能会导致一些异常，如校验、输入等

## tabs

```html
<a-tabs default-active-key="1" @change="callback">
    <a-tab-pane key="1" tab="User Input">

    </a-tab-pane>
    <a-tab-pane key="2" tab="Auto-Generated" force-render>

    </a-tab-pane>
</a-tabs>
```



## 输入框input

```html
<a-input
    size="small"
    v-model="obj"
    style="width:250px;"
/>
```



## 下拉框select

```html
<a-select
  v-model="默认展示的内容"
  placeholder="--Select"
  @change="change"
>
  <a-select-option
    :value="item.value"
    v-for="(item, index) in optionList"
    :key="index"
  >
     {{ item.label }}
  </a-select-option>
</a-select>
```

```html
 <a-select
    label-in-value
    :default-value="{ key: 'lucy' }"
    style="width: 120px"
    @change="handleChange"
  >
    <a-select-option value="jack">
      Jack (100)
    </a-select-option>
    <a-select-option value="lucy">
      Lucy (101)
    </a-select-option>
  </a-select>
```

## 单选radio

```html
<a-radio-group
    v-model="peerFQDNChecked"
    :disabled="disablePeerFQDNRadio"
    :options="peerOptions"
    @change="changeRadio"
/>

peerOptions: [
    {
        label: '本地IP',
        value: '4'
    }
]
```



## 多选

## 弹框背景色

```css
/deep/.ant-modal-content {
  max-height: 325px;
  .ant-modal-header {
    background-color: #e9f4fc;
    .ant-modal-title {
      line-height: 8px;
    }
  }
  .ant-modal-body {
    padding: 3px;
    background-color: #36536b;
  }
  .ant-modal-footer {
    background-color: #e9f4fc;
  }
}
```



## 表格

```html
<v-table
      is-horizontal-resize
      column-width-drag
      :columns="columns"
      :table-data="deviceGroupResult.deviceGroups"
      :select-all="selectALL"
      :select-change="selectChange"
      :select-group-change="selectGroupChange"
      :height="550"
      style="width:100%;"
      isFrozen="true"
      @on-custom-comp="customDGTableFunc"
    ></v-table>
```

### columns

```json
{
    field: 'custom',
    width: 30,
    columnAlign: 'center',
    titleAlign: 'center',
    type: 'selection'
},
{
    field: 'name',
    title: 'Name',
    width: 100,
    columnAlign: 'left',
    isResize: true,
    componentName: 'devicegroups-opration'
},
{
    field: 'organization',
    title: 'Organization',
    width: 50,
    columnAlign: 'left',
    isResize: true
}
```



### 表格单元格操作

```js
Vue.component('schedule-opration', {
  template: `<span>
    <a href="" @click.stop.prevent="update(rowData,index)">{{ rowData.name }}</a>
    </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    update() {
      // 参数根据业务场景随意构造
      let params = { type: 'edit', index: this.index, rowData: this.rowData };
      this.$emit('on-custom-comp', params);
    }
  }
});
```

### 表头点击事件

```js
    titleClick(title) {
        if (/id="ip_plus"/.test(title)) {
          this.peerIPList.push({});
        } else if (/id="ip_minus"/.test(title)) {
          // 删除选中的
          if (this.delPeerIPList.length) {
            this.peerIPList = this.peerIPList.filter(item => {
              let filter = true;
              for (let i = 0; i < this.delPeerIPList.length; i++) {
                if (item['peer-ip'] === this.delPeerIPList[i]) {
                  this.vpnPeerIPPlusOptions({ label: item['peer-ip'] });
                  filter = false;
                  break;
                }
              }
              return filter;
            });
          } else {
            this.$message.info('请至少选中一条记录！');
          }
          this.delPeerIPList = [];
        }
    },
```

### 单元格合并

```js
CellMerge(rowIndex, rowData, field) {
      if (field === 'peer-fqdn') {
        return {
          colSpan: 3,
          rowSpan: 1,
          content: '',
          componentName: 'peerfqdn-opration'
        };
      }
    },
```

### 表格多选

```js
    selectALL(checkdList) {
      this.delPeerFQDNList = [];
      checkdList.forEach(item => {
        this.delPeerFQDNList.push(item['peer']);
      });
    },
    selectChange(checked) {
      this.delPeerFQDNList = [];
      checked.forEach(item => {
        this.delPeerFQDNList.push(item['peer']);
      });
    },
```



## 表格上方功能

```html
<a-row
      class="table-header"
      type="flex"
      justify="space-between"
      align="middle"
    >
      <!--搜索栏-->
      <a-col :style="{ width: 'calc(100%-475px)' }">
        <a-input
          size="small"
          ref="searchInput"
          v-model="keywords"
          placeholder="Search"
          @keyup="search"
        >
          <a-icon slot="prefix" type="search" />
          <a-icon
            @click="keywords = ''"
            v-show="keywords != ''"
            slot="suffix"
            type="close"
          />
        </a-input>
      </a-col>
      <!--表格功能按钮-->
      <a-col>
        <a-row
          :style="{ width: '425px' }"
          type="flex"
          justify="end"
          align="middle"
        >
          <a-col
            :style="{
              fontSize: '18px',
              cursor: 'pointer',
              marginRight: '20px'
            }"
          >
            <a-icon @click="showAddWinModal" type="plus" />
          </a-col>
          <a-col
            :style="{
              fontSize: '18px',
              cursor: 'pointer',
              marginRight: '20px'
            }"
          >
            <a-icon @click="showDelWinModal" type="minus" />
          </a-col>
          <a-col>
            <v-pagination
              size="small"
              :total="totalCount"
              :page-size="pageSize"
              :layout="['prev', 'jumper', 'total', 'next', 'sizer']"
              @page-change="pageChange"
              @page-size-change="pageSizeChange"
            ></v-pagination>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
```



## 行列

```html
// display: felx;
// justify-content: flex-end; 项目位于容器的结尾。justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。
// align-items: center; 使用 align-content 属性对齐交叉轴上的各项（垂直）。
// a-col位于a-row尾部
<a-row type="flex" justify="end" align="middle">
    <a-col>
        
    </a-col>
</a-row>

<a-row type="flex" justify="start" align="top">
    <a-col>
        
    </a-col>
</a-row>
```



## 按钮

```html
<a-button type="primary" shape="circle" icon="search" />
    <a-button type="primary" shape="circle">
      A
    </a-button>
    <a-button type="primary" icon="search">
      Search
    </a-button>
    <a-button shape="circle" icon="search" />
    <a-button icon="search">
      Search
    </a-button>
    <a-button shape="circle" icon="search" />
    <a-button icon="search">
      Search
    </a-button>
    <a-button type="dashed" shape="circle" icon="search" />
    <a-button type="dashed" icon="search">
      Search
    </a-button>
```



## 日期

```html
// size ：small default large
<a-date-picker :size="size" />
<br />
<a-month-picker :size="size" placeholder="Select Month" />
<br />
<a-range-picker :size="size" />
<br />
<a-week-picker :size="size" placeholder="Select Week" />

```

### 默认值

```html
<a-date-picker :default-value="moment('2015-06-06', 'YYYY-MM-DD')" disabled />

import moment from 'moment';
```

```html
<a-date-picker size="small" :showToday="false" :allowClear="false"@change="chageDate" :default-value="rowData['start-date']"/>
```



## 时间

```html
<a-time-picker :default-value="moment('12:08', 'HH:mm')" format="HH:mm" />
```

```html
<a-time-picker :open="open" @openChange="() => {open = true}">
      <a-button slot="addon" slot-scope="panel" size="small" type="primary" @click="()=> {open = false;}">
        Ok {{ panel.prefixCls }}
      </a-button>
</a-time-picker>
```

## 弹框（删除、添加、编辑）

```html
<!-- 组群弹框 -->
    <div>
      <a-modal
        v-model="delWinVisible"
        title="Confirm Decommission"
        width="430px"
      >
        <template slot="footer">
          <a-button
            key="submit"
            type="primary"
            :loading="delLoading"
            @click="delOK"
            >OK</a-button
          >
          <a-button key="back" @click="delCancel">Cancel</a-button>
        </template>
        <span style="color:#fff;margin:12px 0;"
          >Are you sure you want to delete the selected record(s)?</span
        >
      </a-modal>
      <a-modal
        v-model="addOrEditWinVisible"
        :title="title"
        :destroyOnClose="true"
        width="940px"
      >
        <VPNCfgFileAddOrEdit
          ref="vpnCfgFileAddOrEditRef"
          :vpnConfigFile="curEditVPNCfgFile"
          @passChildContent="passChildContent"
        ></VPNCfgFileAddOrEdit>
        <template slot="footer">
          <a-button
            key="submit"
            type="primary"
            :loading="addOrEditLoading"
            @click="addOrEditOK"
            >OK</a-button
          >
          <a-button key="back" @click="addOrEditCancel">Cancel</a-button>
        </template>
      </a-modal>
    </div>
  </div>
```

## Vue模板

```vue
<template>
  <div></div>
</template>
<script>
export default {
  name: 'StrategyAddOrEdit',
  props: ['strategy'],
  data() {
    return {
      cStrategy: {}
    };
  },
  updated() {
    this.$emit('passChildContent', this.cStrategy);
  }
}
</script>
<style lang="scss" scoped></style>
```

## 临时

​             <v-table

​        **is-horizontal-resize**

​        :**columns**="dhColumns"

​        :**table-data**="dhList"

​        :**select-all**="selectALLDH"

​        :**select-change**="selectChangeDH"

​        :**height**="150"

​        **style**="width:250px;"

​        **isFrozen**="true"

​        :**title-click**="dhTitleClick"

​        :**cell-merge**="dhCellMerge"

​        @**on-custom-comp**="customFunc"

​       \></v-table>