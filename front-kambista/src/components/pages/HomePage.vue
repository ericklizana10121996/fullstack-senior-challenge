<template>
    <div>
        <Header/>
        <HomeDinamic />
        <Footer />
    </div>
</template>
<script>
import Header from '../generics/Header.vue';
import Footer from '../generics/Footer.vue';
import HomeDinamic from '../dinamics/Home.vue';

export default {
    components: { 
        Header,
        HomeDinamic,
        Footer
    },
    name: "HomePage"
}
</script>