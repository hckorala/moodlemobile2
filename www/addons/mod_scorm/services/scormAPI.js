// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License

angular.module('mm.addons.mod_scorm')

/**
 * ScormAPI service.
 *
 * @module mm.addons.mod_scorm
 * @ngdoc controller
 * @name $mmaModScormAPI 
*/

.factory('$mmaModScormAPI', function(){


	API = {};
	
	var scormStatus = {
			lesson_status: '',
			score_raw: 0,
			score_max: 100,
			score_min: 0,
			session_time: 0,
			detailed_answers: {}
	};

	API.LMSInitialize = function(){
		console.log('LMSInitialize');
	};

	API.LMSTerminate = function() {
		console.log('LMSTerminate');
	}
	
	API.LMSGetValue = function(element) {
		consolelog(element);
	}
	
	API.LMSSetValue = function(varname, varvalue) {
		
		console.log('LMSSetValue', varname, '=', varvalue);
	}
	
	API.LMSCommit = function() {
		console.log('LMSCommit');
		return true; 
	
	}
	
	API.LMSFinish = function() {
		console.log('LMSFinish');
	}
	
	API.LMSGetLastError = function() {
		console.log('LMSGetLastError');
	}
	
	API.LMSGetErrorString = function() {
		console.log('LMSGetErrorString');
	}
	
	API.LMSGetDiagnostic = function() {
		console.log('LMSGetDiagnostic');
	}	

	
	return API; 
	
});