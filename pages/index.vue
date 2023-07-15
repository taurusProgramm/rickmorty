<template>
    <div class="wrapper">
        <div v-for="(character, i) in characters" :key="character.id">
            <TheCharacterCard 
            :character="character"
            :episodes="episodes[i]"
            />
        </div>
        <div ref="observer" class="observer"></div>
        <div class="up"
        :style="{
            'opacity': isSeenUpArrow ? 1 : 0
        }"
        @click="scrollToTop"
        ></div>
    </div>
</template>

<script setup lang="ts">
    import ICharacter from '@/models/characterModel'
    import IPageResponse from '@/models/pageResponse'
    import IEpisode from '@/models/episodeModel'

    const characters = ref<ICharacter[]>([])
    const episodes = ref<IEpisode[][]>([])
    const page = ref(1)
    const observer = ref()
    const isSeenUpArrow = ref(false)
    
    const urlCharacters = `https://rickandmortyapi.com/api/character?page=`

    const fetchCharacters = async () => {
        const res = await $fetch(urlCharacters + String(page.value)) as IPageResponse
        characters.value = res.results 
        for (let character of characters.value){
            character.episode = character.episode.slice(0, 5) 
            let requests = character.episode.map(item => $fetch(item))
            let responses = await Promise.all(requests) as IEpisode[]
            episodes.value.push(responses)
        }
    }

    const fetchMoreCharacters = async () => {
        page.value = page.value + 1
        const res = await $fetch(urlCharacters + String(page.value)) as IPageResponse
        characters.value = [...characters.value, ...res.results] 
        for (let character of characters.value){
            character.episode = character.episode.slice(0, 5) 
            let requests = character.episode.map(item => $fetch(item))
            let responses = await Promise.all(requests) as IEpisode[]
            episodes.value = [...episodes.value, responses]
        }
    }

    if(process.client){
        window.onscroll = ()=>{
           isSeenUpArrow.value = window.scrollY < 80 ? false : true
        }
    }

    const scrollToTop = () => {
        if(process.client){
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }

    
    onMounted(()=>{
        fetchCharacters()
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = function(entries:any, observer:any) {
            if(entries[0].isIntersecting){
                fetchMoreCharacters()
                console.log('Пересёк'); 
            }
        };
        const intersectionObserver = new IntersectionObserver(callback, options);
        intersectionObserver.observe(observer.value)
    })
</script>

<style lang="scss" scoped>
    .wrapper{
        .observer{
            height: 30px;
            width: auto;
            background-color: transparent;
        }
        .up{
            position: fixed;
            bottom: 50px;
            right: 50px;
            height: 60px;
            width: 60px;
            border-radius: 50%;
            background-color: aqua;
            cursor: pointer;
            opacity: 0;
        }
    }
</style>