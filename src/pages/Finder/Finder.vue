<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <div class="error" v-if="error">
          <p>{{ error }}</p>
        </div>

        <search 
          :value="search" 
          placeholder="Type username..." 
          @search="search = $event"
          @get-repos="getRepos"
        />
        <button v-if="!repos" class="btn btnPrimary container__search" @click="getRepos">Search</button>
        <button v-else class="btn btnPrimary container__search" @click="getRepos">Search again</button>
        
        <div class="user-wrapper" v-if="user">
          <div class="user-info">
            <img class="user-info__img" :src="user.avatar_url" alt="avatar" />
            <p class="user-info__login">{{ user.login }}</p>
            <p class="user-info__text">Bio: {{ user.bio }}</p>
            <p class="user-info__text">Followers: {{ user.followers }}</p>
            <p class="user-info__text">Number of repositories: {{ user.public_repos }}</p>
          </div>
        </div>

        <div class="repos-wrapper" v-if="repos">
          <div class="repos-sort">
            <button class="repos-sort__button" @click="sort('name')">Name &#8595</button>
            <button class="repos-sort__button" @click="sort('stargazers_count')">Stars &#8595</button>
          </div>

          <div class="repos-item" v-for="repo of reposSort" :key="repo.id">
            <div class="repos-info">
              <a class="link" :href="repo.html_url" target="_blank">{{ repo.name }}</a>
              <span>{{ repo.stargazers_count }} ⭐</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="repos && page.arrows">
      <div class="container">
        <div class="button-list">
          <div class="btn btnPrimary" @click="prevPage">&#8592</div>
          <div class="btn btnPrimary" @click="nextPage">&#8594</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import search from '~/components/Search/Search.vue'

export default {
  components: {
    search,
  },
  data() {
    return {
      search: '',
      user: null,
      currentSort: 'name',
      currentSortDir: 'asc',
      page: {
        current: 1,
        length: 5,
        arrows: false,
      },
      repos: null,
      error: null,
    };
  },
  computed: {
    reposSort() {
      return this.repos.sort((a, b) => {
        let mod = 1;
        if (this.currentSortDir === 'desc') mod = -1;

        if (a[this.currentSort] < b[this.currentSort]) return -1 * mod;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * mod;

        return 0;
      }).filter((row, index = 0) => {
        let start = (this.page.current - 1) * this.page.length;
        let end = this.page.current * this.page.length;

        if (index >= start && index < end) return true;
      });
    },
  },
  methods: {
    getRepos() {
      Promise.all([
        axios.get(`https://api.github.com/users/${this.search.trim()}/repos`),
        axios.get(`https://api.github.com/users/${this.search.trim()}`)
      ]).then(([repos, user]) => {
        this.error = null;
        this.user = user.data;
        this.repos = repos.data;

        repos.data.length > 5 ? this.page.arrows = true : this.page.arrows = false;
      }).catch(error => {
        this.error = 'Can`t find this user';
        this.user = null;
        this.repos = null;
        this.page.arrows = false;
      });
    },
    sort(event) {
      if (event === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      };

      this.currentSort = event;
    },
    prevPage() {
      if (this.page.current > 1) this.page.current-=1;
    },
    nextPage() {
      if (this.page.current * this.page.length < this.repos.length) this.page.current+=1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Finder.module.scss';
</style>