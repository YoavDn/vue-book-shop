import { bookService } from '../service/book-service.js'
import { eventBus } from '../service/eventBus-service.js'

export default {
    template: `
    <h2 class="new-book-header" >Add new book</h2>
    <form @submit.prevent="search">
        <input v-model="query" type="search" placeholder="Search">
        <button>go</button>
    </form>
        <section v-if="googleBooks" class="google-options">

           <div v-for="book in googleBooks" class="book-option"> 
            <h2>{{book.volumeInfo.title}}</h2>
            <button @click="addBook(book)">Add book</button>
           </div>


        </section>
    `,
    data() {
        return {
            query: '',
            googleBooks: null
        }
    },
    methods: {
        search() {
            bookService.getBookByQuery(this.query).then(books => this.googleBooks = books)
        },
        addBook(book) {
            bookService.addGoogleBook(book)
            eventBus.emit('show-msg', { txt: `${book.volumeInfo.title}, added`, type: 'success' })
        }
    },
    computed: {
    },
}