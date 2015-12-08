import beauty from './components/lazyloadimg';
import Vue from 'vue';
import resource from 'vue-resource';
Vue.use(resource);
'use strict';
var vm = new Vue({

	ready: function() {
		this.$http.get('http://unofficial.sinaapp.com/index.php?s=home/index/beauty/page/1', function (data, status, request) {
			this.$data.photos = data;
		}).error(function (data, status, request) {
			console.log(data);
		})
	},
	el: '#app',
	data: {
		photos: ''
	}

});
