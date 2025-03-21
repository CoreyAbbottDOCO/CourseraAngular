(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])

.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
    var tobuy = this;

    tobuy.items =  ShoppingListCheckOffService.getBuyItems();

    tobuy.buyItem = function(index){
        ShoppingListCheckOffService.buyItem(index);
    }

    tobuy.isEmpty = function(){
        return tobuy.items.length == 0;
    }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
    var bought = this;

    bought.items =  ShoppingListCheckOffService.getBoughtItems();
    
    bought.isEmpty = function(){
        return bought.items.length == 0;
    }
}

function ShoppingListCheckOffService() {
    var service = this;
  
    // List of shopping items
    var buyItems = [{ name: "bookies", quantity: 5 }, { name: "cookies", quantity: 10 }, { name: "dookies", quantity: 20 }, { name: "hookies", quantity: 7 }, { name: "zookies", quantity: 11 }];
    var boughtItems = [];
  
    service.getBuyItems = function () {
      return buyItems;
    };

    service.getBoughtItems = function () {
        return boughtItems;
      };

    service.buyItem = function(index){
        boughtItems.push(buyItems[index]);
        buyItems.splice(index,1);
    }
  }


})();
