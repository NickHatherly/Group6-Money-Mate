<template>
  <div class="home">
    <h2 class="title tc">Receipt Text Input</h2>
    <a-form
      :form="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      hideRequiredMark
    >
      <a-form-item>
        <template #label>
          <span style="display:inline-block;line-height: 1.3"
            >Organisation/<br />Individual Name</span
          >
        </template>
        <a-input
          v-decorator="[
            'organisation',
            {
              rules: [
                {
                  required: true,
                  message: 'Please Enter Organisation/Individual Name!'
                }
              ]
            }
          ]"
          placeholder="Enter text here"
        />
      </a-form-item>

      <a-form-item label="Date">
        <a-date-picker
          format="DD/MM/yyyy"
          v-decorator="[
            'date',
            { rules: [{ required: true, message: 'Please Enter Day!' }] }
          ]"
        >
        </a-date-picker>
      </a-form-item>

      <a-form-item label="Description">
        <a-input
          v-decorator="[
            'description',
            {
              rules: [{ required: true, message: 'Please Enter Description!' }]
            }
          ]"
          placeholder="Enter text here"
        />
      </a-form-item>
      <a-form-item label="Total Amount" class="clearfix">
        <a-input-number
          :formatter="value => '$' + `${value}`"
          :parser="value => value.replace('$', '')"
          v-decorator="[
            'totalAmount',
            {
              rules: [{ required: true, message: 'Please Enter Total Amount!' }]
            }
          ]"
          style="width: 100%"
          placeholder="Enter text here"
        />
      </a-form-item>

      <div class="type-radio-group">
        <a-radio-group class="tc" style="width: 100%;" v-model="type">
          <a-row>
            <a-col :span="12">
              <a-radio value="Income">
                Income
              </a-radio>
            </a-col>
            <a-col :span="12">
              <a-radio value="Expense">
                Expense
              </a-radio>
            </a-col>
          </a-row>
        </a-radio-group>
      </div>

      <div class="tc">
        <div>
          <a-checkbox v-model="recurring">
            Recurring?
          </a-checkbox>
        </div>
        <a-button
          class="submit-btn"
          type="primary"
          size="large"
          @click="onSubmit"
          >Submit Receipt</a-button
        >
      </div>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      },
      form: this.$form.createForm(this),
      type: "Income",
      recurring: false
    };
  },
  methods: {
    onSubmit() {
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          Object.assign(values, {
            type: this.type,
            recurring: this.recurring,
            date: new Date(values.date).getTime()
          });

          this.$router.push({
            name: "Submit",
            query: values
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.home {
  width: 768px;
  margin: auto;
  padding: 30px;
}

.title {
  font-size: 32px;
  font-weight: bold;
  color: #2d73ed;
  margin-bottom: 30px;
}

.ant-form-item-control {
  height: 50px;
}

.date-title {
  position: absolute;
  top: -50px;
  left: 0;
  right: 0;
  margin: auto;
}

.type-radio-group {
  width: 80%;
  margin: 0 auto 20px;
}

.submit-btn {
  width: 60%;
  margin: 20px auto 0;
}
</style>
<style lang="less">
.home {
  .ant-input,
  .ant-input-number {
    height: 42px;
    line-height: 42px;
  }

  .ant-form-item,
  .ant-form-item-with-help {
    margin-bottom: 30px;
  }

  .date-container {
    .ant-form-item,
    .ant-form-item-with-help {
      margin-bottom: 0px;
    }
  }
}
</style>
