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
      var symbol = symbol || " ??";
      var place = place === undefined ? true : place;
      if (place) {
        return new Intl.NumberFormat("de-DE").format(input) + symbol;
      } else {
        return symbol + new Intl.NumberFormat("de-DE").format(input);
      }
    }
  };
});
// Em co the lam c??c vi???c li??n quan ?????n th??m x??a s???a s???n ph???m trong gi??? h??ng ??? rootScope
// Nh??ng n???u vi???t service th?? s??? t?????ng minh h??n v?? d??? ch???nh s???a b???o tr??,
// N???u app c???a em c?? nhi???u ch???c n??ng th?? service l?? c???n thi???t
// Khai b??o service b???ng c?? ph??p app.factory