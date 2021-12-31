(this["webpackJsonpsocial-ui"]=this["webpackJsonpsocial-ui"]||[]).push([[0],{29:function(e,t,s){},37:function(e,t,s){},6:function(e,t,s){},66:function(e,t,s){"use strict";s.r(t);var c=s(1),a=s(30),n=s.n(a),r=s(69),i=s(10),l=(s(37),s(11)),j=s(2),o=s(3),d=s.n(o),b=s(68),u=(s(6),s(12)),h=s.n(u),x=s(17),m=function(e){var t=new Date(e);return"".concat(t.getDate()," ").concat(t.toLocaleString("default",{month:"long"})," ").concat(t.getFullYear()," \u0433. ").concat(t.getHours(),":").concat(t.getMinutes())},O=function(){var e=Object(x.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=null,e.next=3,d.a.get("http://127.0.0.1:8000/api/v1/user/is_auth/",{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){t={info:e.data,isAuth:!0}})).catch((function(e){t={info:null,isAuth:!1},401!=e.response.status&&alert(e.response.status+" error")}));case 3:return e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),p=(s(7),s(0)),g=function(){return Object(p.jsxs)("div",{className:"d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow",children:[Object(p.jsx)("h3",{className:"my-0 mr-md-auto font-weight-normal",children:"InTheGame"}),Object(p.jsxs)("nav",{className:"my-2 my-md-0 mr-md-3",children:[Object(p.jsx)("a",{className:"p-2 text-dark",href:"/categories",children:"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0439"}),Object(p.jsx)("a",{className:"p-2 text-dark",href:"{% url 'show_all_users' %}",children:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438"}),Object(p.jsx)("a",{className:"p-2 text-dark",href:"api/v1",children:"API"}),Object(p.jsx)("a",{className:"p-2 text-dark",href:"#",children:"\u041e \u043d\u0430\u0441"})]}),Object(p.jsx)("a",{className:"btn btn-outline-primary",href:"/auth/login/",style:{marginRight:"5px"},children:"\u0412\u0445\u043e\u0434"}),Object(p.jsx)("a",{className:"btn btn-outline-secondary",href:"/auth/login/",children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"})]})},f=function(e){return Object(p.jsx)("div",{className:"col-11 col-sm-11 col-md-10 col-lg-8 col-xl-8 mx-auto border border-primary",children:Object(p.jsx)("a",{href:"/categories/"+e.id,className:"list-group-item list-group-item-action border-0",children:Object(p.jsxs)("div",{className:"d-flex align-items-start",style:{marginLeft:"-10px"},children:[Object(p.jsx)("img",{src:e.avatar,className:"rounded-circle mr-1",alt:"user1",width:"65",height:"65",style:{marginLeft:"-10px"}}),Object(p.jsxs)("div",{className:"flex-grow-1 ml-3",children:[Object(p.jsx)("p",{className:"category-name",children:e.name}),Object(p.jsxs)("div",{className:"small",children:["\u0412\u0441\u0435\u0433\u043e \u043f\u043e\u0441\u0442\u043e\u0432: ",e.count]})]})]})})})},v=function(e){return Object(p.jsx)("div",{className:"container-fluid",children:e.categories.map((function(e){return Object(p.jsx)("div",{className:"row",style:{marginTop:"25px"},children:Object(p.jsx)(f,{id:e.id,name:e.name,avatar:e.avatar,count:e.count},e.id)})}))})},N=function(e){return e.userData?Object(p.jsx)("div",{className:"container",children:Object(p.jsxs)("div",{className:"jumbotron",children:[Object(p.jsx)("h1",{children:"\u0417\u0434\u0440\u0430\u0441\u0442\u0432\u0443\u0439\u0442\u0435!"}),Object(p.jsxs)("p",{className:"lead",style:{fontSize:"18pt"},children:[e.userData.username,", \u0434\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u0432 InTheGame. ",Object(p.jsx)("a",{href:"#",children:"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u0432\u0430\u0448 \u043f\u0440\u043e\u0444\u0438\u043b\u044c?"}),Object(p.jsxs)("h2",{align:"center",style:{fontSize:"20pt"},children:["\u0421\u0442\u0430\u0442\u0443\u0441 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430: ",e.userData.group_data.name]})]}),Object(p.jsx)("hr",{}),Object(p.jsx)("div",{className:"container-fluid",children:Object(p.jsxs)("div",{className:"row",children:[Object(p.jsx)("a",{className:"btn btn-lg btn-primary btn-block",href:"{% url 'profile' username=user.username %}",role:"button",children:"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043f\u0440\u043e\u0444\u0438\u043b\u044c"}),Object(p.jsx)("a",{className:"btn btn-lg btn-success btn-block",href:"{% url 'create_post' category=category %}",role:"button",children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u0441\u0442"}),Object(p.jsx)("a",{className:"btn btn-lg btn-warning btn-block",href:"{% url 'all_chats' %}",role:"button",children:"\u0427\u0430\u0442\u044b"}),Object(p.jsx)("button",{className:"btn btn-lg btn-danger btn-block",onClick:function(e){localStorage.clear(),window.location.href="http://127.0.0.1:8000/auth/login/"},children:"\u0412\u044b\u0439\u0442\u0438"})]})})]})}):Object(p.jsx)("div",{})},y=function(){return Object(p.jsx)("div",{className:"container",children:Object(p.jsxs)("div",{className:"jumbotron",children:[Object(p.jsx)("h1",{style:{fontSize:"23pt"},children:"\u0412\u043d\u0438\u043c\u0430\u043d\u0438\u0435!"}),Object(p.jsx)("hr",{}),Object(p.jsxs)("h2",{style:{fontSize:"20pt"},children:["\u0412\u044b \u043d\u0435 \u0432\u043e\u0448\u043b\u0438 \u0432 \u0441\u0432\u043e\u0439 \u0430\u043a\u043a\u0430\u0443\u043d\u0442, ",Object(p.jsx)("a",{href:"/auth/login/",children:"\u0445\u043e\u0442\u0438\u0442\u0435 \u0432\u043e\u0439\u0442\u0438?"})]})]})})},w=function(e){var t=Object(c.useState)([]),s=Object(j.a)(t,2),a=(s[0],s[1],Object(c.useState)()),n=Object(j.a)(a,2),r=(n[0],n[1],Object(c.useState)()),i=Object(j.a)(r,2);i[0],i[1];return e.isAuth?Object(p.jsxs)("div",{children:[Object(p.jsx)(g,{}),"\n",Object(p.jsx)(N,{jwtToken:localStorage.getItem("jwt"),userData:e.userData},1),"\n\n",Object(p.jsx)(v,{categories:e.categories})]}):Object(p.jsxs)("div",{children:[Object(p.jsx)(g,{}),"\n",Object(p.jsx)(y,{}),"\n\n",Object(p.jsx)(v,{categories:e.categories})]})},S=function(){return Object(p.jsx)("section",{id:"wrapper",className:"container-fluid",children:Object(p.jsx)("div",{className:"error-box",children:Object(p.jsxs)("div",{className:"error-body text-center",children:[Object(p.jsx)("h1",{className:"text-danger",style:{fontSize:"100px"},children:"404"}),Object(p.jsx)("h3",{children:"Page Not Found !"}),Object(p.jsx)("p",{className:"text-muted m-t-30 m-b-30",children:"\u0412\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u0432\u044b \u043f\u0440\u043e\u0441\u0442\u043e \u043e\u043f\u0435\u0447\u0430\u0442\u0430\u043b\u0438\u0441\u044c \u0438\u043b\u0438 \u0432\u0430\u043c \u0441\u043a\u0438\u043d\u0443\u043b\u0438 \u043d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u0443\u044e \u0441\u0441\u044b\u043b\u043a\u0443... :)"}),Object(p.jsx)("a",{href:"/categories/",className:"btn btn-danger btn-rounded m-b-40",children:"\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e"})]})})})},_=function(){return Object(p.jsx)("div",{children:Object(p.jsx)("h2",{style:{marginLeft:"15px"},children:"429 Too many requests."})})},k=function(e){var t=Object(c.useState)(e.attachment),s=Object(j.a)(t,2);s[0],s[1];return Object(p.jsxs)("div",{className:"card border-secondary",children:[Object(p.jsxs)("div",{className:"card-header bg-secondary text-white",children:[Object(p.jsx)("img",{src:e.user_data.avatar.image,className:"rounded-circle float-left",alt:"avatar",style:{width:"65px"}}),"\n\n\n",Object(p.jsx)("a",{href:"",className:"text-white",style:{fontSize:"17pt"},children:e.user_data.username}),"\n",Object(p.jsx)("p",{className:"text-info",children:e.user_data.group_data.name})]}),Object(p.jsx)("div",{className:"card-body",children:Object(p.jsxs)("a",{href:e.url,className:"text-dark",style:{textDecoration:"none"},children:[Object(p.jsx)("h4",{children:e.title}),e.text,e.attachment.map((function(e){return Object(p.jsxs)("div",{children:["\n",Object(p.jsx)("p",{style:{textAlign:"center"},children:Object(p.jsx)("img",{style:{width:"50%"},className:"img-fluid",src:e,alt:"image"})})]})}))]})}),Object(p.jsx)("div",{className:"card-footer",style:{display:"flex"},children:m(e.created_at)})]})},I=function(e){return Object(p.jsx)("div",{className:"posts",children:e.posts.map((function(t){return Object(p.jsxs)("div",{class:"container",children:[Object(p.jsx)(k,{id:t.id,title:t.title,text:t.text,created_at:t.created_at,user_data:t.user_data,attachment:t.attachment,url:"/categories/"+e.categoryId+"/id/"+t.id+"/"}),"\n"]})}))})},F=function(e){var t=Object(c.useState)([]),s=Object(j.a)(t,2),a=s[0],n=s[1],r=Object(c.useState)(null),i=Object(j.a)(r,2),l=i[0],o=i[1],b=e.match.params.categoryId;return Object(c.useEffect)((function(){d.a.get("http://127.0.0.1:8000/api/v1/category/"+b+"/").then((function(e){n(e.data)})).catch((function(e){console.log(e.response),e.response.status&&o({response:e.response.status})}))}),[]),l?404==l.response?Object(p.jsxs)("div",{children:[Object(p.jsx)(g,{}),Object(p.jsx)(S,{style:{marginTop:"25px"}})]}):429==l.response?Object(p.jsxs)("div",{children:[Object(p.jsx)(g,{}),"\n",Object(p.jsx)(_,{})]}):(console.log(l),Object(p.jsx)("div",{children:"i dont know this error :("})):Object(p.jsxs)("div",{children:[Object(p.jsx)(g,{}),"\n\n",Object(p.jsx)(I,{posts:a,categoryId:b})]})},A=function(e){return Object(p.jsx)("div",{children:Object(p.jsxs)("div",{className:"card border-secondary",children:[Object(p.jsxs)("div",{className:"card-header bg-secondary text-white",children:[Object(p.jsx)("img",{src:e.user_data.avatar.image,alt:"avatar",className:"rounded-circle float-left",style:{width:"60px"}}),"\n\n\n",Object(p.jsx)("a",{href:"#",className:"text-white",style:{fontSize:"17pt"},children:e.user_data.username}),"\n",Object(p.jsx)("p",{className:"text-info",children:e.user_data.group_data.name})]}),Object(p.jsx)("div",{className:"card-body",children:e.text}),Object(p.jsx)("div",{className:"card-footer",children:m(e.created_at)})]})})},E=function(e){return Object(p.jsx)("div",{children:e.comments.map((function(e){return Object(p.jsxs)("div",{children:[Object(p.jsx)(A,{id:e.id,text:e.text,created_at:e.created_at,user_data:e.user_data}),"\n\n"]})}))})},D=function(e){var t=e.match.params.categoryId,s=e.match.params.postId,a=Object(c.useState)(null),n=Object(j.a)(a,2),r=n[0],i=n[1],l=Object(c.useState)(!1),o=Object(j.a)(l,2),b=o[0],u=o[1];return Object(c.useEffect)((function(){d.a.get("http://127.0.0.1:8000/api/v1/category/"+t+"/"+s+"/").then((function(e){i(e.data)})).catch((function(e){e.response.status&&u({response:e.response.status})}))}),[]),404==b.response?Object(p.jsxs)("div",{children:[Object(p.jsx)(g,{}),"\n",Object(p.jsx)(S,{})]}):429==b.response?Object(p.jsxs)("div",{children:[Object(p.jsx)(g,{}),"\n",Object(p.jsx)(_,{})]}):!b&&r?Object(p.jsxs)("div",{children:[Object(p.jsx)(g,{}),"\n",Object(p.jsx)("div",{class:"container",children:Object(p.jsx)(k,{id:r.id,title:r.title,text:r.text,created_at:r.created_at,user_data:r.user_data,attachment:r.attachment,url:"#"})}),"\n\n\n",Object(p.jsx)("div",{className:"comments",children:Object(p.jsx)(E,{comments:r.comments})})]}):Object(p.jsx)("div",{})},C=function(e){return e.isAuth?Object(p.jsxs)("div",{children:[Object(p.jsx)(g,{}),"There will be form for post"]}):Object(p.jsxs)("div",{children:[Object(p.jsx)(g,{}),"\n",Object(p.jsx)(S,{})]})},T=(s(29),function(e){var t=Object(c.useState)(),s=Object(j.a)(t,2),a=s[0],n=s[1],r=Object(c.useState)(),i=Object(j.a)(r,2),l=i[0],o=i[1],b=Object(c.useState)(""),u=Object(j.a)(b,2),h=u[0],x=u[1];return Object(p.jsx)("div",{className:"row",style:{margin:"0"},children:Object(p.jsx)("div",{className:"col-11 col-sm-9 col-md-6 mx-auto p-0",children:Object(p.jsx)("div",{className:"card",id:"login-card",children:Object(p.jsx)("div",{className:"login-box",children:Object(p.jsxs)("div",{className:"login-snip",children:[Object(p.jsx)("input",{id:"tab-1",type:"radio",name:"tab",className:"sign-in",checked:!0}),Object(p.jsx)("label",{htmlFor:"tab-1",className:"tab",children:"Login"}),Object(p.jsx)("input",{id:"tab-2",type:"radio",name:"tab",className:"sign-up"}),Object(p.jsx)("label",{htmlFor:"tab-2",className:"tab",children:"Sign Up"}),Object(p.jsxs)("div",{className:"login-space",children:[Object(p.jsxs)("div",{className:"login",children:[Object(p.jsxs)("div",{className:"group",children:[Object(p.jsx)("label",{htmlFor:"user",className:"label",children:"Username"}),Object(p.jsx)("input",{id:"user",type:"text",className:"input",placeholder:"Enter your username",value:a,onChange:function(e){return n(e.target.value)}})]}),Object(p.jsxs)("div",{className:"group",children:[Object(p.jsx)("label",{htmlFor:"pass",className:"label",children:"Password"}),Object(p.jsx)("input",{id:"pass",type:"password",className:"input","data-type":"password",placeholder:"Enter your password",value:l,onChange:function(e){return o(e.target.value)}})]}),Object(p.jsxs)("div",{className:"group",children:[Object(p.jsx)("input",{id:"check",type:"checkbox",className:"check",checked:!0}),Object(p.jsxs)("label",{htmlFor:"check",children:[Object(p.jsx)("span",{className:"icon"})," Keep me Signed in"]})]}),Object(p.jsxs)("div",{className:"group",children:[Object(p.jsx)("input",{type:"button",className:"button",value:"Sign In",onClick:function(e){d.a.post("http://127.0.0.1:8000/jwt/token/",{username:a,password:l}).then((function(e){localStorage.setItem("jwt",e.data.access),window.location.href="http://127.0.0.1:8000/categories/"})).catch((function(e){401==e.response.status?x("\u0412\u044b \u043d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e \u0432\u0432\u0435\u043b\u0438 \u043b\u043e\u0433\u0438\u043d \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430."):400==e.response.status?x("\u041b\u043e\u0433\u0438\u043d \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c \u043d\u0435 \u043c\u043e\u0433\u0443\u0442 \u0431\u044b\u0442\u044c \u043f\u0443\u0441\u0442\u044b\u043c\u0438 -_-."):x("".concat(e.response.status," error"))}))}}),Object(p.jsx)("p",{className:"text-danger",children:h})]}),Object(p.jsx)("div",{className:"hr"}),Object(p.jsxs)("div",{className:"foot",children:[" ",Object(p.jsx)("a",{href:"#",children:"Forgot Password?"})," "]})]}),Object(p.jsxs)("div",{className:"sign-up-form",children:[Object(p.jsxs)("div",{className:"group",children:[Object(p.jsx)("label",{htmlFor:"user",className:"label",children:"Username"}),Object(p.jsx)("input",{id:"user",type:"text",className:"input",placeholder:"Create your Username"})," "]}),Object(p.jsxs)("div",{className:"group",children:[Object(p.jsx)("label",{htmlFor:"pass",className:"label",children:"Password"}),Object(p.jsx)("input",{id:"pass",type:"password",className:"input","data-type":"password",placeholder:"Create your password"})," "]}),Object(p.jsxs)("div",{className:"group",children:[Object(p.jsx)("label",{htmlFor:"pass",className:"label",children:"Repeat Password"}),Object(p.jsx)("input",{id:"pass",type:"password",className:"input","data-type":"password",placeholder:"Repeat your password"})," "]}),Object(p.jsxs)("div",{className:"group",children:[Object(p.jsx)("label",{htmlFor:"pass",className:"label",children:"Email Address"}),Object(p.jsx)("input",{id:"pass",type:"text",className:"input",placeholder:"Enter your email address"})," "]}),Object(p.jsxs)("div",{className:"group",children:[Object(p.jsx)("input",{type:"submit",className:"button",value:"Sign Up"})," "]})]})]})]})})})})})}),z=function(e){return e.isAuth?Object(p.jsxs)("div",{children:[Object(p.jsx)(g,{}),"\n",Object(p.jsx)(S,{})]}):Object(p.jsxs)("div",{children:[Object(p.jsx)(g,{}),"\n",Object(p.jsx)(T,{})]})},P=Object(r.e)((function(e){e.history;var t=Object(c.useState)(),s=Object(j.a)(t,2),a=s[0],n=s[1],i=Object(c.useState)(),o=Object(j.a)(i,2),u=o[0],h=o[1],x=Object(c.useState)(),m=Object(j.a)(x,2),g=m[0],f=m[1];Object(c.useEffect)((function(){d.a.get("http://127.0.0.1:8000/api/v1/category/").then((function(e){f(e.data)}))}),[]),Object(c.useEffect)((function(){O().then((function(e){h(e.info),n(e.isAuth)}))}),[]);return Object(p.jsx)("div",{className:"App",children:Object(p.jsxs)(r.d,{children:[Object(p.jsx)(r.b,{exact:!0,path:"/categories/",component:function(e){return Object(c.createElement)(w,Object(l.a)(Object(l.a)({},e),{},{isAuth:a,userData:u,key:Object(b.a)()}))}}),Object(p.jsx)(r.b,{exact:!0,path:"/categories/:categoryId/",component:F}),Object(p.jsx)(r.b,{exact:!0,path:"/categories/:categoryId/create",component:function(e){return Object(p.jsx)(C,Object(l.a)(Object(l.a)({},e),{},{isAuth:a}))}}),Object(p.jsx)(r.b,{exact:!0,path:"/categories/:categoryId/id/:postId/",component:D}),Object(p.jsx)(r.b,{exact:!0,path:"/auth/login/",component:function(e){return Object(c.createElement)(z,Object(l.a)(Object(l.a)({},e),{},{isAuth:a,categories:g,key:Object(b.a)()}))}}),Object(p.jsx)(r.a,{from:"/",to:"/categories"})]})})})),L=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,70)).then((function(t){var s=t.getCLS,c=t.getFID,a=t.getFCP,n=t.getLCP,r=t.getTTFB;s(e),c(e),a(e),n(e),r(e)}))},U=Object(i.a)();n.a.render(Object(p.jsx)(r.c,{history:U,children:Object(p.jsx)(P,{})}),document.getElementById("root")),L()}},[[66,1,2]]]);
//# sourceMappingURL=main.9656904b.chunk.js.map