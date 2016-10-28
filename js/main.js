var app = angular.module('App', []);
app.controller('bauCtrl', function($scope) {
    $scope.Bau = {};
    //$scope.Bau.radiusCount = "Jakob"; 
    $scope.Calc = function(count) {
        //$scope.Bau = {};
        console.log(count);
        var caclDate = [
        	{	
        		weight: 4*count,
        		summ: 9.15*count
        	}
        ];
        //console.log(puttyMix.weight + ' ' + puttyMix.summ);
        $scope.Bau.radiusCount = count;
        if(!caclDate[0].weight) {
    		$scope.Bau.summ = 0;
    		console.log("calc");
    	}
    	else {
    		$scope.Bau.weight = caclDate[0].weight;
        	$scope.Bau.summ = caclDate[0].summ.toFixed(2);  
    	}   
    };

    $scope.Edit = function(weight) {
    	if(!weight) {
    		$scope.Bau.summ = 0;
    		console.log("edit");
    	}
    	else
    	{
    		$scope.Bau.summ = (9.15*weight).toFixed(2);
    	}		
    }

});
