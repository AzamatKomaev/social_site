(this["webpackJsonpsocial-ui"]=this["webpackJsonpsocial-ui"]||[]).push([[0],{17:function(e,t,c){},39:function(e,t,c){},4:function(e,t,c){},68:function(e,t,c){"use strict";c.r(t);var s=c(1),a=c(32),n=c.n(a),r=c(70),i=c(11),o=(c(39),c(8)),l=c(2),j=c(3),d=c.n(j),u=c(69),b=(c(4),c(12)),h=c.n(b),x=c(13),m=function(e){var t=new Date(e);return"".concat(t.getDate()," ").concat(t.toLocaleString("default",{month:"long"})," ").concat(t.getFullYear()," \u0433. ").concat(t.getHours(),":").concat(t.getMinutes())},O=function(){var e=Object(x.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=null,e.next=3,d.a.get("http://127.0.0.1:8000/api/v1/user/is_auth/",{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){t={info:e.data,isAuth:!0}})).catch((function(e){t={info:null,isAuth:!1},e.response.status&&401!=e.response.status&&alert(e.response.status+" error")}));case 3:return e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),p=function(){var e=Object(x.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],e.next=3,d.a.get("http://127.0.0.1:8000/api/v1/category/").then((function(e){t=e.data})).catch((function(e){alert(e.response.status+" error"),t=null}));case 3:return e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),f=(c(5),c(0)),g=function(){return Object(f.jsxs)("div",{className:"d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow",children:[Object(f.jsx)("h3",{className:"my-0 mr-md-auto font-weight-normal",children:"InTheGame"}),Object(f.jsxs)("nav",{className:"my-2 my-md-0 mr-md-3",children:[Object(f.jsx)("a",{className:"p-2 text-dark",href:"/categories",children:"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0439"}),Object(f.jsx)("a",{className:"p-2 text-dark",href:"{% url 'show_all_users' %}",children:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438"}),Object(f.jsx)("a",{className:"p-2 text-dark",href:"api/v1",children:"API"}),Object(f.jsx)("a",{className:"p-2 text-dark",href:"#",children:"\u041e \u043d\u0430\u0441"})]}),Object(f.jsx)("a",{className:"btn btn-outline-primary",href:"/auth/login/",style:{marginRight:"5px"},children:"\u0412\u0445\u043e\u0434"}),Object(f.jsx)("a",{className:"btn btn-outline-secondary",href:"/auth/sign_up/",children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"})]})},v=function(e){return Object(f.jsx)("div",{className:"col-11 col-sm-11 col-md-10 col-lg-8 col-xl-8 mx-auto border border-primary",children:Object(f.jsx)("a",{href:"/categories/c_id/"+e.id,className:"list-group-item list-group-item-action border-0",children:Object(f.jsxs)("div",{className:"d-flex align-items-start",style:{marginLeft:"-10px"},children:[Object(f.jsx)("img",{src:e.avatar,className:"rounded-circle mr-1",alt:"user1",width:"65",height:"65",style:{marginLeft:"-10px"}}),Object(f.jsxs)("div",{className:"flex-grow-1 ml-3",children:[Object(f.jsx)("p",{className:"category-name",children:e.name}),Object(f.jsxs)("div",{className:"small",children:["\u0412\u0441\u0435\u0433\u043e \u043f\u043e\u0441\u0442\u043e\u0432: ",e.count]})]})]})})})},N=function(e){return Object(f.jsx)("div",{className:"container-fluid",children:e.categories.map((function(e){return Object(f.jsx)("div",{className:"row",style:{marginTop:"25px"},children:Object(f.jsx)(v,{id:e.id,name:e.name,avatar:e.avatar,count:e.count},e.id)})}))})},y=function(e){return e.userData?Object(f.jsx)("div",{className:"container",children:Object(f.jsxs)("div",{className:"jumbotron",children:[Object(f.jsx)("h1",{children:"\u0417\u0434\u0440\u0430\u0441\u0442\u0432\u0443\u0439\u0442\u0435!"}),Object(f.jsxs)("p",{className:"lead",style:{fontSize:"18pt"},children:[e.userData.username,", \u0434\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u0432 InTheGame. ",Object(f.jsx)("a",{href:"#",children:"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u0432\u0430\u0448 \u043f\u0440\u043e\u0444\u0438\u043b\u044c?"}),Object(f.jsxs)("h2",{align:"center",style:{fontSize:"20pt"},children:["\u0421\u0442\u0430\u0442\u0443\u0441 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430: ",e.userData.group_data.name]})]}),Object(f.jsx)("hr",{}),Object(f.jsx)("div",{className:"container-fluid",children:Object(f.jsxs)("div",{className:"row",children:[Object(f.jsx)("a",{className:"btn btn-lg btn-primary btn-block",href:"{% url 'profile' username=user.username %}",role:"button",children:"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043f\u0440\u043e\u0444\u0438\u043b\u044c"}),Object(f.jsx)("a",{className:"btn btn-lg btn-success btn-block",href:"/categories/create/",role:"button",children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u0441\u0442"}),Object(f.jsx)("a",{className:"btn btn-lg btn-warning btn-block",href:"{% url 'all_chats' %}",role:"button",children:"\u0427\u0430\u0442\u044b"}),Object(f.jsx)("button",{className:"btn btn-lg btn-danger btn-block",onClick:function(e){localStorage.clear(),window.location.href="http://127.0.0.1:8000/auth/login/"},children:"\u0412\u044b\u0439\u0442\u0438"})]})})]})}):Object(f.jsx)("div",{})},w=function(){return Object(f.jsx)("div",{className:"container",children:Object(f.jsxs)("div",{className:"jumbotron",children:[Object(f.jsx)("h1",{style:{fontSize:"23pt"},children:"\u0412\u043d\u0438\u043c\u0430\u043d\u0438\u0435!"}),Object(f.jsx)("hr",{}),Object(f.jsxs)("h2",{style:{fontSize:"20pt"},children:["\u0412\u044b \u043d\u0435 \u0432\u043e\u0448\u043b\u0438 \u0432 \u0441\u0432\u043e\u0439 \u0430\u043a\u043a\u0430\u0443\u043d\u0442, ",Object(f.jsx)("a",{href:"/auth/login/",children:"\u0445\u043e\u0442\u0438\u0442\u0435 \u0432\u043e\u0439\u0442\u0438?"})]})]})})},S=function(e){var t=Object(s.useState)(),c=Object(l.a)(t,2),a=(c[0],c[1],Object(s.useState)()),n=Object(l.a)(a,2);n[0],n[1];return e.isAuth?Object(f.jsxs)("div",{children:[Object(f.jsx)(g,{}),"\n",Object(f.jsx)(y,{jwtToken:localStorage.getItem("jwt"),userData:e.userData},Object(u.a)()),"\n\n",Object(f.jsx)(N,{categories:e.categories},Object(u.a)())]}):Object(f.jsxs)("div",{children:[Object(f.jsx)(g,{}),"\n",Object(f.jsx)(w,{}),"\n\n",Object(f.jsx)(N,{categories:e.categories},Object(u.a)())]})},_=function(){return Object(f.jsx)("section",{id:"wrapper",className:"container-fluid",children:Object(f.jsx)("div",{className:"error-box",children:Object(f.jsxs)("div",{className:"error-body text-center",children:[Object(f.jsx)("h1",{className:"text-danger",style:{fontSize:"100px"},children:"404"}),Object(f.jsx)("h3",{children:"Page Not Found !"}),Object(f.jsx)("p",{className:"text-muted m-t-30 m-b-30",children:"\u0412\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u0432\u044b \u043f\u0440\u043e\u0441\u0442\u043e \u043e\u043f\u0435\u0447\u0430\u0442\u0430\u043b\u0438\u0441\u044c \u0438\u043b\u0438 \u0432\u0430\u043c \u0441\u043a\u0438\u043d\u0443\u043b\u0438 \u043d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u0443\u044e \u0441\u0441\u044b\u043b\u043a\u0443... :)"}),Object(f.jsx)("a",{href:"/categories/",className:"btn btn-danger btn-rounded m-b-40",children:"\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e"})]})})})},k=function(){return Object(f.jsx)("div",{children:Object(f.jsx)("h2",{style:{marginLeft:"15px"},children:"429 Too many requests."})})},C=function(e){return Object(f.jsxs)("div",{className:"card border-secondary",children:[Object(f.jsx)("div",{className:"card-header bg-secondary text-white",children:Object(f.jsxs)("div",{class:"d-flex align-items-center py-1",children:[Object(f.jsx)("div",{class:"position-relative",children:Object(f.jsx)("img",{src:e.user_data.avatar.image,className:"rounded-circle float-left",alt:"avatar",width:"57",height:"57",style:{marginTop:"-10px"}})}),Object(f.jsxs)("div",{class:"flex-grow-1 pl-3",children:[Object(f.jsx)("a",{href:"",className:"text-white",style:{fontSize:"15pt"},children:e.user_data.username}),Object(f.jsx)("p",{className:"text-info",style:{fontSize:"12pt"},children:e.user_data.group_data.name})]})]})}),Object(f.jsx)("div",{className:"card-body",children:Object(f.jsxs)("a",{href:e.url,className:"text-dark",style:{textDecoration:"none"},children:[Object(f.jsx)("h4",{children:e.title}),e.text,e.photo?Object(f.jsxs)("div",{children:["\n",Object(f.jsx)("p",{style:{textAlign:"center"},children:Object(f.jsx)("img",{style:{width:"50%"},className:"img-fluid",src:e.photo,alt:e.photo})})]}):null]})}),Object(f.jsx)("div",{className:"card-footer",style:{display:"flex"},children:m(e.created_at)})]})},A=function(e){return Object(f.jsx)("div",{className:"posts",children:e.posts.map((function(t){return Object(f.jsxs)("div",{class:"container",children:[Object(f.jsx)(C,{id:t.id,title:t.title,text:t.text,created_at:t.created_at,user_data:t.user_data,photo:t.photo,url:"/categories/c_id/"+e.categoryId+"/"+t.id+"/"}),"\n\n\n"]})}))})},I=function(e){var t=Object(s.useState)([]),c=Object(l.a)(t,2),a=c[0],n=c[1],r=Object(s.useState)(null),i=Object(l.a)(r,2),o=i[0],j=i[1],b=e.match.params.categoryId;return Object(s.useEffect)((function(){d.a.get("http://127.0.0.1:8000/api/v1/category/"+b+"/").then((function(e){n(e.data)})).catch((function(e){console.log(e.response),e.response.status&&j({response:e.response.status})}))}),[]),o?404==o.response?Object(f.jsxs)("div",{children:[Object(f.jsx)(g,{}),Object(f.jsx)(_,{style:{marginTop:"25px"}})]}):429==o.response?Object(f.jsxs)("div",{children:[Object(f.jsx)(g,{}),"\n",Object(f.jsx)(k,{})]}):(alert(o.response),Object(f.jsx)("div",{})):Object(f.jsxs)("div",{children:[Object(f.jsx)(g,{}),"\n\n",Object(f.jsx)(A,{posts:a,categoryId:b},Object(u.a)())]})},T=function(e){return Object(f.jsx)("div",{children:Object(f.jsxs)("div",{className:"card border-secondary",children:[Object(f.jsx)("div",{className:"card-header bg-secondary text-white",children:Object(f.jsxs)("div",{class:"d-flex align-items-center py-1",children:[Object(f.jsx)("div",{class:"position-relative",children:Object(f.jsx)("img",{src:e.user_data.avatar.image,alt:"avatar",style:{marginTop:"-10px"},className:"rounded-circle float-left",width:"48",height:"48"})}),Object(f.jsxs)("div",{class:"flex-grow-1 pl-3",children:[Object(f.jsx)("a",{href:"#",className:"text-white",style:{fontSize:"13pt"},children:e.user_data.username}),"\n",Object(f.jsx)("p",{className:"text-info",style:{fontSize:"10pt"},children:e.user_data.group_data.name})]})]})}),Object(f.jsx)("div",{className:"card-body",children:e.text}),Object(f.jsx)("div",{className:"card-footer",children:m(e.created_at)})]})})},z=function(e){return Object(f.jsx)("div",{className:"container",children:e.comments.map((function(e){return Object(f.jsxs)("div",{children:[Object(f.jsx)(T,{id:e.id,text:e.text,created_at:e.created_at,user_data:e.user_data}),"\n"]})}))})},P=function(e){var t=Object(s.useState)(),c=Object(l.a)(t,2),a=c[0],n=c[1],r=Object(s.useState)(null),i=Object(l.a)(r,2),o=i[0],j=i[1];return Object(f.jsxs)("div",{children:[Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("textarea",{id:"id_text",name:"text",rows:"5",className:"form-control",spellcheck:"false",placeholder:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439...",onChange:function(e){return n(e.target.value)},children:a}),Object(f.jsx)("p",{className:"form-text text-muted",style:{fontSize:"10pt"},children:"\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0443\u0432\u0430\u0436\u0430\u0439\u0442\u0435 \u0441\u0432\u043e\u0438\u0445 \u0441\u043e\u0431\u0435\u0441\u0435\u0434\u043d\u0438\u043a\u043e\u0432!"})]}),Object(f.jsx)("p",{className:"text-danger",children:o}),Object(f.jsx)("div",{className:"form-group row",children:Object(f.jsx)("div",{className:"col-sm-10",children:Object(f.jsx)("button",{onClick:function(){d.a.post("http://127.0.0.1:8000/api/v1/category/"+e.categoryId+"/"+e.postId+"/comment/",{text:a},{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){window.location.reload()})).catch((function(e){401==e.response.status?window.location.href="http://127.0.0.1:8000/auth/login/":400==e.response.status?j("\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439 \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u043f\u0443\u0441\u0442\u044b\u043c!"):alert(e.response.status+" error")}))},className:"btn btn-primary",children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"})})})]})},D=function(e){var t=e.match.params.categoryId,c=e.match.params.postId,a=Object(s.useState)(null),n=Object(l.a)(a,2),r=n[0],i=n[1],o=Object(s.useState)(!1),j=Object(l.a)(o,2),u=j[0],b=j[1];return Object(s.useEffect)((function(){d.a.get("http://127.0.0.1:8000/api/v1/category/"+t+"/"+c+"/").then((function(e){i(e.data)})).catch((function(e){e.response.status&&b({response:e.response.status})}))}),[]),404==u.response?Object(f.jsxs)("div",{children:[Object(f.jsx)(g,{}),"\n",Object(f.jsx)(_,{})]}):429==u.response?Object(f.jsxs)("div",{children:[Object(f.jsx)(g,{}),"\n",Object(f.jsx)(k,{})]}):!u&&r?Object(f.jsxs)("div",{children:[Object(f.jsx)(g,{}),"\n",Object(f.jsxs)("div",{class:"container",children:[Object(f.jsx)(C,{id:r.id,title:r.title,text:r.text,created_at:r.created_at,user_data:r.user_data,photo:r.photo,url:"#"}),"\n\n\n",Object(f.jsx)(P,{postId:c,categoryId:t})]}),"\n\n\n",Object(f.jsx)("div",{className:"comments",children:Object(f.jsx)(z,{comments:r.comments})})]}):Object(f.jsx)("div",{})},B=function(e){var t=Object(s.useState)(),c=Object(l.a)(t,2),a=c[0],n=c[1],r=Object(s.useState)(),i=Object(l.a)(r,2),o=i[0],j=i[1],u=Object(s.useState)(),b=Object(l.a)(u,2),h=b[0],x=b[1],m=Object(s.useState)(null),O=Object(l.a)(m,2),p=O[0],g=O[1],v=Object(s.useState)({title:null,text:null,category:null}),N=Object(l.a)(v,2),y=N[0],w=N[1];return Object(f.jsxs)("div",{className:"container",children:[Object(f.jsx)("h2",{style:{margin:"0 35%",fontSize:"35px"},children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u0441\u0442"}),"\n\n",Object(f.jsx)("label",{htmlFor:"select-category",children:"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f"}),"\n",Object(f.jsxs)("select",{class:"browser-default custom-select",id:"select-category",onChange:function(e){return n(e.target.value)},children:[Object(f.jsx)("option",{value:null,selected:!0,children:"\u0412\u044b\u0431\u0435\u0440\u0438 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044e"}),e.categories.map((function(e){return Object(f.jsx)("option",{value:e.id,children:e.name})}))]}),Object(f.jsx)("p",{className:"text-danger",style:{marginTop:"-15px"},children:y.category}),Object(f.jsxs)("div",{className:"form-group",style:{marginTop:"100px"},children:[Object(f.jsx)("label",{htmlFor:"id_title",children:"\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a"}),"\n",Object(f.jsx)("input",{type:"text",name:"title",maxlength:"199",id:"id_title",className:"form-control",value:o,onChange:function(e){return j(e.target.value)},placeholder:"\u0423 \u043c\u0435\u043d\u044f \u0435\u0441\u0442\u044c \u043c\u0435\u0447\u0442\u0430..."}),Object(f.jsx)("p",{className:"form-text text-muted",style:{fontSize:"10pt"},children:"\u041e\u043f\u0438\u0448\u0438\u0442\u0435 \u043e\u0441\u043d\u043e\u0432\u043d\u043e\u0439 \u0441\u043c\u044b\u0441\u043b \u043f\u043e\u0441\u0442\u0430 \u0432 \u0434\u0432\u0443\u0445 \u0441\u043b\u043e\u0432\u0430\u0445."}),Object(f.jsx)("p",{className:"text-danger",style:{marginTop:"-15px"},children:y.title})]}),"\n",Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"id_text",children:"\u041a\u043e\u043d\u0442\u0435\u043d\u0442"}),"\n",Object(f.jsx)("textarea",{name:"text",rows:"10",required:"",id:"id_text",className:"form-control",spellcheck:"false",onChange:function(e){return x(e.target.value)},placeholder:"\u041c\u0435\u0447\u0442\u0430 - \u043e\u0441\u043e\u0431\u044b\u0439 \u0432\u0438\u0434 \u0432\u043e\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f, \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043b\u044f\u044e\u0449\u0438\u0439 \u0441\u043e\u0431\u043e\u0439 \u0441\u0430\u043c\u043e\u0441\u0442\u043e\u044f\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u043d\u043e\u0432\u044b\u0445 \u043e\u0431\u0440\u0430\u0437\u043e\u0432, \u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043d\u044b\u0439 \u043d\u0430 \u0431\u0443\u0434\u0443\u0449\u0435\u0435 \u0438 \u0432\u044b\u0440\u0430\u0436\u0430\u044e\u0449\u0438\u0439 \u0436\u0435\u043b\u0430\u043d\u0438\u044f \u0447\u0435\u043b\u043e\u0432\u0435\u043a\u0430.",children:h}),Object(f.jsx)("p",{className:"form-text text-muted",style:{fontSize:"10pt"},children:"\u0410 \u0442\u0435\u043f\u0435\u0440\u044c \u043f\u043e\u043b\u043d\u043e\u0441\u0442\u044c\u044e \u0438\u0437\u043b\u0435\u0439\u0442\u0435 \u0441\u0432\u043e\u044e \u0434\u0443\u0448\u0443."}),Object(f.jsx)("p",{className:"text-danger",style:{marginTop:"-15px"},children:y.text})]}),"\n",Object(f.jsx)("div",{className:"input-group mb-3",children:Object(f.jsxs)("div",{className:"custom-file",children:[Object(f.jsxs)("div",{className:"custom-file",children:[Object(f.jsx)("label",{htmlFor:"id_image",className:"custom-file-label",children:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043b"}),Object(f.jsx)("input",{type:"file",className:"custom-file-input",id:"id_image",accept:".png, .jpg, .jpeg",name:"image",onChange:function(e){e.preventDefault(),e.target.files[0]&&g(e.target.files[0])}})]}),Object(f.jsx)("div",{className:"input-group-append",children:Object(f.jsx)("span",{className:"input-group-text",id:"",children:"Upload"})})]})}),Object(f.jsx)("p",{className:"form-text text-muted",style:{fontSize:"10pt"},children:"\u0418 \u043d\u0430\u043a\u043e\u043d\u0435\u0446-\u0442\u043e \u043f\u0440\u043e\u0434\u0435\u043c\u043e\u043d\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435 \u044d\u0442\u043e \u043d\u0430 \u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0439!"}),"\n",Object(f.jsx)("div",{className:"form-group row",children:Object(f.jsx)("div",{className:"col-sm-10",children:Object(f.jsx)("button",{onClick:function(){void 0!=a&&"\u0412\u044b\u0431\u0435\u0440\u0438 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044e"!=a||alert("\u0412\u044b \u043d\u0435 \u0443\u043a\u0430\u0437\u0430\u043b\u0438 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044e. \u041a\u0443\u0434\u0430 \u0434\u043e\u0431\u0430\u0432\u043b\u044f\u0442\u044c \u043f\u043e\u0441\u0442? -_-");var e=function(e,t,c,s){var a=new FormData;return a.append("title",e),a.append("text",t),a.append("category",c),null!=s&&a.append("photo",s),a}(o,h,a,p);console.log(e),d.a.post("http://127.0.0.1:8000/api/v1/category/"+a+"/",e,{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){console.log(e.data),window.location.href="http://127.0.0.1:8000/categories/c_id/"+a+"/"})).catch((function(e){400==e.response.status&&w(e.response.data)}))},className:"btn btn-primary",children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"})})})]})},F=function(e){return e.isAuth?Object(f.jsxs)("div",{children:[Object(f.jsx)(g,{}),"\n",Object(f.jsx)(B,{categories:e.categories})]}):e.isAuth?Object(f.jsx)("div",{}):Object(f.jsxs)("div",{children:[Object(f.jsx)(g,{}),"\n",Object(f.jsx)(_,{})]})},E=(c(17),c(31),function(e){var t=Object(s.useState)(),c=Object(l.a)(t,2),a=c[0],n=c[1],r=Object(s.useState)(),i=Object(l.a)(r,2),o=i[0],j=i[1],u=Object(s.useState)(""),b=Object(l.a)(u,2),h=b[0],x=b[1];return Object(f.jsx)("div",{className:"row",children:Object(f.jsx)("div",{className:"col-10 mx-auto",children:Object(f.jsx)("div",{className:"registration-form",children:Object(f.jsxs)("div",{className:"form-login",children:[Object(f.jsx)("div",{className:"form-icon",children:Object(f.jsx)("span",{children:Object(f.jsx)("i",{className:"icon icon-user"})})}),Object(f.jsx)("div",{className:"form-group",children:Object(f.jsx)("input",{type:"text",className:"form-control item",id:"username",value:a,onChange:function(e){return n(e.target.value)},placeholder:"Username"})}),Object(f.jsx)("div",{className:"form-group",children:Object(f.jsx)("input",{type:"password",className:"form-control item",id:"password1",value:o,onChange:function(e){return j(e.target.value)},placeholder:"Password"})}),Object(f.jsx)("a",{href:"#",style:{float:"right",marginTop:"-10px",backgroundColor:"PowderBlue"},children:"Don't have an account?"}),"\n",Object(f.jsx)("p",{className:"text-danger",style:{float:"right",backgroundColor:"PowderBlue"},children:h}),"\n\n",Object(f.jsx)("div",{className:"form-group",children:Object(f.jsx)("button",{type:"button",className:"btn btn-block create-account",onClick:function(e){d.a.post("http://127.0.0.1:8000/jwt/token/",{username:a,password:o}).then((function(e){localStorage.setItem("jwt",e.data.access),window.location.href="http://127.0.0.1:8000/categories/"})).catch((function(e){401==e.response.status?x("\u0412\u044b \u043d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e \u0432\u0432\u0435\u043b\u0438 \u043b\u043e\u0433\u0438\u043d \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430."):400==e.response.status?x("\u041b\u043e\u0433\u0438\u043d \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c \u043d\u0435 \u043c\u043e\u0433\u0443\u0442 \u0431\u044b\u0442\u044c \u043f\u0443\u0441\u0442\u044b\u043c\u0438 -_-."):x("".concat(e.response.status," error"))}))},children:"Sign In"})})]})})})})}),L=function(e){return Object(f.jsxs)("div",{children:[Object(f.jsx)(g,{}),"\n",e.isAuth?Object(f.jsx)(_,{}):Object(f.jsx)(E,{})]})},U=function(){var e=Object(s.useState)(),t=Object(l.a)(e,2),c=t[0],a=t[1],n=Object(s.useState)(),r=Object(l.a)(n,2),i=r[0],o=r[1],j=Object(s.useState)(),u=Object(l.a)(j,2),b=u[0],h=u[1],x=Object(s.useState)(),m=Object(l.a)(x,2),O=m[0],p=m[1],g=Object(s.useState)({username:null,password:null,password2:null,email:null}),v=Object(l.a)(g,2),N=v[0],y=v[1];return Object(f.jsx)("div",{className:"row",children:Object(f.jsx)("div",{className:"col-10 mx-auto",children:Object(f.jsx)("div",{className:"registration-form",children:Object(f.jsxs)("div",{className:"form",children:[Object(f.jsx)("div",{className:"form-icon",children:Object(f.jsx)("span",{children:Object(f.jsx)("i",{className:"icon icon-user"})})}),Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("input",{type:"text",className:"form-control item",id:"username",value:c,onChange:function(e){return a(e.target.value)},placeholder:"Username"}),Object(f.jsx)("p",{className:"text-danger",style:{float:"left",marginTop:"-10px",backgroundColor:"PowderBlue"},children:N.username})]}),Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("input",{type:"password",className:"form-control item",id:"password1",value:i,onChange:function(e){return o(e.target.value)},placeholder:"Password"}),Object(f.jsx)("p",{className:"text-danger",style:{float:"left",marginTop:"-10px",backgroundColor:"PowderBlue"},children:N.password})]}),Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("input",{type:"password",className:"form-control item",id:"password2",value:b,onChange:function(e){return h(e.target.value)},placeholder:"Repeat Password"}),Object(f.jsx)("p",{className:"text-danger",style:{float:"left",marginTop:"-10px",backgroundColor:"PowderBlue"},children:N.password2})]}),Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("input",{type:"text",className:"form-control item",id:"email",value:O,onChange:function(e){return p(e.target.value)},placeholder:"Email"}),Object(f.jsx)("p",{className:"text-danger",style:{float:"left",marginTop:"-10px",backgroundColor:"PowderBlue"},children:N.email})]}),"\n",Object(f.jsx)("a",{href:"#",style:{float:"right",marginTop:"-5px",backgroundColor:"PowderBlue"},children:"Already have an account?"}),"\n\n",Object(f.jsx)("div",{className:"form-group",children:Object(f.jsx)("button",{onClick:function(){i!=b&&y({password2:"\u041f\u0430\u0440\u043e\u043b\u0438 \u0434\u043e\u043b\u0436\u043d\u044b \u0441\u043e\u0432\u043f\u0430\u0434\u0430\u0442\u044c!"}),d.a.post("http://127.0.0.1:8000/api/v1/user/register/",{username:c,password:i,email:O}).then((function(e){window.location.href="http://127.0.0.1:8000/auth/login/"})).catch((function(e){400==e.response.status?y(e.response.data):alert(e.response.status+" error")}))},className:"btn btn-block create-account",children:"Create Account"})})]})})})})},q=function(e){return Object(f.jsxs)("div",{children:[Object(f.jsx)(g,{}),e.isAuth?Object(f.jsx)(_,{}):Object(f.jsx)(U,{})]})},G=function(){return Object(f.jsxs)("div",{children:[Object(f.jsx)("h2",{children:"\u041f\u043e\u0437\u0434\u0440\u0430\u0432\u043b\u044f\u0435\u043c!"}),Object(f.jsxs)("p",{children:["\u0412\u044b \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043b\u0438\u0441\u044c! ",Object(f.jsx)("a",{href:"#",children:"\u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u0447\u0442\u043e\u0431\u044b \u0432\u043e\u0439\u0442\u0438"})]})]})},J=function(){var e=Object(x.a)(h.a.mark((function e(t,c){var s;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!c){e.next=3;break}return s=!1,e.abrupt("return",s);case 3:return e.next=5,d.a.get("http://127.0.0.1:8000/api/v1/user/accept/"+t+"/").then((function(e){console.log(e.data),s=!0})).catch((function(e){s=!1,404==e.response.status?alert("Token doesnt exists"):alert(e.response.status+" error")}));case 5:return console.log("Accept in func is "+s),e.abrupt("return",s);case 7:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}(),R=function(e){var t=e.match.params.token,c=Object(s.useState)((function(){J(t,e.isAuth).then((function(e){r(e)}))})),a=Object(l.a)(c,2),n=a[0],r=a[1];return console.log("Accepted is "+n),n?Object(f.jsxs)("div",{children:[Object(f.jsx)(g,{}),Object(f.jsx)(G,{})]}):Object(f.jsxs)("div",{children:[Object(f.jsx)(g,{}),Object(f.jsx)(_,{})]})},H=Object(r.e)((function(e){e.history;var t=Object(s.useState)(),c=Object(l.a)(t,2),a=c[0],n=c[1],i=Object(s.useState)(),j=Object(l.a)(i,2),d=j[0],b=j[1],h=Object(s.useState)([]),x=Object(l.a)(h,2),m=x[0],g=x[1];Object(s.useEffect)((function(){O().then((function(e){b(e.info),n(e.isAuth)})),p().then((function(e){g(e)}))}),[]);return Object(f.jsx)("div",{className:"App",children:Object(f.jsxs)(r.d,{children:[Object(f.jsx)(r.b,{exact:!0,path:"/categories/",component:function(e){return Object(s.createElement)(S,Object(o.a)(Object(o.a)({},e),{},{isAuth:a,userData:d,categories:m,key:Object(u.a)()}))}}),Object(f.jsx)(r.b,{exact:!0,path:"/categories/create/",component:function(e){return Object(f.jsx)(F,Object(o.a)(Object(o.a)({},e),{},{isAuth:a,categories:m}))}}),Object(f.jsx)(r.b,{exact:!0,path:"/categories/c_id/:categoryId/",component:I}),Object(f.jsx)(r.b,{exact:!0,path:"/categories/c_id/:categoryId/:postId/",component:D}),Object(f.jsx)(r.b,{exact:!0,path:"/auth/login/",component:function(e){return Object(s.createElement)(L,Object(o.a)(Object(o.a)({},e),{},{isAuth:a,key:Object(u.a)()}))}}),Object(f.jsx)(r.b,{exact:!0,path:"/auth/sign_up/",component:function(e){return Object(s.createElement)(q,Object(o.a)(Object(o.a)({},e),{},{isAuth:a,key:Object(u.a)()}))}}),Object(f.jsx)(r.b,{exact:!0,path:"/auth/accept/:token/",component:function(e){return Object(s.createElement)(R,Object(o.a)(Object(o.a)({},e),{},{isAuth:a,key:Object(u.a)()}))}}),Object(f.jsx)(r.a,{from:"/",to:"/categories"})]})})})),M=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,71)).then((function(t){var c=t.getCLS,s=t.getFID,a=t.getFCP,n=t.getLCP,r=t.getTTFB;c(e),s(e),a(e),n(e),r(e)}))},Y=Object(i.a)();n.a.render(Object(f.jsx)(r.c,{history:Y,children:Object(f.jsx)(H,{})}),document.getElementById("root")),M()}},[[68,1,2]]]);
//# sourceMappingURL=main.0c2d5ae6.chunk.js.map