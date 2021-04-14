<template>
  <div id="app">
    <div class="container">
      <vContextMenu :menuList="menuList2" @on-select="onMenuItemSelect">
        <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
        <!-- <div ref="logo" style="width:500px;height:500px;background:red;"></div> -->

        <vContextMenu
          v-if="show"
          :menuList="menuList1"
          @on-select="onMenuItemSelect"
        >
          <!-- <button>
          test
        </button> -->
          <span>test</span>
        </vContextMenu>
        <button style="margin-top:252px" @click="show = !show">click me</button>
      </vContextMenu>
    </div>
  </div>
</template>

<script>
import vContextMenu from "./components/v-context-menu";
export default {
  name: "App",
  components: {
    vContextMenu,
  },
  data() {
    return {
      show: true,
      menuList1: [
        {
          id: 1,
          imgUrl:
            "https://www.shoppingcentreawards.com/wp-content/uploads/2015/06/people-img10.jpg",
          name: "Anna",
        },
        {
          id: 2,
          imgUrl:
            "https://www.shoppingcentreawards.com/wp-content/uploads/2015/06/people-img6.jpg",
          name: "Bob",
        },
        {
          id: 3,
          imgUrl:
            "https://sc-ventures.com/wp-content/uploads/2015/10/img-people-300x300.jpg",
          name: "Mark",
        },
      ],
      menuList2: [
        {
          id: 1,
          imgUrl:
            "https://cdn-1.heroine.ru/xy3OZbv3yxGkexQutDmek5X3wqeFXL9czOp5frk4HJE/rs:fill:765:729:0/g:ce:0:0/c:0:0/aHR0cHM6Ly9oZXJvaW5lLnJ1L3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE2LzExLzEwLzYtMS5wbmc?origin=2016/11/10/6-1.png",
          name: "Nina",
        },
        {
          id: 2,
          imgUrl:
            "https://www.agentur-reuter.com/wp-content/uploads/2015/05/Micheal-Mendl-02.jpg",
          name: "Michael",
        },
      ],
    };
  },

  mounted() {},
  destroyed() {},
  methods: {
    onMenuItemSelect(id) {
      console.log("id", id);
    },
  },
};
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  margin-top: 20px;
}
.container {
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
