describe('are we ok?', function () {
    it('should assert obvious', function () {
        expect(true).toBeTruthy();
    });
});

describe('Page Loading', function () {
    browser.get('');

    it('Should have a title', function () {
        expect(element(by.binding('name')).getText()).toEqual('Tested Facts');
    });

    it('Should have a fetch button', function () {
        var button = element(by.cssContainingText('button', 'Fetch'));

        expect(button.isPresent()).toBeTruthy();
        expect(button.isDisplayed()).toBeTruthy();
    });
});

describe('Fetch Button Interaction', function () {
    var firstFetch = [],
        secondFetch = [];

    it('Should fetch items on button click', function () {
        browser.refresh();
        expect(element.all(by.repeater('joke in data.value')).count()).toBe(1);
        element(by.cssContainingText('button', 'Fetch')).click();

        expect(element(by.binding('error'))).not.toBe('Error fetching facts :-(');
        expect(element.all(by.repeater('joke in data.value')).count()).toBe(5);

        element.all(by.repeater('joke in data.value').column('joke.id'))
            .each(function (elem) {
                elem.getText().then(function (id) {
                    firstFetch.push(id);
                });
            })
            .then(function () {
                expect(firstFetch.length).toBe(5);
            });

    });

    it('Should update items on second button click', function () {
        element(by.cssContainingText('button', 'Fetch')).click();

        element.all(by.repeater('joke in data.value').column('joke.id'))
            .each(function (elem) {
                elem.getText().then(function (id) {
                    secondFetch.push(id);
                });
            })
            .then(function () {
                expect(secondFetch.length).toBe(5);
                expect(secondFetch).not.toEqual(firstFetch);
            });
        browser.sleep(2000);
        expect(element.all(by.repeater('joke in data.value').column('joke.id')).first().getText()).not.toMatch(/\.$/);
    });
});

describe('Filter Input Interaction', function () {
    it('Should shrink items typing in input', function () {
        browser.refresh();
        var shrinkList = [];

        expect(element.all(by.repeater('joke in data.value')).count()).toBe(1);
        element(by.cssContainingText('button', 'Fetch')).click();

        expect(element.all(by.repeater('joke in data.value')).count()).toBe(5);
        element(by.model('searchString')).sendKeys('he');

        element.all(by.repeater('joke in data.value').column('joke.joke'))
            .each(function (elem) {
                elem.getText().then(function (joke) {
                    expect(joke.search(/he/)).toBeTruthy();
                    shrinkList.push(joke);
                });
            })
            .then(function () {
                expect(shrinkList.length <= 5).toBeTruthy();
            });
    });

    xit('Should restore all entries cleaning input', function () {
        element(by.model('searchString')).clear();
        expect(element.all(by.repeater('joke in data.value')).count()).toBe(5);
    });
});