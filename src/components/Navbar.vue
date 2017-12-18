<template>
  <div class="navbar">
    <span class="nav-back"><i class="fa fa-lg fa-chevron-left" aria-hidden="true"></i></span>
    <a href="/#/">
        <h4 class="nav-title">Parrot Buddy</h4>
    </a>
    <span class="nav-settings">
        <a href="/#/settings">
            <i class="fa fa-lg fa-cog" aria-hidden="true"></i>
        </a>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .navbar {
        background-color: #092046;
        color: #ffffff;
        padding: 20px 0px;
        display: flex;
        position: fixed;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        z-index: 1000;
        .nav-title {
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
            margin-bottom: 0px;
            color: #ffffff;
        }
        .nav-back {
            height: 20px;
            width: 20px;
            margin-left: 20px;
        }
        .nav-settings {
            height: 20px;
            width: 20px;
            margin-right: 20px;
            a {
                color: #ffffff;
            }
        }
    }
</style>
