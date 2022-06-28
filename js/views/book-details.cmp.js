import { bookService } from '../service/book-service.js'
import reviewAdd from '../cmps/review-add.cmp.js'

export default {
    template: `
        <router-link class="btn-back" :to="'/book/'"> &leftarrow; Back</router-link>
        <section v-if="book" class="book-detail-page">
            <img :src="book.thumbnail" alt="">
            <div class="book-details">
            <h2 class="book-age">{{bookAge}}</h2>
                <div class="title-details">
                    <h2 class="book-title" >{{book.title}}</h2>
                    <h2 v-if="book.listPrice.isOnSale" class="sale">SALE</h2>
                </div>
                <h4 class="book-authors">{{book.authors[0]}}</h4>
                <h3 class="book-price-details" >Price: <span class="book-price" :class="priceStyle">{{bookPrice}}</span></h3>
                <h3 class="book-cat">Categories: <span class="categories">{{bookCat}}</span></h3>
                <h3 class="description-title">Description</h3>
                <p class="book-description">{{book.description}}</p>
            </div> 
        </section>
        <section v-if="book.reviews" class="reviews">
            <h2 v-if="book.reviews">{{book.reviews.length -1}}: reviews</h2>
            <ul>
                <li v-for="rev in book.reviews">
                    <h2>{{rev.fullName}}</h2>
                    <h3>{{rev.rating}}</h3>
                    <p>{{rev.review}}</p>
                </li>
            </ul>

        </section>
        
        <button class="add-review-btn" @click="reviewOpen = true"> Add review <span>&#9998;</span> </button>
        <section v-if="book && reviewOpen" class="review-section" >
             <review-add @formSend="addReview" :book="book" />
         </section>
    `,
    components: {
        reviewAdd,
    },

    data() {
        return {
            book: null,
            reviewOpen: false,

        }
    },
    methods: {
        addReview(review) {
            bookService.addReview(this.book.id, review).then(book => this.book = book)

        }
    },
    computed: {
        bookPrice() {
            const amount = this.book.listPrice.amount
            const price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: this.book.listPrice.currencyCode }).format(amount)
            return price
        },

        priceStyle() {
            return { cheap: this.book.listPrice.amount < 20, exp: this.book.listPrice.amount > 120 }
        },
        bookCat() {
            const cat = this.book.categories

            return `${cat[0]}/${cat[1]}`
        },
        bookAge() {
            const currYear = new Date().getFullYear()
            if (currYear - this.book.publishedDate > 10) return "Vetaran book"
            if (currYear - this.book.publishedDate < 1) return 'New book'
        },
    },
    created() {
        const id = this.$route.params.bookId
        bookService.get(id).then(book => this.book = book)
    }
}