(this["webpackJsonpsocial-ui"]=this["webpackJsonpsocial-ui"]||[]).push([[0],{33:function(e,t,c){},61:function(e,t,c){"use strict";c.r(t);var s=c(1),a=c(26),r=c.n(a),n=c(62),i=c(6),l=(c(33),c(9),c(7)),d=c(12),j=c.n(d),o=(c(8),c(0)),b=function(){return Object(o.jsxs)("div",{className:"d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow",children:[Object(o.jsx)("h3",{className:"my-0 mr-md-auto font-weight-normal",children:"InTheGame"}),Object(o.jsxs)("nav",{className:"my-2 my-md-0 mr-md-3",children:[Object(o.jsx)("a",{className:"p-2 text-dark",href:"/categories",children:"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0439"}),Object(o.jsx)("a",{className:"p-2 text-dark",href:"{% url 'show_all_users' %}",children:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438"}),Object(o.jsx)("a",{className:"p-2 text-dark",href:"api/v1",children:"API"}),Object(o.jsx)("a",{className:"p-2 text-dark",href:"#",children:"\u041e \u043d\u0430\u0441"})]}),Object(o.jsx)("a",{className:"btn btn-outline-primary",href:"{% url 'exit_and_login' %}",style:{marginRight:"5px"},children:"\u0412\u0445\u043e\u0434"}),Object(o.jsx)("a",{className:"btn btn-outline-secondary",href:"{% url 'exit_and_login' %}",children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"})]})},x=function(e){return Object(o.jsx)("div",{className:"col-11 col-sm-11 col-md-10 col-lg-8 col-xl-8 mx-auto border border-primary",children:Object(o.jsx)("a",{href:e.id,className:"list-group-item list-group-item-action border-0",children:Object(o.jsxs)("div",{className:"d-flex align-items-start",style:{marginLeft:"-10px"},children:[Object(o.jsx)("img",{src:e.avatar,className:"rounded-circle mr-1",alt:"user1",width:"65",height:"65",style:{marginLeft:"-10px"}}),Object(o.jsx)("div",{className:"flex-grow-1 ml-3",children:Object(o.jsx)("p",{className:"category-name",children:e.name})})]})})})},m=function(){var e=Object(s.useState)([]),t=Object(l.a)(e,2),c=t[0],a=t[1];return Object(s.useEffect)((function(){j.a.get("http://127.0.0.1:8000/api/v1/category/").then((function(e){a(e.data)}))}),[a]),Object(o.jsxs)("div",{children:[Object(o.jsx)(b,{}),Object(o.jsx)("div",{className:"container-fluid",children:c.map((function(e){return Object(o.jsx)("div",{className:"row",style:{marginTop:"25px"},children:Object(o.jsx)(x,{id:e.id,name:e.name,avatar:e.avatar},e.id)})}))})]})},h=function(){return Object(o.jsx)("section",{id:"wrapper",className:"container-fluid",children:Object(o.jsx)("div",{className:"error-box",children:Object(o.jsxs)("div",{className:"error-body text-center",children:[Object(o.jsx)("h1",{className:"text-danger",style:{fontSize:"100px"},children:"404"}),Object(o.jsx)("h3",{children:"Page Not Found !"}),Object(o.jsx)("p",{className:"text-muted m-t-30 m-b-30",children:"\u0412\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u0432\u044b \u043f\u0440\u043e\u0441\u0442\u043e \u043e\u043f\u0435\u0447\u0430\u0442\u0430\u043b\u0438\u0441\u044c \u0438\u043b\u0438 \u0432\u0430\u043c \u0441\u043a\u0438\u043d\u0443\u043b\u0438 \u043d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u0443\u044e \u0441\u0441\u044b\u043b\u043a\u0443... :)"}),Object(o.jsx)("a",{href:"/categories/",className:"btn btn-danger btn-rounded m-b-40",children:"\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e"})]})})})},u=function(){return Object(o.jsx)("div",{children:Object(o.jsx)("h1",{children:"429 Too many requests."})})},O=function(e){var t=Object(s.useState)([]),c=Object(l.a)(t,2);c[0],c[1];return Object(o.jsxs)("div",{className:"card border-secondary",children:[Object(o.jsxs)("div",{className:"card-header bg-secondary text-white",children:[Object(o.jsx)("img",{src:"/main{{ post.user.avatar_set.get.image.url }}",className:"rounded-circle float-left",alt:"avatar",style:{width:"65px"}}),"\n\n\n",Object(o.jsx)("a",{href:"",className:"text-white",style:{fontSize:"17pt"},children:e.user_id}),"\n",Object(o.jsx)("p",{className:"text-info",children:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c"})]}),Object(o.jsx)("div",{className:"card-body",children:Object(o.jsxs)("a",{href:"/",className:"text-dark",style:{textDecoration:"none"},children:[Object(o.jsx)("h4",{children:e.title}),e.text,Object(o.jsx)("p",{style:{textAlign:"center"},children:Object(o.jsx)("img",{className:"img-fluid",src:"/",alt:"image"})})]})}),Object(o.jsx)("div",{className:"card-footer",style:{display:"flex"},children:e.created_at})]})},f=function(e){var t=Object(s.useState)([]),c=Object(l.a)(t,2),a=c[0],r=c[1],n=Object(s.useState)({}),i=Object(l.a)(n,2),d=i[0],x=i[1],m=e.match.params.categoryId;return Object(s.useEffect)((function(){j.a.get("http://127.0.0.1:8000/api/v1/category/"+m+"/").then((function(e){r(e.data)})).catch((function(e){console.log(e.response),e.response.status&&x({response:e.response.status})}))}),[]),d?404==d.response?Object(o.jsxs)("div",{children:[Object(o.jsx)(b,{}),Object(o.jsx)(h,{style:{marginTop:"25px"}})]}):429==d.response?Object(o.jsx)("div",{children:Object(o.jsx)(u,{})}):Object(o.jsx)("div",{children:"i dont know this error :("}):Object(o.jsxs)("div",{children:[Object(o.jsx)(b,{}),Object(o.jsxs)("div",{className:"posts",children:["\n\n",a.map((function(e){return Object(o.jsxs)("div",{class:"container",children:[Object(o.jsx)(O,{id:e.id,title:e.title,text:e.text,created_at:e.created_at,user_id:e.user_id}),"\n"]})}))]})]})},p=Object(n.e)((function(e){e.history;return Object(o.jsx)("div",{className:"App",children:Object(o.jsxs)(n.d,{children:[Object(o.jsx)(n.b,{exact:!0,path:"/categories/",component:m}),Object(o.jsx)(n.b,{exact:!0,path:"/categories/:categoryId/",component:f}),Object(o.jsx)(n.a,{from:"/",to:"/categories"})]})})})),g=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,63)).then((function(t){var c=t.getCLS,s=t.getFID,a=t.getFCP,r=t.getLCP,n=t.getTTFB;c(e),s(e),a(e),r(e),n(e)}))},v=Object(i.a)();r.a.render(Object(o.jsx)(n.c,{history:v,children:Object(o.jsx)(p,{})}),document.getElementById("root")),g()},9:function(e,t,c){}},[[61,1,2]]]);
//# sourceMappingURL=main.9b2313a2.chunk.js.map