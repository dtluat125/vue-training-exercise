<template>
  <nav>
    <router-link to="/">1.1</router-link> |
    <router-link to="/about">1.2</router-link> |
    <router-link to="/week2">Week 2</router-link>
  </nav>
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Epilogue&family=Inter&family=Poppins&family=Quicksand&display=swap");
.verticle-center {
  top: 50%;
  transform: translateY(-50%);
}

body {
  margin: 0;
}

* {
  margin: 0;
}

#app {
  font-family: Epilogue, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  height: auto;
  position: relative;
}

nav {
  padding: 30px;
  position: absolute;
  z-index: 1;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
