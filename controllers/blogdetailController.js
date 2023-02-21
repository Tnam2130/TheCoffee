app.controller(
  "blogdetailController",
  function ($scope, $rootScope, $routeParams, $location) {
    $scope.blogs = $rootScope.blogs;
    $scope.blog = $scope.blogs.find((blog) => {
      console.log($routeParams.id)
      return blog.id == $routeParams.id;
    });
    $scope.nextBlog = () => {
      $scope.blogs.forEach((blog, index) => {
        if ($scope.blog.id === blog.id) {
          console.log(1);
          if (index === $scope.blogs.length - 1) {
            $location.path("/blogdetail/0");
          } else {
            $location.path("/blogdetail/" + ($scope.blog.id + 1));
          }
        }
      });
    };
    $scope.prevBlog = () => {
      $scope.blogs.forEach((blog, index) => {
        if ($scope.blog.id === blog.id) {
          if (index === 0) {
            $location.path("/blogdetail/" + $scope.blogs.at(-1).id);
          } else {
            $location.path("/blogdetail/" + ($scope.blog.id - 1));
          }
        }
      });
    };
  }
);

