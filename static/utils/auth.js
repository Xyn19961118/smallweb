//卖家个人中心权限
export const seller = [{
    title: "账户设置",
    iconUrl: require("~/static/images/menu-icon01.png"),
    name: "1",
    child: [{
        name: "个人账户信息",
        link: "/user/"
      },
      {
        name: "修改密码",
        link: "/user/changepossword"
      },
      {
        name: "重置邮箱",
        link: "/user/changeemail"
      }
    ]
  },
  {
    title: "发布报价",
    iconUrl: require("~/static/images/menu-icon03.png"),
    name: "2",
    child: [{
      name: "已发布",
      link: "/user/offer"
    }]
  },
  // {
  //   title: "消息中心",
  //   iconUrl: require("~/static/images/menu-icon04.png"),
  //   name: "3",
  //   child: [{
  //     name: "我的消息",
  //     link: "/user/mynews"
  //   }]
  // },
  {
    title: "会员中心",
    iconUrl: require("~/static/images/menu-icon04.png"),
    name: "3",
    child: [{
      name: "会员流量包",
      link: "/user/flow"
    }]
  }
];

//买家个人中心权限
export const buyer = [{
    title: "账户设置",
    iconUrl: require("~/static/images/menu-icon01.png"),
    name: "1",
    child: [{
        name: "个人账户信息",
        link: "/user/"
      },
      {
        name: "修改密码",
        link: "/user/changepossword"
      },
      {
        name: "重置邮箱",
        link: "/user/changeemail"
      }
    ]
  },
  {
    title: "发布需求",
    iconUrl: require("~/static/images/menu-icon03.png"),
    name: "2",
    child: [{
      name: "已发布",
      link: "/user/release"
    }]
  },
  {
    title: "收藏商品",
    iconUrl: require("~/static/images/menu-icon03.png"),
    name: "3",
    child: [{
      name: "已收藏",
      link: "/user/mycollect"
    }]
  },
  {
    title: "消息中心",
    iconUrl: require("~/static/images/menu-icon04.png"),
    name: "4",
    child: [{
        name: "报价消息",
        link: "/user/pricenews"
      }
      // {
      //   name: "我的消息",
      //   link: "/user/mynews"
      // }
    ]
  }
];
