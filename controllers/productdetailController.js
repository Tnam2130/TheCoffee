app.controller(
    "productdetailController",
    function ($scope, $rootScope, $routeParams, productService) {
        $scope.products = $rootScope.products;
        $scope.product = $scope.products.find((product) => {
            console.log($routeParams.id);
            return product.id == $routeParams.id;
        });
        $scope.quantity = 1;
        $scope.handleIncreaseQuantity = () => {
            $scope.quantity++;
        };
        $scope.handleDecreaseQuantity = () => {
            if ($scope.quantity > 1) {
                $scope.quantity--;
            }
        };
        $scope.addProduct = (product) => {
            productService.addProduct(product);
        };
    }
);