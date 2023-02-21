app.controller(
    "productController",
    function ($scope, $rootScope, productService) {
        $scope.products = $rootScope.products;
        $scope.addProduct = (product) => {
            return productService.addProduct(product);
        };
    }
);
// còn cái modal thì mình có thể chưa component hay view ra để làm k anh?
// Tùy em thôi, nèu em cảm thấy cần. Nhưng thường các modal chỉ dùng ở 1 số view nên nó không cần thiết

// Nếu em muốn chỗ nào cũng có thì có thể khai báo trong index.
// Ví dụ như sau