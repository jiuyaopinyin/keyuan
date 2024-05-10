//页面滑动头部变色
function menuBgWhite() {
  $("#menu").css({ background: "#fff " });
  $("#menu .nav_text")
    .css({ color: "#000" })
    .hover(
      function () {
        $(this).addClass("nav_text_active");
      },
      function () {
        $(this).removeClass("nav_text_active");
      }
    );
  $("#menu .nav_btn").css({ backgroundColor: "#2A7EFB", color: "#fff" });
  $("#menu .login_text").css({ color: "#2A7EFB" });
  $("#menu .logo").attr("src", "/static/images/dark_logo.png");
  $("#menu .ask-logo").attr("src", "/static/images/ask_dark_logo.png");
}
function menuBgDark() {
  $("#menu").css({ background: "rgba(0,0,0,.1)" });
  $("#menu .nav_text")
    .css({ color: "#fff" })
    .hover(function () {
      $(this).removeClass("nav_text_active");
    });
  $("#menu .nav_btn").css({ backgroundColor: "#fff", color: "#2A7EFB" });
  $("#menu .login_text").css({ color: "#fff" });
  $("#menu .logo").attr("src", "/static/images/logo.png");
  $("#menu .ask-logo").attr("src", "/static/images/ask_logo.png");
}
$(window).scroll(function () {
  var heightTop = $(document).scrollTop();
  if (heightTop > 10) {
    menuBgWhite();
  } else {
    menuBgDark();
  }
  if (heightTop > 50) {
    $("#backTop").removeClass("d-none");
  } else {
    $("#backTop").addClass("d-none");
  }
});
/**
if(window.location.pathname.includes('/cpc') || sessionStorage.getItem('promotion')){
	$('#side .land_kefu').show();
	// $('#side .gitee_down').hide();
}else{
	$('#side .land_kefu').hide();
	// $('#side .gitee_down').show();
}
 */
//头部事件
$("#product_center").hover(
  function () {
    $(this)
      .find(".iconfont")
      .removeClass("iconxiala")
      .addClass("iconxiala-copy");
    // $('.menu_product_box').removeClass('d-none')
    $(".menu_product_box").slideDown();
    // if ($(document).scrollTop() < 10) {
    // 	menuBgWhite()
    // }
  },
  function () {
    $(this)
      .siblings()
      .hover(function () {
        // $('.menu_product_box').addClass('d-none')
        $(".menu_product_box").slideUp();
        $("#product_center")
          .find(".iconfont")
          .removeClass("iconxiala-copy")
          .addClass("iconxiala");
        // if ($(document).scrollTop() < 10) {
        // 	menuBgDark();
        // }
      });
  }
);
$(".menu_product_box").hover(
  function () {},
  function () {
    // $('.menu_product_box').addClass('d-none')
    $(".menu_product_box").slideUp();
    $("#product_center")
      .find(".iconfont")
      .removeClass("iconxiala-copy")
      .addClass("iconxiala");
    // if ($(document).scrollTop() < 10) {
    // 	menuBgDark();
    // }
  }
);
$("#cooperation").hover(
  function () {
    $(this)
      .find(".iconfont")
      .removeClass("iconxiala")
      .addClass("iconxiala-copy");
    $(".hezuo_contnet").slideDown();
  },
  function () {
    $(".hezuo_contnet").slideUp();
    $("#cooperation")
      .find(".iconfont")
      .removeClass("iconxiala-copy")
      .addClass("iconxiala");
  }
);
$("#help").hover(
  function () {
    $(this)
      .find(".iconfont")
      .removeClass("iconxiala")
      .addClass("iconxiala-copy");
    $(".help_contnet").slideDown();
    // if ($(document).scrollTop() < 10) {
    // 	menuBgWhite();
    // }
  },
  function () {
    $(this)
      .siblings()
      .hover(function () {
        $(".help_contnet").slideUp();
        $("#help")
          .find(".iconfont")
          .removeClass("iconxiala-copy")
          .addClass("iconxiala");
        // if ($(document).scrollTop() < 10) {
        // 	menuBgDark();
        // }
      });
  }
);
$(".help_contnet").hover(
  function () {},
  function () {
    $(".help_contnet").slideUp();
    $("#help")
      .find(".iconfont")
      .removeClass("iconxiala-copy")
      .addClass("iconxiala");
    // if ($(document).scrollTop() < 10) {
    // 	menuBgDark();
    // }
  }
);
//proview
var tableArr = [
    { name: "H5端", link: "http://v5.crmeb.net", account: "-", password: "-" },
    { name: "PC端", link: "http://v5.crmeb.net", account: "-", password: "-" },
    {
      name: "APP演示",
      link: "http://app.crmeb.cn/bzv",
      account: "-",
      password: "-",
    },
    {
      name: "演示后台",
      link: "http://v5.crmeb.net/admin",
      account: "demo",
      password: "crmeb.com",
    },
  ],
  tbody_html = "";
