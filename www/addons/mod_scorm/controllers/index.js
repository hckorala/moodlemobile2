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
        courseid = $stateParams.courseid ;

    $scope.title = module.name;
    $scope.description = module.description;
    $scope.moduleurl = module.url;
    $scope.courseid = courseid;
    $scope.userid = $mmSite.getUserId();

    //Function to get scorm package data and handle errors when data is not recieved or incorrect
    function fetchScormData(){
        return $mmaModScorm.getScorm(courseid,module.id).then(function(scormdata){
            if(scormdata){
                var scorm = scormdata;
                $scope.packageSize = scorm.packagesize; 
                $scope.scormid = scorm.id ; 

                //Retrieving data that needs to be displayed when the scorm package is clicked   
                $scope.grademethod = scorm.grademethod;
                $scope.maxattempt = scorm.maxattempt;
                $scope.maxgrade = scorm.maxgrade;
                
                if($scope.packageSize){

                    //Handling the time open settings
                    $scope.scormopen = true ;
                    var timeopen = scorm.timeopen,
                        timeclose = scorm.timeclose,
                        time =  new Date().getTime(),
                        nowtime = Math.round(time/1000);

                       var pac = downloadPackage(module);

                    if((timeopen) && timeopen > nowtime){
                        $scope.timeopenMessage = "Scorm package is not opened yet" ;
                        $scope.scormopen = false;
                    }
                    if((timeclose) && nowtime > timeclose){
                        $scope.timeopenMessage = "Scorm package is expired " ;
                        $scope.scormopen = false;   
                    }
                    else{
                        $scope.timeopenMessage = "Scorm package was opened" ;
                    }

                    fetchScormAttempts($scope.scormid,$scope.userid,$scope.maxattempt);    
                }
                else{
                    $mmUtil.showErrorModal('mma.mod_scorm.errorgetscorm', true);
                } 
                
            }
            else{
                $mmUtil.showErrorModal('mma.mod_scorm.errorgetscorm', true);
            }
        },function(message){
            $scope.errorMessage = message ;
        });

    }

    //Function to fetch scorm attempts data
    function fetchScormAttempts(scormid,userid,maxattempt){
        return $mmaModScorm.getScormAttempt(scormid,userid).then(function(attempts){
            if(attempts){
                $scope.attemptCount = attempts.id;

                attemptManager(maxattempt,$scope.attemptCount);

                //fetchScormUserData(scormid,$scope.attemptcount);
            }
        },function(message){
            $scope.errorMessage = message ;
        });
    }

    //function to manage attempts 
    function attemptManager(maxattempt,attemptcount){

        if(maxattempt!=0){
            var attemptremaining = maxattempt - attemptcount;

            $scope.attemptMessage = attemptremaining;
        }
        else{
            $scope.attemptMessage = "Unlimited number of attempts available";
        }
    }

    //function to fetch scorm user data
    function fetchScormUserData(scormid,attemptid){
        return $mmaModScorm.getScormUserDetails(scormid,attemptid).then(function(userdata){
            if(userdata){
                var userData = userdata;
            }
        },function(message){
           $scope.errorMessage = message ;
        })
    }

    //function to download package 
    function downloadPackage(module){
        console.log("test download");
        return $mmaModScorm.downloadScormPackage(module);
    }

    fetchScormData();


});