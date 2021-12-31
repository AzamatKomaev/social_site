(this["webpackJsonpsocial-ui"]=this["webpackJsonpsocial-ui"]||[]).push([[0],{27:function(e,t,s){},36:function(e,t,s){},5:function(e,t,s){},65:function(e,t,s){"use strict";s.r(t);var c=s(1),a=s(28),n=s.n(a),r=s(66),i=s(10),l=(s(36),s(5),s(2)),j=s(3),o=s.n(j),d=(s(7),s(0)),b=function(){return Object(d.jsxs)("div",{className:"d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow",children:[Object(d.jsx)("h3",{className:"my-0 mr-md-auto font-weight-normal",children:"InTheGame"}),Object(d.jsxs)("nav",{className:"my-2 my-md-0 mr-md-3",children:[Object(d.jsx)("a",{className:"p-2 text-dark",href:"/categories",children:"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0439"}),Object(d.jsx)("a",{className:"p-2 text-dark",href:"{% url 'show_all_users' %}",children:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438"}),Object(d.jsx)("a",{className:"p-2 text-dark",href:"api/v1",children:"API"}),Object(d.jsx)("a",{className:"p-2 text-dark",href:"#",children:"\u041e \u043d\u0430\u0441"})]}),Object(d.jsx)("a",{className:"btn btn-outline-primary",href:"/auth/login/",style:{marginRight:"5px"},children:"\u0412\u0445\u043e\u0434"}),Object(d.jsx)("a",{className:"btn btn-outline-secondary",href:"/auth/login/",children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"})]})},u=function(e){return Object(d.jsx)("div",{className:"col-11 col-sm-11 col-md-10 col-lg-8 col-xl-8 mx-auto border border-primary",children:Object(d.jsx)("a",{href:"/categories/"+e.id,className:"list-group-item list-group-item-action border-0",children:Object(d.jsxs)("div",{className:"d-flex align-items-start",style:{marginLeft:"-10px"},children:[Object(d.jsx)("img",{src:e.avatar,className:"rounded-circle mr-1",alt:"user1",width:"65",height:"65",style:{marginLeft:"-10px"}}),Object(d.jsxs)("div",{className:"flex-grow-1 ml-3",children:[Object(d.jsx)("p",{className:"category-name",children:e.name}),Object(d.jsxs)("div",{className:"small",children:["\u0412\u0441\u0435\u0433\u043e \u043f\u043e\u0441\u0442\u043e\u0432: ",e.count]})]})]})})})},h=function(e){return Object(d.jsx)("div",{className:"container-fluid",children:e.categories.map((function(e){return Object(d.jsx)("div",{className:"row",style:{marginTop:"25px"},children:Object(d.jsx)(u,{id:e.id,name:e.name,avatar:e.avatar,count:e.count},e.id)})}))})},x=s(15),m=s.n(x),O=s(29),p=function(e){var t=new Date(e);return"".concat(t.getDate()," ").concat(t.toLocaleString("default",{month:"long"})," ").concat(t.getFullYear()," \u0433. ").concat(t.getHours(),":").concat(t.getMinutes())},g=function(){var e=Object(O.a)(m.a.mark((function e(){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=null,0,e.next=4,o.a.get("http://127.0.0.1:8000/api/v1/user/is_auth/",{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){t=!0})).catch((function(e){t=!1}));case 4:return e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),f=function(e){var t=Object(c.useState)(),s=Object(l.a)(t,2),a=s[0],n=s[1];return Object(c.useEffect)((function(){o.a.get("http://127.0.0.1:8000/api/v1/user/is_auth/",{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){n(e.data)})).catch((function(e){n(null)}))}),[]),a?Object(d.jsx)("div",{className:"container",children:Object(d.jsxs)("div",{className:"jumbotron",children:[Object(d.jsx)("h1",{children:"\u0417\u0434\u0440\u0430\u0441\u0442\u0432\u0443\u0439\u0442\u0435!"}),Object(d.jsxs)("p",{className:"lead",style:{fontSize:"18pt"},children:[a.username,", \u0434\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u0432 InTheGame. ",Object(d.jsx)("a",{href:"#",children:"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u0432\u0430\u0448 \u043f\u0440\u043e\u0444\u0438\u043b\u044c?"}),Object(d.jsxs)("h2",{align:"center",style:{fontSize:"20pt"},children:["\u0421\u0442\u0430\u0442\u0443\u0441 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430: ",a.group_data.name]})]}),Object(d.jsx)("hr",{}),Object(d.jsx)("div",{className:"container-fluid",children:Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("a",{className:"btn btn-lg btn-primary btn-block",href:"{% url 'profile' username=user.username %}",role:"button",children:"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043f\u0440\u043e\u0444\u0438\u043b\u044c"}),Object(d.jsx)("a",{className:"btn btn-lg btn-success btn-block",href:"{% url 'create_post' category=category %}",role:"button",children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u0441\u0442"}),Object(d.jsx)("a",{className:"btn btn-lg btn-warning btn-block",href:"{% url 'all_chats' %}",role:"button",children:"\u0427\u0430\u0442\u044b"}),Object(d.jsx)("button",{className:"btn btn-lg btn-danger btn-block",onClick:function(e){localStorage.clear(),window.location.href="http://127.0.0.1:8000/auth/login/"},children:"\u0412\u044b\u0439\u0442\u0438"})]})})]})}):Object(d.jsx)("div",{})},v=function(){return Object(d.jsx)("div",{className:"container",children:Object(d.jsxs)("div",{className:"jumbotron",children:[Object(d.jsx)("h1",{style:{fontSize:"23pt"},children:"\u0412\u043d\u0438\u043c\u0430\u043d\u0438\u0435!"}),Object(d.jsx)("hr",{}),Object(d.jsxs)("h2",{style:{fontSize:"20pt"},children:["\u0412\u044b \u043d\u0435 \u0432\u043e\u0448\u043b\u0438 \u0432 \u0441\u0432\u043e\u0439 \u0430\u043a\u043a\u0430\u0443\u043d\u0442, ",Object(d.jsx)("a",{href:"/auth/login/",children:"\u0445\u043e\u0442\u0438\u0442\u0435 \u0432\u043e\u0439\u0442\u0438?"})]})]})})},N=function(){var e=Object(c.useState)([]),t=Object(l.a)(e,2),s=t[0],a=t[1],n=Object(c.useState)(g),r=Object(l.a)(n,2),i=r[0];r[1];return Object(c.useEffect)((function(){o.a.get("http://127.0.0.1:8000/api/v1/category/").then((function(e){a(e.data)}))}),[a]),console.log(i),i?Object(d.jsxs)("div",{children:[Object(d.jsx)(b,{}),"\n",Object(d.jsx)(f,{jwtToken:localStorage.getItem("jwt")},1),"\n\n",Object(d.jsx)(h,{categories:s})]}):Object(d.jsxs)("div",{children:[Object(d.jsx)(b,{}),"\n",Object(d.jsx)(v,{}),"\n\n",Object(d.jsx)(h,{categories:s})]})},y=function(){return Object(d.jsx)("section",{id:"wrapper",className:"container-fluid",children:Object(d.jsx)("div",{className:"error-box",children:Object(d.jsxs)("div",{className:"error-body text-center",children:[Object(d.jsx)("h1",{className:"text-danger",style:{fontSize:"100px"},children:"404"}),Object(d.jsx)("h3",{children:"Page Not Found !"}),Object(d.jsx)("p",{className:"text-muted m-t-30 m-b-30",children:"\u0412\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u0432\u044b \u043f\u0440\u043e\u0441\u0442\u043e \u043e\u043f\u0435\u0447\u0430\u0442\u0430\u043b\u0438\u0441\u044c \u0438\u043b\u0438 \u0432\u0430\u043c \u0441\u043a\u0438\u043d\u0443\u043b\u0438 \u043d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u0443\u044e \u0441\u0441\u044b\u043b\u043a\u0443... :)"}),Object(d.jsx)("a",{href:"/categories/",className:"btn btn-danger btn-rounded m-b-40",children:"\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e"})]})})})},w=function(){return Object(d.jsx)("div",{children:Object(d.jsx)("h2",{style:{marginLeft:"15px"},children:"429 Too many requests."})})},_=function(e){var t=Object(c.useState)(e.attachment),s=Object(l.a)(t,2);s[0],s[1];return Object(d.jsxs)("div",{className:"card border-secondary",children:[Object(d.jsxs)("div",{className:"card-header bg-secondary text-white",children:[Object(d.jsx)("img",{src:e.user_data.avatar.image,className:"rounded-circle float-left",alt:"avatar",style:{width:"65px"}}),"\n\n\n",Object(d.jsx)("a",{href:"",className:"text-white",style:{fontSize:"17pt"},children:e.user_data.username}),"\n",Object(d.jsx)("p",{className:"text-info",children:e.user_data.group_data.name})]}),Object(d.jsx)("div",{className:"card-body",children:Object(d.jsxs)("a",{href:e.url,className:"text-dark",style:{textDecoration:"none"},children:[Object(d.jsx)("h4",{children:e.title}),e.text,e.attachment.map((function(e){return Object(d.jsxs)("div",{children:["\n",Object(d.jsx)("p",{style:{textAlign:"center"},children:Object(d.jsx)("img",{style:{width:"50%"},className:"img-fluid",src:e,alt:"image"})})]})}))]})}),Object(d.jsx)("div",{className:"card-footer",style:{display:"flex"},children:p(e.created_at)})]})},S=function(e){return Object(d.jsx)("div",{className:"posts",children:e.posts.map((function(t){return Object(d.jsxs)("div",{class:"container",children:[Object(d.jsx)(_,{id:t.id,title:t.title,text:t.text,created_at:t.created_at,user_data:t.user_data,attachment:t.attachment,url:"/categories/"+e.categoryId+"/id/"+t.id+"/"}),"\n"]})}))})},k=function(e){var t=Object(c.useState)([]),s=Object(l.a)(t,2),a=s[0],n=s[1],r=Object(c.useState)(null),i=Object(l.a)(r,2),j=i[0],u=i[1],h=e.match.params.categoryId;return Object(c.useEffect)((function(){o.a.get("http://127.0.0.1:8000/api/v1/category/"+h+"/").then((function(e){n(e.data)})).catch((function(e){console.log(e.response),e.response.status&&u({response:e.response.status})}))}),[]),j?404==j.response?Object(d.jsxs)("div",{children:[Object(d.jsx)(b,{}),Object(d.jsx)(y,{style:{marginTop:"25px"}})]}):429==j.response?Object(d.jsxs)("div",{children:[Object(d.jsx)(b,{}),"\n",Object(d.jsx)(w,{})]}):(console.log(j),Object(d.jsx)("div",{children:"i dont know this error :("})):Object(d.jsxs)("div",{children:[Object(d.jsx)(b,{}),"\n\n",Object(d.jsx)(S,{posts:a,categoryId:h})]})},I=function(e){return Object(d.jsx)("div",{children:Object(d.jsxs)("div",{className:"card border-secondary",children:[Object(d.jsxs)("div",{className:"card-header bg-secondary text-white",children:[Object(d.jsx)("img",{src:e.user_data.avatar.image,alt:"avatar",className:"rounded-circle float-left",style:{width:"60px"}}),"\n\n\n",Object(d.jsx)("a",{href:"#",className:"text-white",style:{fontSize:"17pt"},children:e.user_data.username}),"\n",Object(d.jsx)("p",{className:"text-info",children:e.user_data.group_data.name})]}),Object(d.jsx)("div",{className:"card-body",children:e.text}),Object(d.jsx)("div",{className:"card-footer",children:p(e.created_at)})]})})},F=function(e){return Object(d.jsx)("div",{children:e.comments.map((function(e){return Object(d.jsxs)("div",{children:[Object(d.jsx)(I,{id:e.id,text:e.text,created_at:e.created_at,user_data:e.user_data}),"\n\n"]})}))})},z=function(e){var t=e.match.params.categoryId,s=e.match.params.postId,a=Object(c.useState)(null),n=Object(l.a)(a,2),r=n[0],i=n[1],j=Object(c.useState)(!1),u=Object(l.a)(j,2),h=u[0],x=u[1];return Object(c.useEffect)((function(){o.a.get("http://127.0.0.1:8000/api/v1/category/"+t+"/"+s+"/").then((function(e){i(e.data)})).catch((function(e){e.response.status&&x({response:e.response.status})}))}),[]),404==h.response?Object(d.jsxs)("div",{children:[Object(d.jsx)(b,{}),"\n",Object(d.jsx)(y,{})]}):429==h.response?Object(d.jsxs)("div",{children:[Object(d.jsx)(b,{}),"\n",Object(d.jsx)(w,{})]}):!h&&r?Object(d.jsxs)("div",{children:[Object(d.jsx)(b,{}),"\n",Object(d.jsx)("div",{class:"container",children:Object(d.jsx)(_,{id:r.id,title:r.title,text:r.text,created_at:r.created_at,user_data:r.user_data,attachment:r.attachment,url:"#"})}),"\n\n\n",Object(d.jsx)("div",{className:"comments",children:Object(d.jsx)(F,{comments:r.comments})})]}):Object(d.jsx)("div",{})},C=function(e){return Object(d.jsxs)("div",{children:[Object(d.jsx)(b,{}),"There will be form for post"]})},E=(s(27),function(e){var t=Object(c.useState)(),s=Object(l.a)(t,2),a=s[0],n=s[1],r=Object(c.useState)(),i=Object(l.a)(r,2),j=i[0],b=i[1],u=Object(c.useState)(""),h=Object(l.a)(u,2),x=h[0],m=h[1];return Object(d.jsx)("div",{className:"row",style:{margin:"0"},children:Object(d.jsx)("div",{className:"col-11 col-sm-9 col-md-6 mx-auto p-0",children:Object(d.jsx)("div",{className:"card",id:"login-card",children:Object(d.jsx)("div",{className:"login-box",children:Object(d.jsxs)("div",{className:"login-snip",children:[Object(d.jsx)("input",{id:"tab-1",type:"radio",name:"tab",className:"sign-in",checked:!0}),Object(d.jsx)("label",{htmlFor:"tab-1",className:"tab",children:"Login"}),Object(d.jsx)("input",{id:"tab-2",type:"radio",name:"tab",className:"sign-up"}),Object(d.jsx)("label",{htmlFor:"tab-2",className:"tab",children:"Sign Up"}),Object(d.jsxs)("div",{className:"login-space",children:[Object(d.jsxs)("div",{className:"login",children:[Object(d.jsxs)("div",{className:"group",children:[Object(d.jsx)("label",{htmlFor:"user",className:"label",children:"Username"}),Object(d.jsx)("input",{id:"user",type:"text",className:"input",placeholder:"Enter your username",value:a,onChange:function(e){return n(e.target.value)}})]}),Object(d.jsxs)("div",{className:"group",children:[Object(d.jsx)("label",{htmlFor:"pass",className:"label",children:"Password"}),Object(d.jsx)("input",{id:"pass",type:"password",className:"input","data-type":"password",placeholder:"Enter your password",value:j,onChange:function(e){return b(e.target.value)}})]}),Object(d.jsxs)("div",{className:"group",children:[Object(d.jsx)("input",{id:"check",type:"checkbox",className:"check",checked:!0}),Object(d.jsxs)("label",{htmlFor:"check",children:[Object(d.jsx)("span",{className:"icon"})," Keep me Signed in"]})]}),Object(d.jsxs)("div",{className:"group",children:[Object(d.jsx)("input",{type:"button",className:"button",value:"Sign In",onClick:function(e){o.a.post("http://127.0.0.1:8000/jwt/token/",{username:a,password:j}).then((function(e){localStorage.setItem("jwt",e.data.access),window.location.href="http://127.0.0.1:8000/categories/"})).catch((function(e){401==e.response.status?m("\u0412\u044b \u043d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e \u0432\u0432\u0435\u043b\u0438 \u043b\u043e\u0433\u0438\u043d \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430."):400==e.response.status?m("\u041b\u043e\u0433\u0438\u043d \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c \u043d\u0435 \u043c\u043e\u0433\u0443\u0442 \u0431\u044b\u0442\u044c \u043f\u0443\u0441\u0442\u044b\u043c\u0438 -_-."):m("".concat(e.response.status," error"))}))}}),Object(d.jsx)("p",{className:"text-danger",children:x})]}),Object(d.jsx)("div",{className:"hr"}),Object(d.jsxs)("div",{className:"foot",children:[" ",Object(d.jsx)("a",{href:"#",children:"Forgot Password?"})," "]})]}),Object(d.jsxs)("div",{className:"sign-up-form",children:[Object(d.jsxs)("div",{className:"group",children:[Object(d.jsx)("label",{htmlFor:"user",className:"label",children:"Username"}),Object(d.jsx)("input",{id:"user",type:"text",className:"input",placeholder:"Create your Username"})," "]}),Object(d.jsxs)("div",{className:"group",children:[Object(d.jsx)("label",{htmlFor:"pass",className:"label",children:"Password"}),Object(d.jsx)("input",{id:"pass",type:"password",className:"input","data-type":"password",placeholder:"Create your password"})," "]}),Object(d.jsxs)("div",{className:"group",children:[Object(d.jsx)("label",{htmlFor:"pass",className:"label",children:"Repeat Password"}),Object(d.jsx)("input",{id:"pass",type:"password",className:"input","data-type":"password",placeholder:"Repeat your password"})," "]}),Object(d.jsxs)("div",{className:"group",children:[Object(d.jsx)("label",{htmlFor:"pass",className:"label",children:"Email Address"}),Object(d.jsx)("input",{id:"pass",type:"text",className:"input",placeholder:"Enter your email address"})," "]}),Object(d.jsxs)("div",{className:"group",children:[Object(d.jsx)("input",{type:"submit",className:"button",value:"Sign Up"})," "]})]})]})]})})})})})}),T=function(e){return g()?Object(d.jsxs)("div",{children:[Object(d.jsx)(b,{}),"\n",Object(d.jsx)(y,{})]}):Object(d.jsxs)("div",{children:[Object(d.jsx)(b,{}),"\n",Object(d.jsx)(E,{})]})},P=Object(r.e)((function(e){e.history;return Object(d.jsx)("div",{className:"App",children:Object(d.jsxs)(r.d,{children:[Object(d.jsx)(r.b,{exact:!0,path:"/categories/",component:N}),Object(d.jsx)(r.b,{exact:!0,path:"/categories/:categoryId/",component:k}),Object(d.jsx)(r.b,{exact:!0,path:"/categories/:categoryId/create",component:C}),Object(d.jsx)(r.b,{exact:!0,path:"/categories/:categoryId/id/:postId/",component:z}),Object(d.jsx)(r.b,{exact:!0,path:"/auth/login/",component:T}),Object(d.jsx)(r.a,{from:"/",to:"/categories"})]})})})),L=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,67)).then((function(t){var s=t.getCLS,c=t.getFID,a=t.getFCP,n=t.getLCP,r=t.getTTFB;s(e),c(e),a(e),n(e),r(e)}))},A=Object(i.a)();n.a.render(Object(d.jsx)(r.c,{history:A,children:Object(d.jsx)(P,{})}),document.getElementById("root")),L()}},[[65,1,2]]]);
//# sourceMappingURL=main.112e326e.chunk.js.map