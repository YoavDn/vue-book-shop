import { utilService } from './utils-service.js';
import { storageService } from './async-storage-service.js';

const BOOK_KEY = 'books';
_createBooks();

export const bookService = {
    query,
    remove,
    save,
    get
};

function query() {
    return storageService.query(BOOK_KEY)
    // return utilService.loadFromStorage(BOOK_KEY);
}

function remove(bookId) {
    // return Promise.reject('Big Error Badd')
    return storageService.remove(BOOK_KEY, bookId)
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) return storageService.put(BOOK_KEY, book)
    else return storageService.post(BOOK_KEY, book)
}



function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY);
    if (!books || !books.length) {

        books = fetch('books.json').then(res => {

            return res.json()
        })
            .then(res => utilService.saveToStorage(BOOK_KEY, res))

    }
    return books
}



