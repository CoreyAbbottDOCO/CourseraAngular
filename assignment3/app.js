(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItemsDirective);


function foundItemsDirective() {
  var ddo = {
    templateUrl: 'menuList.html',
    scope: {
      items: '<',
      onRemove: '&',
      nothingFound: '&'
    },
    controller: foundItemsDirectiveController,
    controllerAs: 'ctrl',
    bindToController: true
  };

  return ddo;
}
 
function foundItemsDirectiveController(){
    var ctrl = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
    var narrow = this;
    narrow.found = [];

    narrow.search = "";

    narrow.searchedOnce = false;

    narrow.narrowItDown = function(){
        //console.log(this.search)
        var promise = MenuSearchService.getMatchedMenuItems(narrow.search);

        promise.then(function (response) {
            narrow.found = response;
            narrow.searchedOnce = true;
          })
        //console.log(narrow.found);
    }

    narrow.removeItem = function(index){
        narrow.found.splice(index, 1);
    }

    narrow.nothingFound = function(){
        return narrow.searchedOnce && narrow.found.length == 0;
    }
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http){
    var service = this;

    service.getMatchedMenuItems = function(searchTerm){

        return $http({
            method: "GET",
            url: ("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"),
          }).then(function (result) {
            
            // process result and only keep items that match
            var foundItems = [];

            if(searchTerm === "")
                return foundItems;
            //console.log(result.data);

            //for (var i = 0; i < result.data.length; i++) {
            for (const [key, value] of Object.entries(result.data)){
                for (var j = 0; j < value.menu_items.length; j++) {
                    //console.log(value.menu_items[j].description);
                    if (value.menu_items[j].description.indexOf(searchTerm) !== -1)
                        foundItems.push(value.menu_items[j].description);
                }
            }

            //console.log(foundItems[0]);
            // return processed items
            return foundItems;
        });
    }
}

})();
