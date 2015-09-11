/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

//  Wrapped in anonymous function for DOM access
$(function() {
    //  Test suite for RSS feeds
    describe('RSS Feeds', function() {
        //  Tests that the 'allFeeds' object is defined
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        //  Loops through allFeeds and ensures each entry has a defined,
        //  non-empty url
        it('have defined URLs', function() {
            $.each(allFeeds, function( index, value ) {
                expect(value.url).toBeDefined();
                expect(value.url.length).toBeGreaterThan(0); 
            });
        });
        //  Loops through allFeeds and ensures each entry has a defined,
        //  non-empty name
        it('have defined names', function() {
            $.each(allFeeds, function( index, value ) {
                expect(value.name).toBeDefined();
                expect(value.name.length).toBeGreaterThan(0); 
            });
        }); 
    });
    describe('The menu', function() {
        //  Checks that the body is initially hidden
        it('is hidden by default', function() {
            expect($('body').attr('class')).toBe('menu-hidden');
        });
         //  Checks that the visiblity is toggled appropriately
         it('has its visibility toggled when clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').attr('class')).not.toBe('menu-hidden');
            $('.menu-icon-link').trigger('click');
            expect($('body').attr('class')).toBe('menu-hidden');
        });
    });   
    describe('Initial Entries', function() {
        //  Asynchronously load feed
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        // Checks content of the '.feed' element
        it('contain at least one entry', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
    describe('New Feed Selection', function() {
        //  Checks feed header, calls loadFeed(), then checks again
        var currentHeader; 
        beforeEach(function(done) {
            //  Moved assignment into body
            loadFeed(1, done); // Loads new feed
            currentHeader = $('.header-title').html();  
        });
        afterEach(function(done) {
            loadFeed(0, done); // resets to old feed
        });
        it('features new content when reloaded', function() {
            expect($('.header-title').html()).not.toBe(currentHeader);
        });
    });
}());