for (let j = 0; j < tableArr.length; j++) {
  tbody_html += `
		<tr>
			<td class="text-center">${tableArr[j].name}</td>
			<td class="p-l-40">
				<a href="${tableArr[j].link}" target="_blank" rel="opener" style="color:#2A7EFB;">${tableArr[j].link}</a>
			</td>
			<td class="text-center">${tableArr[j].account}</td>
			<td class="text-center">${tableArr[j].password}</td>
		</tr>
	`;
}
$("#proview_body").html(tbody_html);
var codeList = [
    {
      img: "/static/images/criteria_qrcode_miniprogram.png",
      name: "小程序演示",
    },
    { img: "/static/images/criteria_qrcode_h5.png", name: "H5演示" },
    { img: "/static/images/criteria_qrcode_app.png", name: "APP演示" },
  ],
  code_html = "";
for (let j = 0; j < codeList.length; j++) {
  code_html += `
		<div class="proview_qrcode flex flex-column flex-justify-center align-center">
			<img class="w-100 h-100" src="${codeList[j].img}" alt="">
			<p class="tit">${codeList[j].name}</p>
		</div>
	`;
}
$("#code_list").html(code_html);
$("#proview").hover(
  function () {
    $(".proview_content").slideDown();
    // if ($(document).scrollTop() < 10) {
    // 	menuBgWhite();
    // }
  },
  function () {
    $(this)
      .siblings()
      .hover(function () {
        $(".proview_content").slideUp();
        // if ($(document).scrollTop() < 10) {
        // 	menuBgDark();
        // }
      });
    $(this)
      .parent()
      .siblings()
      .hover(function () {
        $(".proview_content").slideUp();
        // if ($(document).scrollTop() < 10) {
        // 	menuBgDark();
        // }
      });
  }
);
$(".proview_content").hover(
  function () {},
  function () {
    $(".proview_content").slideUp();
    // if ($(document).scrollTop() < 10) {
    // 	menuBgDark();
    // }
  }
);
$(".proview_content .pro_item").click(function () {
  $(this).addClass("active").siblings().removeClass("active");
  $("#fun").empty();
  $("#code_list").empty();
  var tbody_html = "",
    tableArr = [],
    codeList = [],
    code_html = "";
  switch (this.id) {
    case "oa":
      window.open("https://www.tuoluojiang.com");
      break;
    case "v4":
      tableArr = [
        {
          name: "H5端",
          link: "http://v5.crmeb.net",
          account: "-",
          password: "-",
        },
        {
          name: "PC端",
          link: "http://v5.crmeb.net",
          account: "-",
          password: "-",
        },
        {
          name: "APP演示",
          link: "http://app.crmeb.cn/bzv",
          account: "-",
          password: "-",
        },
        {
          name: "管理后台",
          link: "http://v5.crmeb.net/admin",
          account: "demo",
          password: "crmeb.com",
        },
      ];
      codeList = [
        {
          img: "/static/images/criteria_qrcode_miniprogram.png",
          name: "小程序演示",
        },
        { img: "/static/images/criteria_qrcode_h5.png", name: "H5演示" },
        { img: "/static/images/criteria_qrcode_app.png", name: "APP演示" },
      ];
      break;
    case "single":
      tableArr = [
        {
          name: "H5端",
          link: "https://pro.crmeb.net",
          account: "-",
          password: "-",
        },
        {
          name: "PC端",
          link: "https://pro.crmeb.net",
          account: "-",
          password: "-",
        },
        {
          name: "APP演示",
          link: "http://app.crmeb.cn/crmebpro",
          account: "-",
          password: "-",
        },
        {
          name: "管理后台",
          link: "https://pro.crmeb.net/admin",
          account: "demo",
          password: "crmeb.com",
        },
      ];
      codeList = [
        { img: "/static/images/pro_qrcode_h5.png", name: "H5演示" },
        {
          img: "/static/images/pro_qrcode_miniprogram.jpg",
          name: "小程序演示",
        },
        { img: "/static/images/pro_store/pro_app_qrcode.png", name: "APP演示" },
      ];
      break;
    case "pro_crmeb":
      tableArr = [
        {
          name: "H5端",
          link: "http://multi-store.crmeb.net",
          account: "-",
          password: "-",
        },
        {
          name: "PC端",
          link: "http://multi-store.crmeb.net",
          account: "-",
          password: "-",
        },
        {
          name: "APP演示",
          link: "http://app.crmeb.cn/multistore",
          account: "-",
          password: "-",
        },
        {
          name: "管理后台",
          link: "http://multi-store.crmeb.net/admin",
          account: "demo",
          password: "crmeb.com",
        },
        {
          name: "门店后台",
          link: "http://multi-store.crmeb.net/store",
          account: "demo",
          password: "crmeb.com",
        },
        {
          name: "收银台登录",
          link: "http://multi-store.crmeb.net/cashier",
          account: "demo",
          password: "crmeb.com",
        },
        {
          name: "供应商后台",
          link: "http://multi-store.crmeb.net/supplier/home/index",
          account: "supplier",
          password: "crmeb.com",
        },
      ];
      codeList = [
        {
          img: "/static/images/pro_store/routine_qrcode.png",
          name: "小程序演示",
        },
        { img: "/static/images/pro_store/h5_qrcode.png", name: "H5演示" },
        { img: "/static/images/pro_store/app_qrcode.png", name: "APP演示" },
      ];
      break;
    case "merchant":
      tableArr = [
        {
          name: "H5端",
          link: "http://mer.crmeb.net",
          account: "-",
          password: "-",
        },
        {
          name: "PC端",
          link: "http://mer.crmeb.net",
          account: "-",
          password: "-",
        },
        {
          name: "APP演示",
          link: "http://app.crmeb.cn/Mer",
          account: "-",
          password: "-",
        },
        {
          name: "管理后台",
          link: "http://mer.crmeb.net/admin/",
          account: "demo",
          password: "crmeb.com",
        },
        {
          name: "子商户后台",
          link: "http://mer.crmeb.net/merchant/",
          account: "demo",
          password: "crmeb.com",
        },
      ];
      codeList = [
        { img: "/static/images/mer/routine.jpg", name: "小程序演示" },
        { img: "/static/images/mer/app.png", name: "APP演示" },
        { img: "/static/images/mer/h5.png", name: "h5演示" },
      ];
      break;
    case "java":
      tableArr = [
        {
          name: "H5端",
          link: "https://h5.merchant.java.crmeb.net",
          account: "-",
          password: "-",
        },
        {
          name: "PC端",
          link: "https://pc.merchant.java.crmeb.net",
          account: "-",
          password: "-",
        },
        {
          name: "APP演示",
          link: "https://www.pgyer.com/3Euv",
          account: "-",
          password: "-",
        },
        {
          name: "管理后台",
          link: "https://admimplat.merchant.java.crmeb.net",
          account: "demo",
          password: "crmeb.com",
        },
        {
          name: "子商户后台",
          link: "https://adminmer.merchant.java.crmeb.net",
          account: "18292417675",
          password: "000000",
        },
      ];
      codeList = [
        {
          img: "/static/images/java_mer/java_mer_routine.jpg",
          name: "小程序演示",
        },
        { img: "/static/images/java_mer/java_mer_app.png", name: "APP演示" },
      ];
      break;
    case "zhishifufei":
      tableArr = [
        {
          name: "H5端",
          link: "http://zhishifufei.crmeb.net",
          account: "-",
          password: "-",
        },
        {
          name: "PC端",
          link: "http://zhishifufei.crmeb.net",
          account: "-",
          password: "-",
        },
        {
          name: "管理后台",
          link: "http://zhishifufei.crmeb.net/admin",
          account: "demo",
          password: "crmeb.com",
        },
      ];
      codeList = [{ img: "/static/images/zsff_qrcode_h5.png", name: "H5演示" }];
      break;
    case "java_app":
      tableArr = [
        {
          name: "H5端",
          link: "http://java.crmeb.net",
          account: "-",
          password: "-",
        },
        // {name:"PC端",link:"http://java.crmeb.net",account:"-",password:"-"},
        {
          name: "APP演示",
          link: "https://www.pgyer.com/5071283077",
          account: "-",
          password: "-",
        },
        {
          name: "管理后台",
          link: "http://admin.java.crmeb.net",
          account: "demo",
          password: "crmeb.com",
        },
      ];
      codeList = [
        {
          img: "/static/images/java_dan_routine.png",
          name: "小程序演示",
        },
        { img: "/static/images/java_qrcode_h5.png", name: "H5演示" },
      ];
      break;
    case "java_mer":
      tableArr = [
        {
          name: "H5端",
          link: "https://h5.et.java.crmeb.net",
          account: "18292417675",
          password: "Crmeb@123456",
        },
        {
          name: "PC端",
          link: "https://pc.et.java.crmeb.net",
          account: "18292417675",
          password: "Crmeb@123456",
        },
        {
          name: "平台端",
          link: "https://adminplat.et.java.crmeb.net",
          account: "demo",
          password: "crmeb.com",
        },
        {
          name: "商户端",
          link: "http://adminmer.et.java.crmeb.net",
          account: "stivepeim@outlook.com",
          password: "000000",
        },
      ];
      codeList = [
        { img: "/static/images/java_mer/java_mer_code.png", name: "H5演示" },
      ];
      break;
    case "tuoluojiang":
      tableArr = [
        {
          name: "H5端",
          link: "https://demo.tuoluojiang.com/work",
          account: "18888888888",
          password: "888888",
        },
        {
          name: "PC端",
          link: "https://demo.tuoluojiang.com",
          account: "18888888888",
          password: "888888",
        },
      ];
      codeList = [];
      break;
    case "crmeb_chat":
      window.open("https://gitee.com/ZhongBangKeJi/CRMChat");
      break;
    default:
      break;
  }
  for (let j = 0; j < tableArr.length; j++) {
    tbody_html += `
			<tr>
				<td class="text-center">${tableArr[j].name}</td>
				<td class="p-l-40">
					<a href="${tableArr[j].link}" target="_blank" rel="opener" style="color:#2A7EFB;">${tableArr[j].link}</a>
				</td>
				<td class="text-center">${tableArr[j].account}</td>
				<td class="text-center">${tableArr[j].password}</td>
			</tr>
		`;
  }
  $("#proview_body").html(tbody_html);
  for (let j = 0; j < codeList.length; j++) {
    code_html += `
			<div class="proview_qrcode flex flex-column flex-justify-center align-center">
				<img class="w-100 h-100" src="${codeList[j].img}" alt="">
				<p class="tit">${codeList[j].name}</p>
			</div>
		`;
  }
  $("#code_list").html(code_html);
});
$("#about").hover(
  function () {
    $(this)
      .find(".iconfont")
      .removeClass("iconxiala")
      .addClass("iconxiala-copy");
    $(this).find(".about_contnet").slideDown();
  },
  function () {
    $("#about .about_contnet").slideUp();
    $(this)
      .find(".iconfont")
      .removeClass("iconxiala-copy")
      .addClass("iconxiala");
  }
);

