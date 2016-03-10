(function( window, util, Book) {
    var Book = Book || {};

    Book.Config = function(config) {
        var booklist = new Book.List(config.BookName);
        var rooter = new Book.Rooter(config.BookFile);
        var dropdown = new Book.Dropdown(Book.Font, Book.BgColor);
        var bookrender = new Book.Render(rooter, dropdown);
        Book.INDEX = config.HomePage;

        for(var key in config.Content) {
            booklist.addList(config.Content[key]);
        }
        Book.init(booklist, bookrender);
    };

    window.Book.Config = Book.Config;
})( window, util, Book);