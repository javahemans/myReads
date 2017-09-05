To Do:

0. Review the app structure prior to refactoring [DONE]
1. Remove state page to visit from app.js [DONE]
- Move the ternary logic of showSearchPage to individual components and render those components
    - Component 0: NB: The plus button here is to add a book to your bookshelf from an existing
    set of choices. It triggers search.
    - Component 1: SearchBooks
    - Component 2: ListBooks
2. Install ReactRouter
- Have ReactRouter replace the ternary logic to respond the URL
- Composition - Break apart ListBooks 
    - 2.1 BookShelf: (Based off ClassName) is a good component, it displays
    books that has been passed into it.
    - 2.2 Book: This displays the actual book and the associated control for it.

