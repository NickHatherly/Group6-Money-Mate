import Vue from "vue";
import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Form,
    Icon,
    Input,
    InputNumber,
    message,
    Modal,
    Progress,
    Radio,
    Row,
    Spin,
} from "ant-design-vue";

Vue.use(Button);
Vue.use(Checkbox);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(Icon);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Progress);
Vue.use(Radio);
Vue.use(Row);
Vue.use(Spin);

Vue.prototype.$Modal = Modal;
Vue.prototype.$message = message;
