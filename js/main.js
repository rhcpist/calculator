var app = angular.module('App', []);
app.controller('bauCtrl', function($scope) {
    $scope.Bau = {};

    $scope.Calc = function(count) {

        var caclDate = [
        	{	
        		glueWeight: 4*count,
        		glueSumm: 9.15*count
        	}
        ];

        $scope.Bau.radiusCount = count;
        if(!caclDate[0].glueWeight) {
    		$scope.Bau.glueSumm = 0;
    		console.log("calc");
    	}
    	else {
    		$scope.Bau.glueWeight = caclDate[0].glueWeight;
        	$scope.Bau.glueSumm = caclDate[0].glueSumm.toFixed(2);  
    	}   
    };

    $scope.editGlue = function(weight) {
    	if(!weight) {
    		$scope.Bau.glueSumm = '';
    		console.log("edit");
    	}
    	else
    	{
    		$scope.Bau.glueSumm = (9.15*weight).toFixed(2);
    	}		
    }

});
