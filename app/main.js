import Vue from 'vue'
import Calculator from './Calculator.vue'

import OnlyNumbers from './directives/only-numbers';
import Phone from './directives/phone';

Vue.directive('only-numbers', OnlyNumbers);
Vue.directive('phone', Phone);

new Vue({
    el: '#calculator',
    render: h => h(Calculator)
});