$("#close").click(function () {
  $(".notice").addClass("d-none");
});

//点击平台图标切换二维码
$("#plat img").click(function () {
  switch (this.id) {
    case "wechat":
      $(".qr_code").attr("src", "/static/images/crmeb_qrcode.jpg");
      break;
    case "shipinhao":
      $(".qr_code").attr("src", "/static/images/shipinhao_code.jpg");
      break;
    case "zhihu":
      window.open("https://www.zhihu.com/org/crmeb-50");
      break;
    case "douyin":
      $(".qr_code").attr("src", "/static/images/douyin_code.png");
      break;
    default:
      break;
  }
});

$("#wechat").hover(
  function () {
    $(this).attr("src", "/static/images/wechat_active.png");
  },
  function () {
    $(this).attr("src", "/static/images/wechat.png");
  }
);
$("#shipinhao").hover(
  function () {
    $(this).attr("src", "/static/images/shipinhao_active.jpg");
  },
  function () {
    $(this).attr("src", "/static/images/shipinhao.jpg");
  }
);
$("#zhihu").hover(
  function () {
    $(this).attr("src", "/static/images/zhihu_active.png");
  },
  function () {
    $(this).attr("src", "/static/images/zhihu.png");
  }
);
$("#douyin").hover(
  function () {
    $(this).attr("src", "/static/images/douyin_active.png");
  },
  function () {
    $(this).attr("src", "/static/images/douyin.png");
  }
);

