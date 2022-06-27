import { bookService } from '../service/book-service.js'
import bookList from '../cmps/book-list.cmp.js'
import bookDetails from './book-details.cmp.js'
import bookFilter from '../cmps/book-filter.cmp.js'

export default {
    template: `
    <book-filter v-if="!selectedBook" @filtered="filterBook"/>
    <book-list v-if="!selectedBook" :books="booksToDisplay" />
    <book-details v-if="selectedBook" @close="closed"  />
    `,
    components: {
        bookList,
        bookDetails,
        bookFilter,
    },
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: null,
        }
    },
    created() {
        bookService.query().then(books => this.books = books)
    }
    ,
    methods: {
        selectBook(book) {

            this.selectedBook = book
        },
        closed() {
            this.selectedBook = null
        },
        filterBook(filterBy) {
            console.log(filterBy);
            this.filterBy = filterBy;
        }

    },
    computed: {
        booksToDisplay() {
            if (!this.filterBy) return this.books;
            const regex = new RegExp(this.filterBy.name, "i");
            return this.books.filter((book) => {
                return regex.test(book.title) && book.listPrice.amount > this.filterBy.price
            });
        },
    },
}