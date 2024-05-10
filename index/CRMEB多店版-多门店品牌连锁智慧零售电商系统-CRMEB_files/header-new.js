// window.BASE_USER = 'http://www.jd.crmeb.com'
$(function () {
  new Vue({
    el: "#header-text",
    data() {
      let isScrollTop = location.pathname === "/market/index" || location.pathname === "/market";
      return {
        lock: false,
        loginStatus: false,
        userInfo: {},
        type: 0,
        status: 0,
        number: 0,
        newsList: [],
        userTab: false,
        notice: false,
        search: "",
        isScrollTop: true,
        searchShow: true,
      };
    },
    mixins: [window.mixinsCommonHeader],
    computed: {
      isUser() {
        return location.pathname.indexOf("/user/user") !== -1;
      },
    },
    mounted() {
      window.loginAfter = this.loginAfterFn;
      window.loginBefore = this.loginBeforeFn;
      window.loginStatus = this.loginStatus = !!localStorage.getItem("token");
      if (this.loginStatus) {
        this.getUserInfo();
        this.getNewsUnList();
      }
      this.eventScrollTop();
      // 监听页面滚动
      let that = this;
      window.addEventListener("scroll", function () {
        that.eventScrollTop();
      });
    },
    methods: {
      eventScrollTop() {
        let that = this;
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        if (location.pathname === "/market/index" || location.pathname === "/market") {
            if (scrollTop > 60) {
                this.searchShow = true;
              } else {
                this.searchShow = false;
              }
        }
      },
      openSearch() {
        if (!this.search) {
          return this.$message.info("请输入搜索内容");
        }
        location.href = "/user/allSearch/" + this.search;
      },
      noticeEvent() {
        this.notice = true;
      },
      outnotice() {
        this.notice = false;
      },
      getCookie(cookieName) {
        var totalCookie = document.cookie;
        var cookieStartAt = totalCookie.indexOf(cookieName + "=");
        if (cookieStartAt == -1) {
          return;
        }
        var valueStartAt = totalCookie.indexOf("=", cookieStartAt) + 1;
        var valueEndAt = totalCookie.indexOf(";", cookieStartAt);
        if (valueEndAt == -1) {
          valueEndAt = totalCookie.length;
        }
        var cookieValue = unescape(
          totalCookie.substring(valueStartAt, valueEndAt)
        );
        return cookieValue;
      },
      getUserInfo() {
        let spread_uid = this.getCookie("spread_uid");
        getRequest(
          "/api/user",
          { spread_uid: spread_uid ? spread_uid : 0 },
          false
        )
          .then((res) => {
            this.loginStatus = true;
            this.userInfo = res.data;
            this.getMarketStatus();
            this.getUser();
          })
          .catch((res) => {
            if ([410000, 410001, 410002].indexOf(res.status) !== -1) {
              window.loginStatus = this.loginStatus = false;
            }
          });
      },
      getMarketStatus() {
        getRequest("/api/market/agent/status").then((res) => {
          this.type = res.data.type;
          this.status = res.data.status;
        });
      },
      getNewsUnList() {
        getRequest(
          "/api/market/article/unread",
          {
            page: 1,
            limit: 5,
          },
          false
        ).then((res) => {
          this.number = res.data.count;
          this.newsList = res.data.list;
        });
      },
      loginAfterFn() {
        this.getUserInfo();
        this.getNewsUnList();
      },
      loginBeforeFn() {
        this.loginStatus = false;
        this.userInfo = {};
      },
      intuser() {
        if (this.loginStatus) {
          this.lock = true;
        }
      },
      outuser() {
        this.lock = false;
      },
      login() {
        window.commonLogin(true);
      },
    },
  });
});
