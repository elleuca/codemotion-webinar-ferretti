var HomePage = require('./app.po.js');

describe('Test Homepage', function () {
    var hp = new HomePage();

    describe('Check page elements', function () {
        it('should load the page', function() {
            hp.load();
        });
        it('should have app title', function () {
            expect(hp.name.getText()).toEqual('Tested Facts');
        });
        it('should have doFetch button', function () {
            expect(hp.fetchButton.isDisplayed()).toBeTruthy();
        });
        it('should have filter input', function () {
            expect(hp.filterInput.isDisplayed()).toBeTruthy();
        });
        it('should have one loaded fact', function () {
            expect(hp.loadedFacts.count()).toBe(1);
            expect(hp.isShowingIntro()).toBeTruthy();
        });
    });

    describe('Interact with Fetch Button', function () {
        var firstFetch;

        it('should fetch items clicking on button', function () {
            hp.doFetch();
            expect(hp.isShowingFetchMessageError()).toBeFalsy();
            expect(hp.loadedFacts.count()).toBe(5);
            hp.getCurrentFacts().then(function(current) {
                firstFetch = current;
            });
        });
        it('should replace intro fact', function () {
            expect(hp.isShowingIntro()).toBeFalsy();
        });
        it('should update items clicking again on button', function () {
            hp.doFetch();
            hp.getCurrentFacts().then(function(secondFetch) {
                expect(secondFetch).not.toEqual(firstFetch);
            });
        });
    });

    describe('Interact with Filter Input', function () {
        it('should shrink item list typing in input', function () {
            hp.load();
            expect(hp.isShowingIntro()).toBeTruthy();
            hp.doFetch();
            expect(hp.isShowingIntro()).toBeFalsy();

            hp.doFilterBy('he');
            expect(hp.isFilteringFacts('he')).toBeTruthy();
        });
    });

});