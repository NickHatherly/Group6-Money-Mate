<template>
  <div class="receipt-action-btn">
    <a-popover
      placement="top"
      overlayClassName="receipt-popover"
      v-model="visible"
      trigger="click"
    >
      <template slot="content" class="receipt-action-btn">
        <router-link :to="{ name: 'Home' }"
          ><a-button
            type="primary"
            icon="plus"
            shape="circle"
            size="large"
          ></a-button
        ></router-link>
        <!--                <router-link :to="{name:'Home'}"><a-button icon="form" shape="circle" style="background:#4caf50;color:#fff;" size="large"></a-button></router-link>-->
      </template>
      <a-button
        type="primary"
        shape="circle"
        icon="plus"
        size="large"
      ></a-button>
    </a-popover>
  </div>
</template>

<script>
export default {
  name: "ActiveBtn",
  data() {
    return {
      visible: false
    };
  }
};
</script>

<style scoped lang="less">
.receipt-action-btn {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1;

  button {
    width: 56px;
    height: 56px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.2);
  }
}
</style>

<style lang="less">
.receipt-popover {
  padding-bottom: 0 !important;
  .ant-popover-inner {
    background: transparent;
    box-shadow: none;
  }
  .ant-popover-content > .ant-popover-arrow {
    display: none;
  }

  a {
    display: block;
    margin-bottom: 10px;
    &:last-of-type {
      margin-bottom: 0;
    }

    button {
      box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
