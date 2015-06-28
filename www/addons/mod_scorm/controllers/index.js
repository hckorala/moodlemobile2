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
// limitations under the License.

angular.module('mm.addons.mod_scorm')
        
.controller('mmaModScormDetailsCtrl', function($scope, $stateParams, $mmaModScorm, $mmSite, $mmUtil){

    var module = $stateParams.module || {},
        courseid = $stateParams.courseid,
        scorm ;

    $scope.title = module.name;
    $scope.description = module.description;
    $scope.moduleurl = module.url;
    $scope.courseid = courseid;

    //Function to get scorm package data 
    function fetchScormData(){
        return $mmaModScorm.getScorm(courseid,module.id).then(function(scormdata){
            if(scormdata){
              var scorm = scormdata;

                $scope.packageSize = scorm.packagesize;     

                if(!$scope.packageSize){
                    $mmUtil.showErrorModal('mma.mod_scorm.errorgetscorm', true);
                } 
                
            }
            else{
                $mmUtil.showErrorModal('mma.mod_scorm.errorgetscorm', true);
            }
        },function(message){
            $mmUtil.showErrorModal(message);
        });

    }

    fetchScormData();


});