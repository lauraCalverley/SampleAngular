angular.module('Skeletor.controllers').controller('CustomerController', function($scope, $rootScope, $stateParams, $state, $mdMedia, $mdDialog, CustomerService, CreditService, UserService, SiteService, PhoneService, AddressService) {

  $scope.smallScreen = function() {
    return $mdMedia('xs');
  }


  $scope.getCustomer = function (id) {
    CustomerService.getCustomer(id).then(function successCallback(response) {
      $scope.customer = response.data;
      $scope.customer.displayDob = $scope.customer.dob;
      console.log(angular.toJson($scope.customer));

      getCustomerPhone();
      getCustomerAddress();
      getCustomerCredits();
    }, function errorCallback(response) {
      //
    });

    SiteService.getCustomerSites(id).then(function(sites){
      $scope.sites = sites.data.sites;
    }, function(err){
      console.log(err); 
    });
  };

  var getCustomerPhone = function() {
    PhoneService.getCustomerPhone($scope.customer.id).then(function(phones) {
      $scope.phone = phones.data.phones[0];
    }, function(err) {
      console.log(err);
    });
  }

  var getCustomerAddress = function() {
    AddressService.getCustomerAddress($scope.customer.id).then(function(addresses){
      $scope.address = addresses.data.addresses[0];
    }, function(err){
      console.log(err);
    });
  }

  var getCustomerCredits = function() {
    CreditService.getCustomerCredits($scope.customer.id).then(function(credits){
    }, function(err) {
      console.log(err); 
    });
  }

  $scope.getCustomer($stateParams.id);

  $scope.infoComplete = function() {
    if($scope.customer && $scope.address && $scope.phone) {
      if($scope.customer.id && $scope.address.id && $scope.phone.id) {
        return true;
      } 
    };
    return false;
  }

  $scope.creditComplete = function() {
    return false;
  }

  $scope.siteComplete = function() {
    if($scope.sites) {
      return Object.keys($scope.sites).length;
    }
    return false;
  }



  $scope.editCustomer = function(ev) {
    UserService.getUsers().then(function(users) {
      $scope.users = users.data.users;
      $mdDialog.show({
        controller: 'CustomerDialogController',
        locals : {
          users : $scope.users,
          customer: $scope.customer
        },
        templateUrl: 'views/createcustomer.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      });
    }, function(error) {
      console.log(error);
    });
  }

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.saveCustomer = function() {
    alert('in save customer');
  }

  $scope.runCredit = function(ev) {
    var confirm = $mdDialog.confirm()
          .title('Are you sure you want to run ' + $scope.customer.fullname + '\'s credit?')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Yes, run credit!')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      alert('run the credit');
      CreditService.runCredit($scope.customer.id).then(function(credit) {
        alert('Credit was run');
      }, function(err) {
        console.log('ERROR running credit');
        console.log(err);
      });
    }, function() {
      alert('don\'t run credit');
    });
  }

  $scope.addSite = function(ev) {
    var site = {
      customerId : $scope.customer.id
    };
    showSiteDialog(site,ev);
  }

  $scope.editSite = function(site,ev) {
    showSiteDialog(site);
  }
  
  var showSiteDialog = function(site,ev) {
    $mdDialog.show({
      controller: 'SiteDialogController',
      locals : {
        site: site
      },
      templateUrl: 'views/createsite.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  }

  $scope.goToSite = function(siteId) {
    $state.go('site', {id: siteId});
  }

  $rootScope.$on('UpdatedSite', function() {
    SiteService.getCustomerSites($scope.customer.id).then(function(sites) {
      $scope.sites = sites.data.sites;
    }, function(err){
      console.log(err);
    });
  });

  $rootScope.$on('CreatedSite', function(event, site) {
    $scope.sites.push(site);
  });

  $rootScope.$on('PhoneStored', function() {
    getCustomerPhone();
  });

  $rootScope.$on('CustomerAddressSaved', function() {
    getCustomerAddress();
  });
});
