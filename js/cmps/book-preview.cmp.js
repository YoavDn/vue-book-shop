export default {
    props:['book'],
    template: `
    <img :src="book.thumbnail" alt="">
        <h2 class="title">{{book.title}}</h2>
    `,
    data() {
        return {
        }
    },
    methods: {
    
    },
    computed: {
    },
    created() {

    }
}