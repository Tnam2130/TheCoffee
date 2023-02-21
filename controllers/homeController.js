app.controller("homeController", function ($scope, $rootScope) {
  $scope.selectedCategoryID = [];
  $scope.setSelectedCategory = (cateID) => {
    if (!$scope.selectedCategoryID.includes(cateID)) {
      $scope.selectedCategoryID.push(cateID)
    }
  }
  $scope.products = $rootScope.products;
  $scope.blogs = $rootScope.blogs;
  $scope.signIn = $rootScope.signIn;
  $scope.signUp = $rootScope.signUp;
});