$(".main_title").hover(
  function () {
    $(this).addClass("animate__animated animate__pulse");
  },
  function () {
    $(this).removeClass("animate__animated animate__pulse");
  }
);

$(".white_main_title").hover(
  function () {
    $(this).addClass("animate__animated animate__pulse");
  },
  function () {
    $(this).removeClass("animate__animated animate__pulse");
  }
);

$("#backTop").click(function () {
  (function n() {
    var t = document.documentElement.scrollTop || document.body.scrollTop;
    if (t > 0) {
      window.requestAnimationFrame(n);
      window.scrollTo(0, t - t / 5);
    }
  })();
});

$("#close_side").click(function () {
  $("#side").slideUp();
  $("#sm_side").removeClass("d-none");
});
$(".hide_kefu").click(function () {
  $("#side").slideDown();
  $("#sm_side").addClass("d-none");
});

$(".kefu_avatar").hover(
  function () {
    $(this).addClass("animate__animated animate__pulse");
  },
  function () {
    $(this).removeClass("animate__animated animate__pulse");
  }
);

let endPath = location.href.substring(location.href.lastIndexOf("/") + 1);
if(!sessionStorage.getItem('promotion') && window.location.pathname.includes("/cpc")){
  $('#workCode').attr('src', '/static/images/channel_code/cpc_' + endPath  + '_1.png' );
}else if(sessionStorage.getItem('promotion')){
  $("#codeText1").text("添加客服微信");
  $("#codeText2").show().text("免费领取源码");
  $('#workCode').attr('src', '/static/images/channel_code/' +  sessionStorage.getItem('promotion') + '_1.png' );
}
