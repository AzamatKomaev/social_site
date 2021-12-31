(this["webpackJsonpsocial-ui"]=this["webpackJsonpsocial-ui"]||[]).push([[0],{10:function(e,t,c){},33:function(e,t,c){},61:function(e,t,c){"use strict";c.r(t);var a=c(1),s=c(26),n=c.n(s),r=c(62),i=c(7),l=(c(33),c(10),c(4)),o=c(8),d=c.n(o),j=(c(9),c(0)),b=function(){return Object(j.jsxs)("div",{className:"d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow",children:[Object(j.jsx)("h3",{className:"my-0 mr-md-auto font-weight-normal",children:"InTheGame"}),Object(j.jsxs)("nav",{className:"my-2 my-md-0 mr-md-3",children:[Object(j.jsx)("a",{className:"p-2 text-dark",href:"/categories",children:"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0439"}),Object(j.jsx)("a",{className:"p-2 text-dark",href:"{% url 'show_all_users' %}",children:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438"}),Object(j.jsx)("a",{className:"p-2 text-dark",href:"api/v1",children:"API"}),Object(j.jsx)("a",{className:"p-2 text-dark",href:"#",children:"\u041e \u043d\u0430\u0441"})]}),Object(j.jsx)("a",{className:"btn btn-outline-primary",href:"{% url 'exit_and_login' %}",style:{marginRight:"5px"},children:"\u0412\u0445\u043e\u0434"}),Object(j.jsx)("a",{className:"btn btn-outline-secondary",href:"{% url 'exit_and_login' %}",children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"})]})},x=function(e){return Object(j.jsx)("div",{className:"col-11 col-sm-11 col-md-10 col-lg-8 col-xl-8 mx-auto border border-primary",children:Object(j.jsx)("a",{href:e.id,className:"list-group-item list-group-item-action border-0",children:Object(j.jsxs)("div",{className:"d-flex align-items-start",style:{marginLeft:"-10px"},children:[Object(j.jsx)("img",{src:e.avatar,className:"rounded-circle mr-1",alt:"user1",width:"65",height:"65",style:{marginLeft:"-10px"}}),Object(j.jsxs)("div",{className:"flex-grow-1 ml-3",children:[Object(j.jsx)("p",{className:"category-name",children:e.name}),Object(j.jsxs)("div",{className:"small",children:["\u0412\u0441\u0435\u0433\u043e \u043f\u043e\u0441\u0442\u043e\u0432: ",e.count]})]})]})})})},h=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),c=t[0],s=t[1];return Object(a.useEffect)((function(){d.a.get("http://127.0.0.1:8000/api/v1/category/").then((function(e){s(e.data)}))}),[s]),Object(j.jsxs)("div",{children:[Object(j.jsx)(b,{}),Object(j.jsx)("div",{className:"container-fluid",children:c.map((function(e){return Object(j.jsx)("div",{className:"row",style:{marginTop:"25px"},children:Object(j.jsx)(x,{id:e.id,name:e.name,avatar:e.avatar,count:e.count},e.id)})}))})]})},m=function(){return Object(j.jsx)("section",{id:"wrapper",className:"container-fluid",children:Object(j.jsx)("div",{className:"error-box",children:Object(j.jsxs)("div",{className:"error-body text-center",children:[Object(j.jsx)("h1",{className:"text-danger",style:{fontSize:"100px"},children:"404"}),Object(j.jsx)("h3",{children:"Page Not Found !"}),Object(j.jsx)("p",{className:"text-muted m-t-30 m-b-30",children:"\u0412\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u0432\u044b \u043f\u0440\u043e\u0441\u0442\u043e \u043e\u043f\u0435\u0447\u0430\u0442\u0430\u043b\u0438\u0441\u044c \u0438\u043b\u0438 \u0432\u0430\u043c \u0441\u043a\u0438\u043d\u0443\u043b\u0438 \u043d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u0443\u044e \u0441\u0441\u044b\u043b\u043a\u0443... :)"}),Object(j.jsx)("a",{href:"/categories/",className:"btn btn-danger btn-rounded m-b-40",children:"\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e"})]})})})},u=function(){return Object(j.jsx)("div",{children:Object(j.jsx)("h2",{style:{marginLeft:"15px"},children:"429 Too many requests."})})},O=function(e){var t=Object(a.useState)(e.attachment),c=Object(l.a)(t,2);c[0],c[1];return Object(j.jsxs)("div",{className:"card border-secondary",children:[Object(j.jsxs)("div",{className:"card-header bg-secondary text-white",children:[Object(j.jsx)("img",{src:e.user_data.avatar,className:"rounded-circle float-left",alt:"avatar",style:{width:"65px"}}),"\n\n\n",Object(j.jsx)("a",{href:"",className:"text-white",style:{fontSize:"17pt"},children:e.user_data.username}),"\n",Object(j.jsx)("p",{className:"text-info",children:e.user_data.group})]}),Object(j.jsx)("div",{className:"card-body",children:Object(j.jsxs)("a",{href:"/",className:"text-dark",style:{textDecoration:"none"},children:[Object(j.jsx)("h4",{children:e.title}),e.text,e.attachment.map((function(e){return Object(j.jsxs)("div",{children:["\n",Object(j.jsx)("p",{style:{textAlign:"center"},children:Object(j.jsx)("img",{style:{width:"50%"},className:"img-fluid",src:e,alt:"image"})})]})}))]})}),Object(j.jsx)("div",{className:"card-footer",style:{display:"flex"},children:function(e){var t=new Date(e);return"".concat(t.getDate()," ").concat(t.toLocaleString("default",{month:"long"})," ").concat(t.getFullYear()," \u0433. ").concat(t.getHours(),":").concat(t.getMinutes())}(e.created_at)})]})},p=function(e){var t=Object(a.useState)([]),c=Object(l.a)(t,2),s=c[0],n=c[1],r=Object(a.useState)(null),i=Object(l.a)(r,2),o=i[0],x=i[1],h=e.match.params.categoryId;return Object(a.useEffect)((function(){d.a.get("http://127.0.0.1:8000/api/v1/category/"+h+"/").then((function(e){n(e.data)})).catch((function(e){console.log(e.response),e.response.status&&x({response:e.response.status})}))}),[]),o?404==o.response?Object(j.jsxs)("div",{children:[Object(j.jsx)(b,{}),Object(j.jsx)(m,{style:{marginTop:"25px"}})]}):429==o.response?Object(j.jsxs)("div",{children:[Object(j.jsx)(b,{}),"\n",Object(j.jsx)(u,{})]}):(console.log(o),Object(j.jsx)("div",{children:"i dont know this error :("})):Object(j.jsxs)("div",{children:[Object(j.jsx)(b,{}),Object(j.jsxs)("div",{className:"posts",children:["\n\n",s.map((function(e){return Object(j.jsxs)("div",{class:"container",children:[Object(j.jsx)(O,{id:e.id,title:e.title,text:e.text,created_at:e.created_at,user_data:e.user_data,attachment:e.attachment}),"\n"]})}))]})]})},f=function(e){var t=e.match.params.categoryId,c=(e.match.params.postId,Object(a.useState)(null)),s=Object(l.a)(c,2),n=s[0],r=s[1],i=Object(a.useState)(!1),o=Object(l.a)(i,2),b=o[0],x=o[1];return Object(a.useEffect)((function(){d.a.get("http://127.0.0.1:8000/api/v1/category/"+t+"/").then((function(e){r(e.data),console.log("I get data from api")})).catch((function(e){e.response.status&&x({response:e.response.status})}))}),[]),b?Object(j.jsx)("div",{children:"error"}):Object(j.jsxs)("div",{children:[n.id,n.title,n.text]})},g=Object(r.e)((function(e){e.history;return Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)(r.d,{children:[Object(j.jsx)(r.b,{exact:!0,path:"/categories/",component:h}),Object(j.jsx)(r.b,{exact:!0,path:"/categories/:categoryId/",component:p}),Object(j.jsx)(r.b,{exact:!0,path:"/categories/:categoryId/:postId/",component:f}),Object(j.jsx)(r.a,{from:"/",to:"/categories"})]})})})),v=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,63)).then((function(t){var c=t.getCLS,a=t.getFID,s=t.getFCP,n=t.getLCP,r=t.getTTFB;c(e),a(e),s(e),n(e),r(e)}))},y=Object(i.a)();n.a.render(Object(j.jsx)(r.c,{history:y,children:Object(j.jsx)(g,{})}),document.getElementById("root")),v()}},[[61,1,2]]]);
//# sourceMappingURL=main.1ac34857.chunk.js.map