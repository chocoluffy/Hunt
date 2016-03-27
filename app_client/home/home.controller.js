angular
	.module("airloft")
	.controller('homeCtrl', homeCtrl);

function homeCtrl(airloftData, geolocation){
	var vm = this;
	vm.pageHeader = {
		title: "AirLoft",
		strapline: "Share your insights with the world!"
	};
	vm.message = "Checking your location...";
	vm.getData = function(position){
		var lat = position.coords.latitude,
			lng = position.coords.longitude;
		console.log(position);
		vm.message = "Searching for nearby missions...";
		airloftData.missionByCoords(lat, lng)
			.success(function(data){
				vm.message = data.length > 0 ? "" : "No missions found nearby";	
				console.log(data);
				vm.data = {
					missions: data
				};
			})
			.error(function(e){
				vm.message = "Sorry, something's gone wrong.";
				console.log(e);
			});
	};
	vm.showError = function(error){
		$scope.$apply(function(){
			vm.message = error.message;
		});
	};

	vm.noGeo = function(){
		$scope.$apply(function(){
			vm.message = "Geolocation not supported by this browser.";
		});
	};

	geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
			
}