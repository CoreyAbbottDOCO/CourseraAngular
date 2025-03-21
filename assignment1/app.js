(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);
LunchCheckController.$inject = ['$scope'];

 function LunchCheckController($scope) {

    $scope.lunchText = "";
    $scope.pholder = "list comma separated dishes you usually have for lunch";

    $scope.clickButton = function(){
        
        const words = $scope.lunchText.split(",");

        console.log(words[0].length);

        if (words.length > 3) {
            $scope.message =  "Too much!";
        }
        else if (words[0].length > 0){
            $scope.message = "Enjoy!";
        }
        else {
            $scope.message = "Please enter data first";
        }

    }

};

})();
