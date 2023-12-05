import { defineComponent } from 'vue';
export default defineComponent({
    name: 'BaseButton',
    template: '<button type="button"><slot /></button>'
});