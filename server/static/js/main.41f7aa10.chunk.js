(this["webpackJsonpsocial-ui"]=this["webpackJsonpsocial-ui"]||[]).push([[0],{33:function(e,t,c){},61:function(e,t,c){"use strict";c.r(t);var a=c(1),s=c(26),n=c.n(s),r=c(62),i=c(7),d=(c(33),c(8),c(4)),l=c(9),j=c.n(l),o=(c(10),c(0)),x=function(){return Object(o.jsxs)("div",{className:"d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow",children:[Object(o.jsx)("h3",{className:"my-0 mr-md-auto font-weight-normal",children:"InTheGame"}),Object(o.jsxs)("nav",{className:"my-2 my-md-0 mr-md-3",children:[Object(o.jsx)("a",{className:"p-2 text-dark",href:"/categories",children:"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0439"}),Object(o.jsx)("a",{className:"p-2 text-dark",href:"{% url 'show_all_users' %}",children:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438"}),Object(o.jsx)("a",{className:"p-2 text-dark",href:"api/v1",children:"API"}),Object(o.jsx)("a",{className:"p-2 text-dark",href:"#",children:"\u041e \u043d\u0430\u0441"})]}),Object(o.jsx)("a",{className:"btn btn-outline-primary",href:"{% url 'exit_and_login' %}",style:{marginRight:"5px"},children:"\u0412\u0445\u043e\u0434"}),Object(o.jsx)("a",{className:"btn btn-outline-secondary",href:"{% url 'exit_and_login' %}",children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"})]})},b=function(e){return Object(o.jsx)("div",{className:"col-11 col-sm-11 col-md-10 col-lg-8 col-xl-8 mx-auto border border-primary",children:Object(o.jsx)("a",{href:"/categories/"+e.id,className:"list-group-item list-group-item-action border-0",children:Object(o.jsxs)("div",{className:"d-flex align-items-start",style:{marginLeft:"-10px"},children:[Object(o.jsx)("img",{src:e.avatar,className:"rounded-circle mr-1",alt:"user1",width:"65",height:"65",style:{marginLeft:"-10px"}}),Object(o.jsxs)("div",{className:"flex-grow-1 ml-3",children:[Object(o.jsx)("p",{className:"category-name",children:e.name}),Object(o.jsxs)("div",{className:"small",children:["\u0412\u0441\u0435\u0433\u043e \u043f\u043e\u0441\u0442\u043e\u0432: ",e.count]})]})]})})})},m=function(){var e=Object(a.useState)([]),t=Object(d.a)(e,2),c=t[0],s=t[1];return Object(a.useEffect)((function(){j.a.get("http://127.0.0.1:8000/api/v1/category/").then((function(e){s(e.data)}))}),[s]),Object(o.jsxs)("div",{children:[Object(o.jsx)(x,{}),Object(o.jsx)("div",{className:"container-fluid",children:c.map((function(e){return Object(o.jsx)("div",{className:"row",style:{marginTop:"25px"},children:Object(o.jsx)(b,{id:e.id,name:e.name,avatar:e.avatar,count:e.count},e.id)})}))})]})},h=function(){return Object(o.jsx)("section",{id:"wrapper",className:"container-fluid",children:Object(o.jsx)("div",{className:"error-box",children:Object(o.jsxs)("div",{className:"error-body text-center",children:[Object(o.jsx)("h1",{className:"text-danger",style:{fontSize:"100px"},children:"404"}),Object(o.jsx)("h3",{children:"Page Not Found !"}),Object(o.jsx)("p",{className:"text-muted m-t-30 m-b-30",children:"\u0412\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u0432\u044b \u043f\u0440\u043e\u0441\u0442\u043e \u043e\u043f\u0435\u0447\u0430\u0442\u0430\u043b\u0438\u0441\u044c \u0438\u043b\u0438 \u0432\u0430\u043c \u0441\u043a\u0438\u043d\u0443\u043b\u0438 \u043d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u0443\u044e \u0441\u0441\u044b\u043b\u043a\u0443... :)"}),Object(o.jsx)("a",{href:"/categories/",className:"btn btn-danger btn-rounded m-b-40",children:"\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e"})]})})})},u=function(){return Object(o.jsx)("div",{children:Object(o.jsx)("h2",{style:{marginLeft:"15px"},children:"429 Too many requests."})})},O=function(e){var t=new Date(e);return"".concat(t.getDate()," ").concat(t.toLocaleString("default",{month:"long"})," ").concat(t.getFullYear()," \u0433. ").concat(t.getHours(),":").concat(t.getMinutes())},p=function(e){var t=Object(a.useState)(e.attachment),c=Object(d.a)(t,2);c[0],c[1];return Object(o.jsxs)("div",{className:"card border-secondary",children:[Object(o.jsxs)("div",{className:"card-header bg-secondary text-white",children:[Object(o.jsx)("img",{src:e.user_data.avatar.image,className:"rounded-circle float-left",alt:"avatar",style:{width:"65px"}}),"\n\n\n",Object(o.jsx)("a",{href:"",className:"text-white",style:{fontSize:"17pt"},children:e.user_data.username}),"\n",Object(o.jsx)("p",{className:"text-info",children:e.user_data.group_data.name})]}),Object(o.jsx)("div",{className:"card-body",children:Object(o.jsxs)("a",{href:e.url,className:"text-dark",style:{textDecoration:"none"},children:[Object(o.jsx)("h4",{children:e.title}),e.text,e.attachment.map((function(e){return Object(o.jsxs)("div",{children:["\n",Object(o.jsx)("p",{style:{textAlign:"center"},children:Object(o.jsx)("img",{style:{width:"50%"},className:"img-fluid",src:e,alt:"image"})})]})}))]})}),Object(o.jsx)("div",{className:"card-footer",style:{display:"flex"},children:O(e.created_at)})]})},f=function(e){var t=Object(a.useState)([]),c=Object(d.a)(t,2),s=c[0],n=c[1],r=Object(a.useState)(null),i=Object(d.a)(r,2),l=i[0],b=i[1],m=e.match.params.categoryId;return Object(a.useEffect)((function(){j.a.get("http://127.0.0.1:8000/api/v1/category/"+m+"/").then((function(e){n(e.data)})).catch((function(e){console.log(e.response),e.response.status&&b({response:e.response.status})}))}),[]),l?404==l.response?Object(o.jsxs)("div",{children:[Object(o.jsx)(x,{}),Object(o.jsx)(h,{style:{marginTop:"25px"}})]}):429==l.response?Object(o.jsxs)("div",{children:[Object(o.jsx)(x,{}),"\n",Object(o.jsx)(u,{})]}):(console.log(l),Object(o.jsx)("div",{children:"i dont know this error :("})):Object(o.jsxs)("div",{children:[Object(o.jsx)(x,{}),Object(o.jsxs)("div",{className:"posts",children:["\n\n",s.map((function(e){return Object(o.jsxs)("div",{class:"container",children:[Object(o.jsx)(p,{id:e.id,title:e.title,text:e.text,created_at:e.created_at,user_data:e.user_data,attachment:e.attachment,url:"/categories/"+m+"/"+e.id}),"\n"]})}))]})]})},g=function(e){return Object(o.jsx)("div",{children:Object(o.jsxs)("div",{className:"card border-secondary",children:[Object(o.jsxs)("div",{className:"card-header bg-secondary text-white",children:[Object(o.jsx)("img",{src:e.user_data.avatar.image,alt:"avatar",className:"rounded-circle float-left",style:{width:"60px"}}),"\n\n\n",Object(o.jsx)("a",{href:"#",className:"text-white",style:{fontSize:"17pt"},children:e.user_data.username}),"\n",Object(o.jsx)("p",{className:"text-info",children:e.user_data.group_data.name})]}),Object(o.jsx)("div",{className:"card-body",children:e.text}),Object(o.jsx)("div",{className:"card-footer",children:O(e.created_at)})]})})},v=function(e){return Object(o.jsx)("div",{className:"comments",children:e.comments.map((function(e){return Object(o.jsx)("div",{children:Object(o.jsx)(g,{id:e.id,text:e.text,created_at:e.created_at,user_data:e.user_data})})}))})},N=function(e){var t=e.match.params.categoryId,c=e.match.params.postId,s=Object(a.useState)(null),n=Object(d.a)(s,2),r=n[0],i=n[1],l=Object(a.useState)(!1),b=Object(d.a)(l,2),m=b[0],O=b[1];return Object(a.useEffect)((function(){j.a.get("http://127.0.0.1:8000/api/v1/category/"+t+"/"+c+"/").then((function(e){i(e.data)})).catch((function(e){e.response.status&&O({response:e.response.status})}))}),[]),404==m.response?Object(o.jsxs)("div",{children:[Object(o.jsx)(x,{}),"\n",Object(o.jsx)(h,{})]}):429==m.response?Object(o.jsxs)("div",{children:[Object(o.jsx)(x,{}),"\n",Object(o.jsx)(u,{})]}):!m&&r?Object(o.jsxs)("div",{children:[Object(o.jsx)(x,{}),"\n",Object(o.jsxs)("div",{class:"container",children:[Object(o.jsx)(p,{id:r.id,title:r.title,text:r.text,created_at:r.created_at,user_data:r.user_data,attachment:r.attachment,url:"#"}),"\n",Object(o.jsx)(v,{comments:r.comments})]})]}):Object(o.jsx)("div",{})},y=Object(r.e)((function(e){e.history;return Object(o.jsx)("div",{className:"App",children:Object(o.jsxs)(r.d,{children:[Object(o.jsx)(r.b,{exact:!0,path:"/categories/",component:m}),Object(o.jsx)(r.b,{exact:!0,path:"/categories/:categoryId/",component:f}),Object(o.jsx)(r.b,{exact:!0,path:"/categories/:categoryId/:postId/",component:N}),Object(o.jsx)(r.a,{from:"/",to:"/categories"})]})})})),_=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,63)).then((function(t){var c=t.getCLS,a=t.getFID,s=t.getFCP,n=t.getLCP,r=t.getTTFB;c(e),a(e),s(e),n(e),r(e)}))},w=Object(i.a)();n.a.render(Object(o.jsx)(r.c,{history:w,children:Object(o.jsx)(y,{})}),document.getElementById("root")),_()},8:function(e,t,c){}},[[61,1,2]]]);
//# sourceMappingURL=main.41f7aa10.chunk.js.map