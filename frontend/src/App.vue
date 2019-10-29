<template>
  <div id="app">
    <div id="navBar">
      <img src="./assets/POLKT.jpg" id="navLogo">
    </div>
    <router-view></router-view>
  </div>
</template>

<style>
  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    overflow: hidden;
    font-family: 'Quicksand';
  }

  #navBar {
    position: absolute;
    top: 0;
    height: 60px;
    width: 100%;
    text-align: center;
  }

  #navLogo {
    height: 60%;
    padding: 10px;
    width: auto;
  }

  @media (max-width: 600px) { 
    #navBar {
      height: 8vh;
    }
  }
</style>
