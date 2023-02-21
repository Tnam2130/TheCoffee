app.controller('signUpController', function ($scope, $rootScope) {
    $scope.email = '';
    $scope.password = '';
    $scope.confirmPassword = '';
    $scope.timerToastId = null;
    $scope.errorMsg = {
      email: '',
      password: '',
      confirmPassword: '',
    };
    $scope.handleChange = () => {
      if ($scope.errorMsg.email || $scope.errorMsg.password || $scope.errorMsg.confirmPassword) {
        $scope.errorMsg = {
          email: '',
          password: '',
          confirmPassword: '',
        };
      }
    };

    $scope.signup = (form) => {
      if (form.$valid) {
        let account = $rootScope.accounts.find((acc) => acc.email === $scope.email);
        if (account) {
          $scope.errorMsg.email = 'Email is already in use!';
        } else if ($scope.password !== $scope.confirmPassword) {
          $scope.errorMsg.confirmPassword = 'Confirm Password is invalid!';
        } else {
          $rootScope.accounts = [
            ...$rootScope.accounts,
            {
              email: $scope.email,
              password: $scope.password,
            },
          ];
          $scope.email = '';
          $scope.password = '';
          $scope.confirmPassword = '';
          $('#signupToast').show();
          if ($scope.timerToastId) {
            clearTimeout($scope.timerToastId);
            $scope.timerToastId = null;
          }
          $scope.timerToastId = setTimeout(() => {
            $('#signupToast').hide();
          }, 3000);
        }
      }
    };
  });