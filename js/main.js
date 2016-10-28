var app = angular.module('App', []);
app.controller('bauCtrl', function($scope) {
    $scope.Bau = {
    	typeHeater : [
    	{ id: 0, name: 'Оберіть утеплювач', count: '', price: 0 },
		{ id: 1, name: 'Плита ПСБС-25 50 мм', count: 2, price: 50 },
		{ id: 2, name: 'Плита ПСБС-25 80 мм', count: 2, price: 80 },
		{ id: 3, name: 'Плита ПСБС-25 100 мм', count: 2, price: 100 },
		{ id: 4, name: 'Плита ПСБС-25 120 мм', count: 2, price: 120 }
    ],
    	selectedHeater : { name: 'Оберіть утеплювач', count: 0, price: 0 }
    };

    $scope.update = function() {
    	var id = $scope.Bau.selectedHeater.id;
   		$scope.Bau.countHeater = $scope.Bau.typeHeater[$scope.Bau.selectedHeater.id].count;
   		$scope.Bau.priceHeater = ($scope.Bau.typeHeater[id].count*$scope.Bau.typeHeater[id].price);
	}

    $scope.calcGlue = function(count) {

        var caclDate =	{	
			glueWeight: 4*count,
			glueSumm: 9.15*count
        };

        $scope.Bau.radiusCount = count;
        if (!caclDate.glueWeight) {
    		$scope.Bau.glueSumm = 0;
    		console.log("calc");
    	}
    	else {
    		$scope.Bau.glueWeight = caclDate.glueWeight;
        	$scope.Bau.glueSumm = caclDate.glueSumm.toFixed(2);
    	}

    	$scope.Bau.countHeater = $scope.Bau.typeHeater[3].count*count;
    	$scope.Bau.selectedHeater = $scope.Bau.typeHeater[3];
    	$scope.Bau.priceHeater = ($scope.Bau.typeHeater[3].count*$scope.Bau.typeHeater[3].price)*count;
    }

    $scope.editGlue = function(weight) {
    	if(!weight) {
    		$scope.Bau.glueSumm = '';
    		console.log("edit");
    	}
    	else {
    		$scope.Bau.glueSumm = (9.15*weight).toFixed(2);
    	}
    }

    $scope.editHeater = function(type) {
    	if(!type) {
    		$scope.Bau.countHeater = '';
    	}
    	else {
    		console.log(type);
    		$scope.Bau.countHeater = $scope.Bau.typeHeater[3].count*type;
    		$scope.Bau.priceHeater = ($scope.Bau.typeHeater[3].count*$scope.Bau.typeHeater[3].price)*type;
    	}

    }

});
