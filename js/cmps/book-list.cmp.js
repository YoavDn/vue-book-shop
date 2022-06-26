import bookPreview from './book-preview.cmp.js'


export default {
    props: ['books'],
    template: `
        <section class="book-list">
         <div v-for="book in books"  class="book">
             <book-preview  :book='book'/>
             <h2 v-if="book.listPrice.isOnSale" class="preview-sale">SALE</h2>
             <h2 class="preview-price" :class="priceStyle(book)" >{{bookPrice(book)}}</h2>
            <button class="details-btn" @click="select(book)">Details</button>
        </div>



        </section>
    `,
    components: {
        bookPreview
    }
    ,
    data() {
        return {

        }
    },
    methods: {
        select(book) {
            this.$emit('selected', book)
        },

        bookPrice(book) {
            const amount = book.listPrice.amount
            const price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: book.listPrice.currencyCode }).format(amount)
            return price
        },
        priceStyle(book) {
            if (book.listPrice.isOnSale) return 'red'

        }


    },
    computed: {

    },
    created() {

    }
}