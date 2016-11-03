var app = angular.module('App', []);

app.controller('bauCtrl', function($scope, $http) {
    
// Simple GET request example:

    var successCallback = function (response) {
        $scope.res = response.data;
    };

    var errorCallback = function (response) {
        $scope.error = response.data;
    }

    $http({
        method: 'GET',
        url: 'prices.xlsx',
        headers: {
           'Content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        },
        responseType: 'arraybuffer'

    }).then(successCallback, errorCallback);
       
     $scope.$watch('res', function() {
        if ($scope.res !== undefined) {
            console.log('hey, myVar has changed!');
            console.log($scope.res);
        }     
    });

     console.log($scope.res);
    /*var arraybuffer = response.data;
    var data = new Uint8Array(arraybuffer);
    var arr = new Array();
    for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");
    //console.log(arr);
    var workbook = XLSX.read(bstr, {type:"binary"});
    var my_sheet = workbook.SheetNames[0];
    console.log(my_sheet);*/

/******************************************************* BAU System *********************************************************/
    var glueWeight1Bau = 4,
        glueSumm1Bau = 9.15,
        fiberglassCountBau = 1.1,
        fiberglassPriceBau = 22.07*fiberglassCountBau,
        glueWeight2Bau = 4,
        glueSumm2Bau = 6.28,
        primerWeightBau = 0.3,
        primerPriceBau = 32.66;

    $scope.Bau = {
    	typeHeater : [
        	{ id: 0, name: 'Оберіть утеплювач', count: '', price: 0.00, dowelSize: 0, dowelCount: 0, dowelPrice: 0.00, selectable: false },
    		{ id: 1, name: 'Плита ПСБС-25 50 мм', count: 2, price: 50,  dowelSize: 120, dowelCount: 6, dowelPrice: 2.82, selectable: true },
    		{ id: 2, name: 'Плита ПСБС-25 80 мм', count: 2, price: 80, dowelSize: 140, dowelCount: 6, dowelPrice: 3.27, selectable: true },
    		{ id: 3, name: 'Плита ПСБС-25 100 мм', count: 2, price: 100, dowelSize: 160, dowelCount: 6, dowelPrice: 3.75, selectable: true },
    		{ id: 4, name: 'Плита ПСБС-25 120 мм', count: 2, price: 120, dowelSize: 200, dowelCount: 6, dowelPrice: 4.56, selectable: true }
        ],
    	selectedHeater : { name: 'Оберіть утеплювач', count: 0, price: 0, dowelSize: 0, dowelCount: 0, dowelPrice: 0.00, selectable: false },

        typeFinishLayer: [
            { id: 0, name: 'Оберіть штукатурку', count: '', price: 0.00, selectable: false },
            { id: 1, name: 'Без оздоблення', count: '', price: 0.00, selectable: true },
            { id: 2, name: 'SilikatTop 2 мм «баранець»', count: 3.2, price: 49.25, selectable: true },
            { id: 3, name: 'SilikatTop 2 мм «короїд»', count: 2.8, price: 49.25, selectable: true },
            { id: 4, name: 'GranoporTop 2 мм «баранець»', count: 3.2, price: 33.68, selectable: true },
            { id: 5, name: 'GranoporTop 2 мм «короїд»', count: 2.8, price: 33.68, selectable: true },
            { id: 6, name: 'Edelputz Spezial White 2 мм «баранець»', count: 3, price: 12.56, selectable: true },
            { id: 7, name: 'Edelputz Spezial White 2 мм «короїд»', count: 2.9, price: 11.94, selectable: true },

        ],
        selectedFinishLayer : { id: 0, name: 'Оберіть штукатурку', count: '', price: 0.00, selectable: false }
    };

    $scope.Bau.update = function() {
    	var id = $scope.Bau.selectedHeater.id;
   		$scope.Bau.countHeater = $scope.Bau.typeHeater[$scope.Bau.selectedHeater.id].count*$scope.Bau.radiusCount;
   		$scope.Bau.priceHeater = ($scope.Bau.typeHeater[id].count*$scope.Bau.typeHeater[id].price*$scope.Bau.radiusCount).toFixed(2);
	}

     $scope.Bau.updateLayer = function() {
        var id = $scope.Bau.selectedFinishLayer.id;
        $scope.Bau.countFinishLayer = $scope.Bau.typeFinishLayer[$scope.Bau.selectedFinishLayer.id].count*$scope.Bau.radiusCount;
        $scope.Bau.priceFinishLayer = ($scope.Bau.typeFinishLayer[id].count*$scope.Bau.typeFinishLayer[id].price*$scope.Bau.radiusCount).toFixed(2);
    }

    $scope.Bau.calculate = function(count) {

        var glueMix =	{	
			glueWeight: glueWeight1Bau,
			glueSumm: glueSumm1Bau
        };

        var fiberglass = {
            fiberglassCount: fiberglassCountBau,
            fiberglassPrice: fiberglassPriceBau
        };

        var glueMix2 = {
            glueWeight2: glueWeight2Bau,
            glueSumm2: glueSumm2Bau
        };

        var primer = {
            primerWeight: primerWeightBau,
            primerPrice: primerPriceBau
        };

        $scope.Bau.radiusCount = count;

        /*************** Калькуляция клеевой смеси ***************/
        if (!glueMix.glueWeight) {
    		$scope.Bau.glueSumm = 0;
    	}
    	else {
    		$scope.Bau.glueWeight = glueMix.glueWeight*count;
        	$scope.Bau.glueSumm = (glueMix.glueSumm*count).toFixed(2);
    	}

        /*************** Калькуляция клеевой смеси #2***************/
        if (!glueMix2.glueWeight2) {
            $scope.Bau.glueSumm2 = 0;
        }
        else {
            $scope.Bau.glueWeight2 = glueMix2.glueWeight2*count;
            $scope.Bau.glueSumm2 = (glueMix2.glueWeight2*glueMix2.glueSumm2*count).toFixed(2);
        }

        /*************** Калькуляция утеплителя ***************/
    	$scope.Bau.countHeater = $scope.Bau.typeHeater[3].count*count;
    	$scope.Bau.selectedHeater = $scope.Bau.typeHeater[3];
    	$scope.Bau.priceHeater = ($scope.Bau.typeHeater[3].count*$scope.Bau.typeHeater[3].price*count).toFixed(2);

        /*************** Калькуляция дюбелей ***************/
        $scope.Bau.countDowel = $scope.Bau.typeHeater[3].dowelCount*count;
        $scope.Bau.sizeDowel = $scope.Bau.typeHeater[3].dowelSize;
        $scope.Bau.priceDowel = ($scope.Bau.typeHeater[3].dowelPrice*$scope.Bau.typeHeater[3].dowelCount*count).toFixed(2);

        /*************** Калькуляция стеклосетки ***************/
        $scope.Bau.fiberglassCount = (fiberglass.fiberglassCount*count).toFixed(2);
        $scope.Bau.fiberglassPrice = (fiberglass.fiberglassPrice*count).toFixed(2);

        /*************** Калькуляция грунтовочной смеси ***************/
        $scope.Bau.primerWeight = (primer.primerWeight*count).toFixed(2);
        $scope.Bau.primerPrice = (primer.primerPrice*primer.primerWeight*count).toFixed(2);

        /*************** Калькуляция финишного декоративного слоя ***************/
        $scope.Bau.countFinishLayer = ($scope.Bau.typeFinishLayer[2].count*count).toFixed(2);
        $scope.Bau.selectedFinishLayer = $scope.Bau.typeFinishLayer[2];
        $scope.Bau.priceFinishLayer = ($scope.Bau.typeFinishLayer[2].count*$scope.Bau.typeFinishLayer[2].price*count).toFixed(2);

        /*************** Калькуляция стоимости за м2***************/
        $scope.Bau.meterCost = ( (glueMix.glueWeight * glueMix.glueSumm) + ($scope.Bau.typeHeater[3].count*$scope.Bau.typeHeater[3].price) + ($scope.Bau.typeHeater[3].dowelPrice*$scope.Bau.typeHeater[3].dowelCount) + (fiberglass.fiberglassPrice) + (glueMix2.glueWeight2 * glueMix2.glueSumm2) + (primer.primerPrice*primer.primerWeight) + ($scope.Bau.typeFinishLayer[2].count*$scope.Bau.typeFinishLayer[2].price) ).toFixed(2);
        //console.log((glueMix.glueWeight * glueMix.glueSumm));
        //console.log($scope.Bau.glueSumm);

        /*************** Калькуляция итоговой стоимости ***************/
        $scope.Bau.totalCost = ((glueMix.glueWeight * glueMix.glueSumm*count) + (glueMix2.glueWeight2 * glueMix2.glueSumm2*count) + parseFloat($scope.Bau.priceHeater) + parseFloat($scope.Bau.priceDowel) + parseFloat($scope.Bau.fiberglassPrice) + parseFloat($scope.Bau.primerPrice) + parseFloat($scope.Bau.priceFinishLayer)).toFixed(2);
    }

    $scope.Bau.editGlue = function(weight) {
        if(!weight) {
            $scope.Bau.glueSumm = '';
        }
        else {
            $scope.Bau.glueSumm = (glueSumm1Bau*weight).toFixed(2);
            var id1 = $scope.Bau.selectedHeater.id;
            var id2 = $scope.Bau.selectedFinishLayer.id;

            /*************** Калькуляция стоимости за м2 при изменении***************/
            $scope.Bau.meterCost = ( ((glueSumm1Bau*weight) + ($scope.Bau.typeHeater[id1].count*$scope.Bau.typeHeater[id1].price*$scope.Bau.radiusCount) + ($scope.Bau.typeHeater[id1].dowelPrice*$scope.Bau.typeHeater[id1].dowelCount*$scope.Bau.radiusCount) + parseFloat($scope.Bau.fiberglassPrice) + parseFloat($scope.Bau.glueSumm2) + parseFloat($scope.Bau.primerPrice) + ($scope.Bau.typeFinishLayer[id2].count*$scope.Bau.typeFinishLayer[id2].price*$scope.Bau.radiusCount) )/$scope.Bau.radiusCount).toFixed(2);
            
            /*************** Калькуляция итоговой стоимости при изменении***************/
            $scope.Bau.totalCost =  ( (glueSumm1Bau*weight) + ($scope.Bau.typeHeater[id1].count*$scope.Bau.typeHeater[id1].price*$scope.Bau.radiusCount) + ($scope.Bau.typeHeater[id1].dowelPrice*$scope.Bau.typeHeater[id1].dowelCount*$scope.Bau.radiusCount) + parseFloat($scope.Bau.fiberglassPrice) + parseFloat($scope.Bau.glueSumm2) + parseFloat($scope.Bau.primerPrice) + ($scope.Bau.typeFinishLayer[id2].count*$scope.Bau.typeFinishLayer[id2].price*$scope.Bau.radiusCount) ).toFixed(2);

        } 
    }

    $scope.Bau.editDowel = function(count) {
        if(!count) {
            $scope.Bau.dowelCount = '';
            $scope.Bau.sizeDowel = '';
            $scope.Bau.priceDowel = '';
        }
        else {
            $scope.Bau.dowelCount = $scope.Bau.typeHeater[$scope.Bau.selectedHeater.id].dowelCount*count;
            $scope.Bau.sizeDowel = $scope.Bau.typeHeater[$scope.Bau.selectedHeater.id].dowelSize;
            $scope.Bau.priceDowel = ($scope.Bau.typeHeater[$scope.Bau.selectedHeater.id].dowelPrice*count).toFixed(2);
        }
    }

    $scope.Bau.editFinishLayer = function(meters) {
        if(!meters || meters == 0) {
            $scope.Bau.countFinishLayer = '';
        }
        else {
            $scope.Bau.priceFinishLayer = ($scope.Bau.typeFinishLayer[$scope.Bau.selectedFinishLayer.id].price*meters).toFixed(2);
        }
    }
});



app.controller('proCtrl', function($scope) {
    /******************************************************* PRO System *********************************************************/
    var glueWeight1Pro = 4,
        glueSumm1Pro = 7.60,
        fiberglassCountPro = 1.1,
        fiberglassPricePro = 26.96*fiberglassCountPro,
        primerWeightPro = 0.3,
        primerPricePro = 32.66;

    $scope.Pro = {
        typeHeater : [
            { id: 0, name: 'Оберіть утеплювач', count: '', price: 0.00, dowelSize: 0, dowelCount: 0, dowelPrice: 0.00, selectable: false },
            { id: 1, name: 'Мінераловатна плита 50 мм', count: 1.39, price: 69.15,  dowelSize: 120, dowelCount: 6, dowelPrice: 2.82, selectable: true },
            { id: 2, name: 'Мінераловатна плита 80 мм', count: 1.39, price: 110.66,  dowelSize: 140, dowelCount: 6, dowelPrice: 3.27, selectable: true },
            { id: 3, name: 'Мінераловатна плита 100 мм', count: 1.39, price: 138.3,  dowelSize: 160, dowelCount: 6, dowelPrice: 3.75, selectable: true },
            { id: 4, name: 'Мінераловатна плита 120 мм', count: 1.39, price: 165.96,  dowelSize: 200, dowelCount: 6, dowelPrice: 4.56, selectable: true },
            { id: 5, name: 'Плита ПСБС-25 50 мм', count: 2, price: 50,  dowelSize: 120, dowelCount: 6, dowelPrice: 2.82, selectable: true },
            { id: 6, name: 'Плита ПСБС-25 80 мм', count: 2, price: 80, dowelSize: 140, dowelCount: 6, dowelPrice: 3.27, selectable: true },
            { id: 7, name: 'Плита ПСБС-25 100 мм', count: 2, price: 100, dowelSize: 160, dowelCount: 6, dowelPrice: 3.75, selectable: true },
            { id: 8, name: 'Плита ПСБС-25 120 мм', count: 2, price: 120, dowelSize: 200, dowelCount: 6, dowelPrice: 4.56, selectable: true }
        ],
        selectedHeater : { name: 'Оберіть утеплювач', count: 0, price: 0, dowelSize: 0, dowelCount: 0, dowelPrice: 0.00, selectable: false },

        typeFinishLayer: [
            { id: 0, name: 'Оберіть штукатурку', count: '', price: 0.00, selectable: false },
            { id: 1, name: 'Без оздоблення', count: '', price: 0.00, selectable: true },
            { id: 2, name: 'NanoporTop 2 мм «баранець»', count: 3.2, price: 109.73, selectable: true},
            { id: 3, name: 'SilikonTop 2 мм «баранець»', count: 3.2, price: 63.81, selectable: true },
            { id: 4, name: 'SilikonTop 2 мм «короїд»', count: 2.8, price: 63.81, selectable: true },
            { id: 5, name: 'StellaporTop 2 мм «баранець»', count: 3.2, price: 42.78, selectable: true },
            { id: 6, name: 'StellaporTop 2 мм «короїд»', count: 2.8, price: 42.78, selectable: true },
            { id: 7, name: 'SilikatTop 2 мм «баранець»', count: 3.2, price: 49.25, selectable: true },
            { id: 8, name: 'SilikatTop 2 мм «короїд»', count: 2.8, price: 49.25, selectable: true },
            { id: 9, name: 'CreativTop «Max» 4 мм', count: 5.6, price: 57.31, selectable: true },
            { id: 10, name: 'CreativTop «Trend» 3 мм', count: 5.2, price: 57.31, selectable: true },
            { id: 11, name: 'CreativTop «Vario» 1,5 мм', count: 3.7, price: 57.31, selectable: true },
            { id: 12, name: 'CreativTop «Fine» 1 мм', count: 3.5, price: 57.31, selectable: true },
            { id: 13, name: 'CreativTop «Perl» 0,5 мм', count: 2.5, price: 57.31, selectable: true },
            { id: 14, name: 'GranoporTop 2 мм «баранець»', count: 3.2, price: 33.68, selectable: true },
            { id: 15, name: 'GranoporTop 2 мм «короїд»', count: 2.8, price: 33.68, selectable: true },
            { id: 16, name: 'Edelputz Spezial White 2 мм «баранець»', count: 3, price: 12.56, selectable: true },
            { id: 17, name: 'Edelputz Spezial White 2 мм «короїд»', count: 2.9, price: 11.94, selectable: true }

        ],
        selectedFinishLayer : { id: 0, name: 'Оберіть штукатурку', count: '', price: 0.00, selectable: false }
    };

    $scope.Pro.update = function() {
        var id = $scope.Pro.selectedHeater.id;
        $scope.Pro.countHeater = $scope.Pro.typeHeater[$scope.Pro.selectedHeater.id].count*$scope.Pro.radiusCount;
        $scope.Pro.priceHeater = ($scope.Pro.typeHeater[id].count*$scope.Pro.typeHeater[id].price*$scope.Pro.radiusCount).toFixed(2);
    }

     $scope.Pro.updateLayer = function() {
        var id = $scope.Pro.selectedFinishLayer.id;
        $scope.Pro.countFinishLayer = $scope.Pro.typeFinishLayer[$scope.Pro.selectedFinishLayer.id].count*$scope.Pro.radiusCount;
        $scope.Pro.priceFinishLayer = ($scope.Pro.typeFinishLayer[id].count*$scope.Pro.typeFinishLayer[id].price*$scope.Pro.radiusCount).toFixed(2);
    }

    $scope.Pro.calculate = function(count) {

        var glueMix =   {   
            glueWeight: glueWeight1Pro,
            glueSumm: glueSumm1Pro
        };

        var fiberglass = {
            fiberglassCount: fiberglassCountPro,
            fiberglassPrice: fiberglassPricePro
        };

        var primer = {
            primerWeight: primerWeightPro,
            primerPrice: primerPricePro
        };

        $scope.Pro.radiusCount = count;

        /*************** Калькуляция клеевой смеси ***************/
        if (!glueMix.glueWeight) {
            $scope.Pro.glueSumm = 0;
        }
        else {
            $scope.Pro.glueWeight = glueMix.glueWeight*count;
            $scope.Pro.glueSumm = (glueMix.glueSumm*count).toFixed(2);
        }

        /*************** Калькуляция утеплителя ***************/
        $scope.Pro.countHeater = $scope.Pro.typeHeater[7].count*count;
        $scope.Pro.selectedHeater = $scope.Pro.typeHeater[7];
        $scope.Pro.priceHeater = ($scope.Pro.typeHeater[7].count*$scope.Pro.typeHeater[7].price*count).toFixed(2);

        /*************** Калькуляция дюбелей ***************/
        $scope.Pro.countDowel = $scope.Pro.typeHeater[7].dowelCount*count;
        $scope.Pro.sizeDowel = $scope.Pro.typeHeater[7].dowelSize;
        $scope.Pro.priceDowel = ($scope.Pro.typeHeater[7].dowelPrice*$scope.Pro.typeHeater[7].dowelCount*count).toFixed(2);

        /*************** Калькуляция стеклосетки ***************/
        $scope.Pro.fiberglassCount = (fiberglass.fiberglassCount*count).toFixed(2);
        $scope.Pro.fiberglassPrice = (fiberglass.fiberglassPrice*count).toFixed(2);

        /*************** Калькуляция грунтовочной смеси ***************/
        $scope.Pro.primerWeight = (primer.primerWeight*count).toFixed(2);
        $scope.Pro.primerPrice = (primer.primerPrice*primer.primerWeight*count).toFixed(2);

        /*************** Калькуляция финишного декоративного слоя ***************/
        $scope.Pro.countFinishLayer = ($scope.Pro.typeFinishLayer[5].count*count).toFixed(2);
        $scope.Pro.selectedFinishLayer = $scope.Pro.typeFinishLayer[5];
        $scope.Pro.priceFinishLayer = ($scope.Pro.typeFinishLayer[5].count*$scope.Pro.typeFinishLayer[5].price*count).toFixed(2);

        /*************** Калькуляция стоимости за м2***************/
        $scope.Pro.meterCost = ( (glueMix.glueWeight * glueMix.glueSumm) + ($scope.Pro.typeHeater[7].count*$scope.Pro.typeHeater[7].price) + ($scope.Pro.typeHeater[7].dowelPrice*$scope.Pro.typeHeater[7].dowelCount) + (fiberglass.fiberglassPrice) + (primer.primerPrice*primer.primerWeight) + ($scope.Pro.typeFinishLayer[5].count*$scope.Pro.typeFinishLayer[5].price) ).toFixed(2);

        /*************** Калькуляция итоговой стоимости ***************/
        $scope.Pro.totalCost = ((glueMix.glueWeight * glueMix.glueSumm*count) + parseFloat($scope.Pro.priceHeater) + parseFloat($scope.Pro.priceDowel) + parseFloat($scope.Pro.fiberglassPrice) + parseFloat($scope.Pro.primerPrice) + parseFloat($scope.Pro.priceFinishLayer)).toFixed(2);
    }

    $scope.Pro.editGlue = function(weight) {
        if(!weight) {
            $scope.Pro.glueSumm = '';
        }
        else {

            $scope.Pro.glueSumm = (glueSumm1Pro*weight).toFixed(2);
            var id1 = $scope.Pro.selectedHeater.id;
            var id2 = $scope.Pro.selectedFinishLayer.id;

            /**************************Проверка на выбор Минерально Плиты*************************/
            if($scope.Pro.typeHeater[id1].id >= 1 && $scope.Pro.typeHeater[id1].id <= 4)
        	{
        		$scope.Pro.typeFinishLayer[14].selectable = false;
        		$scope.Pro.typeFinishLayer[15].selectable = false;
        	}

            /*************** Калькуляция стоимости за м2 при изменении***************/
            $scope.Pro.meterCost = ( ((glueSumm1Pro*weight) + ($scope.Pro.typeHeater[id1].count*$scope.Pro.typeHeater[id1].price*$scope.Pro.radiusCount) + ($scope.Pro.typeHeater[id1].dowelPrice*$scope.Pro.typeHeater[id1].dowelCount*$scope.Pro.radiusCount) + parseFloat($scope.Pro.fiberglassPrice) + parseFloat($scope.Pro.primerPrice) + ($scope.Pro.typeFinishLayer[id2].count*$scope.Pro.typeFinishLayer[id2].price*$scope.Pro.radiusCount) )/$scope.Pro.radiusCount).toFixed(2);
            
            /*************** Калькуляция итоговой стоимости при изменении***************/
            $scope.Pro.totalCost = ( (glueSumm1Pro*weight) + ($scope.Pro.typeHeater[id1].count*$scope.Pro.typeHeater[id1].price*$scope.Pro.radiusCount) + ($scope.Pro.typeHeater[id1].dowelPrice*$scope.Pro.typeHeater[id1].dowelCount*$scope.Pro.radiusCount) + parseFloat($scope.Pro.fiberglassPrice) + parseFloat($scope.Pro.primerPrice) + ($scope.Pro.typeFinishLayer[id2].count*$scope.Pro.typeFinishLayer[id2].price*$scope.Pro.radiusCount) ).toFixed(2);

        } 
    }

    $scope.Pro.editDowel = function(count) {
        if(!count) {
            $scope.Pro.dowelCount = '';
            $scope.Pro.sizeDowel = '';
            $scope.Pro.priceDowel = '';
        }
        else {
            $scope.Pro.dowelCount = $scope.Pro.typeHeater[$scope.Pro.selectedHeater.id].dowelCount*count;
            $scope.Pro.sizeDowel = $scope.Pro.typeHeater[$scope.Pro.selectedHeater.id].dowelSize;
            $scope.Pro.priceDowel = ($scope.Pro.typeHeater[$scope.Pro.selectedHeater.id].dowelPrice*count).toFixed(2);
        }
    }

    $scope.Pro.editFinishLayer = function(meters) {
        if(!meters || meters == 0) {
            $scope.Pro.countFinishLayer = '';
        }
        else {
            $scope.Pro.priceFinishLayer = ($scope.Pro.typeFinishLayer[$scope.Pro.selectedFinishLayer.id].price*meters).toFixed(2);
        }
    }
});



app.controller('starCtrl', function($scope) {
    /******************************************************* STAR System *********************************************************/
    var glueWeight1Star = 4,
        glueSumm1Star = 9.15,
        fiberglassCountStar = 1.1,
        fiberglassPriceStar = 26.96*fiberglassCountStar;

    $scope.Star = {
        typeHeater : [
            { id: 0, name: 'Оберіть утеплювач', count: '', price: 0.00, dowelSize: 0, dowelCount: 0, dowelPrice: 0.00, selectable: false },
            { id: 1, name: 'Мінераловатна плита 50 мм', count: 1.39, price: 69.15,  dowelSize: 120, dowelCount: 6, dowelPrice: 2.82, selectable: true },
            { id: 2, name: 'Мінераловатна плита 80 мм', count: 1.39, price: 110.66,  dowelSize: 140, dowelCount: 6, dowelPrice: 3.27, selectable: true },
            { id: 3, name: 'Мінераловатна плита 100 мм', count: 1.39, price: 138.3,  dowelSize: 160, dowelCount: 6, dowelPrice: 3.75, selectable: true },
            { id: 4, name: 'Мінераловатна плита 120 мм', count: 1.39, price: 165.96,  dowelSize: 200, dowelCount: 6, dowelPrice: 4.56, selectable: true },
            { id: 5, name: 'Плита ПСБС-25 50 мм', count: 2, price: 50,  dowelSize: 120, dowelCount: 6, dowelPrice: 2.82, selectable: true },
            { id: 6, name: 'Плита ПСБС-25 80 мм', count: 2, price: 80, dowelSize: 140, dowelCount: 6, dowelPrice: 3.27, selectable: true },
            { id: 7, name: 'Плита ПСБС-25 100 мм', count: 2, price: 100, dowelSize: 160, dowelCount: 6, dowelPrice: 3.75, selectable: true },
            { id: 8, name: 'Плита ПСБС-25 120 мм', count: 2, price: 120, dowelSize: 200, dowelCount: 6, dowelPrice: 4.56, selectable: true }
        ],
        selectedHeater : { name: 'Оберіть утеплювач', count: 0, price: 0, dowelSize: 0, dowelCount: 0, dowelPrice: 0.00, selectable: false },

        typeFinishLayer: [
            { id: 0, name: 'Оберіть штукатурку', count: '', price: 0.00, selectable: false },
            { id: 1, name: 'Без оздоблення', count: '', price: 0.00, selectable: true },
            { id: 2, name: 'NanoporTop 2 мм «баранець»', count: 3.2, price: 109.73, selectable: true},
            { id: 3, name: 'SilikonTop 2 мм «баранець»', count: 3.2, price: 63.81, selectable: true },
            { id: 4, name: 'SilikonTop 2 мм «короїд»', count: 2.8, price: 63.81, selectable: true },
            { id: 9, name: 'CreativTop «Max» 4 мм', count: 5.6, price: 57.31, selectable: true },
            { id: 10, name: 'CreativTop «Trend» 3 мм', count: 5.2, price: 57.31, selectable: true },
            { id: 11, name: 'CreativTop «Vario» 1,5 мм', count: 3.7, price: 57.31, selectable: true },
            { id: 12, name: 'CreativTop «Fine» 1 мм', count: 3.5, price: 57.31, selectable: true },
            { id: 13, name: 'CreativTop «Perl» 0,5 мм', count: 2.5, price: 57.31, selectable: true },
            { id: 14, name: 'CreativTop «Silk» 0,2 мм', count: 3.6, price: 66.47, selectable: true }
        ],
        selectedFinishLayer : { id: 0, name: 'Оберіть штукатурку', count: '', price: 0.00, selectable: false }
    };

    $scope.Star.update = function() {
        var id = $scope.Star.selectedHeater.id;
        $scope.Star.countHeater = $scope.Star.typeHeater[$scope.Star.selectedHeater.id].count*$scope.Star.radiusCount;
        $scope.Star.priceHeater = ($scope.Star.typeHeater[id].count*$scope.Star.typeHeater[id].price*$scope.Star.radiusCount).toFixed(2);
    }

     $scope.Star.updateLayer = function() {
        var id = $scope.Star.selectedFinishLayer.id;
        $scope.Star.countFinishLayer = $scope.Star.typeFinishLayer[$scope.Star.selectedFinishLayer.id].count*$scope.Star.radiusCount;
        $scope.Star.priceFinishLayer = ($scope.Star.typeFinishLayer[id].count*$scope.Star.typeFinishLayer[id].price*$scope.Star.radiusCount).toFixed(2);
    }

    $scope.Star.calculate = function(count) {

        var glueMix =   {   
            glueWeight: glueWeight1Star,
            glueSumm: glueSumm1Star
        };

        var fiberglass = {
            fiberglassCount: fiberglassCountStar,
            fiberglassPrice: fiberglassPriceStar
        };

        $scope.Star.radiusCount = count;

        /*************** Калькуляция клеевой смеси ***************/
        if (!glueMix.glueWeight) {
            $scope.Star.glueSumm = 0;
        }
        else {
            $scope.Star.glueWeight = glueMix.glueWeight*count;
            $scope.Star.glueSumm = (glueMix.glueSumm*count).toFixed(2);
        }

        /*************** Калькуляция утеплителя ***************/
        $scope.Star.countHeater = $scope.Star.typeHeater[7].count*count;
        $scope.Star.selectedHeater = $scope.Star.typeHeater[7];
        $scope.Star.priceHeater = ($scope.Star.typeHeater[7].count*$scope.Star.typeHeater[7].price*count).toFixed(2);

        /*************** Калькуляция дюбелей ***************/
        $scope.Star.countDowel = $scope.Star.typeHeater[7].dowelCount*count;
        $scope.Star.sizeDowel = $scope.Star.typeHeater[7].dowelSize;
        $scope.Star.priceDowel = ($scope.Star.typeHeater[7].dowelPrice*$scope.Star.typeHeater[7].dowelCount*count).toFixed(2);

        /*************** Калькуляция стеклосетки ***************/
        $scope.Star.fiberglassCount = (fiberglass.fiberglassCount*count).toFixed(2);
        $scope.Star.fiberglassPrice = (fiberglass.fiberglassPrice*count).toFixed(2);

        /*************** Калькуляция финишного декоративного слоя ***************/
        $scope.Star.countFinishLayer = ($scope.Star.typeFinishLayer[3].count*count).toFixed(2);
        $scope.Star.selectedFinishLayer = $scope.Star.typeFinishLayer[3];
        $scope.Star.priceFinishLayer = ($scope.Star.typeFinishLayer[3].count*$scope.Star.typeFinishLayer[3].price*count).toFixed(2);

        /*************** Калькуляция стоимости за м2***************/
        $scope.Star.meterCost = ( (glueMix.glueWeight * glueMix.glueSumm) + ($scope.Star.typeHeater[7].count*$scope.Star.typeHeater[7].price) + ($scope.Star.typeHeater[7].dowelPrice*$scope.Star.typeHeater[7].dowelCount) + (fiberglass.fiberglassPrice) + ($scope.Star.typeFinishLayer[3].count*$scope.Star.typeFinishLayer[3].price) ).toFixed(2);

        /*************** Калькуляция итоговой стоимости ***************/
        $scope.Star.totalCost = ((glueMix.glueWeight * glueMix.glueSumm*count) + parseFloat($scope.Star.priceHeater) + parseFloat($scope.Star.priceDowel) + parseFloat($scope.Star.fiberglassPrice) + parseFloat($scope.Star.priceFinishLayer)).toFixed(2);
    }

    $scope.Star.editGlue = function(weight) {
        if(!weight) {
            $scope.Star.glueSumm = '';
        }
        else {
            $scope.Star.glueSumm = (glueSumm1Star*weight).toFixed(2);
            var id1 = $scope.Star.selectedHeater.id;
            var id2 = $scope.Star.selectedFinishLayer.id;

            /*************** Калькуляция стоимости за м2 при изменении***************/
            $scope.Star.meterCost = ( ((glueSumm1Star*weight) + ($scope.Star.typeHeater[id1].count*$scope.Star.typeHeater[id1].price*$scope.Star.radiusCount) + ($scope.Star.typeHeater[id1].dowelPrice*$scope.Star.typeHeater[id1].dowelCount*$scope.Star.radiusCount) + parseFloat($scope.Star.fiberglassPrice) + ($scope.Star.typeFinishLayer[id2].count*$scope.Star.typeFinishLayer[id2].price*$scope.Star.radiusCount) )/$scope.Star.radiusCount).toFixed(2);
            
            /*************** Калькуляция итоговой стоимости при изменении***************/
            $scope.Star.totalCost = ( (glueSumm1Star*weight) + ($scope.Star.typeHeater[id1].count*$scope.Star.typeHeater[id1].price*$scope.Star.radiusCount) + ($scope.Star.typeHeater[id1].dowelPrice*$scope.Star.typeHeater[id1].dowelCount*$scope.Star.radiusCount) + parseFloat($scope.Star.fiberglassPrice) + ($scope.Star.typeFinishLayer[id2].count*$scope.Star.typeFinishLayer[id2].price*$scope.Star.radiusCount) ).toFixed(2);

        } 
    }

    $scope.Star.editDowel = function(count) {
        if(!count) {
            $scope.Star.dowelCount = '';
            $scope.Star.sizeDowel = '';
            $scope.Star.priceDowel = '';
        }
        else {
            $scope.Star.dowelCount = $scope.Star.typeHeater[$scope.Star.selectedHeater.id].dowelCount*count;
            $scope.Star.sizeDowel = $scope.Star.typeHeater[$scope.Star.selectedHeater.id].dowelSize;
            $scope.Star.priceDowel = ($scope.Star.typeHeater[$scope.Star.selectedHeater.id].dowelPrice*count).toFixed(2);
        }
    }

    $scope.Star.editFinishLayer = function(meters) {
        if(!meters || meters == 0) {
            $scope.Star.countFinishLayer = '';
        }
        else {
            $scope.Star.priceFinishLayer = ($scope.Star.typeFinishLayer[$scope.Star.selectedFinishLayer.id].price*meters).toFixed(2);
        }
    }
});



app.controller('powerCtrl', function($scope) {
    /******************************************************* POWER System *********************************************************/
    var glueWeight1Power = 4,
        glueSumm1Power = 9.15,
        fiberglassCountPower = 1.1,
        fiberglassPricePower = 26.96*fiberglassCountPower,
        primerWeightPower = 4.5,
        primerPricePower = 63.14;

    $scope.Power = {
        typeHeater : [
            { id: 0, name: 'Оберіть утеплювач', count: '', price: 0.00, dowelSize: 0, dowelCount: 0, dowelPrice: 0.00, selectable: false },
            { id: 1, name: 'Мінераловатна плита 50 мм', count: 1.39, price: 69.15,  dowelSize: 120, dowelCount: 6, dowelPrice: 2.82, selectable: true },
            { id: 2, name: 'Мінераловатна плита 80 мм', count: 1.39, price: 110.66,  dowelSize: 140, dowelCount: 6, dowelPrice: 3.27, selectable: true },
            { id: 3, name: 'Мінераловатна плита 100 мм', count: 1.39, price: 138.3,  dowelSize: 160, dowelCount: 6, dowelPrice: 3.75, selectable: true },
            { id: 4, name: 'Мінераловатна плита 120 мм', count: 1.39, price: 165.96,  dowelSize: 200, dowelCount: 6, dowelPrice: 4.56, selectable: true },
            { id: 5, name: 'Плита ПСБС-25 50 мм', count: 2, price: 50,  dowelSize: 120, dowelCount: 6, dowelPrice: 2.82, selectable: true },
            { id: 6, name: 'Плита ПСБС-25 80 мм', count: 2, price: 80, dowelSize: 140, dowelCount: 6, dowelPrice: 3.27, selectable: true },
            { id: 7, name: 'Плита ПСБС-25 100 мм', count: 2, price: 100, dowelSize: 160, dowelCount: 6, dowelPrice: 3.75, selectable: true },
            { id: 8, name: 'Плита ПСБС-25 120 мм', count: 2, price: 120, dowelSize: 200, dowelCount: 6, dowelPrice: 4.56, selectable: true }
        ],
        selectedHeater : { name: 'Оберіть утеплювач', count: 0, price: 0, dowelSize: 0, dowelCount: 0, dowelPrice: 0.00, selectable: false },

        typeFinishLayer: [
            { id: 0, name: 'Оберіть штукатурку', count: '', price: 0.00, selectable: false },
            { id: 1, name: 'Без оздоблення', count: '', price: 0.00, selectable: true },
            { id: 2, name: 'NanoporTop 2 мм «баранець»', count: 3.2, price: 109.73, selectable: true},
            { id: 3, name: 'SilikonTop 2 мм «баранець»', count: 3.2, price: 63.81, selectable: true },
            { id: 4, name: 'SilikonTop 2 мм «короїд»', count: 2.8, price: 63.81, selectable: true },
            { id: 5, name: 'StellaporTop 2 мм «баранець»', count: 3.2, price: 42.78, selectable: true },
            { id: 6, name: 'StellaporTop 2 мм «короїд»', count: 2.8, price: 42.78, selectable: true },
            { id: 7, name: 'SilikatTop 2 мм «баранець»', count: 3.2, price: 49.25, selectable: true },
            { id: 8, name: 'SilikatTop 2 мм «короїд»', count: 2.8, price: 49.25, selectable: true },
            { id: 9, name: 'CreativTop «Max» 4 мм', count: 5.6, price: 57.31, selectable: true },
            { id: 10, name: 'CreativTop «Trend» 3 мм', count: 5.2, price: 57.31, selectable: true },
            { id: 11, name: 'CreativTop «Vario» 1,5 мм', count: 3.7, price: 57.31, selectable: true },
            { id: 12, name: 'CreativTop «Fine» 1 мм', count: 3.5, price: 57.31, selectable: true },
            { id: 13, name: 'CreativTop «Perl» 0,5 мм', count: 2.5, price: 57.31, selectable: true },
            { id: 14, name: 'GranoporTop 2 мм «баранець»', count: 3.2, price: 33.68, selectable: true },
            { id: 15, name: 'GranoporTop 2 мм «короїд»', count: 2.8, price: 33.68, selectable: true }

        ],
        selectedFinishLayer : { id: 0, name: 'Оберіть штукатурку', count: '', price: 0.00, selectable: false }
    };

    $scope.Power.update = function() {
        var id = $scope.Power.selectedHeater.id;
        $scope.Power.countHeater = $scope.Power.typeHeater[$scope.Power.selectedHeater.id].count*$scope.Power.radiusCount;
        $scope.Power.priceHeater = ($scope.Power.typeHeater[id].count*$scope.Power.typeHeater[id].price*$scope.Power.radiusCount).toFixed(2);
    }

     $scope.Power.updateLayer = function() {
        var id = $scope.Power.selectedFinishLayer.id;
        $scope.Power.countFinishLayer = $scope.Power.typeFinishLayer[$scope.Power.selectedFinishLayer.id].count*$scope.Power.radiusCount;
        $scope.Power.priceFinishLayer = ($scope.Power.typeFinishLayer[id].count*$scope.Power.typeFinishLayer[id].price*$scope.Power.radiusCount).toFixed(2);
    }

    $scope.Power.calculate = function(count) {

        var glueMix =   {   
            glueWeight: glueWeight1Power,
            glueSumm: glueSumm1Power
        };

        var fiberglass = {
            fiberglassCount: fiberglassCountPower,
            fiberglassPrice: fiberglassPricePower
        };

        var primer = {
            primerWeight: primerWeightPower,
            primerPrice: primerPricePower
        };

        $scope.Power.radiusCount = count;

        /*************** Калькуляция клеевой смеси ***************/
        if (!glueMix.glueWeight) {
            $scope.Power.glueSumm = 0;
        }
        else {
            $scope.Power.glueWeight = glueMix.glueWeight*count;
            $scope.Power.glueSumm = (glueMix.glueSumm*count).toFixed(2);
        }

        /*************** Калькуляция утеплителя ***************/
        $scope.Power.countHeater = $scope.Power.typeHeater[7].count*count;
        $scope.Power.selectedHeater = $scope.Power.typeHeater[7];
        $scope.Power.priceHeater = ($scope.Power.typeHeater[7].count*$scope.Power.typeHeater[7].price*count).toFixed(2);

        /*************** Калькуляция дюбелей ***************/
        $scope.Power.countDowel = $scope.Power.typeHeater[7].dowelCount*count;
        $scope.Power.sizeDowel = $scope.Power.typeHeater[7].dowelSize;
        $scope.Power.priceDowel = ($scope.Power.typeHeater[7].dowelPrice*$scope.Power.typeHeater[7].dowelCount*count).toFixed(2);

        /*************** Калькуляция стеклосетки ***************/
        $scope.Power.fiberglassCount = (fiberglass.fiberglassCount*count).toFixed(2);
        $scope.Power.fiberglassPrice = (fiberglass.fiberglassPrice*count).toFixed(2);

        /*************** Калькуляция грунтовочной смеси ***************/
        $scope.Power.primerWeight = (primer.primerWeight*count).toFixed(2);
        $scope.Power.primerPrice = (primer.primerPrice*primer.primerWeight*count).toFixed(2);

        /*************** Калькуляция финишного декоративного слоя ***************/
        $scope.Power.countFinishLayer = ($scope.Power.typeFinishLayer[3].count*count).toFixed(2);
        $scope.Power.selectedFinishLayer = $scope.Power.typeFinishLayer[3];
        $scope.Power.priceFinishLayer = ($scope.Power.typeFinishLayer[3].count*$scope.Power.typeFinishLayer[3].price*count).toFixed(2);

        /*************** Калькуляция стоимости за м2***************/
        $scope.Power.meterCost = ( (glueMix.glueWeight * glueMix.glueSumm) + ($scope.Power.typeHeater[7].count*$scope.Power.typeHeater[7].price) + ($scope.Power.typeHeater[7].dowelPrice*$scope.Power.typeHeater[7].dowelCount) + (fiberglass.fiberglassPrice) + (primer.primerPrice*primer.primerWeight) + ($scope.Power.typeFinishLayer[3].count*$scope.Power.typeFinishLayer[3].price) ).toFixed(2);

        /*************** Калькуляция итоговой стоимости ***************/
        $scope.Power.totalCost = ((glueMix.glueWeight * glueMix.glueSumm*count) + parseFloat($scope.Power.priceHeater) + parseFloat($scope.Power.priceDowel) + parseFloat($scope.Power.fiberglassPrice) + parseFloat($scope.Power.primerPrice) + parseFloat($scope.Power.priceFinishLayer)).toFixed(2);
    }

    $scope.Power.editGlue = function(weight) {
        if(!weight) {
            $scope.Power.glueSumm = '';
        }
        else {
            $scope.Power.glueSumm = (glueSumm1Power*weight).toFixed(2);
            var id1 = $scope.Power.selectedHeater.id;
            var id2 = $scope.Power.selectedFinishLayer.id;

            /**************************Проверка на выбор Минерально Плиты*************************/
            if($scope.Power.typeHeater[id1].id >= 1 && $scope.Power.typeHeater[id1].id <= 4)
        	{
        		$scope.Power.typeFinishLayer[14].selectable = false;
        		$scope.Power.typeFinishLayer[15].selectable = false;
        	}

            /*************** Калькуляция стоимости за м2 при изменении***************/
            $scope.Power.meterCost = ( ((glueSumm1Power*weight) + ($scope.Power.typeHeater[id1].count*$scope.Power.typeHeater[id1].price*$scope.Power.radiusCount) + ($scope.Power.typeHeater[id1].dowelPrice*$scope.Power.typeHeater[id1].dowelCount*$scope.Power.radiusCount) + parseFloat($scope.Power.fiberglassPrice) + parseFloat($scope.Power.primerPrice) + ($scope.Power.typeFinishLayer[id2].count*$scope.Power.typeFinishLayer[id2].price*$scope.Power.radiusCount) )/$scope.Power.radiusCount).toFixed(2);
            
            /*************** Калькуляция итоговой стоимости при изменении***************/
            $scope.Power.totalCost = ( (glueSumm1Power*weight) + ($scope.Power.typeHeater[id1].count*$scope.Power.typeHeater[id1].price*$scope.Power.radiusCount) + ($scope.Power.typeHeater[id1].dowelPrice*$scope.Power.typeHeater[id1].dowelCount*$scope.Power.radiusCount) + parseFloat($scope.Power.fiberglassPrice) + parseFloat($scope.Power.primerPrice) + ($scope.Power.typeFinishLayer[id2].count*$scope.Power.typeFinishLayer[id2].price*$scope.Power.radiusCount) ).toFixed(2);

        } 
    }

    $scope.Power.editDowel = function(count) {
        if(!count) {
            $scope.Power.dowelCount = '';
            $scope.Power.sizeDowel = '';
            $scope.Power.priceDowel = '';
        }
        else {
            $scope.Power.dowelCount = $scope.Power.typeHeater[$scope.Power.selectedHeater.id].dowelCount*count;
            $scope.Power.sizeDowel = $scope.Power.typeHeater[$scope.Power.selectedHeater.id].dowelSize;
            $scope.Power.priceDowel = ($scope.Power.typeHeater[$scope.Power.selectedHeater.id].dowelPrice*count).toFixed(2);
        }
    }

    $scope.Power.editFinishLayer = function(meters) {
        if(!meters || meters == 0) {
            $scope.Power.countFinishLayer = '';
        }
        else {
            $scope.Power.priceFinishLayer = ($scope.Power.typeFinishLayer[$scope.Power.selectedFinishLayer.id].price*meters).toFixed(2);
        }
    }
});



app.controller('socleCtrl', function($scope) {
    /******************************************************* SOCLE System *********************************************************/
    var glueWeight1Socle = 4,
        glueSumm1Socle = 9.15,
        fiberglassCountSocle = 1.1,
        fiberglassPriceSocle = 26.96*fiberglassCountSocle,
        primerWeightSocle = 0.3,
        primerPriceSocle = 32.66;

    $scope.Socle = {
        typeHeater : [
            { id: 0, name: 'Оберіть утеплювач', count: '', price: 0.00, dowelSize: 0, dowelCount: 0, dowelPrice: 0.00, selectable: false },
            { id: 1, name: 'Экструдований пінополістирол 20 мм', count: 1.34, price: 104.67,  dowelSize: 120, dowelCount: 6, dowelPrice: 2.82, selectable: true },
            { id: 2, name: 'Экструдований пінополістирол 30 мм', count: 1.34, price: 160.494,  dowelSize: 120, dowelCount: 6, dowelPrice: 2.82, selectable: true },
            { id: 3, name: 'Экструдований пінополістирол 50 мм', count: 1.34, price: 265.164,  dowelSize: 120, dowelCount: 6, dowelPrice: 2.82, selectable: true },
            { id: 4, name: 'Экструдований пінополістирол 80 мм', count: 1.34, price: 418.68,  dowelSize: 140, dowelCount: 6, dowelPrice: 3.27, selectable: true }
        ],
        selectedHeater : { name: 'Оберіть утеплювач', count: 0, price: 0, dowelSize: 0, dowelCount: 0, dowelPrice: 0.00, selectable: false },

        typeFinishLayer: [
            { id: 0, name: 'Оберіть штукатурку', count: '', price: 0.00, selectable: false },
            { id: 1, name: 'Без оздоблення', count: '', price: 0.00, selectable: true },
            { id: 2, name: 'Мозаїчна штукатурка Baumit MosaikTop (зерно 2 мм) /36 кольорів', count: 5.5, price: 59.03, selectable: true}
           

        ],
        selectedFinishLayer : { id: 0, name: 'Оберіть штукатурку', count: '', price: 0.00, selectable: false }
    };

    $scope.Socle.update = function() {
        var id = $scope.Socle.selectedHeater.id;
        $scope.Socle.countHeater = $scope.Socle.typeHeater[$scope.Socle.selectedHeater.id].count*$scope.Socle.radiusCount;
        $scope.Socle.priceHeater = ($scope.Socle.typeHeater[id].count*$scope.Socle.typeHeater[id].price*$scope.Socle.radiusCount).toFixed(2);
    }

     $scope.Socle.updateLayer = function() {
        var id = $scope.Socle.selectedFinishLayer.id;
        $scope.Socle.countFinishLayer = $scope.Socle.typeFinishLayer[$scope.Socle.selectedFinishLayer.id].count*$scope.Socle.radiusCount;
        $scope.Socle.priceFinishLayer = ($scope.Socle.typeFinishLayer[id].count*$scope.Socle.typeFinishLayer[id].price*$scope.Socle.radiusCount).toFixed(2);
    }

    $scope.Socle.calculate = function(count) {

        var glueMix =   {   
            glueWeight: glueWeight1Socle,
            glueSumm: glueSumm1Socle
        };

        var fiberglass = {
            fiberglassCount: fiberglassCountSocle,
            fiberglassPrice: fiberglassPriceSocle
        };

        var primer = {
            primerWeight: primerWeightSocle,
            primerPrice: primerPriceSocle
        };

        $scope.Socle.radiusCount = count;

        /*************** Калькуляция клеевой смеси ***************/
        if (!glueMix.glueWeight) {
            $scope.Socle.glueSumm = 0;
        }
        else {
            $scope.Socle.glueWeight = glueMix.glueWeight*count;
            $scope.Socle.glueSumm = (glueMix.glueSumm*count).toFixed(2);
        }

        /*************** Калькуляция утеплителя ***************/
        $scope.Socle.countHeater = $scope.Socle.typeHeater[3].count*count;
        $scope.Socle.selectedHeater = $scope.Socle.typeHeater[3];
        $scope.Socle.priceHeater = ($scope.Socle.typeHeater[3].count*$scope.Socle.typeHeater[3].price*count).toFixed(2);

        /*************** Калькуляция дюбелей ***************/
        $scope.Socle.countDowel = $scope.Socle.typeHeater[3].dowelCount*count;
        $scope.Socle.sizeDowel = $scope.Socle.typeHeater[3].dowelSize;
        $scope.Socle.priceDowel = ($scope.Socle.typeHeater[3].dowelPrice*$scope.Socle.typeHeater[3].dowelCount*count).toFixed(2);

        /*************** Калькуляция стеклосетки ***************/
        $scope.Socle.fiberglassCount = (fiberglass.fiberglassCount*count).toFixed(2);
        $scope.Socle.fiberglassPrice = (fiberglass.fiberglassPrice*count).toFixed(2);

        /*************** Калькуляция грунтовочной смеси ***************/
        $scope.Socle.primerWeight = (primer.primerWeight*count).toFixed(2);
        $scope.Socle.primerPrice = (primer.primerPrice*primer.primerWeight*count).toFixed(2);

        /*************** Калькуляция финишного декоративного слоя ***************/
        $scope.Socle.countFinishLayer = ($scope.Socle.typeFinishLayer[2].count*count).toFixed(2);
        $scope.Socle.selectedFinishLayer = $scope.Socle.typeFinishLayer[2];
        $scope.Socle.priceFinishLayer = ($scope.Socle.typeFinishLayer[2].count*$scope.Socle.typeFinishLayer[2].price*count).toFixed(2);

        /*************** Калькуляция стоимости за м2***************/
        $scope.Socle.meterCost = ( (glueMix.glueWeight * glueMix.glueSumm) + ($scope.Socle.typeHeater[3].count*$scope.Socle.typeHeater[3].price) + ($scope.Socle.typeHeater[3].dowelPrice*$scope.Socle.typeHeater[3].dowelCount) + (fiberglass.fiberglassPrice) + (primer.primerPrice*primer.primerWeight) + ($scope.Socle.typeFinishLayer[2].count*$scope.Socle.typeFinishLayer[2].price) ).toFixed(2);

        /*************** Калькуляция итоговой стоимости ***************/
        $scope.Socle.totalCost = ((glueMix.glueWeight * glueMix.glueSumm*count) + parseFloat($scope.Socle.priceHeater) + parseFloat($scope.Socle.priceDowel) + parseFloat($scope.Socle.fiberglassPrice) + parseFloat($scope.Socle.primerPrice) + parseFloat($scope.Socle.priceFinishLayer)).toFixed(2);
    }

    $scope.Socle.editGlue = function(weight) {
        if(!weight) {
            $scope.Socle.glueSumm = '';
        }
        else {
            $scope.Socle.glueSumm = (glueSumm1Socle*weight).toFixed(2);
            var id1 = $scope.Socle.selectedHeater.id;
            var id2 = $scope.Socle.selectedFinishLayer.id;

            /*************** Калькуляция стоимости за м2 при изменении***************/
            $scope.Socle.meterCost = ( ((glueSumm1Socle*weight) + ($scope.Socle.typeHeater[id1].count*$scope.Socle.typeHeater[id1].price*$scope.Socle.radiusCount) + ($scope.Socle.typeHeater[id1].dowelPrice*$scope.Socle.typeHeater[id1].dowelCount*$scope.Socle.radiusCount) + parseFloat($scope.Socle.fiberglassPrice) + parseFloat($scope.Socle.primerPrice) + ($scope.Socle.typeFinishLayer[id2].count*$scope.Socle.typeFinishLayer[id2].price*$scope.Socle.radiusCount) )/$scope.Socle.radiusCount).toFixed(2);
            
            /*************** Калькуляция итоговой стоимости при изменении***************/
            $scope.Socle.totalCost = ( (glueSumm1Socle*weight) + ($scope.Socle.typeHeater[id1].count*$scope.Socle.typeHeater[id1].price*$scope.Socle.radiusCount) + ($scope.Socle.typeHeater[id1].dowelPrice*$scope.Socle.typeHeater[id1].dowelCount*$scope.Socle.radiusCount) + parseFloat($scope.Socle.fiberglassPrice) + parseFloat($scope.Socle.primerPrice) + ($scope.Socle.typeFinishLayer[id2].count*$scope.Socle.typeFinishLayer[id2].price*$scope.Socle.radiusCount) ).toFixed(2);

        } 
    }

    $scope.Socle.editDowel = function(count) {
        if(!count) {
            $scope.Socle.dowelCount = '';
            $scope.Socle.sizeDowel = '';
            $scope.Socle.priceDowel = '';
        }
        else {
            $scope.Socle.dowelCount = $scope.Socle.typeHeater[$scope.Socle.selectedHeater.id].dowelCount*count;
            $scope.Socle.sizeDowel = $scope.Socle.typeHeater[$scope.Socle.selectedHeater.id].dowelSize;
            $scope.Socle.priceDowel = ($scope.Socle.typeHeater[$scope.Socle.selectedHeater.id].dowelPrice*count).toFixed(2);
        }
    }

    $scope.Socle.editFinishLayer = function(meters) {
        if(!meters || meters == 0) {
            $scope.Socle.countFinishLayer = '';
        }
        else {
            $scope.Socle.priceFinishLayer = ($scope.Socle.typeFinishLayer[$scope.Socle.selectedFinishLayer.id].price*meters).toFixed(2);
        }
    }
});


var printDoc = function() {
	html2canvas($("body"), {
        onrendered: function (canvas) {
            var myImage = canvas.toDataURL("image/png");
            var tWindow = window.open(""); 
            $(tWindow.document.body).html("<img id='Image' src=" + myImage + " style='width:100%;'></img>").ready(function () {
                tWindow.focus();
                tWindow.print();
            });
        }
    });
}

var genPDF = function () {
    html2canvas(document.body, {
        onrendered: function (canvas) {
            var img = canvas.toDataURL("image/png", 1.0);
            var doc = new jsPDF("l", "mm", "a4");
            doc.addImage(img, 'JPEG', 2, 2, 270, 225);
            doc.save('test.pdf');
        }
    });
}

