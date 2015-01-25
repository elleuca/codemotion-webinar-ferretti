var until = require('protractor').until;

describe('Manage non-Angular sites', function () {

    xit('can search on Google', function () {
        browser.get('http://www.google.com');
        expect(browser.driver.getTitle()).toBe('Google');

        element(by.name('q')).sendKeys('Codemotion');
        element(by.name('btnG')).click();

        browser.driver.wait(until.titleIs('Codemotion - Cerca con Google'), 1000);

        expect(browser.driver.getTitle()).toBe('Codemotion - Cerca con Google');
    });

    it('can drag elements', function() {
        browser.get('http://marcojakob.github.io/dart-dnd/basic/');

        var document = element(by.className('document'));
        var trash = element(by.className('trash'));

        browser.driver.actions()
            .mouseDown(document)
            .mouseMove(trash)
            .mouseUp()
            .perform();

        expect(element.all(by.className('document')).count()).toBe(3)
    });

    it('can wait for stuff to disappear', function () {
        browser.get('http://the-internet.herokuapp.com/dynamic_controls');

        element(by.cssContainingText('button', "Remove")).click();

        // YES, this will fail :)
        expect(element(by.id('checkbox')).isPresent()).toBeFalsy();
    });

});