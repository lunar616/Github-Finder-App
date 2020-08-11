<template>
  <div class="wrapper">
    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content">
            <div class="logo">GITHUB FINDER</div>
            <ul class="navbar-list">
              <li class="navbar-item" v-for="link of links" :key="link.title">
                <router-link class="navbar-link" :tittle="link.title" :to="link.url">{{ link.title }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
 data() {
    return {
      links: [
        {
          title: 'Home',
          url: '/',
        },
        {
          title: 'Finder',
          url: '/Finder',
        },
      ],
    };
  },
};
</script>