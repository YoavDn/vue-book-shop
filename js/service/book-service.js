import { utilService } from './utils-service.js';
import { storageService } from './async-storage-service.js';

const BOOK_KEY = 'books';
_createBooks();

export const bookService = {
    query,
    remove,
    save,
    get,
    addReview,
    getBookByQuery,
    addGoogleBook
};

function query() {
    return storageService.query(BOOK_KEY)
    // return utilService.loadFromStorage(BOOK_KEY);
}

function addReview(bookId, review) {



    return get(bookId).then(book => {
        if (!book.reviews) book.reviews = []
        book.reviews.push(review);
        return save(book)
    })

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

        books = fetch('books.json').then(res => res.json())
            .then(res => utilService.saveToStorage(BOOK_KEY, res))

    }
    return books
}

function getBookByQuery(query) {
    const regex = new RegExp(query, "i");

    return fetch('demo-api.json').then(res => res.json())
        .then(allBooks => {
            return allBooks.items.filter(book => {
                return regex.test(book.volumeInfo.title)
            })
        })
}

function addGoogleBook(book) {
    console.log(book);
    const { title, pageCount, authors, description, categories } = book.volumeInfo

    const newBook = {
        id: book.id,
        title,
        authors,
        publishedDate: book.volumeInfo.publishedDate.substring(0, 4),
        description,
        categories,
        pageCount,
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        listPrice: {
            amount: 150,
            currencyCode: 'ILS',
            isOnSale: false,
        }
    }
    storageService.post(BOOK_KEY, newBook)

}