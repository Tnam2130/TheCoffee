var app = angular.module("app", ["ngRoute"]);
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "views/home.html",
      controller: "homeController",
    })
    .when("/blogdetail/:id", {
      templateUrl: "views/blogdetail.html",
      controller: "blogdetailController",
    })
    .when("/productdetail/:id", {
      templateUrl: "views/productdetail.html",
      controller: "productdetailController",
    })
    .when("/product", {
      templateUrl: "views/product.html",
      controller: "productController",
    })
    .when("/user", {
      templateUrl: "views/user.html",
      controller: "userController",
    })
    .when("/signin", {
      templateUrl: "views/signin.html",
      controller: "signInController",
    })
    .when("/signup", {
      templateUrl: "views/signup.html",
      controller: "signUpController",
    })
    .otherwise({
      templateUrl: "views/Notfound.html",
    });
});

app.run(function ($rootScope, $http, $location) {
  $rootScope.addSuccessToast = bootstrap.Toast.getOrCreateInstance(document.getElementById('addToCartSuccessToast'), {delay: 1000})
  const databasePath = ['account', 'blogs', 'products'];

  $rootScope.showAddSuccessToast = () => {
    $rootScope.addSuccessToast.show()
  }
  const getData = (path) => {
    $http.get(`db/${path}.json`).then(
      (response) => {
        $rootScope[path] = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  databasePath.forEach((path) => {
    getData(path);
  })

  $rootScope.$on("$routeChangeSuccess", () => {
    window.scroll(0, 0);
    let path = $location.path();
    $rootScope.activeRoute = path;
    // if ($('#regModal')) {
    //   $('#regModal').modal('hide');
    // }
    if (path === '/user') {
      if (!$rootScope.account.email) {
        $location.path('/signin');
      }
    }
  });
});

app.filter("vietnamCurrency", function () {
  return function (input, symbol, place) {
    if (isNaN(input)) {
      return input;
    } else {
      var symbol = symbol || " đ";
      var place = place === undefined ? true : place;
      if (place) {
        return new Intl.NumberFormat("de-DE").format(input) + symbol;
      } else {
        return symbol + new Intl.NumberFormat("de-DE").format(input);
      }
    }
  };
});
// Em co the lam các việc liên quan đến thêm xóa sửa sản phẩm trong giỏ hàng ở rootScope
// Nhưng nếu viết service thì sẽ tường minh hơn và dễ chỉnh sửa bảo trì,
// Nếu app của em có nhiều chức năng thì service là cần thiết
// Khai báo service bằng cú pháp app.factory