<template>
  <div>
    <div @contextmenu.prevent.stop="showContextMenu">
      <slot> </slot>
    </div>
    <div ref="contextMenu" class="context-menu">
      <input
        ref="contextMenuInput"
        class="context-menu__search-panel"
        type="text"
        v-model="searchPanelInput"
        placeholder="Select for a person ..."
      />
      <div @contextmenu.prevent class="context-menu__menu-title">
        Select a person
      </div>
      <div
        v-for="item of filteredMenuList"
        :key="item.id"
        ref="menuItems"
        @keyup.enter="onSelect(item.id)"
        tabindex="0"
        @contextmenu.prevent
        @click="onSelect(item.id)"
        class="context-menu__menu-item"
      >
        <img class="context-menu__menu-item-img" :src="item.imgUrl" alt="" />
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuList: Array,
  },
  data() {
    return { contextMenu: null, searchPanelInput: "", open: true };
  },
  mounted() {
    this.contextMenu = this.$refs.contextMenu;
    window.addEventListener("click", this.hideContextMenu);
    document.addEventListener("keyup", this.onTabChange);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.hideContextMenu);
    document.removeEventListener("keyup", this.onTabChange);
    // window.removeEventListener("contexmenu", this.hideContextMenu);
  },
  methods: {
    showContextMenu(e) {
      let allContextMenu = document.querySelectorAll(".context-menu");
      allContextMenu.forEach((menu) => {
        menu.classList.remove("context-menu_active");
      });

      const menuItems = this.$refs.menuItems;
      menuItems.forEach((item) => {
        item.classList.remove("context-menu__menu-item_focused");
      });
      this.contextMenu.style.top = (e.pageY || e.clientY) + "px";
      this.contextMenu.style.left = (e.pageX || e.clientX) + "px";
      this.contextMenu.classList.add("context-menu_active");
      this.$refs.contextMenuInput.focus();
      this.isOpen = true;
    },
    onFocus(e) {
      const menuItems = this.$refs.menuItems;
      menuItems.forEach((item) => {
        item.classList.remove("context-menu__menu-item_focused");
      });
      if (menuItems.includes(e.target))
        e.target.classList.add("context-menu__menu-item_focused");
      else console.log("onFocus", e);
    },
    onSelect(id) {
      this.$emit("on-select", id);
      this.hideContextMenu();
    },
    onTabChange(e) {
      if (e.keyCode == 9) {
        e.preventDefault();
        const menuItems = this.$refs.menuItems;
        menuItems.forEach((item) => {
          item.classList.remove("context-menu__menu-item_focused");
        });
        console.log("e.target", e.target);
        if (menuItems.includes(e.target))
          e.target.classList.add("context-menu__menu-item_focused");
        else {
          this.hideContextMenu();
        }
      }
    },
    hideContextMenu() {
      console.log("remove");
      this.contextMenu.classList.remove("context-menu_active");
      this.searchPanelInput = "";
      this.isOpen = false;
    },
  },
  computed: {
    filteredMenuList() {
      return this.menuList.filter((item) =>
        item.name.toLowerCase().includes(this.searchPanelInput.toLowerCase())
      );
    },
  },
  // watch: {
  //   filteredMenuList() {
  //     console.log("filteredMenuList", this.filteredMenuList);
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.context-menu {
  font-family: Roboto;
  position: fixed;
  z-index: 10000;
  width: 250px;
  //   background-color: #1b1a1a;
  transform: scale(0);
  transform-origin: top left;
  -webkit-box-shadow: 0px 7px 14px 0px rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 0px 7px 14px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 0px 7px 14px 0px rgba(50, 50, 50, 0.75);
  &_active {
    transform: scale(1);
    transition: transform 200ms ease-in-out;
  }
  &__search-panel {
    font-family: Roboto;
    // text-indent: 3px;
    padding: 15px 10px;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    width: 100%;
  }
  &__search-panel:focus {
    outline: none;
    background: #f7f7f5;
    border: 1px solid #ededeb;
  }
  &__menu-title {
    color: #9a9a9a;
    padding: 8px 10px;
    font-size: 12px;
  }
  &__menu-item {
    cursor: pointer;
    color: #5b5b5b;
    display: flex;
    align-items: center;
    padding: 8px 10px;
    font-size: 15px;
  }
  &__menu-item:hover,
  &__menu-item_focused {
    outline: none;
    background-color: #555;
    color: white;
  }
  &__menu-item i {
    display: inline-block;

    margin-right: 5px;
  }
  &__menu-item-img {
    width: 25px;
    border-radius: 50%;
    margin-right: 10px;
  }
  &__hr {
    margin: 2px 0;
    border-color: #555;
  }
}
</style>
