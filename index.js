const { createApp } = Vue;

createApp({
    data() {
        return {
            characters: [],
            loading: false,
            searchText: '',
            nextPage: 1,
            selectedCharacter: null
        };
    },
    computed: {
        filteredCharacters() {
            return this.characters.filter(character =>
                character.name.toLowerCase().includes(this.searchText.toLowerCase())
            );
        }
    },
    methods: {
        async fetchCharacters() {
            this.loading = true;
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${this.nextPage}`);
                const data = await response.json();
                this.characters = [...this.characters, ...data.results];
                this.nextPage++;
            } catch (err) {
                console.error('Erro ao buscar personagens:', err);
            } finally {
                this.loading = false;
            }
        },
        async fetchCharacterDetails(url) {
            try {
                const response = await fetch(url);
                return await response.json();
            } catch (err) {
                console.error('Erro ao buscar detalhes do personagem:', err);
            }
        },
        async showCharacterDetails(character) {
            this.selectedCharacter = await this.fetchCharacterDetails(`https://rickandmortyapi.com/api/character/${character.id}`);
        },
        getStatusClass(status) {
            const statusClassMap = {
                Alive: 'alive',
                Dead: 'dead',
                unknown: 'unknown'
            };

            return statusClassMap[status] || '';
        }
    }
}).mount('#app');