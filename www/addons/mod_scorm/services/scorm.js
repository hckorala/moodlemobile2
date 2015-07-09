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
 * Scorm service.
 *
 * @module mm.addons.mod_scorm
 * @ngdoc controller
 * @name $mmaModScorm
*/
.factory('$mmaModScorm',function($q, $mmSite, $mmUtil){
    var self = {};

    /**
     * Get cache key for scorm data WS calls.
     *
     * @param {Number} courseid Course ID.
     * @return {String}         Cache key.
    */
    function getScormDataCacheKey(courseid) {
        return 'mmaModScorm:scorm:' + courseid;
    }

    /**
     * Get cache key for scorm attempts WS calls.
     *
     * @param {Number} scormid Scorm ID.
     * @return {String}         Cache key.
    */
    function getScormAttemptsCacheKey(scormid){
        return 'mmaModScorm:scormAttempt' + scormid;
    } 

    /**
     * Return whether or not the plugin is enabled. Plugin is enabled if the forum WS are available.
     *
     * @module mm.addons.mod_scorm
     * @ngdoc method
     * @name $mmaModScorm#isPluginEnabled
     * @return {Boolean} True if plugin is enabled, false otherwise.
    */
    self.isPluginEnabled = function() {
        return  $mmSite.wsAvailable('mod_scorm_get_scorms_by_courses')&&
                $mmSite.wsAvailable('mod_scorm_get_scorm_attempts')&&
                $mmSite.wsAvailable('mod_scorm_get_scorm_scoes')&&
                $mmSite.wsAvailable('mod_scorm_insert_scorm_tracks')&&
                $mmSite.wsAvailable('mod_scorm_get_scorm_user_data')&&
                $mmSite.wsAvailable('mod_scorm_get_scorm_sco_tracks');
    };

    /**
     * Get a scorm.
     *
     * @module mm.addons.mod_scorm
     * @ngdoc method
     * @name $mmaModScorm#getScorm
     * @param {Number} courseid Course ID.
     * @param {Number} cmid     Course module ID.
     * @return {Promise}        Promise resolved when the scorm is retrieved.
    */
    self.getScorm = function(courseid, cmid) {
        var params = {
                courseids: [courseid]
            },
            preSets = {
                cacheKey: getScormDataCacheKey(courseid)
            };

        return $mmSite.read('mod_scorm_get_scorms_by_courses', params, preSets).then(function(scorms) {
            if(scorms){
            
                var currentScorm ;
                angular.forEach(scorms, function(scorm) {
                
                    angular.forEach(scorm,function(key){
                        if (key.coursemodule == cmid) {
                            currentScorm = key;
                        }
                    })
                });
                return currentScorm;
            }
            else{
                return $q.reject();
            }
        });
    };

    /**
     * Get a scorm attempt.
     *
     * @module mm.addons.mod_scorm
     * @ngdoc method
     * @name $mmaModScorm#getScormAttempt
     * @param {Number} scormid Scorm ID.
     * @param {Number} userid     User ID.
     * @return {Promise}        Promise resolved when the scorm is retrieved.
    */
    self.getScormAttempt = function(scormid,userid){
        var params = {
                scormid: scormid,
                userid : userid
            },
            preSets = {
                cacheKey: getScormAttemptsCacheKey(scormid)
            };

        return $mmSite.read('mod_scorm_get_scorm_attempts',params,preSets).then(function(attempts){
            if(attempts){

                var currentScormAttempt;

                 angular.forEach(attempts, function(attempt) {
                
                    angular.forEach(attempt,function(key){
                        currentScormAttempt = key;
                    })
                });
                return currentScormAttempt;
            }
            else{
                return $q.reject();   
            }
        });
    };

    /**
     * Get a scorm user details.
     *
     * @module mm.addons.mod_scorm
     * @ngdoc method
     * @name $mmaModScorm#getScormUserDetails
     * @param {Number} scormid Scorm ID.
     * @param {Number} attemptid    Attempt ID.
     * @return {Promise}        Promise resolved when the scorm is retrieved.
    */
    self.getScormUserDetails = function(scormid,attemptid){
        var params = {
                scormid: scormid,
                attemptid: attemptid
            },
            preSets = {
                cacheKey: {}
            };

        return $mmSite.read('mod_scorm_get_scorm_user_data',params,preSets).then(function(data){
            if (data) {

                var currentScormUserData;

                currentScormUserData = data.userdata ;

                return currentScormUserData;
            }
            else{
                return $q.reject(); 
            }
        });   
    };
    return self;
});