(this["webpackJsonpsocial-ui"]=this["webpackJsonpsocial-ui"]||[]).push([[0],{15:function(e,t,c){},33:function(e,t,c){},61:function(e,t,c){"use strict";c.r(t);var a=c(0),n=c(24),s=c.n(n),r=c(62),i=c(6),l=(c(33),c(15),c(27)),o=c(25),d=c.n(o),j=(c(11),c(1)),m=function(){return Object(j.jsxs)("div",{className:"d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow",children:[Object(j.jsx)("h3",{className:"my-0 mr-md-auto font-weight-normal",children:"InTheGame"}),Object(j.jsxs)("nav",{className:"my-2 my-md-0 mr-md-3",children:[Object(j.jsx)("a",{className:"p-2 text-dark",href:"/categories",children:"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0439"}),Object(j.jsx)("a",{className:"p-2 text-dark",href:"{% url 'show_all_users' %}",children:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438"}),Object(j.jsx)("a",{className:"p-2 text-dark",href:"api/v1",children:"API"}),Object(j.jsx)("a",{className:"p-2 text-dark",href:"#",children:"\u041e \u043d\u0430\u0441"})]}),Object(j.jsx)("a",{className:"btn btn-outline-primary",href:"{% url 'exit_and_login' %}",style:{marginRight:"5px"},children:"\u0412\u0445\u043e\u0434"}),Object(j.jsx)("a",{className:"btn btn-outline-secondary",href:"{% url 'exit_and_login' %}",children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"})]})},b=function(e){return console.log(typeof e.id),Object(j.jsx)("div",{className:"col-11 col-sm-11 col-md-10 col-lg-8 col-xl-8 mx-auto border border-primary",children:Object(j.jsx)("a",{href:e.id,className:"list-group-item list-group-item-action border-0",children:Object(j.jsxs)("div",{className:"d-flex align-items-start",style:{marginLeft:"-10px"},children:[Object(j.jsx)("img",{src:e.avatar,className:"rounded-circle mr-1",alt:"user1",width:"65",height:"65",style:{marginLeft:"-10px"}}),Object(j.jsx)("div",{className:"flex-grow-1 ml-3",children:Object(j.jsx)("p",{className:"category-name",children:e.name})})]})})})},h=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),c=t[0],n=t[1];return Object(a.useEffect)((function(){d.a.get("http://127.0.0.1:8000/api/v1/category/").then((function(e){n(e.data)}))}),[n]),Object(j.jsxs)("div",{children:[Object(j.jsx)(m,{}),Object(j.jsx)("div",{className:"container-fluid",children:c.map((function(e){return Object(j.jsx)("div",{className:"row",style:{marginTop:"25px"},children:Object(j.jsx)(b,{id:e.id,name:e.name,avatar:e.avatar},e.id)})}))})]})},x=function(e){return console.log(e.match),console.log(e.location),Object(j.jsx)("div",{children:"\u0442\u0443\u0442 \u0431\u0443\u0434\u0443\u0442 \u043f\u043e\u0441\u0442\u044b"})},u=Object(r.e)((function(e){e.history;return Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)(r.d,{children:[Object(j.jsx)(r.b,{exact:!0,path:"/categories/",component:h}),Object(j.jsx)(r.b,{exact:!0,path:"/categories/:categoryId/",component:x}),Object(j.jsx)(r.a,{from:"/",to:"/categories"})]})})})),f=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,63)).then((function(t){var c=t.getCLS,a=t.getFID,n=t.getFCP,s=t.getLCP,r=t.getTTFB;c(e),a(e),n(e),s(e),r(e)}))},g=Object(i.a)();s.a.render(Object(j.jsx)(r.c,{history:g,children:Object(j.jsx)(u,{})}),document.getElementById("root")),f()}},[[61,1,2]]]);
//# sourceMappingURL=main.1239cf37.chunk.js.map