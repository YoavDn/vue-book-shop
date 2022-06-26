import bookJson from '../../books.json' assert {type: 'json'};
import {utilService} from './utils-service.js'

export const  bookService = {
    getBooks,
    query
}

function query() {
    
}

function getBooks(books) {
    // console.log(books);
    return  bookJson 
}