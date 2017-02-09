import Vue from 'vue';
import resource from 'vue-resource';
Vue.use(resource);
'use strict';

var vm = new Vue({

	ready: function() {
		this.$http.get('http://192.168.25.137:1126/index.php?s=home/index/beauty/page/1', function (data, status, request) {
			console.log(data);
			//this.$data.photos = data;
		}).error(function (data, status, request) {
			console.log(status);
		})
	},
	el: '#app',
	data: {
		photos: ''
	}

});
