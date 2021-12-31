(this["webpackJsonpsocial-ui"]=this["webpackJsonpsocial-ui"]||[]).push([[0],{26:function(e,t,s){},34:function(e,t,s){},4:function(e,t,s){},62:function(e,t,s){"use strict";s.r(t);var a=s(1),c=s(27),r=s.n(c),n=s(63),i=s(9),l=(s(34),s(4),s(6)),d=s(10),j=s.n(d),o=(s(5),s(0)),b=function(){return Object(o.jsxs)("div",{className:"d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow",children:[Object(o.jsx)("h3",{className:"my-0 mr-md-auto font-weight-normal",children:"InTheGame"}),Object(o.jsxs)("nav",{className:"my-2 my-md-0 mr-md-3",children:[Object(o.jsx)("a",{className:"p-2 text-dark",href:"/categories",children:"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0439"}),Object(o.jsx)("a",{className:"p-2 text-dark",href:"{% url 'show_all_users' %}",children:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438"}),Object(o.jsx)("a",{className:"p-2 text-dark",href:"api/v1",children:"API"}),Object(o.jsx)("a",{className:"p-2 text-dark",href:"#",children:"\u041e \u043d\u0430\u0441"})]}),Object(o.jsx)("a",{className:"btn btn-outline-primary",href:"{% url 'exit_and_login' %}",style:{marginRight:"5px"},children:"\u0412\u0445\u043e\u0434"}),Object(o.jsx)("a",{className:"btn btn-outline-secondary",href:"{% url 'exit_and_login' %}",children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"})]})},x=function(e){return Object(o.jsx)("div",{className:"col-11 col-sm-11 col-md-10 col-lg-8 col-xl-8 mx-auto border border-primary",children:Object(o.jsx)("a",{href:"/categories/"+e.id,className:"list-group-item list-group-item-action border-0",children:Object(o.jsxs)("div",{className:"d-flex align-items-start",style:{marginLeft:"-10px"},children:[Object(o.jsx)("img",{src:e.avatar,className:"rounded-circle mr-1",alt:"user1",width:"65",height:"65",style:{marginLeft:"-10px"}}),Object(o.jsxs)("div",{className:"flex-grow-1 ml-3",children:[Object(o.jsx)("p",{className:"category-name",children:e.name}),Object(o.jsxs)("div",{className:"small",children:["\u0412\u0441\u0435\u0433\u043e \u043f\u043e\u0441\u0442\u043e\u0432: ",e.count]})]})]})})})},m=function(e){return Object(o.jsx)("div",{className:"container-fluid",children:e.categories.map((function(e){return Object(o.jsx)("div",{className:"row",style:{marginTop:"25px"},children:Object(o.jsx)(x,{id:e.id,name:e.name,avatar:e.avatar,count:e.count},e.id)})}))})},u=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),s=t[0],c=t[1];return Object(a.useEffect)((function(){j.a.get("http://127.0.0.1:8000/api/v1/category/").then((function(e){c(e.data)}))}),[c]),Object(o.jsxs)("div",{children:[Object(o.jsx)(b,{}),Object(o.jsx)(m,{categories:s})]})},h=function(){return Object(o.jsx)("section",{id:"wrapper",className:"container-fluid",children:Object(o.jsx)("div",{className:"error-box",children:Object(o.jsxs)("div",{className:"error-body text-center",children:[Object(o.jsx)("h1",{className:"text-danger",style:{fontSize:"100px"},children:"404"}),Object(o.jsx)("h3",{children:"Page Not Found !"}),Object(o.jsx)("p",{className:"text-muted m-t-30 m-b-30",children:"\u0412\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u0432\u044b \u043f\u0440\u043e\u0441\u0442\u043e \u043e\u043f\u0435\u0447\u0430\u0442\u0430\u043b\u0438\u0441\u044c \u0438\u043b\u0438 \u0432\u0430\u043c \u0441\u043a\u0438\u043d\u0443\u043b\u0438 \u043d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u0443\u044e \u0441\u0441\u044b\u043b\u043a\u0443... :)"}),Object(o.jsx)("a",{href:"/categories/",className:"btn btn-danger btn-rounded m-b-40",children:"\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e"})]})})})},p=function(){return Object(o.jsx)("div",{children:Object(o.jsx)("h2",{style:{marginLeft:"15px"},children:"429 Too many requests."})})},O=function(e){var t=new Date(e);return"".concat(t.getDate()," ").concat(t.toLocaleString("default",{month:"long"})," ").concat(t.getFullYear()," \u0433. ").concat(t.getHours(),":").concat(t.getMinutes())},g=function(e){var t=Object(a.useState)(e.attachment),s=Object(l.a)(t,2);s[0],s[1];return Object(o.jsxs)("div",{className:"card border-secondary",children:[Object(o.jsxs)("div",{className:"card-header bg-secondary text-white",children:[Object(o.jsx)("img",{src:e.user_data.avatar.image,className:"rounded-circle float-left",alt:"avatar",style:{width:"65px"}}),"\n\n\n",Object(o.jsx)("a",{href:"",className:"text-white",style:{fontSize:"17pt"},children:e.user_data.username}),"\n",Object(o.jsx)("p",{className:"text-info",children:e.user_data.group_data.name})]}),Object(o.jsx)("div",{className:"card-body",children:Object(o.jsxs)("a",{href:e.url,className:"text-dark",style:{textDecoration:"none"},children:[Object(o.jsx)("h4",{children:e.title}),e.text,e.attachment.map((function(e){return Object(o.jsxs)("div",{children:["\n",Object(o.jsx)("p",{style:{textAlign:"center"},children:Object(o.jsx)("img",{style:{width:"50%"},className:"img-fluid",src:e,alt:"image"})})]})}))]})}),Object(o.jsx)("div",{className:"card-footer",style:{display:"flex"},children:O(e.created_at)})]})},f=function(e){return Object(o.jsx)("div",{className:"posts",children:e.posts.map((function(t){return Object(o.jsxs)("div",{class:"container",children:[Object(o.jsx)(g,{id:t.id,title:t.title,text:t.text,created_at:t.created_at,user_data:t.user_data,attachment:t.attachment,url:"/categories/"+e.categoryId+"/"+t.id}),"\n"]})}))})},N=function(e){var t=Object(a.useState)([]),s=Object(l.a)(t,2),c=s[0],r=s[1],n=Object(a.useState)(null),i=Object(l.a)(n,2),d=i[0],x=i[1],m=e.match.params.categoryId;return Object(a.useEffect)((function(){j.a.get("http://127.0.0.1:8000/api/v1/category/"+m+"/").then((function(e){r(e.data)})).catch((function(e){console.log(e.response),e.response.status&&x({response:e.response.status})}))}),[]),d?404==d.response?Object(o.jsxs)("div",{children:[Object(o.jsx)(b,{}),Object(o.jsx)(h,{style:{marginTop:"25px"}})]}):429==d.response?Object(o.jsxs)("div",{children:[Object(o.jsx)(b,{}),"\n",Object(o.jsx)(p,{})]}):(console.log(d),Object(o.jsx)("div",{children:"i dont know this error :("})):Object(o.jsxs)("div",{children:[Object(o.jsx)(b,{}),"\n\n",Object(o.jsx)(f,{posts:c,categoryId:m})]})},v=function(e){return Object(o.jsx)("div",{children:Object(o.jsxs)("div",{className:"card border-secondary",children:[Object(o.jsxs)("div",{className:"card-header bg-secondary text-white",children:[Object(o.jsx)("img",{src:e.user_data.avatar.image,alt:"avatar",className:"rounded-circle float-left",style:{width:"60px"}}),"\n\n\n",Object(o.jsx)("a",{href:"#",className:"text-white",style:{fontSize:"17pt"},children:e.user_data.username}),"\n",Object(o.jsx)("p",{className:"text-info",children:e.user_data.group_data.name})]}),Object(o.jsx)("div",{className:"card-body",children:e.text}),Object(o.jsx)("div",{className:"card-footer",children:O(e.created_at)})]})})},y=function(e){return Object(o.jsx)("div",{children:e.comments.map((function(e){return Object(o.jsxs)("div",{children:[Object(o.jsx)(v,{id:e.id,text:e.text,created_at:e.created_at,user_data:e.user_data}),"\n\n"]})}))})},w=function(e){var t=e.match.params.categoryId,s=e.match.params.postId,c=Object(a.useState)(null),r=Object(l.a)(c,2),n=r[0],i=r[1],d=Object(a.useState)(!1),x=Object(l.a)(d,2),m=x[0],u=x[1];return Object(a.useEffect)((function(){j.a.get("http://127.0.0.1:8000/api/v1/category/"+t+"/"+s+"/").then((function(e){i(e.data)})).catch((function(e){e.response.status&&u({response:e.response.status})}))}),[]),404==m.response?Object(o.jsxs)("div",{children:[Object(o.jsx)(b,{}),"\n",Object(o.jsx)(h,{})]}):429==m.response?Object(o.jsxs)("div",{children:[Object(o.jsx)(b,{}),"\n",Object(o.jsx)(p,{})]}):!m&&n?Object(o.jsxs)("div",{children:[Object(o.jsx)(b,{}),"\n",Object(o.jsx)("div",{class:"container",children:Object(o.jsx)(g,{id:n.id,title:n.title,text:n.text,created_at:n.created_at,user_data:n.user_data,attachment:n.attachment,url:"#"})}),"\n\n\n",Object(o.jsx)("div",{className:"comments",children:Object(o.jsx)(y,{comments:n.comments})})]}):Object(o.jsx)("div",{})},_=(s(26),function(){return Object(o.jsx)("div",{className:"row",style:{margin:"0"},children:Object(o.jsx)("div",{className:"col-10 col-md-6 mx-auto p-0",children:Object(o.jsx)("div",{className:"card",children:Object(o.jsx)("div",{className:"login-box",children:Object(o.jsxs)("div",{className:"login-snip",children:[" ",Object(o.jsx)("input",{id:"tab-1",type:"radio",name:"tab",className:"sign-in",checked:!0}),Object(o.jsx)("label",{for:"tab-1",className:"tab",children:"Login"})," ",Object(o.jsx)("input",{id:"tab-2",type:"radio",name:"tab",className:"sign-up"}),Object(o.jsx)("label",{for:"tab-2",className:"tab",children:"Sign Up"}),Object(o.jsxs)("div",{className:"login-space",children:[Object(o.jsxs)("div",{className:"login",children:[Object(o.jsxs)("div",{className:"group",children:[" ",Object(o.jsx)("label",{for:"user",className:"label",children:"Username"})," ",Object(o.jsx)("input",{id:"user",type:"text",className:"input",placeholder:"Enter your username"})," "]}),Object(o.jsxs)("div",{className:"group",children:[" ",Object(o.jsx)("label",{for:"pass",className:"label",children:"Password"})," ",Object(o.jsx)("input",{id:"pass",type:"password",className:"input","data-type":"password",placeholder:"Enter your password"})," "]}),Object(o.jsxs)("div",{className:"group",children:[" ",Object(o.jsx)("input",{id:"check",type:"checkbox",className:"check",checked:!0})," ",Object(o.jsxs)("label",{for:"check",children:[Object(o.jsx)("span",{className:"icon"})," Keep me Signed in"]})," "]}),Object(o.jsxs)("div",{className:"group",children:[" ",Object(o.jsx)("input",{type:"submit",className:"button",value:"Sign In"})," "]}),Object(o.jsx)("div",{className:"hr"}),Object(o.jsxs)("div",{className:"foot",children:[" ",Object(o.jsx)("a",{href:"#",children:"Forgot Password?"})," "]})]}),Object(o.jsxs)("div",{className:"sign-up-form",children:[Object(o.jsxs)("div",{className:"group",children:[" ",Object(o.jsx)("label",{for:"user",className:"label",children:"Username"})," ",Object(o.jsx)("input",{id:"user",type:"text",className:"input",placeholder:"Create your Username"})," "]}),Object(o.jsxs)("div",{className:"group",children:[" ",Object(o.jsx)("label",{for:"pass",className:"label",children:"Password"})," ",Object(o.jsx)("input",{id:"pass",type:"password",className:"input","data-type":"password",placeholder:"Create your password"})," "]}),Object(o.jsxs)("div",{className:"group",children:[" ",Object(o.jsx)("label",{for:"pass",className:"label",children:"Repeat Password"})," ",Object(o.jsx)("input",{id:"pass",type:"password",className:"input","data-type":"password",placeholder:"Repeat your password"})," "]}),Object(o.jsxs)("div",{className:"group",children:[" ",Object(o.jsx)("label",{for:"pass",className:"label",children:"Email Address"})," ",Object(o.jsx)("input",{id:"pass",type:"text",className:"input",placeholder:"Enter your email address"})," "]}),Object(o.jsxs)("div",{className:"group",children:[" ",Object(o.jsx)("input",{type:"submit",className:"button",value:"Sign Up"})," "]})]})]})]})})})})})}),S=function(e){return Object(o.jsxs)("div",{children:[Object(o.jsx)(b,{}),"\n",Object(o.jsx)(_,{})]})},k=Object(n.e)((function(e){e.history;return Object(o.jsx)("div",{className:"App",children:Object(o.jsxs)(n.d,{children:[Object(o.jsx)(n.b,{exact:!0,path:"/categories/",component:u}),Object(o.jsx)(n.b,{exact:!0,path:"/categories/:categoryId/",component:N}),Object(o.jsx)(n.b,{exact:!0,path:"/categories/:categoryId/:postId/",component:w}),Object(o.jsx)(n.b,{exact:!0,path:"/auth/login/",component:S}),Object(o.jsx)(n.a,{from:"/",to:"/categories"})]})})})),I=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,64)).then((function(t){var s=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,n=t.getTTFB;s(e),a(e),c(e),r(e),n(e)}))},E=Object(i.a)();r.a.render(Object(o.jsx)(n.c,{history:E,children:Object(o.jsx)(k,{})}),document.getElementById("root")),I()}},[[62,1,2]]]);
//# sourceMappingURL=main.d6c84e1f.chunk.js.map