(this["webpackJsonpsca-rabbi-schedules"]=this["webpackJsonpsca-rabbi-schedules"]||[]).push([[0],{24:function(e,t,a){e.exports=a.p+"static/media/spinner.3acec546.gif"},25:function(e,t,a){e.exports=a.p+"static/media/SCALogo.80df96a3.png"},39:function(e,t){},47:function(e,t,a){e.exports=a(78)},53:function(e,t,a){},64:function(e,t){},65:function(e,t){},78:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(42),l=a.n(c),i=(a(52),a(53),a(2)),o=a(13),s=a(19),u=a(22),m=a(17),d=a(16),h=a(10),f=a.n(h),p=a(31),v=a.n(p),b=function(e){return e.map((function(e){return e.map((function(e){return function(e){if("string"===typeof e)return e;var t=new Date(86400*(e-25568)*1e3+18e6);return f()(t).format("LT")}(e)}))}))},g=function(e){return Object.entries(e).map((function(e){var t=Object(i.a)(e,2),a=t[0],n=t[1];return Object(d.a)({_id:a},n)}))},E=function(e,t,a){var n=Object(m.a)(a[0]),r=w(a,e);if(-1===r)return Object(m.a)(a);var c=a.slice(1).filter((function(e){var a=e[r];return a&&!a.toLowerCase().includes(t.toLowerCase())}));return[n].concat(c)},y=function(e,t,a){var n=Object(m.a)(a[0]),r=w(a,e);if(-1===r)return[n];var c=a.slice(1).filter((function(e){var a=e[r];return a&&a.toLowerCase().includes(t.toLowerCase())}));return[n].concat(c)},w=function(e,t){return e[0].findIndex((function(e){return e.toLowerCase().includes(t.toLowerCase())}))},N=function(e){var t=e.input,a=e.highlight,n=u.find(t);if(0===n.length)return r.a.createElement("p",{className:a&&"highlight"},t);var c=n[0],l=c.value,i=c.type;return r.a.createElement("a",{href:l,className:l.includes("zoom")&&"url"===i?"zoomIcon":""},"url"===i?"Click here":l)},j=function(e){var t=e.schedule,a=e.filter,n=t.title,c=t.rows,l=t.logo,i=a?y(a.type,a.match,c):E("type","minyan",c);if(1===i.length)return null;var o=i[0].reduce((function(e,t,a){return t.toString().toLowerCase().startsWith("hide")&&e.push(a),e}),[]),s=a&&c[0].findIndex((function(e){return e.toLowerCase().includes(a.type)})),u=function(e,t){if("minyan"===(null===a||void 0===a?void 0:a.match))return!1;var n=e.toLowerCase();return s===t&&n.includes(a.match)};return r.a.createElement("div",{className:"schedule-card my-5"},r.a.createElement("div",{className:"card-header"},!!l&&r.a.createElement("div",{className:"w-100"},r.a.createElement("img",{src:l,className:"logo ml-4"})),r.a.createElement("h1",{className:"schedule-title"},n)),r.a.createElement("table",{className:"table table-striped table-bordered table-hover shadow"},r.a.createElement("thead",{className:"text-light"},r.a.createElement("tr",null,i[0].map((function(e,t){if(!o.includes(t))return r.a.createElement("th",{key:t},e)})))),r.a.createElement("tbody",null,i.slice(1).map((function(e,t){return r.a.createElement("tr",{key:t},e.map((function(e,t){if(!o.includes(t))return r.a.createElement("td",{key:t},r.a.createElement(N,{input:e,highlight:u(e,t)}))})))})))))},O=function(e){var t=e.attachment,a=t.title,n=t.file,c=t.cover,l=t.body;return r.a.createElement("div",{className:"attachment-card px-0 col-md-4"},r.a.createElement("a",{href:n,target:"_blank",className:"d-flex flex-column align-items-center justify-content-center"},r.a.createElement("div",{className:"card-header"},!!c&&r.a.createElement("div",{className:"w-100"},r.a.createElement("img",{src:c,className:"attachment-cover"})),r.a.createElement("h3",{className:"attachment-title"},a),!!l&&r.a.createElement("p",{className:"attachment-caption"},l)),r.a.createElement("span",{className:"btn btn-secondary"},"Click to download")))},C=a(26),S=function(e){var t=e.onSpreadSheetDropped,a=e.currentSpreadSheet,c=Object(n.useState)(void 0),l=Object(i.a)(c,2),o=l[0],s=l[1],u=Object(n.useState)(void 0),m=Object(i.a)(u,2),d=m[0],h=m[1];Object(n.useEffect)((function(){return h(a)}),[a]);var f=Object(C.a)({onDrop:function(e){var a,n=e[0];if(!/^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/.test(n.name.toLowerCase()))return alert("Only files with .xlsx or .xls extentions are allowed here.");s(n.name),(a=n,new Promise((function(e){var t=new FileReader;t.onload=function(t){var a=t.target.result,n=v.a.read(a,{type:"array"}),r=n.Sheets[n.SheetNames[0]],c=v.a.utils.sheet_to_json(r),l=Object.keys(c[0]),i=[l].concat(c.map((function(e){return l.map((function(t){return e[t]}))})));e(b(i))},t.readAsArrayBuffer(a)}))).then((function(e){h(e),t(e)}))}}),p=f.getRootProps,g=f.getInputProps;f.isDragActive;return r.a.createElement("div",Object.assign({},p(),{className:"file-dropper scroll-content p-4 my-2"}),r.a.createElement("input",g()),!o&&r.a.createElement("p",null,"Drop excel file here",r.a.createElement("br",null),"(or click to choose file)"),!!o&&r.a.createElement("p",null,o),!!d&&r.a.createElement(j,{schedule:{title:"",rows:d}}))},k=a(23),x=a.n(k),A=a(1),D=a.n(A),F=a(4),L=a(11),_=a(12),P=function(){function e(t){Object(L.a)(this,e),this.storage=void 0,this.storage=t}return Object(_.a)(e,[{key:"addSchedule",value:function(){var e=Object(F.a)(D.a.mark((function e(t){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.storage.push("schedules",t));case 1:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"removeSchedule",value:function(){var e=Object(F.a)(D.a.mark((function e(t){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.storage.delete("schedules",t));case 1:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"updateSchedule",value:function(){var e=Object(F.a)(D.a.mark((function e(t,a){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.storage.write("schedules/".concat(t),a));case 1:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"getAllSchedules",value:function(){var e=Object(F.a)(D.a.mark((function e(){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=this,e.next=3,this.storage.findAll("schedules");case 3:return e.t1=e.sent,e.abrupt("return",e.t0._alphabetize.call(e.t0,e.t1));case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"onSchedulesChanged",value:function(e){var t=this;this.storage.onChange("schedules",(function(a){return e(t._alphabetize(a))}))}},{key:"_alphabetize",value:function(e){return e?e.sort((function(e,t){return e.title>t.title?1:e.title<t.title?-1:0})):[]}}]),e}();var U=function(e){return new P(e)},I=function(){function e(t){Object(L.a)(this,e),this.storage=void 0,this.storage=t}return Object(_.a)(e,[{key:"addAttachment",value:function(){var e=Object(F.a)(D.a.mark((function e(t){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.storage.push("attachments",t));case 1:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"removeAttachment",value:function(){var e=Object(F.a)(D.a.mark((function e(t){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.storage.delete("attachments",t));case 1:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"updateAttachment",value:function(){var e=Object(F.a)(D.a.mark((function e(t,a){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.storage.write("attachments/".concat(t),a));case 1:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"getAllAttachments",value:function(){var e=Object(F.a)(D.a.mark((function e(){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=this,e.next=3,this.storage.findAll("attachments");case 3:return e.t1=e.sent,e.abrupt("return",e.t0._alphabetize.call(e.t0,e.t1));case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"onAttachmentsChanged",value:function(e){var t=this;this.storage.onChange("attachments",(function(a){return e(t._alphabetize(a))}))}},{key:"_alphabetize",value:function(e){return e?e.sort((function(e,t){return e.title>t.title?1:e.title<t.title?-1:0})):[]}}]),e}();var B=function(e){return new I(e)},T=a(44),z=a.n(T),R=(a(74),a(79),function(){function e(t){Object(L.a)(this,e),this.db=void 0,this.storage=void 0;var a=z.a.initializeApp(t);this.db=a.database(),this.storage=a.storage()}return Object(_.a)(e,[{key:"read",value:function(){var e=Object(F.a)(D.a.mark((function e(t){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.db.ref(t).once("value").then((function(e){return e.val()})));case 1:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"write",value:function(){var e=Object(F.a)(D.a.mark((function e(t,a){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.db.ref(t).set(a));case 1:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"push",value:function(){var e=Object(F.a)(D.a.mark((function e(t,a){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.db.ref(t).push(a));case 1:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"findAll",value:function(){var e=Object(F.a)(D.a.mark((function e(t){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.db.ref(t).once("value").then((function(e){return e.val()||{}})).then(g));case 1:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"delete",value:function(){var e=Object(F.a)(D.a.mark((function e(t,a){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.db.ref("".concat(t,"/").concat(a)).remove());case 1:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"onChange",value:function(e,t){this.db.ref(e).on("value",(function(e){return t(g(e.val()))}))}}]),e}());var M=function(e){return new R(e)},W=function(){function e(t){Object(L.a)(this,e),this.storage=void 0,this.storage=t}return Object(_.a)(e,[{key:"addForm",value:function(){var e=Object(F.a)(D.a.mark((function e(t){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.storage.push("tehillim",t));case 1:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"removeForm",value:function(){var e=Object(F.a)(D.a.mark((function e(t){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.storage.delete("tehillim",t));case 1:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"updateForm",value:function(){var e=Object(F.a)(D.a.mark((function e(t,a){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.storage.write("tehillim/".concat(t),a));case 1:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"getAllForms",value:function(){var e=Object(F.a)(D.a.mark((function e(){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=this,e.next=3,this.storage.findAll("tehillim");case 3:return e.t1=e.sent,e.abrupt("return",e.t0._alphabetize.call(e.t0,e.t1));case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"onFormsChanged",value:function(e){var t=this;this.storage.onChange("tehillim",(function(a){return e(t._alphabetize(a))}))}},{key:"_alphabetize",value:function(e){return e?e.sort((function(e,t){return e.firstName>t.firstName?1:e.firstName<t.firstName?-1:0})):[]}}]),e}();var q=function(e){return new W(e)},H=M({apiKey:"AIzaSyDUNiNW3dfplmHAq65wfKIGGSHS8MGXgzM",authDomain:"sca-rab-schedules.firebaseapp.com",databaseURL:"https://sca-rab-schedules.firebaseio.com",projectId:"sca-rab-schedules",storageBucket:"sca-rab-schedules.appspot.com",messagingSenderId:"893196040077",appId:"1:893196040077:web:75ee18b5d771028f616fc4"}),J=U(H),V=B(H),G=q(H),K=a(24),Q=a.n(K),Z=function(e){var t=e.onImageDropped,a=e.currentImage,c=Object(n.useState)(a),l=Object(i.a)(c,2),o=l[0],s=l[1];Object(n.useEffect)((function(){return s(a)}),[a]);var u=Object(C.a)({onDrop:function(e){var t=e[0];if(!/^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/.test(t.name.toLowerCase()))return alert("Only files with .jpg or .jpeg or .png extensions are allowed here.")}});u.getRootProps,u.getInputProps,u.isDragActive;return r.a.createElement("div",{className:"image-dropper mt-2"},r.a.createElement("form",null,r.a.createElement(x.a,{accept:"image/*",randomizeFilename:!0,storageRef:H.storage.ref("/logos"),metadata:{cacheControl:"max-age=2592000"},onUploadStart:function(e){s(Q.a)},onUploadSuccess:function(e){H.storage.ref("/logos").child(e).getDownloadURL().then((function(e){s(e),t(e)}))},id:"image-drop"}),r.a.createElement("label",{htmlFor:"image-drop"},r.a.createElement("p",null,"Drop logo here",r.a.createElement("br",null),"(or click to choose file)"))),!!o&&r.a.createElement("img",{src:o,className:"logo"}))},$=function(e){var t=e.input,a=u.find(t);if(0===a.length)return r.a.createElement("p",null,t);var n=a[0],c=n.value,l=n.type;return r.a.createElement("a",{href:c,className:c.includes("zoom")&&"url"===l?"zoomIcon":""},"url"===l?"Click here":c)},X=function(e){var t=e.schedules,a=e.filter,n=e.heading,c=[];t.forEach((function(e){var t="minyan"===(null===a||void 0===a?void 0:a.match)?y(a.type,a.match,e.rows):E("type","minyan",e.rows);c.push.apply(c,Object(m.a)(t))}));var l=c[0];if(c.length<2)return null;var i=l.findIndex((function(e){return e.includes("Days")})),o=l.findIndex((function(e){return e.includes("Time")})),s=l.reduce((function(e,t,a){return(t.toString().toLowerCase().startsWith("hide")||t.toString().toLowerCase().startsWith("days"))&&e.push(a),e}),[]),u=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],d=new Date,h=c.filter((function(e){var t=!1,a=e[i];if(a.includes("Daily"))t=!0;else if(a.includes(u[d.getDay()]))t=!0;else if(a.includes("-")){a.split(/[^\w-]/).forEach((function(e){if(e.includes("-")){var a=e.split("-"),n=u.findIndex((function(e){return a[0].includes(e)})),r=u.findIndex((function(e){return a[1].includes(e)}));n<d.getDay()&&r>d.getDay()&&(t=!0)}}))}return t})),p=[],v=[],b=[];return h.forEach((function(e){var t=e[o].match(/\d\d?:\d\d ?(?:[AP]M)?/g);if(!t)return!1;!t[0].toLowerCase().includes("pm")&&e[3].toLowerCase().includes("pm")&&(t[0]+=" pm");var a=f()(t[0],"h:mm:ss a"),n=t.length>1?f()(t[1],"h:mm:ss a"):f()(a).add(1,"h");a.subtract(10,"m"),f()(d).isBetween(a,n,null,"[)")?p.push(e):f()(d).isSameOrAfter(n)?v.push(e):f()(d).isBefore(a)&&b.push(e)})),r.a.createElement("div",{className:"schedule-card my-5"},p.length>0&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"card-header row"},r.a.createElement("h1",{className:"schedule-title"},"Ongoing ",n)),r.a.createElement("table",{className:"table table-striped table-bordered table-hover shadow"},r.a.createElement("thead",{className:"text-light"},r.a.createElement("tr",null,l.map((function(e,t){if(!s.includes(t))return r.a.createElement("th",{key:t},e)})))),r.a.createElement("tbody",null,p.map((function(e,t){return r.a.createElement("tr",{key:t},e.map((function(e,t){if(!s.includes(t))return r.a.createElement("td",{key:t},r.a.createElement($,{input:e}))})))}))))),b.length>0&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"card-header row"},r.a.createElement("h1",{className:"schedule-title"},"Upcoming ",n)),r.a.createElement("table",{className:"table table-striped table-bordered table-hover shadow"},r.a.createElement("thead",{className:"text-light"},r.a.createElement("tr",null,l.map((function(e,t){if(!s.includes(t))return r.a.createElement("th",{key:t},e)})))),r.a.createElement("tbody",null,b.map((function(e,t){return r.a.createElement("tr",{key:t},e.map((function(e,t){if(!s.includes(t))return r.a.createElement("td",{key:t},r.a.createElement($,{input:e}))})))}))))),v.length>0&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"card-header row"},r.a.createElement("h1",{className:"schedule-title"},"Completed ",n)),r.a.createElement("table",{className:"table table-striped table-bordered table-hover shadow"},r.a.createElement("thead",{className:"text-light"},r.a.createElement("tr",null,l.map((function(e,t){if(!s.includes(t))return r.a.createElement("th",{key:t},e)})))),r.a.createElement("tbody",null,v.map((function(e,t){return r.a.createElement("tr",{key:t},e.map((function(e,t){if(!s.includes(t))return r.a.createElement("td",{key:t},r.a.createElement($,{input:e}))})))}))))))},Y=a(25),ee=a.n(Y),te=function(e){var t,a=Object(o.e)(),n=null===(t=he[a.pathname])||void 0===t?void 0:t.pageName;return r.a.createElement(r.a.Fragment,null,r.a.createElement("header",{className:"navbar fixed-top bg-light shadow"},r.a.createElement("div",{className:"w-100 d-flex justify-content-between"},r.a.createElement("a",{href:"/#"},r.a.createElement("img",{className:"navbar-brand py-0",src:ee.a,alt:"SCA",height:"60"}))),r.a.createElement("nav",{className:"site-nav w-100 d-flex my-3"},r.a.createElement("a",{href:"/#/today"},"Classes"),r.a.createElement("a",{href:"/#/minyanim"},"Minyanim"),r.a.createElement("a",{href:"/#/letters"},"Letters"),r.a.createElement("a",{href:"/#/tehillim"},"Tehillim Request"),r.a.createElement("a",{href:"mailto:info@scaupdates.org"},"Contact")),r.a.createElement("h5",{className:"w-100 text-center header-title m-0"},n||"")),r.a.createElement("div",{className:"header-spacing"}))},ae=function(e){var t=e.schedules,a=Object(n.useState)("none"),c=Object(i.a)(a,2),l=c[0],s=c[1],u=Object(n.useState)(""),m=Object(i.a)(u,2),d=m[0],h=m[1],f=Object(n.useState)("Classes"),p=Object(i.a)(f,2),v=p[0],b=p[1],g=Object(o.e)(),E=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];Object(n.useEffect)((function(){if("/minyanim"===g.pathname)b("Minyanim"),s("type"),h("minyan");else if("/today"===g.pathname){var e=new Date,t=E[e.getDay()];s("day"),h(t)}}),[g.pathname]);var y=Object(n.useCallback)((function(){var e=/\d\d?:\d\d ([AP]M)/,a=[];return t.forEach((function(t){var n=t.rows,r=w(n,"time"),c=n.map((function(e){return e[r]})).filter((function(t){return e.test(t)})).map((function(t){return t.match(e)[0]}));a=a.concat(c)})),Array.from(new Set(a)).sort((function(e,t){var a=new Date("1970/01/01 "+e),n=new Date("1970/01/01 "+t);return a>n?1:a<n?-1:0}))}),[t]),N=Object(n.useCallback)((function(){var e=[];return t.forEach((function(t){var a=t.rows,n=w(a,"teacher"),r=a.map((function(e){return e[n]}));e=e.concat(r)})),Array.from(new Set(e)).sort()}),[t]);return r.a.createElement(r.a.Fragment,null,"/minyanim"!==g.pathname&&r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12 text-center my-3"},r.a.createElement("a",{href:"/#/today",className:"/today"===g.pathname?"btn btn-primary mx-3":"btn btn-secondary mx-3"},"Today's Classes"),r.a.createElement("a",{href:"/#/classes",className:"/classes"===g.pathname?"btn btn-primary mx-3":"btn btn-secondary mx-3"},"Full Schedule")))),r.a.createElement("div",{className:"container"},"/today"===g.pathname&&r.a.createElement(X,{schedules:t,filter:!("none"===l||""===d)&&{type:l,match:d},heading:v})),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"input-group mt-3"},r.a.createElement("label",{htmlFor:"filter",className:"/minyanim"===g.pathname||"/today"===g.pathname?"hidden":"header-title"},"Filter By:"," ",r.a.createElement("select",{name:"filter",onChange:function(e){s(e.target.value),h("")},id:"",value:l},r.a.createElement("option",{value:"none"},"No filter"),r.a.createElement("option",{value:"time"},"Time of day"),r.a.createElement("option",{value:"day"},"Day of week"),r.a.createElement("option",{value:"topic"},"Topic"),r.a.createElement("option",{value:"teacher"},"Teacher")),"none"!==l&&("day"===l?r.a.createElement("select",{className:"ml-2",onChange:function(e){return h(e.target.value)}},r.a.createElement("option",{value:""},"Choose Day"),r.a.createElement("option",{value:"mon"},"Mon"),r.a.createElement("option",{value:"tues"},"Tues"),r.a.createElement("option",{value:"wed"},"Wed"),r.a.createElement("option",{value:"thurs"},"Thurs"),r.a.createElement("option",{value:"fri"},"Fri"),r.a.createElement("option",{value:"sun"},"Sun")):"time"===l?r.a.createElement("select",{className:"ml-2",onChange:function(e){return h(e.target.value.toLowerCase())}},r.a.createElement("option",{value:""},"Choose Time"),y().map((function(e){return r.a.createElement("option",{value:e},e)}))):"teacher"===l?r.a.createElement("select",{className:"ml-2",onChange:function(e){return h(e.target.value.toLowerCase())}},r.a.createElement("option",{value:""},"Choose Teacher"),N().map((function(e){return r.a.createElement("option",{value:e},e)}))):r.a.createElement("input",{type:"text",className:"ml-2",onChange:function(e){return h(e.target.value.toLowerCase())},placeholder:"Enter ".concat(l,"(s)")}))))),"/today"!==g.pathname&&t.map((function(e,t){return r.a.createElement(j,{key:t,schedule:e,filter:!("none"===l||""===d)&&{type:l,match:d}})}))))},ne=function(e){var t=e.schedule,a=e.isEditing,n=e.onUpdateBtnPressed,c=e.onDeleteBtnPressed;return r.a.createElement("li",{className:"list-group-item d-flex justify-content-between my-2"},r.a.createElement("h3",null,t.title),a?r.a.createElement("button",{className:"btn btn-danger m-1",onClick:c},"x"):r.a.createElement("button",{className:"btn btn-warning",onClick:n},r.a.createElement("i",{className:"fas fa-edit text-light"})))},re=function(e){var t=e.schedules,a=e.createSchedule,c=e.deleteSchedule,l=e.updateSchedule,o=Object(n.useState)(void 0),s=Object(i.a)(o,2),u=s[0],m=s[1],h=function(e){return m(Object(d.a)({},u,{},e))};return Object(n.useEffect)((function(){console.log(u)}),[u]),r.a.createElement("div",{className:"admin-page-container"},r.a.createElement("div",{className:"schedule-manager-widget row mt-5 py-5"},r.a.createElement("div",{className:"col scroll-content"},t.map((function(e,t){return r.a.createElement(ne,{key:t,schedule:e,isEditing:(null===u||void 0===u?void 0:u._id)===e._id,onUpdateBtnPressed:function(){return m(e)},onDeleteBtnPressed:function(){return c(e._id)}})}))),r.a.createElement("div",{className:"col schedule-upload-container"},r.a.createElement("div",{className:"text-center"},r.a.createElement("h3",{className:"text-light"},u?"Update Schedule:":"Upload Schedule Here:")),r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Schedule Title",value:(null===u||void 0===u?void 0:u.title)||"",onChange:function(e){return h({title:e.target.value})}}),r.a.createElement(Z,{onImageDropped:function(e){return h({logo:e})},currentImage:null===u||void 0===u?void 0:u.logo}),r.a.createElement(S,{onSpreadSheetDropped:function(e){return h({rows:e})},currentSpreadSheet:null===u||void 0===u?void 0:u.rows}),r.a.createElement("button",{className:"btn btn-success",onClick:function(){var e={title:u.title,rows:u.rows,logo:u.logo};e.logo||(e.logo=""),u._id?l(u._id,e):a(e),m(void 0)}},(null===u||void 0===u?void 0:u._id)?"Save updates":"Upload Schedule"))))},ce=function(e){var t=e.attachments;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row align-items-stretch"},t.map((function(e,t){return r.a.createElement(O,{key:t,attachment:e})})))))},le=function(e){var t=e.attachment,a=e.isEditing,n=e.onUpdateBtnPressed,c=e.onDeleteBtnPressed;return r.a.createElement("li",{className:"list-group-item d-flex justify-content-between my-2"},r.a.createElement("h3",null,t.title),a?r.a.createElement("button",{className:"btn btn-danger m-1",onClick:c},"x"):r.a.createElement("button",{className:"btn btn-warning",onClick:n},r.a.createElement("i",{className:"fas fa-edit text-light"})))},ie=function(e){var t=e.attachments,a=e.createAttachment,c=e.deleteAttachment,l=e.updateAttachment,o=Object(n.useState)(void 0),s=Object(i.a)(o,2),u=s[0],m=s[1],h=function(e){return m(Object(d.a)({},u,{},e))},f=!1;return Object(n.useEffect)((function(){console.log(u)}),[u]),r.a.createElement("div",{className:"admin-page-container"},r.a.createElement("div",{className:"schedule-manager-widget row mt-5 py-5"},r.a.createElement("div",{className:"col scroll-content"},t.map((function(e,t){return r.a.createElement(le,{key:t,attachment:e,isEditing:(null===u||void 0===u?void 0:u._id)===e._id,onUpdateBtnPressed:function(){return m(e)},onDeleteBtnPressed:function(){return c(e._id)}})}))),r.a.createElement("div",{className:"col schedule-upload-container"},r.a.createElement("div",{className:"text-center"},r.a.createElement("h3",{className:"text-light"},u?"Update Attachment:":"Upload Attachment Here:")),r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Attachment Title",value:(null===u||void 0===u?void 0:u.title)||"",onChange:function(e){return h({title:e.target.value})}}),r.a.createElement(Z,{onImageDropped:function(e){return h({cover:e})},currentImage:null===u||void 0===u?void 0:u.cover}),r.a.createElement("div",{className:"image-dropper mt-2"},r.a.createElement("form",null,r.a.createElement(x.a,{randomizeFilename:!0,metadata:{cacheControl:"max-age=2592000"},storageRef:H.storage.ref("/attachments"),onUploadStart:function(e){f=!0},onUploadSuccess:function(e){H.storage.ref("/attachments").child(e).getDownloadURL().then((function(e){h({file:e}),f=!1}))},id:"file-drop"}),r.a.createElement("label",{htmlFor:"file-drop"},r.a.createElement("p",null,"Drop attachment here",r.a.createElement("br",null),"(or click to choose file)"))),!!f&&r.a.createElement("img",{src:Q.a}),!!(null===u||void 0===u?void 0:u.file)&&r.a.createElement("a",{href:u.file,target:"_blank"},"Preview")),r.a.createElement("textarea",{className:"form-control mt-2",placeholder:"Caption",value:(null===u||void 0===u?void 0:u.body)||"",onChange:function(e){return h({body:e.target.value})}}),r.a.createElement("button",{className:"btn btn-success mt-2",onClick:function(){var e={title:u.title,file:u.file,cover:u.cover||"",body:u.body||""};u._id?l(u._id,e):a(e),m(void 0)}},(null===u||void 0===u?void 0:u._id)?"Save updates":"Upload Attachment"))))},oe=function(e){var t=e.forms,a=Object(n.useState)(""),c=Object(i.a)(a,2),l=c[0],o=c[1],s=Object(n.useState)(""),u=Object(i.a)(s,2),m=u[0],d=u[1],h=Object(n.useState)(""),f=Object(i.a)(h,2),p=f[0],v=f[1],b=Object(n.useState)(""),g=Object(i.a)(b,2),E=g[0],y=g[1],w=function(e){o(""),d(""),v(""),y("Submitted!"),setTimeout((function(){y("")}),2e3)},N=function(e){y("Error")};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container"},r.a.createElement("p",null,"We are compiling a list of those who have fallen ill to share with the community so that we may dedicate our prayers and learning in the merit of their complete and speedy recovery."),r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),H.push("tehillim",{firstName:l,benbat:m,mothersName:p}).then(w,N)}},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"firstName"},"Hebrew First Name"),r.a.createElement("input",{type:"text",id:"firstName",className:"form-control",onChange:function(e){return o(e.target.value)},value:l,required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Ben/Bat"),r.a.createElement("div",{className:"form-check"},r.a.createElement("input",{type:"radio",id:"ben",name:"benbat",value:"ben",checked:!("ben"!==m),onChange:function(e){return e.target.checked&&d(e.target.value)},required:!0}),r.a.createElement("label",{htmlFor:"ben"}," Ben")),r.a.createElement("div",{className:"form-check"},r.a.createElement("input",{type:"radio",id:"bat",name:"benbat",value:"bat",checked:!("bat"!==m),onChange:function(e){return e.target.checked&&d(e.target.value)}}),r.a.createElement("label",{htmlFor:"bat"}," Bat"))),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"mothersName"},"Mother's Hebrew Name"),r.a.createElement("input",{type:"text",id:"mothersName",className:"form-control",onChange:function(e){return v(e.target.value)},value:p,required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"submit",className:"btn btn-primary btn-lg"},"Submit"),!!E&&r.a.createElement("span",{className:"alert"},E)))),r.a.createElement("div",{className:"container my-5"},r.a.createElement("table",{className:"table table-striped table-bordered table-hover shadow"},r.a.createElement("thead",{className:"text-light"},r.a.createElement("tr",null,r.a.createElement("th",null,"Please dedicate prayers and learning in the merit of their complete and speedy recovery."))),r.a.createElement("tbody",null,t.map((function(e,t){var a=~e.firstName.search(/[\u0590-\u05FF]/)&&~e.mothersName.search(/[\u0590-\u05FF]/),n=e.benbat;return a&&(n="ben"===n?"\u05d1\u05df":"\u05d1\u05ea"),r.a.createElement("tr",{key:t},r.a.createElement("td",{dir:a&&"rtl"},e.firstName," ",n," ",e.mothersName))}))))))},se=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container"},r.a.createElement("img",{src:ee.a,className:"centered-image my-3",height:"150",alt:""})),r.a.createElement("div",{className:"w-100 d-flex align-items-center justify-content-center"},r.a.createElement("nav",{className:"d-flex flex-column align-items-center my-3 site-nav-index"},r.a.createElement("a",{href:"https://www.youtube.com/playlist?list=PLS3KTNjJqUepUQ3quLa-UYoypBlfcAlcc",target:"_blank",className:"btn btn-secondary btn-lg my-3"},"Pre Pesah Day of Learning Class Recordings"),r.a.createElement("a",{href:"/#/today",className:"btn btn-primary btn-lg my-3"},"Schedule of Live Classes"),r.a.createElement("a",{href:"/#/minyanim",className:"btn btn-primary btn-lg my-3"},"Schedule of Live Minyanim"),r.a.createElement("a",{href:"https://chat.whatsapp.com/FUQrLPQSXlZ8EeB0F1kHLJ",className:"btn btn-primary btn-whatsapp btn-lg my-3"},"Join Chat for Class Updates"),r.a.createElement("a",{href:"/#/letters",className:"btn btn-primary btn-lg my-3"},"Letters to the Community"),r.a.createElement("a",{href:"/#/tehillim",className:"btn btn-primary btn-lg my-3"},"Request Tehillim for Refuah"),r.a.createElement("a",{href:"mailto:info@scaupdates.org",className:"btn btn-primary btn-lg my-3"},"Contact the SCA"))))},ue=function(){var e=Object(n.useState)([]),t=Object(i.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){J.onSchedulesChanged(c)}),[]),r.a.createElement(ae,{schedules:a})},me=function(e){return Object.entries(e).map((function(e){var t=Object(i.a)(e,2),a=t[0],n=t[1],c=n.exact,l=n.Component;return r.a.createElement(o.a,{path:a,exact:c,component:l})}))},de={"/":{exact:!0,Component:function(){var e=Object(n.useState)([]),t=Object(i.a)(e,2),a=t[0],c=t[1];Object(n.useEffect)((function(){J.onSchedulesChanged(c)}),[]);return r.a.createElement(re,{schedules:a,createSchedule:function(e){return e.rows?e.title?J.addSchedule(e):alert("Please enter the title of this table"):alert("Please upload a spreadsheet first")},updateSchedule:function(e,t){return J.updateSchedule(e,t)},deleteSchedule:function(e){return J.removeSchedule(e)}})}},"/edit-letters":{exact:!0,Component:function(){var e=Object(n.useState)([]),t=Object(i.a)(e,2),a=t[0],c=t[1];Object(n.useEffect)((function(){V.onAttachmentsChanged(c)}),[]);return r.a.createElement(ie,{attachments:a,createAttachment:function(e){return e.file?e.title?V.addAttachment(e):alert("Please enter the title of this table"):alert("Please upload an attachment first")},updateAttachment:function(e,t){return V.updateAttachment(e,t)},deleteAttachment:function(e){return V.removeAttachment(e)}})}}},he={"/":{exact:!0,Component:function(){return r.a.createElement(se,null)},pageName:"SCA Affiliate Synagogue"},"/today":{exact:!0,Component:ue,pageName:"SCA Affiliate Synagogue - Virtual Classes Schedules"},"/classes":{exact:!0,Component:ue,pageName:"SCA Affiliate Synagogue - Virtual Classes Schedules"},"/minyanim":{exact:!0,Component:ue,pageName:"SCA Affiliate Synagogue - Virtual Minyanim Schedules"},"/letters":{exact:!0,Component:function(){var e=Object(n.useState)([]),t=Object(i.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){V.onAttachmentsChanged(c)}),[]),r.a.createElement(ce,{attachments:a})},pageName:"COVID-19 Letters"},"/tehillim":{exact:!0,Component:function(){var e=Object(n.useState)([]),t=Object(i.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){G.onFormsChanged(c)}),[]),r.a.createElement(oe,{forms:a})},pageName:"SCA Tehilim Requests"},"/admin":{Component:function(){return r.a.createElement(s.a,{basename:"/admin"},me(de))}}},fe=function(){return r.a.createElement(s.a,null,r.a.createElement(te,null),me(he))},pe=function(){return r.a.createElement(fe,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(pe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[47,1,2]]]);
//# sourceMappingURL=main.de9f3ba3.chunk.js.map