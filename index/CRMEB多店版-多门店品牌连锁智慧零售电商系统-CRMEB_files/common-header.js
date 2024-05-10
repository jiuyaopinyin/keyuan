window.mixinsCommonHeader = {
  data() {
    return {
      userBox: false,
      user: {},
      headVisible: false,
    };
  },
  computed: {
    isScrollTop() {
      this.headVisible = false;
      this.bannerVisible = false;
      if (this.scrollTop !== undefined) {
        return this.scrollTop > 90;
      } else {
        return true;
      }
    },
    isOpcity() {
      let opcity = 100;
      let num;
      if (this.scrollTop < 90) {
        num = (opcity - this.scrollTop) / 100;
        return 1 - num;
      } else {
        return 1;
      }
    },
    isUser() {
      return location.pathname.indexOf("/user/user") !== -1;
    },
    isAskUser() {
      return location.pathname.indexOf("/ask/user") !== -1;
    },
    isAnswer() {
      return location.pathname === "/ask/thread/answer";
    },
    isIndex() {
      return location.pathname === "/ask" || location.pathname === "/ask/index";
    },
  },
  mounted() {
    let that = this;
    let clipboard = new ClipboardJS(".copy");
    clipboard.on("success", function (e) {
      //复制成功的回调
      e.clearSelection();
      that.$message.success("复制成功");
    });

    clipboard.on("error", function (e) {
      //复制失败的回调
      that.$message.success("复制失败");
    });
  },
  methods: {
    openUserBox() {
      this.userBox = true;
      this.getUser();
    },
    getUser() {
      getRequest("/api/pc/user_info", {}, false).then((res) => {
        this.user = res.data;
      });
    },
    longOut() {
      this.type = 0;
      this.status = 0;
      this.userInfo = {};
      this.userBox = false;
      this.user = {};
      window.loginStatus = this.loginStatus = false;
      localStorage.removeItem("token");
      this.setCookie("auth._token.local4");
      location.reload();
    },
    setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toGMTString();
      document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
    },
  },
};
