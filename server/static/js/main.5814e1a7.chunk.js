(this["webpackJsonpsocial-ui"]=this["webpackJsonpsocial-ui"]||[]).push([[0],{17:function(e,t,c){},33:function(e,t,c){},61:function(e,t,c){"use strict";c.r(t);var a=c(1),s=c(26),n=c.n(s),r=c(62),i=c(6),l=(c(33),c(17),c(8)),d=c(11),j=c.n(d),o=(c(7),c(0)),b=function(){return Object(o.jsxs)("div",{className:"d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow",children:[Object(o.jsx)("h3",{className:"my-0 mr-md-auto font-weight-normal",children:"InTheGame"}),Object(o.jsxs)("nav",{className:"my-2 my-md-0 mr-md-3",children:[Object(o.jsx)("a",{className:"p-2 text-dark",href:"/categories",children:"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0439"}),Object(o.jsx)("a",{className:"p-2 text-dark",href:"{% url 'show_all_users' %}",children:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438"}),Object(o.jsx)("a",{className:"p-2 text-dark",href:"api/v1",children:"API"}),Object(o.jsx)("a",{className:"p-2 text-dark",href:"#",children:"\u041e \u043d\u0430\u0441"})]}),Object(o.jsx)("a",{className:"btn btn-outline-primary",href:"{% url 'exit_and_login' %}",style:{marginRight:"5px"},children:"\u0412\u0445\u043e\u0434"}),Object(o.jsx)("a",{className:"btn btn-outline-secondary",href:"{% url 'exit_and_login' %}",children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"})]})},m=function(e){return Object(o.jsx)("div",{className:"col-11 col-sm-11 col-md-10 col-lg-8 col-xl-8 mx-auto border border-primary",children:Object(o.jsx)("a",{href:e.id,className:"list-group-item list-group-item-action border-0",children:Object(o.jsxs)("div",{className:"d-flex align-items-start",style:{marginLeft:"-10px"},children:[Object(o.jsx)("img",{src:e.avatar,className:"rounded-circle mr-1",alt:"user1",width:"65",height:"65",style:{marginLeft:"-10px"}}),Object(o.jsx)("div",{className:"flex-grow-1 ml-3",children:Object(o.jsx)("p",{className:"category-name",children:e.name})})]})})})},x=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),c=t[0],s=t[1];return Object(a.useEffect)((function(){j.a.get("http://127.0.0.1:8000/api/v1/category/").then((function(e){s(e.data)}))}),[s]),Object(o.jsxs)("div",{children:[Object(o.jsx)(b,{}),Object(o.jsx)("div",{className:"container-fluid",children:c.map((function(e){return Object(o.jsx)("div",{className:"row",style:{marginTop:"25px"},children:Object(o.jsx)(m,{id:e.id,name:e.name,avatar:e.avatar},e.id)})}))})]})},h=function(){return Object(o.jsx)("section",{id:"wrapper",className:"container-fluid",children:Object(o.jsx)("div",{className:"error-box",children:Object(o.jsxs)("div",{className:"error-body text-center",children:[Object(o.jsx)("h1",{className:"text-danger",style:{fontSize:"100px"},children:"404"}),Object(o.jsx)("h3",{children:"Page Not Found !"}),Object(o.jsx)("p",{className:"text-muted m-t-30 m-b-30",children:"\u0412\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u0432\u044b \u043f\u0440\u043e\u0441\u0442\u043e \u043e\u043f\u0435\u0447\u0430\u0442\u0430\u043b\u0438\u0441\u044c \u0438\u043b\u0438 \u0432\u0430\u043c \u0441\u043a\u0438\u043d\u0443\u043b\u0438 \u043d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u0443\u044e \u0441\u0441\u044b\u043b\u043a\u0443... :)"}),Object(o.jsx)("a",{href:"/categories/",className:"btn btn-danger btn-rounded m-b-40",children:"\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e"})]})})})},u=function(e){return Object(o.jsxs)("div",{children:[e.id,e.title,e.text,e.created_at]})},O=function(e){var t=Object(a.useState)([]),c=Object(l.a)(t,2),s=c[0],n=c[1],r=Object(a.useState)(!1),i=Object(l.a)(r,2),d=i[0],m=i[1],x=e.match.params.categoryId;return Object(a.useEffect)((function(){j.a.get("http://127.0.0.1:8000/api/v1/category/"+x+"/").then((function(e){n(e.data)})).catch((function(e){404==e.response.status&&m(!0)}))}),[]),d?Object(o.jsxs)("div",{children:[Object(o.jsx)(b,{}),Object(o.jsx)(h,{style:{marginTop:"25px"}})]}):Object(o.jsxs)("div",{children:[Object(o.jsx)(b,{}),Object(o.jsx)("div",{className:"posts",children:s.map((function(e){return Object(o.jsx)(u,{id:e.id,title:e.title,text:e.text,created_at:e.created_at})}))})]})},f=Object(r.e)((function(e){e.history;return Object(o.jsx)("div",{className:"App",children:Object(o.jsxs)(r.d,{children:[Object(o.jsx)(r.b,{exact:!0,path:"/categories/",component:x}),Object(o.jsx)(r.b,{exact:!0,path:"/categories/:categoryId/",component:O}),Object(o.jsx)(r.a,{from:"/",to:"/categories"})]})})})),p=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,63)).then((function(t){var c=t.getCLS,a=t.getFID,s=t.getFCP,n=t.getLCP,r=t.getTTFB;c(e),a(e),s(e),n(e),r(e)}))},g=Object(i.a)();n.a.render(Object(o.jsx)(r.c,{history:g,children:Object(o.jsx)(f,{})}),document.getElementById("root")),p()}},[[61,1,2]]]);
//# sourceMappingURL=main.5814e1a7.chunk.js.map