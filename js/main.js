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
        $scope.Bau.weight = caclDate[0].weight;
        $scope.Bau.summ = caclDate[0].summ.toFixed(2);  
    };

    if ($scope.Bau.weight == null) {
    	$scope.Bau.weight = 4*1;
    	$scope.Bau.summ = 9.15*1;	
	}
	else {
		$scope.Bau.weight = 4*$scope.Bau.count;
    	$scope.Bau.summ = 9.15*$scope.Bau.count;
    	console.log("efw");
	}
});
