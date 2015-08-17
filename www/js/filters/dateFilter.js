/**
 * Created by Osei Fortune on 8/17/15.
 */
angular.module('sinch-starter')
.filter('dateFilter',function () {

        return function (data) {
            if(data != undefined)
            if(Math.floor(data/1000) > 60){
                return Math.floor(data/1000)/60;
            }else{
              return  Math.floor(data/1000);
            }
        }

    });