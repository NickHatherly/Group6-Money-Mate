<template>
  <div class="home">
    <h2 class="title tc">Receipt Text Input</h2>
    <h4 class="desc tc">Receipt submitted!</h4>
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol" hideRequiredMark>
      <a-form-item>
        <template #label>
          <span style="display:inline-block;line-height: 1.3"
            >Organisation/<br />Individual Name</span
          >
        </template>
        <p class="receipt-data">{{ receipt.organisation }}</p>
      </a-form-item>
      <a-form-item label="Date">
        <p class="receipt-data">{{ getDate(receipt.date) }}</p>
      </a-form-item>
      <a-form-item label="Description">
        <p class="receipt-data">{{ receipt.description }}</p>
      </a-form-item>
      <a-form-item label="Balance change">
        <p class="receipt-data">
          {{ receipt.type === "Income" ? "+" : "-" }}{{ receipt.totalAmount }}
        </p>
      </a-form-item>
      <div class="tc">
        <a-button
          class="submit-btn"
          type="primary"
          size="large"
          @click="onSubmit"
          >Finish</a-button
        >
      </div>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "Submit",
  data() {
    return {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      },
      type: "Income",
      recurring: false,
      receipt: {
        organisation: "",
        day: "",
        month: "",
        year: "",
        description: "",
        totalAmount: "",
        type: "",
        recurring: ""
      }
    };
  },
  mounted() {
    Object.assign(this.receipt, this.$route.query);
  },
  methods: {
    onSubmit() {
      let arr = [];
      arr.push(0);
      arr.push(this.receipt.totalAmount);
      arr.push(this.receipt.date);
      arr.push(this.receipt.description);
      arr.push(this.receipt.type);
      arr.push(this.receipt.recurring ? 1 : 0);
      localStorage.setItem(localStorage.length.toString(), JSON.stringify(arr));
      this.$message.success("submit successfully");
    },
    getDate(time) {
      let dates = new Date(parseInt(time)),
        date = {
          year: dates.getFullYear(),
          month:
            dates.getMonth() + 1 < 10
              ? "0" + (dates.getMonth() + 1)
              : dates.getMonth() + 1,
          day: dates.getDate() < 10 ? "0" + dates.getDate() : dates.getDate()
        };
      return date.day + "/" + date.month + "/" + date.year;
    }
  }
};
</script>

<style lang="less">
.home {
  width: 768px;
  margin: auto;
  padding: 30px;

  .title {
    font-size: 32px;
    font-weight: bold;
    color: #2d73ed;
    margin-bottom: 10px;
  }
  .desc {
    font-size: 24px;
    margin-bottom: 30px;
  }
}
.receipt-data {
  border-bottom: 1px solid #d7d7d7;
}

.unit {
  font-size: 32px;
  vertical-align: top;
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
