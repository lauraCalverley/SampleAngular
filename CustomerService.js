angular.module('skeletor').factory('CustomerService', function($http, localStorageService){

  return {
    getCustomers : function(){
      $http.defaults.headers.common.Authorization = localStorageService.get('token_type') + ' ' + localStorageService.get('access_token');
      return $http.get('https://api.skeletor.io/customers');
    },
    getCustomer : function(id){
      $http.defaults.headers.common.Authorization = localStorageService.get('token_type') + ' ' + localStorageService.get('access_token');
      return $http.get('https://api.skeletor.io/customers/' + id);
    },
    createCustomer : function(customer){
      $http.defaults.headers.common.Authorization = localStorageService.get('token_type') + ' ' + localStorageService.get('access_token');
      return $http.post('https://api.skeletor.io/customers/', customer);
    },
    editCustomer : function(customer){
      $http.defaults.headers.common.Authorization = localStorageService.get('token_type') + ' ' + localStorageService.get('access_token');
      return $http.put('https://api.skeletor.io/customers/' + customer.id, customer);
    }
  };

});
