function HomePage () {
    this.name = element(by.binding('name'));
    this.fetchButton = element(by.cssContainingText('button', 'Fetch'));
    this.filterInput = element(by.model('searchString'));
    this.loadedFacts = element.all(by.repeater('joke in data.value'));
    this.fetchErrorMessage = element(by.binding('error'));
}

var proto = HomePage.prototype;

proto.load = function load() {
    return browser.get('');
};

proto.doFetch = function doFetch() {
    this.fetchButton.click();
};

proto.doFilterBy = function doFilterBy(text) {
    this.filterInput.sendKeys(text);
};

proto.getCurrentFacts = function getCurrentFacts() {
    var defer = protractor.promise.defer();

    this.loadedFacts.map(function (elm) {
        return {
            'id': elm.element(by.css('.fact-title')).getText(),
            'joke': elm.element(by.css('.fact-body')).getText()
        };
    }).then(function(mappedObject) {
        defer.fulfill(mappedObject);
    });

    return defer;
};

proto.isShowingIntro = function isShowingIntro() {
    var intro = this.loadedFacts.first();

    intro.isDisplayed();
    return intro.getText().then(function (textIntro) {
        return textIntro.match(/^Fact #0/i);
    });
};

proto.isShowingFetchMessageError = function isShowingFetchMessageError() {
    this.fetchErrorMessage.isDisplayed();
    return this.fetchErrorMessage.getText().then(function(errorMessage) {
        return errorMessage.match(/^Error fetching facts :\-\($/)
    })
};

proto.isFilteringFacts = function isFilteringFacts(typedText) {
    var defer = protractor.promise.defer(),
        regexp = new RegExp(typedText),
        count = 0;

    this.getCurrentFacts().then(function (currentItems) {
        for (var i = 0; i < currentItems.length ; ++i) {
            if (currentItems[i].joke.toLowerCase().match(regexp)) {
                count++;
            }
        }
        defer.fulfill(count === currentItems.length);
    });
    return defer;
};

module.exports = HomePage;