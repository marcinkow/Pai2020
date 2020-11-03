var App = angular.module('pai2020', []);

App.controller('Ctrl', [ function() {
    console.log('Kontroler Ctrl startuje')

    this.person = {
        firstName: 'Jan',
        lastName: 'Kowalski',
        year: 1990 
    }

    
}])


