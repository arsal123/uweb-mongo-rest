'use strict'

describe('jewelCrud', function () {
    describe('ItemController', function () {
        var scope, compile, http, log, injectedTtemController;

        beforeAll(function () {
            module('jewelCrud')

        });
        beforeEach(inject(function ($rootScope, $compile, $http, $log, _itemController_) {
            scope = $rootScope.$new();
            compile = $compile;
            http = $http;
            log = $log;
            injectedTtemController = _itemController_;
        }))

        describe('init', function () {
            expect(injectedTtemController).toBeDefined()
        })

    })
})