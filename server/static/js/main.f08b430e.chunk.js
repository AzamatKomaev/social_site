(this["webpackJsonpsocial-ui"]=this["webpackJsonpsocial-ui"]||[]).push([[0],{30:function(e,t,s){},38:function(e,t,s){},4:function(e,t,s){},67:function(e,t,s){"use strict";s.r(t);var c=s(1),a=s(31),n=s.n(a),r=s(69),i=s(10),l=(s(38),s(11)),j=s(2),o=s(3),d=s.n(o),b=s(68),u=(s(4),s(12)),h=s.n(u),m=s(18),x=function(e){var t=new Date(e);return"".concat(t.getDate()," ").concat(t.toLocaleString("default",{month:"long"})," ").concat(t.getFullYear()," \u0433. ").concat(t.getHours(),":").concat(t.getMinutes())},O=function(){var e=Object(m.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=null,e.next=3,d.a.get("http://127.0.0.1:8000/api/v1/user/is_auth/",{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){t={info:e.data,isAuth:!0}})).catch((function(e){t={info:null,isAuth:!1},e.response.status&&401!=e.response.status&&alert(e.response.status+" error")}));case 3:return e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),p=function(){var e=Object(m.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],e.next=3,d.a.get("http://127.0.0.1:8000/api/v1/category/").then((function(e){t=e.data})).catch((function(e){alert(e.response.status+" error"),t=null}));case 3:return e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),g=(s(5),s(0)),f=function(){return Object(g.jsxs)("div",{className:"d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow",children:[Object(g.jsx)("h3",{className:"my-0 mr-md-auto font-weight-normal",children:"InTheGame"}),Object(g.jsxs)("nav",{className:"my-2 my-md-0 mr-md-3",children:[Object(g.jsx)("a",{className:"p-2 text-dark",href:"/categories",children:"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0439"}),Object(g.jsx)("a",{className:"p-2 text-dark",href:"{% url 'show_all_users' %}",children:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438"}),Object(g.jsx)("a",{className:"p-2 text-dark",href:"api/v1",children:"API"}),Object(g.jsx)("a",{className:"p-2 text-dark",href:"#",children:"\u041e \u043d\u0430\u0441"})]}),Object(g.jsx)("a",{className:"btn btn-outline-primary",href:"/auth/login/",style:{marginRight:"5px"},children:"\u0412\u0445\u043e\u0434"}),Object(g.jsx)("a",{className:"btn btn-outline-secondary",href:"/auth/login/",children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"})]})},v=function(e){return Object(g.jsx)("div",{className:"col-11 col-sm-11 col-md-10 col-lg-8 col-xl-8 mx-auto border border-primary",children:Object(g.jsx)("a",{href:"/categories/c_id/"+e.id,className:"list-group-item list-group-item-action border-0",children:Object(g.jsxs)("div",{className:"d-flex align-items-start",style:{marginLeft:"-10px"},children:[Object(g.jsx)("img",{src:e.avatar,className:"rounded-circle mr-1",alt:"user1",width:"65",height:"65",style:{marginLeft:"-10px"}}),Object(g.jsxs)("div",{className:"flex-grow-1 ml-3",children:[Object(g.jsx)("p",{className:"category-name",children:e.name}),Object(g.jsxs)("div",{className:"small",children:["\u0412\u0441\u0435\u0433\u043e \u043f\u043e\u0441\u0442\u043e\u0432: ",e.count]})]})]})})})},N=function(e){return Object(g.jsx)("div",{className:"container-fluid",children:e.categories.map((function(e){return Object(g.jsx)("div",{className:"row",style:{marginTop:"25px"},children:Object(g.jsx)(v,{id:e.id,name:e.name,avatar:e.avatar,count:e.count},e.id)})}))})},y=function(e){return e.userData?Object(g.jsx)("div",{className:"container",children:Object(g.jsxs)("div",{className:"jumbotron",children:[Object(g.jsx)("h1",{children:"\u0417\u0434\u0440\u0430\u0441\u0442\u0432\u0443\u0439\u0442\u0435!"}),Object(g.jsxs)("p",{className:"lead",style:{fontSize:"18pt"},children:[e.userData.username,", \u0434\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u0432 InTheGame. ",Object(g.jsx)("a",{href:"#",children:"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u0432\u0430\u0448 \u043f\u0440\u043e\u0444\u0438\u043b\u044c?"}),Object(g.jsxs)("h2",{align:"center",style:{fontSize:"20pt"},children:["\u0421\u0442\u0430\u0442\u0443\u0441 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430: ",e.userData.group_data.name]})]}),Object(g.jsx)("hr",{}),Object(g.jsx)("div",{className:"container-fluid",children:Object(g.jsxs)("div",{className:"row",children:[Object(g.jsx)("a",{className:"btn btn-lg btn-primary btn-block",href:"{% url 'profile' username=user.username %}",role:"button",children:"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043f\u0440\u043e\u0444\u0438\u043b\u044c"}),Object(g.jsx)("a",{className:"btn btn-lg btn-success btn-block",href:"/categories/create/",role:"button",children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u0441\u0442"}),Object(g.jsx)("a",{className:"btn btn-lg btn-warning btn-block",href:"{% url 'all_chats' %}",role:"button",children:"\u0427\u0430\u0442\u044b"}),Object(g.jsx)("button",{className:"btn btn-lg btn-danger btn-block",onClick:function(e){localStorage.clear(),window.location.href="http://127.0.0.1:8000/auth/login/"},children:"\u0412\u044b\u0439\u0442\u0438"})]})})]})}):Object(g.jsx)("div",{})},w=function(){return Object(g.jsx)("div",{className:"container",children:Object(g.jsxs)("div",{className:"jumbotron",children:[Object(g.jsx)("h1",{style:{fontSize:"23pt"},children:"\u0412\u043d\u0438\u043c\u0430\u043d\u0438\u0435!"}),Object(g.jsx)("hr",{}),Object(g.jsxs)("h2",{style:{fontSize:"20pt"},children:["\u0412\u044b \u043d\u0435 \u0432\u043e\u0448\u043b\u0438 \u0432 \u0441\u0432\u043e\u0439 \u0430\u043a\u043a\u0430\u0443\u043d\u0442, ",Object(g.jsx)("a",{href:"/auth/login/",children:"\u0445\u043e\u0442\u0438\u0442\u0435 \u0432\u043e\u0439\u0442\u0438?"})]})]})})},S=function(e){var t=Object(c.useState)(),s=Object(j.a)(t,2),a=(s[0],s[1],Object(c.useState)()),n=Object(j.a)(a,2);n[0],n[1];return e.isAuth?Object(g.jsxs)("div",{children:[Object(g.jsx)(f,{}),"\n",Object(g.jsx)(y,{jwtToken:localStorage.getItem("jwt"),userData:e.userData},Object(b.a)()),"\n\n",Object(g.jsx)(N,{categories:e.categories},Object(b.a)())]}):Object(g.jsxs)("div",{children:[Object(g.jsx)(f,{}),"\n",Object(g.jsx)(w,{}),"\n\n",Object(g.jsx)(N,{categories:e.categories},Object(b.a)())]})},_=function(){return Object(g.jsx)("section",{id:"wrapper",className:"container-fluid",children:Object(g.jsx)("div",{className:"error-box",children:Object(g.jsxs)("div",{className:"error-body text-center",children:[Object(g.jsx)("h1",{className:"text-danger",style:{fontSize:"100px"},children:"404"}),Object(g.jsx)("h3",{children:"Page Not Found !"}),Object(g.jsx)("p",{className:"text-muted m-t-30 m-b-30",children:"\u0412\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u0432\u044b \u043f\u0440\u043e\u0441\u0442\u043e \u043e\u043f\u0435\u0447\u0430\u0442\u0430\u043b\u0438\u0441\u044c \u0438\u043b\u0438 \u0432\u0430\u043c \u0441\u043a\u0438\u043d\u0443\u043b\u0438 \u043d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u0443\u044e \u0441\u0441\u044b\u043b\u043a\u0443... :)"}),Object(g.jsx)("a",{href:"/categories/",className:"btn btn-danger btn-rounded m-b-40",children:"\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e"})]})})})},k=function(){return Object(g.jsx)("div",{children:Object(g.jsx)("h2",{style:{marginLeft:"15px"},children:"429 Too many requests."})})},I=function(e){var t=Object(c.useState)(e.attachment),s=Object(j.a)(t,2);s[0],s[1];return Object(g.jsxs)("div",{className:"card border-secondary",children:[Object(g.jsxs)("div",{className:"card-header bg-secondary text-white",children:[Object(g.jsx)("img",{src:e.user_data.avatar.image,className:"rounded-circle float-left",alt:"avatar",style:{width:"65px"}}),"\n\n\n",Object(g.jsx)("a",{href:"",className:"text-white",style:{fontSize:"17pt"},children:e.user_data.username}),"\n",Object(g.jsx)("p",{className:"text-info",children:e.user_data.group_data.name})]}),Object(g.jsx)("div",{className:"card-body",children:Object(g.jsxs)("a",{href:e.url,className:"text-dark",style:{textDecoration:"none"},children:[Object(g.jsx)("h4",{children:e.title}),e.text,e.attachment.map((function(e){return Object(g.jsxs)("div",{children:["\n",Object(g.jsx)("p",{style:{textAlign:"center"},children:Object(g.jsx)("img",{style:{width:"50%"},className:"img-fluid",src:e,alt:"image"})})]})}))]})}),Object(g.jsx)("div",{className:"card-footer",style:{display:"flex"},children:x(e.created_at)})]})},F=function(e){return Object(g.jsx)("div",{className:"posts",children:e.posts.map((function(t){return Object(g.jsxs)("div",{class:"container",children:[Object(g.jsx)(I,{id:t.id,title:t.title,text:t.text,created_at:t.created_at,user_data:t.user_data,attachment:t.attachment,url:"/categories/c_id/"+e.categoryId+"/"+t.id+"/"}),"\n"]})}))})},A=function(e){var t=Object(c.useState)([]),s=Object(j.a)(t,2),a=s[0],n=s[1],r=Object(c.useState)(null),i=Object(j.a)(r,2),l=i[0],o=i[1],u=e.match.params.categoryId;return Object(c.useEffect)((function(){d.a.get("http://127.0.0.1:8000/api/v1/category/"+u+"/").then((function(e){n(e.data)})).catch((function(e){console.log(e.response),e.response.status&&o({response:e.response.status})}))}),[]),l?404==l.response?Object(g.jsxs)("div",{children:[Object(g.jsx)(f,{}),Object(g.jsx)(_,{style:{marginTop:"25px"}})]}):429==l.response?Object(g.jsxs)("div",{children:[Object(g.jsx)(f,{}),"\n",Object(g.jsx)(k,{})]}):(alert(l.response),Object(g.jsx)("div",{})):Object(g.jsxs)("div",{children:[Object(g.jsx)(f,{}),"\n\n",Object(g.jsx)(F,{posts:a,categoryId:u},Object(b.a)())]})},z=function(e){return Object(g.jsx)("div",{children:Object(g.jsxs)("div",{className:"card border-secondary",children:[Object(g.jsxs)("div",{className:"card-header bg-secondary text-white",children:[Object(g.jsx)("img",{src:e.user_data.avatar.image,alt:"avatar",className:"rounded-circle float-left",style:{width:"60px"}}),"\n\n\n",Object(g.jsx)("a",{href:"#",className:"text-white",style:{fontSize:"17pt"},children:e.user_data.username}),"\n",Object(g.jsx)("p",{className:"text-info",children:e.user_data.group_data.name})]}),Object(g.jsx)("div",{className:"card-body",children:e.text}),Object(g.jsx)("div",{className:"card-footer",children:x(e.created_at)})]})})},C=function(e){return Object(g.jsx)("div",{children:e.comments.map((function(e){return Object(g.jsxs)("div",{children:[Object(g.jsx)(z,{id:e.id,text:e.text,created_at:e.created_at,user_data:e.user_data}),"\n\n"]})}))})},T=function(e){var t=Object(c.useState)(),s=Object(j.a)(t,2),a=s[0],n=s[1];return Object(g.jsxs)("div",{children:[Object(g.jsxs)("div",{className:"form-group",children:[Object(g.jsx)("textarea",{id:"id_text",name:"text",rows:"5",className:"form-control",spellcheck:"false",placeholder:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439...",onChange:function(e){return n(e.target.value)},children:a}),Object(g.jsx)("p",{className:"form-text text-muted",style:{fontSize:"10pt"},children:"\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0443\u0432\u0430\u0436\u0430\u0439\u0442\u0435 \u0441\u0432\u043e\u0438\u0445 \u0441\u043e\u0431\u0435\u0441\u0435\u0434\u043d\u0438\u043a\u043e\u0432!"})]}),Object(g.jsx)("div",{className:"form-group row",children:Object(g.jsx)("div",{className:"col-sm-10",children:Object(g.jsx)("button",{onClick:function(){d.a.post("http://127.0.0.1:8000/api/v1/category/"+e.categoryId+"/"+e.postId+"/comment/",{text:a},{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){alert("success add comment")})).catch((function(e){401==e.response.status?(window.location.href="http://127.0.0.1:8000/auth/login/",alert("\u0412\u0430\u043c \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0437\u0430\u0439\u0442\u0438 \u043d\u0430 \u0432\u0430\u0448 \u0430\u043a\u043a\u0430\u0443\u043d\u0442 \u0434\u043b\u044f \u0442\u043e\u0433\u043e, \u0447\u0442\u043e\u0431\u044b \u043d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439.")):alert(e.response.status+" error")}))},className:"btn btn-primary",children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"})})})]})},D=function(e){var t=e.match.params.categoryId,s=e.match.params.postId,a=Object(c.useState)(null),n=Object(j.a)(a,2),r=n[0],i=n[1],l=Object(c.useState)(!1),o=Object(j.a)(l,2),b=o[0],u=o[1];return Object(c.useEffect)((function(){d.a.get("http://127.0.0.1:8000/api/v1/category/"+t+"/"+s+"/").then((function(e){i(e.data)})).catch((function(e){e.response.status&&u({response:e.response.status})}))}),[]),404==b.response?Object(g.jsxs)("div",{children:[Object(g.jsx)(f,{}),"\n",Object(g.jsx)(_,{})]}):429==b.response?Object(g.jsxs)("div",{children:[Object(g.jsx)(f,{}),"\n",Object(g.jsx)(k,{})]}):!b&&r?Object(g.jsxs)("div",{children:[Object(g.jsx)(f,{}),"\n",Object(g.jsxs)("div",{class:"container",children:[Object(g.jsx)(I,{id:r.id,title:r.title,text:r.text,created_at:r.created_at,user_data:r.user_data,attachment:r.attachment,url:"#"}),"\n\n\n",Object(g.jsx)(T,{postId:s,categoryId:t})]}),"\n\n\n",Object(g.jsx)("div",{className:"comments",children:Object(g.jsx)(C,{comments:r.comments})})]}):Object(g.jsx)("div",{})},E=function(e){var t=Object(c.useState)(),s=Object(j.a)(t,2),a=s[0],n=s[1],r=Object(c.useState)(),i=Object(j.a)(r,2),l=i[0],o=i[1],b=Object(c.useState)(),u=Object(j.a)(b,2),h=u[0],m=u[1],x=Object(c.useState)({title:null,text:null,category:null}),O=Object(j.a)(x,2),p=O[0],f=O[1];console.log(p);return Object(g.jsxs)("div",{className:"container",children:[Object(g.jsx)("h2",{style:{margin:"0 35%",fontSize:"35px"},children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u0441\u0442"}),"\n\n",Object(g.jsx)("label",{htmlFor:"select-category",children:"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f"}),"\n",Object(g.jsxs)("select",{class:"browser-default custom-select",id:"select-category",onChange:function(e){return n(e.target.value)},children:[Object(g.jsx)("option",{value:null,selected:!0,children:"\u0412\u044b\u0431\u0435\u0440\u0438 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044e"}),e.categories.map((function(e){return Object(g.jsx)("option",{value:e.id,children:e.name})}))]}),Object(g.jsx)("p",{className:"text-danger",style:{marginTop:"-15px"},children:p.category}),Object(g.jsxs)("div",{className:"form-group",style:{marginTop:"100px"},children:[Object(g.jsx)("label",{htmlFor:"id_title",children:"\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a"}),"\n",Object(g.jsx)("input",{type:"text",name:"title",maxlength:"199",id:"id_title",className:"form-control",value:l,onChange:function(e){return o(e.target.value)},placeholder:"\u0423 \u043c\u0435\u043d\u044f \u0435\u0441\u0442\u044c \u043c\u0435\u0447\u0442\u0430..."}),Object(g.jsx)("p",{className:"form-text text-muted",style:{fontSize:"10pt"},children:"\u041e\u043f\u0438\u0448\u0438\u0442\u0435 \u043e\u0441\u043d\u043e\u0432\u043d\u043e\u0439 \u0441\u043c\u044b\u0441\u043b \u043f\u043e\u0441\u0442\u0430 \u0432 \u0434\u0432\u0443\u0445 \u0441\u043b\u043e\u0432\u0430\u0445."}),Object(g.jsx)("p",{className:"text-danger",style:{marginTop:"-15px"},children:p.title})]}),"\n",Object(g.jsxs)("div",{className:"form-group",children:[Object(g.jsx)("label",{htmlFor:"id_text",children:"\u041a\u043e\u043d\u0442\u0435\u043d\u0442"}),"\n",Object(g.jsx)("textarea",{name:"text",rows:"10",required:"",id:"id_text",className:"form-control",spellcheck:"false",onChange:function(e){return m(e.target.value)},placeholder:"\u041c\u0435\u0447\u0442\u0430 - \u043e\u0441\u043e\u0431\u044b\u0439 \u0432\u0438\u0434 \u0432\u043e\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f, \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043b\u044f\u044e\u0449\u0438\u0439 \u0441\u043e\u0431\u043e\u0439 \u0441\u0430\u043c\u043e\u0441\u0442\u043e\u044f\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u043d\u043e\u0432\u044b\u0445 \u043e\u0431\u0440\u0430\u0437\u043e\u0432, \u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043d\u044b\u0439 \u043d\u0430 \u0431\u0443\u0434\u0443\u0449\u0435\u0435 \u0438 \u0432\u044b\u0440\u0430\u0436\u0430\u044e\u0449\u0438\u0439 \u0436\u0435\u043b\u0430\u043d\u0438\u044f \u0447\u0435\u043b\u043e\u0432\u0435\u043a\u0430.",children:h}),Object(g.jsx)("p",{className:"form-text text-muted",style:{fontSize:"10pt"},children:"\u0410 \u0442\u0435\u043f\u0435\u0440\u044c \u043f\u043e\u043b\u043d\u043e\u0441\u0442\u044c\u044e \u0438\u0437\u043b\u0435\u0439\u0442\u0435 \u0441\u0432\u043e\u044e \u0434\u0443\u0448\u0443."}),Object(g.jsx)("p",{className:"text-danger",style:{marginTop:"-15px"},children:p.text})]}),"\n",Object(g.jsx)("div",{className:"input-group mb-3",children:Object(g.jsxs)("div",{className:"custom-file",children:[Object(g.jsxs)("div",{className:"custom-file",children:[Object(g.jsx)("label",{htmlFor:"id_image",className:"custom-file-label",children:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043b"}),Object(g.jsx)("input",{type:"file",className:"custom-file-input",id:"id_image",accept:".png, .jpg, .jpeg",name:"image"})]}),Object(g.jsx)("div",{className:"input-group-append",children:Object(g.jsx)("span",{className:"input-group-text",id:"",children:"Upload"})})]})}),Object(g.jsx)("p",{className:"form-text text-muted",style:{fontSize:"10pt"},children:"\u0418 \u043d\u0430\u043a\u043e\u043d\u0435\u0446-\u0442\u043e \u043f\u0440\u043e\u0434\u0435\u043c\u043e\u043d\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435 \u044d\u0442\u043e \u043d\u0430 \u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0439!"}),"\n",Object(g.jsx)("div",{className:"form-group row",children:Object(g.jsx)("div",{className:"col-sm-10",children:Object(g.jsx)("button",{onClick:function(){void 0!=a&&"\u0412\u044b\u0431\u0435\u0440\u0438 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044e"!=a||alert("\u0412\u044b \u043d\u0435 \u0443\u043a\u0430\u0437\u0430\u043b\u0438 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044e. \u041a\u0443\u0434\u0430 \u0434\u043e\u0431\u0430\u0432\u043b\u044f\u0442\u044c \u043f\u043e\u0441\u0442? -_-"),d.a.post("http://127.0.0.1:8000/api/v1/category/"+a+"/",{title:l,text:h,category:a},{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){window.location.href="http://127.0.0.1:8000/categories/c_id/"+a+"/"})).catch((function(e){400==e.response.status&&f(e.response.data)}))},className:"btn btn-primary",children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"})})})]})},P=function(e){return e.isAuth?Object(g.jsxs)("div",{children:[Object(g.jsx)(f,{}),"\n",Object(g.jsx)(E,{categories:e.categories})]}):e.isAuth?Object(g.jsx)("div",{}):Object(g.jsxs)("div",{children:[Object(g.jsx)(f,{}),"\n",Object(g.jsx)(_,{})]})},L=(s(30),function(e){var t=Object(c.useState)(),s=Object(j.a)(t,2),a=s[0],n=s[1],r=Object(c.useState)(),i=Object(j.a)(r,2),l=i[0],o=i[1],b=Object(c.useState)(""),u=Object(j.a)(b,2),h=u[0],m=u[1];return Object(g.jsx)("div",{className:"row",style:{margin:"0"},children:Object(g.jsx)("div",{className:"col-11 col-sm-9 col-md-6 mx-auto p-0",children:Object(g.jsx)("div",{className:"card",id:"login-card",children:Object(g.jsx)("div",{className:"login-box",children:Object(g.jsxs)("div",{className:"login-snip",children:[Object(g.jsx)("input",{id:"tab-1",type:"radio",name:"tab",className:"sign-in",checked:!0}),Object(g.jsx)("label",{htmlFor:"tab-1",className:"tab",children:"Login"}),Object(g.jsx)("input",{id:"tab-2",type:"radio",name:"tab",className:"sign-up"}),Object(g.jsx)("label",{htmlFor:"tab-2",className:"tab",children:"Sign Up"}),Object(g.jsxs)("div",{className:"login-space",children:[Object(g.jsxs)("div",{className:"login",children:[Object(g.jsxs)("div",{className:"group",children:[Object(g.jsx)("label",{htmlFor:"user",className:"label",children:"Username"}),Object(g.jsx)("input",{id:"user",type:"text",className:"input",placeholder:"Enter your username",value:a,onChange:function(e){return n(e.target.value)}})]}),Object(g.jsxs)("div",{className:"group",children:[Object(g.jsx)("label",{htmlFor:"pass",className:"label",children:"Password"}),Object(g.jsx)("input",{id:"pass",type:"password",className:"input","data-type":"password",placeholder:"Enter your password",value:l,onChange:function(e){return o(e.target.value)}})]}),Object(g.jsxs)("div",{className:"group",children:[Object(g.jsx)("input",{id:"check",type:"checkbox",className:"check",checked:!0}),Object(g.jsxs)("label",{htmlFor:"check",children:[Object(g.jsx)("span",{className:"icon"})," Keep me Signed in"]})]}),Object(g.jsxs)("div",{className:"group",children:[Object(g.jsx)("input",{type:"button",className:"button",value:"Sign In",onClick:function(e){d.a.post("http://127.0.0.1:8000/jwt/token/",{username:a,password:l}).then((function(e){localStorage.setItem("jwt",e.data.access),window.location.href="http://127.0.0.1:8000/categories/"})).catch((function(e){401==e.response.status?m("\u0412\u044b \u043d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e \u0432\u0432\u0435\u043b\u0438 \u043b\u043e\u0433\u0438\u043d \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430."):400==e.response.status?m("\u041b\u043e\u0433\u0438\u043d \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c \u043d\u0435 \u043c\u043e\u0433\u0443\u0442 \u0431\u044b\u0442\u044c \u043f\u0443\u0441\u0442\u044b\u043c\u0438 -_-."):m("".concat(e.response.status," error"))}))}}),Object(g.jsx)("p",{className:"text-danger",children:h})]}),Object(g.jsx)("div",{className:"hr"}),Object(g.jsxs)("div",{className:"foot",children:[" ",Object(g.jsx)("a",{href:"#",children:"Forgot Password?"})," "]})]}),Object(g.jsxs)("div",{className:"sign-up-form",children:[Object(g.jsxs)("div",{className:"group",children:[Object(g.jsx)("label",{htmlFor:"user",className:"label",children:"Username"}),Object(g.jsx)("input",{id:"user",type:"text",className:"input",placeholder:"Create your Username"})," "]}),Object(g.jsxs)("div",{className:"group",children:[Object(g.jsx)("label",{htmlFor:"pass",className:"label",children:"Password"}),Object(g.jsx)("input",{id:"pass",type:"password",className:"input","data-type":"password",placeholder:"Create your password"})," "]}),Object(g.jsxs)("div",{className:"group",children:[Object(g.jsx)("label",{htmlFor:"pass",className:"label",children:"Repeat Password"}),Object(g.jsx)("input",{id:"pass",type:"password",className:"input","data-type":"password",placeholder:"Repeat your password"})," "]}),Object(g.jsxs)("div",{className:"group",children:[Object(g.jsx)("label",{htmlFor:"pass",className:"label",children:"Email Address"}),Object(g.jsx)("input",{id:"pass",type:"text",className:"input",placeholder:"Enter your email address"})," "]}),Object(g.jsxs)("div",{className:"group",children:[Object(g.jsx)("input",{type:"submit",className:"button",value:"Sign Up"})," "]})]})]})]})})})})})}),U=function(e){return e.isAuth?Object(g.jsxs)("div",{children:[Object(g.jsx)(f,{}),"\n",Object(g.jsx)(_,{})]}):Object(g.jsxs)("div",{children:[Object(g.jsx)(f,{}),"\n",Object(g.jsx)(L,{})]})},B=Object(r.e)((function(e){e.history;var t=Object(c.useState)(),s=Object(j.a)(t,2),a=s[0],n=s[1],i=Object(c.useState)(),o=Object(j.a)(i,2),d=o[0],u=o[1],h=Object(c.useState)([]),m=Object(j.a)(h,2),x=m[0],f=m[1];Object(c.useEffect)((function(){O().then((function(e){u(e.info),n(e.isAuth)})),p().then((function(e){f(e)}))}),[]);return Object(g.jsx)("div",{className:"App",children:Object(g.jsxs)(r.d,{children:[Object(g.jsx)(r.b,{exact:!0,path:"/categories/",component:function(e){return Object(c.createElement)(S,Object(l.a)(Object(l.a)({},e),{},{isAuth:a,userData:d,categories:x,key:Object(b.a)()}))}}),Object(g.jsx)(r.b,{exact:!0,path:"/categories/create/",component:function(e){return Object(g.jsx)(P,Object(l.a)(Object(l.a)({},e),{},{isAuth:a,categories:x}))}}),Object(g.jsx)(r.b,{exact:!0,path:"/categories/c_id/:categoryId/",component:A}),Object(g.jsx)(r.b,{exact:!0,path:"/categories/c_id/:categoryId/:postId/",component:D}),Object(g.jsx)(r.b,{exact:!0,path:"/auth/login/",component:function(e){return Object(c.createElement)(U,Object(l.a)(Object(l.a)({},e),{},{isAuth:a,key:Object(b.a)()}))}}),Object(g.jsx)(r.a,{from:"/",to:"/categories"})]})})})),R=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,70)).then((function(t){var s=t.getCLS,c=t.getFID,a=t.getFCP,n=t.getLCP,r=t.getTTFB;s(e),c(e),a(e),n(e),r(e)}))},q=Object(i.a)();n.a.render(Object(g.jsx)(r.c,{history:q,children:Object(g.jsx)(B,{})}),document.getElementById("root")),R()}},[[67,1,2]]]);
//# sourceMappingURL=main.f08b430e.chunk.js.map