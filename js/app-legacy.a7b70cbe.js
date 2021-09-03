(function(){"use strict";var e={1746:function(e,o,n){n(6992),n(8674),n(9601),n(7727);var t,r=n(144),i=function(){var e=this,o=e.$createElement,n=e._self._c||o;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},a=[],s=n(1001),c={},u=(0,s.Z)(c,i,a,!1,null,null,null),l=u.exports,d=n(8345),m=function(){var e=this,o=e.$createElement,n=e._self._c||o;return n("login-form")},_=[],E=function(){var e=this,o=e.$createElement,n=e._self._c||o;return n("div",{staticClass:"login"},[n("form",{staticClass:"login__form"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.room,expression:"room"}],staticClass:"login__input",attrs:{type:"text",placeholder:"Room ID",name:"room_id"},domProps:{value:e.room},on:{input:function(o){o.target.composing||(e.room=o.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.user,expression:"user"}],staticClass:"login__input",attrs:{type:"text",placeholder:"Username",name:"user_id"},domProps:{value:e.user},on:{input:function(o){o.target.composing||(e.user=o.target.value)}}}),n("button",{staticClass:"login__button",attrs:{type:"submit"},on:{click:function(o){return o.preventDefault(),e.enterRoom.apply(null,arguments)}}},[e._v(" Join ")])])])},f=[],v=n(6198),I=n(4367),O=(n(5666),n(3796)),p=(n(8309),n(4747),n(9600),n(7139)),S=n(629);(function(e){e["SIGNAL_URL"]="wss://frontend-sandbox-logist322.herokuapp.com/ws/",e["TOKEN"]="helloworld"})(t||(t={}));var h,b,T,A,N,g,R=function(e,o){return t.SIGNAL_URL+e+"/"+o+"?token="+t.TOKEN},D=function(){var e=new p.vf;return e.device_video(new p.m5),e.audio(new p.xu),e};r.Z.use(S.ZP),function(e){e["LOCAL_STREAM"]="localStream",e["REMOTE_STREAM"]="remoteStream",e["IS_AUDIO_ENABLED"]="isAudioEnabled",e["IS_VIDEO_ENABLED"]="isVideoEnabled",e["MEMBER_ID"]="memberId"}(A||(A={})),function(e){e["SET_CONNECION_OPTIONS"]="setConnectionOptions",e["INIT_CONNECTION"]="initConnection",e["CONFIGURE_ROOM"]="configureRoom",e["TOGGLE_AUDIO"]="toggleAudio",e["TOGGLE_VIDEO"]="toggleVideo",e["KILL_JASON"]="killJason"}(N||(N={})),function(e){e["SET_USER_ID"]="setUserId",e["SET_ROOM_ID"]="setRoomId",e["JASON_INIT"]="jasonInit",e["ROOM_INIT"]="roomInit",e["DISABLE_AUDIO"]="disableAudio",e["ENABLE_AUDIO"]="enableAudio",e["DISABLE_VIDEO"]="disableVideo",e["ENABLE_VIDEO"]="enableVideo",e["RESET_STATE"]="resetState",e["SET_MEMBER_ID"]="setMemberId"}(g||(g={}));var L={state:{localStream:new MediaStream,remoteStream:new MediaStream,isAudioEnabled:!0,isVideoEnabled:!0,memberId:"",userId:"",roomId:""},getters:(h={},(0,O.Z)(h,A.MEMBER_ID,(function(e){return e.memberId})),(0,O.Z)(h,A.LOCAL_STREAM,(function(e){return e.localStream})),(0,O.Z)(h,A.REMOTE_STREAM,(function(e){return e.remoteStream})),(0,O.Z)(h,A.IS_AUDIO_ENABLED,(function(e){return e.isAudioEnabled})),(0,O.Z)(h,A.IS_VIDEO_ENABLED,(function(e){return e.isVideoEnabled})),h),actions:(b={},(0,O.Z)(b,N.SET_CONNECION_OPTIONS,(function(e,o){var n=e.commit,t=o.user,r=o.room;n(g.SET_USER_ID,t),n(g.SET_ROOM_ID,r)})),(0,O.Z)(b,N.INIT_CONNECTION,(function(e){return(0,v.Z)(regeneratorRuntime.mark((function o(){var n,t;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return n=e.commit,t=e.dispatch,o.next=3,(0,p.ZP)();case 3:return n(g.JASON_INIT),n(g.ROOM_INIT),o.next=7,t(N.CONFIGURE_ROOM);case 7:case"end":return o.stop()}}),o)})))()})),(0,O.Z)(b,N.CONFIGURE_ROOM,(function(e){return(0,v.Z)(regeneratorRuntime.mark((function o(){var n,t,r,i,a,s,c,u,l,d;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return c=e.commit,u=e.state,null===(n=u.room)||void 0===n||n.on_failed_local_media((function(){console.log("Local media failed")})),null===(t=u.room)||void 0===t||t.on_connection_loss((function(){console.log("Connection lost")})),null===(r=u.room)||void 0===r||r.on_new_connection((function(e){console.log("Connected"),c(g.SET_MEMBER_ID,{gotMember:e.get_remote_member_id()}),e.on_remote_track_added((function(e){u.remoteStream.addTrack(e.get_track())}))})),l=D(),o.next=7,null===(i=u.jason)||void 0===i?void 0:i.media_manager().init_local_tracks(l).catch((function(e){console.log(e.name())}));case 7:return d=o.sent,d&&d.forEach((function(e){e.kind()===p.D4.Video&&u.localStream.addTrack(e.get_track())})),o.next=11,null===(a=u.room)||void 0===a?void 0:a.set_local_media_settings(l,!1,!1);case 11:null===(s=u.room)||void 0===s||s.join(R(u.roomId,u.userId));case 12:case"end":return o.stop()}}),o)})))()})),(0,O.Z)(b,N.TOGGLE_AUDIO,(function(e){var o=e.commit,n=e.state;n.isAudioEnabled?o(g.DISABLE_AUDIO):o(g.ENABLE_AUDIO)})),(0,O.Z)(b,N.TOGGLE_VIDEO,(function(e){var o=e.commit,n=e.state;n.isVideoEnabled?o(g.DISABLE_VIDEO):o(g.ENABLE_VIDEO)})),(0,O.Z)(b,N.KILL_JASON,(function(e){var o,n,t=e.commit,r=e.state;r.room&&(null===(n=r.jason)||void 0===n||n.close_room(r.room));null===(o=r.jason)||void 0===o||o.dispose(),t(g.RESET_STATE)})),b),mutations:(T={},(0,O.Z)(T,g.SET_USER_ID,(function(e,o){e.userId=o})),(0,O.Z)(T,g.SET_ROOM_ID,(function(e,o){e.roomId=o})),(0,O.Z)(T,g.SET_MEMBER_ID,(function(e,o){var n=o.gotMember;e.memberId=n})),(0,O.Z)(T,g.JASON_INIT,(function(e){e.jason=new p.UH})),(0,O.Z)(T,g.ROOM_INIT,(function(e){var o;e.room=null===(o=e.jason)||void 0===o?void 0:o.init_room()})),(0,O.Z)(T,g.DISABLE_AUDIO,(function(e){var o;null===(o=e.room)||void 0===o||o.disable_audio().then((function(){return e.isAudioEnabled=!1}))})),(0,O.Z)(T,g.ENABLE_AUDIO,(function(e){var o;null===(o=e.room)||void 0===o||o.enable_audio().then((function(){return e.isAudioEnabled=!0}))})),(0,O.Z)(T,g.DISABLE_VIDEO,(function(e){var o;null===(o=e.room)||void 0===o||o.disable_video().then((function(){return e.isVideoEnabled=!1}))})),(0,O.Z)(T,g.ENABLE_VIDEO,(function(e){var o;null===(o=e.room)||void 0===o||o.enable_video().then((function(){return e.isVideoEnabled=!0}))})),(0,O.Z)(T,g.RESET_STATE,(function(e){e.localStream.getTracks().forEach((function(o){e.localStream.removeTrack(o)})),e.remoteStream.getTracks().forEach((function(o){e.localStream.removeTrack(o)})),e.isAudioEnabled=!0,e.isVideoEnabled=!0,e.userId="",e.roomId=""})),T)},Z=new S.ZP.Store(L),w=r.Z.extend({name:"LoginForm",data:function(){return{user:"",room:""}},methods:(0,I.Z)((0,I.Z)({},(0,S.nv)([N.SET_CONNECION_OPTIONS])),{},{enterRoom:function(){var e=this;return(0,v.Z)(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,e.setConnectionOptions({user:e.user,room:e.room});case 2:e.$router.push("room");case 3:case"end":return o.stop()}}),o)})))()}})}),C=w,M=(0,s.Z)(C,E,f,!1,null,null,null),x=M.exports,V={components:{LoginForm:x},name:"Login"},k=V,B=(0,s.Z)(k,m,_,!1,null,null,null),U=B.exports,y=function(){var e=this,o=e.$createElement,n=e._self._c||o;return n("room-interface")},G=[],j=function(){var e=this,o=e.$createElement,n=e._self._c||o;return n("div",{staticClass:"room"},[n("div",{staticClass:"room__name"},[n("p",[e._v(e._s(e.memberId))])]),n("video",{staticClass:"room__remote-video",attrs:{autoplay:""}}),n("video",{directives:[{name:"show",rawName:"v-show",value:e.isVideoEnabled,expression:"isVideoEnabled"}],staticClass:"room__local-video",attrs:{autoplay:""}}),n("media-controls",{attrs:{className:"room__controls"}})],1)},P=[],$=function(){var e=this,o=e.$createElement,n=e._self._c||o;return n("ul",{staticClass:"media-controls",class:e.className},[n("li",{staticClass:"media-controls__item media-controls__item--video",class:{"media-controls__item--off":e.isVideoEnabled}},[n("button",{on:{click:e.toggleVideo}},[e._v("Video switch")])]),n("li",{staticClass:"media-controls__item media-controls__item--audio",class:{"media-controls__item--off":e.isAudioEnabled}},[n("button",{on:{click:e.toggleAudio}},[e._v("Audio switch")])]),n("li",{staticClass:"media-controls__item media-controls__item--decline"},[n("button",{on:{click:e.decline}},[e._v("Decline")])])])},J=[],F=r.Z.extend({name:"MediaControls",beforeDestroy:function(){this.killJason()},computed:(0,I.Z)({},(0,S.Se)(["isAudioEnabled","isVideoEnabled"])),methods:(0,I.Z)((0,I.Z)({},(0,S.nv)([N.TOGGLE_AUDIO,N.TOGGLE_VIDEO,N.KILL_JASON])),{},{decline:function(){this.$router.push("/")}}),props:{className:{type:String}}}),K=F,q=(0,s.Z)(K,$,J,!1,null,null,null),H=q.exports,z=r.Z.extend({name:"RoomInterface",components:{MediaControls:H},mounted:function(){var e=this;return(0,v.Z)(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return document.addEventListener("mousemove",e.addMouseMovehandler),o.next=3,e.initConnection();case 3:e.drawVideos();case 4:case"end":return o.stop()}}),o)})))()},computed:(0,I.Z)({},(0,S.Se)([A.MEMBER_ID,A.LOCAL_STREAM,A.REMOTE_STREAM,A.IS_VIDEO_ENABLED])),methods:(0,I.Z)((0,I.Z)({},(0,S.nv)([N.INIT_CONNECTION])),{},{drawVideos:function(){var e=this,o=this.$el.querySelectorAll("video");o.forEach((function(o){o.classList.contains("room__local-video")&&(o.srcObject=e.localStream),o.classList.contains("room__remote-video")&&(o.srcObject=e.remoteStream)}))},addMouseMovehandler:function(){var e=document.querySelector(".room__name"),o=document.querySelector(".room__controls");e&&(e.classList.remove("hide-up"),setTimeout((function(){e.classList.add("hide-up")}),1e3)),o&&(o.classList.remove("hide-down"),setTimeout((function(){o.classList.add("hide-down")}),1e3))}})}),Q=z,W=(0,s.Z)(Q,j,P,!1,null,null,null),X=W.exports,Y={components:{RoomInterface:X}},ee=Y,oe=(0,s.Z)(ee,y,G,!1,null,null,null),ne=oe.exports;r.Z.use(d.Z);var te=[{path:"/",name:"Login",component:U},{path:"/room",name:"Room",component:ne}],re=new d.Z({mode:"history",base:"",routes:te}),ie=re;r.Z.config.productionTip=!1,new r.Z({router:ie,store:Z,render:function(e){return e(l)}}).$mount("#app")}},o={};function n(t){var r=o[t];if(void 0!==r)return r.exports;var i=o[t]={exports:{}};return e[t](i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(o,t,r,i){if(!t){var a=1/0;for(l=0;l<e.length;l++){t=e[l][0],r=e[l][1],i=e[l][2];for(var s=!0,c=0;c<t.length;c++)(!1&i||a>=i)&&Object.keys(n.O).every((function(e){return n.O[e](t[c])}))?t.splice(c--,1):(s=!1,i<a&&(a=i));if(s){e.splice(l--,1);var u=r();void 0!==u&&(o=u)}}return o}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[t,r,i]}}(),function(){n.d=function(e,o){for(var t in o)n.o(o,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:o[t]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)}}(),function(){n.p=""}(),function(){n.b=document.baseURI||self.location.href;var e={143:0};n.O.j=function(o){return 0===e[o]};var o=function(o,t){var r,i,a=t[0],s=t[1],c=t[2],u=0;if(a.some((function(o){return 0!==e[o]}))){for(r in s)n.o(s,r)&&(n.m[r]=s[r]);if(c)var l=c(n)}for(o&&o(t);u<a.length;u++)i=a[u],n.o(e,i)&&e[i]&&e[i][0](),e[a[u]]=0;return n.O(l)},t=self["webpackChunkfrontend_sandbox"]=self["webpackChunkfrontend_sandbox"]||[];t.forEach(o.bind(null,0)),t.push=o.bind(null,t.push.bind(t))}();var t=n.O(void 0,[998],(function(){return n(1746)}));t=n.O(t)})();
//# sourceMappingURL=app-legacy.a7b70cbe.js.map