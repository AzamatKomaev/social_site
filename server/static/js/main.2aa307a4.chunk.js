(this["webpackJsonpsocial-ui"]=this["webpackJsonpsocial-ui"]||[]).push([[0],{15:function(e,t,a){},33:function(e,t,a){},61:function(e,t,a){"use strict";a.r(t);var c=a(0),r=a(24),s=a.n(r),n=a(62),i=a(6),l=(a(33),a(15),a(27)),o=a(25),d=a.n(o),m=(a(11),a(1)),j=function(){return Object(m.jsxs)("div",{className:"d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow",children:[Object(m.jsx)("h3",{className:"my-0 mr-md-auto font-weight-normal",children:"InTheGame"}),Object(m.jsxs)("nav",{className:"my-2 my-md-0 mr-md-3",children:[Object(m.jsx)("a",{className:"p-2 text-dark",href:"/categories",children:"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0439"}),Object(m.jsx)("a",{className:"p-2 text-dark",href:"{% url 'show_all_users' %}",children:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438"}),Object(m.jsx)("a",{className:"p-2 text-dark",href:"api/v1",children:"API"}),Object(m.jsx)("a",{className:"p-2 text-dark",href:"#",children:"\u041e \u043d\u0430\u0441"})]}),Object(m.jsx)("a",{className:"btn btn-outline-primary",href:"{% url 'exit_and_login' %}",style:{marginRight:"5px"},children:"\u0412\u0445\u043e\u0434"}),Object(m.jsx)("a",{className:"btn btn-outline-secondary",href:"{% url 'exit_and_login' %}",children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"})]})},h=function(e){return Object(m.jsx)("div",{className:"col-11 col-sm-11 col-md-10 col-lg-8 col-xl-8 mx-auto border border-primary",children:Object(m.jsx)("a",{href:"{% url 'all_posts' category=category %}",className:"list-group-item list-group-item-action border-0",children:Object(m.jsxs)("div",{className:"d-flex align-items-start",style:{marginLeft:"-10px"},children:[Object(m.jsx)("img",{src:"/main{{ category.avatar.url }}",className:"rounded-circle mr-1",alt:"user1",width:"65",height:"65",style:{marginLeft:"-10px"}}),Object(m.jsx)("div",{className:"flex-grow-1 ml-3",children:Object(m.jsx)("p",{className:"category-name",children:e.name})})]})})})},b=function(){var e=Object(c.useState)([]),t=Object(l.a)(e,2),a=t[0],r=t[1];return Object(c.useEffect)((function(){d.a.get("http://127.0.0.1:8000/api/v1/category/").then((function(e){r(e.data)}))}),[r]),Object(m.jsxs)("div",{children:[Object(m.jsx)(j,{}),Object(m.jsx)("div",{className:"container-fluid",children:a.map((function(e){return Object(m.jsx)("div",{className:"row",style:{marginTop:"50px"},children:Object(m.jsx)(h,{name:e.name,avatar:e.avatar},e.id)})}))})]})},x=Object(n.e)((function(e){var t=e.history;return Object(m.jsx)("div",{className:"App",children:Object(m.jsxs)(n.d,{children:[Object(m.jsx)(n.b,{history:t,path:"/categories",component:b}),Object(m.jsx)(n.a,{from:"/",to:"/categories"})]})})})),u=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,63)).then((function(t){var a=t.getCLS,c=t.getFID,r=t.getFCP,s=t.getLCP,n=t.getTTFB;a(e),c(e),r(e),s(e),n(e)}))},f=Object(i.a)();s.a.render(Object(m.jsx)(n.c,{history:f,children:Object(m.jsx)(x,{})}),document.getElementById("root")),u()}},[[61,1,2]]]);
//# sourceMappingURL=main.2aa307a4.chunk.js.map