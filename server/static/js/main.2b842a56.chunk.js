(this["webpackJsonpsocial-ui"]=this["webpackJsonpsocial-ui"]||[]).push([[0],{31:function(e,t,n){},32:function(e,t,n){},61:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(22),r=n.n(c),s=n(62),i=n(6),o=(n(31),n(32),n(25)),l=n(23),j=n.n(l),d=(n(51),n(1)),h=function(){return Object(d.jsxs)("div",{className:"d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow",children:[Object(d.jsx)("h3",{className:"my-0 mr-md-auto font-weight-normal",children:"InTheGame"}),Object(d.jsxs)("nav",{className:"my-2 my-md-0 mr-md-3",children:[Object(d.jsx)("a",{className:"p-2 text-dark",href:"/categories",children:"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0439"}),Object(d.jsx)("a",{className:"p-2 text-dark",href:"{% url 'show_all_users' %}",children:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438"}),Object(d.jsx)("a",{className:"p-2 text-dark",href:"api/v1",children:"API"}),Object(d.jsx)("a",{className:"p-2 text-dark",href:"#",children:"\u041e \u043d\u0430\u0441"})]}),Object(d.jsx)("a",{className:"btn btn-outline-primary",href:"{% url 'exit_and_login' %}",style:{marginRight:"5px"},children:"\u0412\u0445\u043e\u0434"}),Object(d.jsx)("a",{className:"btn btn-outline-secondary",href:"{% url 'exit_and_login' %}",children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"})]})},b=function(e){return Object(d.jsxs)("div",{children:[e.name,e.avatar]})},m=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],c=t[1];return Object(a.useEffect)((function(){j.a.get("http://127.0.0.1:8000/api/v1/category/").then((function(e){c(e.data)}))}),[c]),Object(d.jsxs)("div",{children:[Object(d.jsx)(h,{}),"\n","\n",n.map((function(e){return Object(d.jsx)(b,{name:e.name,avatar:e.avatar},e.id)}))]})},u=Object(s.e)((function(e){var t=e.history;return Object(d.jsx)("div",{className:"App",children:Object(d.jsxs)(s.d,{children:[Object(d.jsx)(s.b,{history:t,path:"/categories",component:m}),Object(d.jsx)(s.a,{from:"/",to:"/categories"})]})})})),x=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,63)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))},f=Object(i.a)();r.a.render(Object(d.jsx)(s.c,{history:f,children:Object(d.jsx)(u,{})}),document.getElementById("root")),x()}},[[61,1,2]]]);
//# sourceMappingURL=main.2b842a56.chunk.js.map