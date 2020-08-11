<template>
  <div class="wrapper-search">
    <div class="search">
      <div class="search-icon">
        <svg class="search-icon__svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
    </div>
    
    <input 
      class="wrapper-search__input" 
      type="text" 
      :placeholder="placeholder" 
      v-model="search"
      @keyup.enter="$emit('get-repos')"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Search',
    },
  },
  data() {
    return { 
      search: this.value,
    };
  },
  watch: {
    search(val) {
      this.$emit('search', val);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Search.module.scss';
</style>