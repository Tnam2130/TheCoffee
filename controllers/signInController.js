app.controller(
    "signInController", function ($scope, $rootScope, $location) {
        $scope.email = '';
        $scope.password = '';
        $scope.errorMsg = {
            email: '',
            password: '',
        };
        $scope.handleChange = () => {
            if ($scope.errorMsg.email || $scope.errorMsg.password) {
                $scope.errorMsg = {
                    email: '',
                    password: '',
                };
            }
        };
        $scope.login = (form) => {
            if (form.$valid) {
                let account = $rootScope.account.find((acc) => acc.email === $scope.email);
                if (!account) {
                    $scope.errorMsg.email = 'Email chưa được đăng ký';
                } else {
                    if (account.password !== $scope.password) {
                        $scope.errorMsg.password = 'Mật khẩu không hợp lệ!';
                    } else {
                        $location.path('/');
                        $rootScope.account.email = account.email;
                    }
                }
            }
        };
    }
)