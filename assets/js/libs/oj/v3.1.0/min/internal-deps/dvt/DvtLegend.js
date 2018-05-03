/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(['./DvtToolkit'], function(dvt) {
  // Internal use only.  All APIs and functionality are subject to change at any time.

var ga;function ka(a,E){0==a.indexOf("dvt.")&&(a=a.substring(4));var B=a.split("."),q=eval("dvt");B[0]in q||!q.execScript||q.execScript("var "+B[0]);for(var w;B.length&&(w=B.shift());)B.length||void 0===E?q=q[w]?q[w]:q[w]={}:q[w]=E}Math.floor(2147483648*Math.random()).toString(36);
(function(a){function E(a,f,b,e,h,g){this.Init(a,f,b,e,h,g)}function B(a,f){this.Init(a,f)}function q(a){this.Init(a.a,a.Lf,a);this.ad=a}function w(){this.Init({skyros:w.Ig,alta:w.Wf,next:w.kr})}function x(a){this.ad=a;this.Qf=this.ad.A()}a.Af=function(){};a.i.v(a.Af,a.mc);a.Af.newInstance=function(d,f,b){var e=new a.Af;e.Init(d,f,b);return e};a.Af.kp=function(a){return(new w).kp(a)};a.Af.prototype.Init=function(d,f,b){a.Af.C.Init.call(this,d,f,b);this.setId("legend1000"+Math.floor(1E9*Math.random()));
this.Uf=new w;this.u=new q(this);this.u.Kf(this);this.aw=[];this.Xx=[];this.Ub=null;this.bqa=[]};a.Af.prototype.Le=function(a){this.zh.hL();a?(this.K=this.Uf.Io(a),this.zGa(this.K.sections)):this.K||(this.K=this.BA())};a.Af.prototype.Zu=function(d,f,b){this.Le(d);this.A().isLayout=!0;d=h.ha(this,new a.U(0,0,f,b));this.A().isLayout=!1;return new a.eg(d.b,d.f)};a.Af.prototype.ha=function(d,f,b){this.Lb.hL();this.Le(d);isNaN(f)||isNaN(b)||(this.Ra=f,this.fb=b);this.A().isLayout=!1;d=this.Vc();for(f=
0;f<d;f++)this.dc(f).vc();this.di();this.aw=[];this.Xx=[];this.Ub=null;this.bqa=[];a.m.mb()||this.u.ss(new B(this.u,this));this.Hs();this.ska=h.ha(this,new a.U(0,0,this.Ra,this.fb));(d=this.A().highlightedCategories)&&0<d.length&&this.fe(d);this.Dl();return this.ska};a.Af.prototype.fe=function(d){this.A().highlightedCategories=d&&0<d.length?d.slice():null;a.Qd.fe(d,this.aw,!0)};a.Af.prototype.Lf=function(a,f){var b=a.type;if("categoryHighlight"==b&&"dim"==this.A().hoverBehavior){var e=this.aw;this!=
f&&this.fe(a.categories);for(var h=0;h<e.length;h++)if(e[h].getId()==a.categories){this.qHa.scrollIntoView(e[h].ce()[0]);break}}this!=f&&"adfShowPopup"!=b&&"adfHidePopup"!=b||this.dispatchEvent(a)};a.Af.prototype.pja=function(d){if(d.ce()[0]instanceof a.va)this.Xx.push(d);else{var f=this.A().hideAndShowBehavior;(null!=d.rf()||null!=d.Og()||d.kk()||"none"!=f&&"off"!=f)&&this.Xx.push(d);this.aw.push(d)}};a.Af.prototype.qja=function(a){this.Ub=a.clone()};a.Af.prototype.RTa=function(a){this.bqa.push(a)};
a.Af.prototype.mh=function(){return new x(this)};a.Af.prototype.sE=function(){return null!=this.u?this.u.Oe():null};a.Af.prototype.Yca=function(a,f){if(null!=this.u){for(var b=this.Xx,e=0;e<b.length;e++)if(b[e].getId()==a.getId()){this.u.ps(b[e]);f&&b[e].Fh();break}if(b=this.sE())e=b.ce()[0],e.Od("label",b.ve()),this.a.xJ(e)}};a.Af.prototype.ga=function(d){var f=new a.U(0,0,this.Ra,this.fb);return d&&d!==this?this.si(f,d):f};a.Af.prototype.iV=function(a){return a&&a!==this?this.si(this.ska,a):this.ska};
a.Af.prototype.Ak=function(){return a.I.Ka(a.I.ua,"LEGEND")};a.Af.prototype.zGa=function(d){if(d&&!(0>=d.length))for(var f=this.A().hiddenCategories,b=0;b<d.length;b++){var e=d[b];e.sections&&(f=this.zGa(e.sections));if((e=e.items)&&!(0>=e.length))for(var l=0;l<e.length;l++){var g=e[l],q=h.Bba(g);"hidden"==g.categoryVisibility&&0>a.Z.Zb(f,q)&&f.push(q);g.categoryVisibility=null}}};a.Af.prototype.Hs=function(){if(this.sT()){var d=this.A(),f=d.hideAndShowBehavior;if("off"!=f&&"none"!=f||"dim"==d.hoverBehavior)this.a.ug("application"),
this.a.uS(a.I.Ka(a.I.ua,"COLON_SEP_LIST",[a.I.Ka(a.I.ua,"DATA_VISUALIZATION"),a.$b.yw(this.Ak())]))}};a.Af.prototype.eJ=function(){return 0<this.Xx.length};a.Af.oV=function(d){var f=d.zh.sg("itemsCount");if(null!=f)return f;for(var f=0,b=d.A().sections,e=0;e<b.length;e++)f+=a.Af.wJa(b[e]);d.zh.ah("itemsCount",f);return f};a.Af.wJa=function(d){var f=0;d.items&&(f+=d.items.length);if(d.$6a){d=d.$6a;for(var b=0;b<d.length;b++)f+=a.Af.wJa(d[b])}return f};a.i.v(x,a.Sc);x.prototype.Qm=function(a){return(a=
this.ad.Qb().Ya(a))&&a instanceof E&&(a=a.getData(),a=this.FDa(a,this.Qf))?"section"+a:null};x.prototype.FDa=function(a,f){if(f.sections&&0<f.sections.length){for(var b=0;b<f.sections.length;b++){if(f.sections[b]==a)return"["+b+"]";var e=this.FDa(a,f.sections[b]);if(e)return"["+b+"]"+e}return null}if(f.items&&0<f.items.length){for(b=0;b<f.items.length;b++)if(f.items[b]==a)return":item["+b+"]";return null}};x.prototype.IIa=function(a,f){if(f.sections&&0<f.sections.length){for(var b=0;b<f.sections.length;b++){var e=
this.IIa(a,f.sections[b]);if(e)return"["+b+"]"+e}return null}if(f.items&&0<f.items.length){for(b=0;b<f.items.length;b++)if(f.items[b].text==a.name)return":item["+b+"]";return null}};x.prototype.Qsa=function(a,f){var b=f.indexOf("["),e=f.indexOf("]");if(0<=b&&0<=e){var b=f.substring(b+1,e),h=f.indexOf(":");f=f.substring(e+1);e=f.indexOf("]");return 0<=f.indexOf("[")&&0<=e?this.Qsa(a.sections[b],f):0==h?a.items[b]:a.sections[b]}};x.prototype.Yg=function(d){if(d==a.Sc.ex)return this.CA(this.ad);d=this.Qsa(this.Qf,
d);for(var f=this.ad.aw,b=0;b<f.length;b++){var e=f[b].getData();if(d==e)return f[b].ce()[0].oa()}return null};x.prototype.Ly=function(){return this.Qf.title};x.prototype.getItem=function(a){for(var f,b=a.shift(),e=this.Qf;void 0!=b;)0<a.length?e=e.sections[b]:f=e.items[b],b=a.shift();return f?{text:f.text?f.text:null}:null};x.prototype.n4a=function(a){for(var f,b=a.shift(),e=this.Qf;void 0!=b;)0<a.length?e=e.sections[b]:f=e.sections[b],b=a.shift();return{title:f.title?f.title:null,items:f.items?
this.jDa(f.items):null,sections:f.sections?this.mDa(f.sections):null}};x.prototype.jDa=function(a){for(var f=[],b=0;b<a.length;b++)f.push({text:a[b].text});return f};x.prototype.mDa=function(a){for(var f=[],b=0;b<a.length;b++)f.push({title:a[b].title?a[b].title:null,items:a[b].items?this.jDa(a[b].items):null,sections:a[b].sections?this.mDa(a[b].sections):null});return f};a.i.v(w,a.ma);w.kr={skin:a.j.kr,titleStyle:new a.j("color: #737373;"),_sectionTitleStyle:new a.j("color: #737373;"),layout:{titleGapWidth:17,
titleGapHeight:9,symbolGapWidth:7,symbolGapHeight:4,rowGap:4,columnGap:10,sectionGapHeight:16,sectionGapWidth:24}};w.Wf={skin:a.j.Wf,textStyle:new a.j(a.ma.uj),titleStyle:new a.j(a.ma.QJ+"color: #333333;"),_sectionTitleStyle:new a.j(a.ma.QJ+"color: #333333;")};w.Ig={skin:a.j.Vm,orientation:"vertical",position:null,backgroundColor:null,borderColor:null,textStyle:new a.j(a.ma.zs+"font-size: 11px; color: #333333;"),titleStyle:new a.j(a.ma.zs+"font-size: 12px; color: #003d5b;"),titleHalign:"start",hiddenCategories:[],
hideAndShowBehavior:"off",hoverBehavior:"none",hoverBehaviorDelay:200,scrolling:"asNeeded",halign:"start",valign:"top",drilling:"off",_color:"#a6acb1",_markerShape:"square",_lineWidth:3,layout:{outerGapWidth:3,outerGapHeight:3,titleGapWidth:8,titleGapHeight:3,symbolGapWidth:5,symbolGapHeight:4,rowGap:0,columnGap:8,sectionGapHeight:6,sectionGapWidth:15},isLayout:!1};w.Bh=function(d,f){var b=Math.min(a.ea.Jy(d.a,d.A().textStyle)/14,1);return Math.ceil(f*b)};w.prototype.zV=function(){return{sections:{items:{_dataContext:!0}}}};
a.i.v(q,a.u);q.prototype.wj=function(a){q.C.wj.call(this,a);var f=this.Ya(a.target);if(f){var b=this.Hva(f),f=this.dua(f,a);(b||f)&&a.stopPropagation()}};q.prototype.hr=function(d){q.C.hr.call(this,d);if(d=this.Ya(d.target)){var f=d instanceof a.Sg?d.KP:null;f&&f.isCollapsible&&f.button&&f.button.CI();this.dK(d)}};q.prototype.Sm=function(d){q.C.Sm.call(this,d);(d=this.Ya(d.target))&&(d=d instanceof a.Sg?d.KP:null)&&d.isCollapsible&&d.button&&d.button.$r()};q.prototype.xv=function(a){var f=this.Ya(a.target);
if(f){var b=a.W6,e=this.Hva(f);a=this.dua(f,a);(e||a)&&b&&b.preventDefault()}};q.prototype.Hva=function(d){var f=this.ad.A().hideAndShowBehavior;if("none"==f||"off"==f)return!1;var b=d.yd?d.yd():null;if(!b||0>=b.length)return!1;for(var e=d.yd()[0],f=this.ad.A().hiddenCategories||[],f=f.slice(),l=d.ce(),g=0;g<l.length;g++){var q=l[g];q instanceof a.V?q.qs(d.Gb()):q instanceof a.Rect&&d.Gxa()}d=b[0];h.lca(e,this.ad)?(f.splice(a.Z.Zb(f,e),1),d=a.la.KKa(d,f)):(f.push(e),d=a.la.JKa(d,f));this.ad.A().hiddenCategories=
f;this.Ct(d,this.ad);return!0};q.prototype.dua=function(d,f){if(d&&d.Og&&d.Og())return this.Ct(a.la.Sy("action",d.Og(),d.getId()),this.ad),!0;if(d instanceof E&&d.kk()){var b=d.getId();this.Ct(a.la.i6(b,b,null),this.ad);return!0}return(b=d instanceof a.Sg?d.KP:null)&&b.isCollapsible?(this.rMa(f,b.id),!0):!1};q.prototype.Nj=function(d,f,b){d=this.ad.A();"none"==d.hoverBehavior||f.ce&&f.ce()[0]instanceof a.va||(f=f.yd?f.yd():[],d.highlightedCategories=b?f.slice():null,b=a.la.iJ(d.highlightedCategories,
b),d=a.bb.rq(d.hoverBehaviorDelay),this.LF.Lf(b,this.ad.aw,d,!0))};q.prototype.sva=function(a,f){var b=f.getId();this.rMa(a,b)};q.prototype.rMa=function(d,f){for(var b=this.ad.A(),e=0;e<f.length;e++)b=b.sections[f[e]];b.expanded="off"==b.expanded?"on":"off";d.type==a.MouseEvent.Je&&(b=this.Ya(this.ae(d)),b.Kd&&this.ps(b.Kd(d)));e=(b=this.ad.sE())?b.Ie():!1;this.ad.ha();b&&this.ad.Yca(b,e);this.cd();b=this.ad.iV();this.Ct(new a.bl(b.b,b.f,b.x,b.y),this.ad)};q.prototype.jz=function(){return this.ad.A()._isScrollingLegend?
a.u.uD:a.u.Fs};q.prototype.zy=function(){return this.ad};q.prototype.CE=function(){return!0};q.prototype.Uw=function(){var a=this.xc.zo;return a instanceof E&&null!=a.getData()._dataContext?"series":null};q.prototype.nF=function(){var a=this.xc.zo;return a instanceof E?[a.getData()._dataContext]:[]};q.prototype.iz=function(a){a=this.ad.zf(this.a.$d(a.pageX,a.pageY));return this.ad.Ub.mf(a.x,a.y)?"legend":null};q.prototype.eT=function(){return{}};q.prototype.qD=function(a){if("legend"==this.iz(a)){a=
this.ad.A()._dropColor;var f=this.ad.Lb.sg("background");f&&f.ab(a)}};q.prototype.fz=function(){var a=this.ad.Lb.sg("background");if(a){var f=this.ad.A().backgroundColor;f?a.ab(f):a.ec()}};a.i.v(B,a.Ba);B.prototype.Init=function(a,f){B.C.Init.call(this,a);this.ad=f};B.prototype.$k=function(d){var f=d.keyCode,b=this.Lc.Oe(),e=b&&b.ce()[0]instanceof a.va,h=null;null==b&&f==a.KeyboardEvent.fh?(f=this.ad.Xx,0<f.length&&(a.u.Zd(d),h=this.oE(f))):b&&(f==a.KeyboardEvent.fh?(a.u.Zd(d),h=b):f==a.KeyboardEvent.ho||
f==a.KeyboardEvent.Pj?(f==a.KeyboardEvent.ho&&this.Lc.dua(b,d),e?this.Lc.sva(d,b.ce()[0]):this.Lc.Hva(b),a.u.Zd(d)):!e||f!=a.KeyboardEvent.Te&&f!=a.KeyboardEvent.Ke?h=B.C.$k.call(this,d):(this.Lc.sva(d,b.ce()[0]),a.u.Zd(d)));h&&this.ad.qHa.scrollIntoView(h.ce()[0]);return h};a.i.v(E,a.i);E.prototype.Init=function(a,f,b,e,l,g){this.ad=a;this.zg=f;this.Ol=b;this.ac=(this.rO=h.Bba(this.Ol))?this.rO:b.title;this.sr=b.action;this.Rv=g;this.Q_a=b._spb;this.Zs=e;this.DO=l;this.Zc=!1;if(this.sr||this.Rv)for(a=
0;a<this.zg.length;a++)this.zg[a].setCursor("pointer")};E.Yb=function(a,f,b,e,h,g){if(!a||!b)return null;b=new E(f,a,b,e,h,g);f.pja(b);for(e=0;e<a.length;e++)f.Qb().Yb(a[e],b);return b};E.prototype.getData=function(){return this.Ol};E.prototype.Gb=function(){return this.Ol.color};E.prototype.getId=function(){return this.ac};E.prototype.ce=function(){return this.zg};E.prototype.yd=function(){return null!=this.rO?[this.rO]:null};E.prototype.Og=function(){return this.sr};E.prototype.kk=function(){return this.Rv};
E.prototype.Ni=function(){return this.Q_a};E.prototype.ve=function(){var d=[],f=this.ad.A(),b=this.ad.A().hideAndShowBehavior,e=h.lca(this.rO,this.ad),l=this.getData();if(this.zg[0]instanceof a.va)return d.push(a.I.Ka(a.I.ua,"off"==l.expanded?"STATE_COLLAPSED":"STATE_EXPANDED")),a.R.ym(l.title,d);"off"!=b&&"none"!=b&&d.push(a.I.Ka(a.I.ua,e?"STATE_HIDDEN":"STATE_VISIBLE"));this.kk()&&d.push(a.I.Fd(f,"stateDrillable",a.I.ua,"STATE_DRILLABLE"));return null!=l.shortDesc?a.R.ym(l.shortDesc,d):0<d.length?
a.R.ym(l.text,d):null};E.prototype.Gxa=function(){!a.m.bk()&&this.zg[0]&&this.zg[0].Od("label",this.ve())};E.prototype.Kd=function(d){return d.type==a.MouseEvent.Je?this:a.Ba.Kd(this,d,this.ad.Xx,!0)};E.prototype.sd=function(d){return this.zg[0]?this.zg[0].ga(d):new a.U(0,0,0,0)};E.prototype.ik=function(){return this.zg[0]?this.zg[0].oa():null};E.prototype.Fh=function(){this.Zc=!0;this.zg[0]&&(this.zg[0]instanceof a.va?this.zg[0].CI():this.zg[0].wc(a.m.C4()))};E.prototype.yf=function(){this.Zc=!1;
this.zg[0]&&(this.zg[0]instanceof a.va?this.zg[0].$r():this.zg[0].Ga(null))};E.prototype.Ie=function(){return this.Zc};E.prototype.bv=function(){return this.Zs};E.prototype.rf=function(){return this.DO};E.prototype.Mi=function(){return this.Ol.color};E.prototype.Dn=function(){return!0};E.prototype.Ul=function(){return[this.getId()]};E.prototype.mq=function(){return this.ce()};var h={};a.i.v(h,a.i);h.lia=2;h.OAa=.6;h.tAa=10;h.gl=12;h.EZ=2;h.ha=function(d,f){var b=d.A(),e=d.a,l=a.m.ca(e);d.qja(f);b.isLayout||
h.Wn(d,f);var g=new a.Id(e,f.b,f.f),q=new a.ba(e);g.Ha.B(q);d.B(g);d.qHa=g;var r=w.Bh(d,b.layout.outerGapWidth),k=w.Bh(d,b.layout.outerGapHeight);f.x+=r;f.y+=k;f.b-=2*r;f.f-=2*k;if(0>=f.b||0>=f.f)return new a.eg(0,0);e=h.JZa(d,q,new a.U(f.x,f.y,f.b,f.f));if(0==e.b||0==e.f)return new a.eg(0,0);g.Jca();e.f>f.f?(e.f=f.f,b._isScrollingLegend=!0):b._isScrollingLegend=!1;var y=g=0,t=null!=b.hAlign?b.hAlign:b.halign;"center"==t?g=f.x-e.x+(f.b-e.b)/2:"end"==t&&(g=l?f.x-e.x:f.x-e.x+f.b-e.b);l=null!=b.vAlign?
b.vAlign:b.valign;"middle"==l?y=f.y-e.y+(f.f-e.f)/2:"bottom"==l&&(y=f.y-e.y+f.f-e.f);l=new a.U(e.x+g-r,e.y+y-k,e.b+2*r,e.f+2*k);if(b.isLayout)return l;(g||y)&&q.rb(g,y);b=d.bqa;for(q=0;q<b.length;q++)a.hj.align(e,b[q].T4a,b[q].text,b[q].text.rc().b);return l};h.JZa=function(a,f,b){var e=a.A();b=b.clone();var l=h.R2(a,f,e.title,b,null,!0);if(l){var g=l.rc(),q=w.Bh(a,e.layout.titleGapHeight);b.y+=g.f+q;b.f-=Math.floor(g.f+q)}a=h.WFa(a,f,e.sections,b,[]);return l?g.rl(a):a};h.Wn=function(d,f){var b=
d.A(),e=b.backgroundColor,h=b.borderColor,b=b.dnd?b.dnd.drop.legend:{};if(e||h||0<Object.keys(b).length)b=new a.Rect(d.a,f.x,f.y,f.b,f.f),e?b.ab(e):b.ec(),h&&(b.wc(h),b.dd(!0)),d.B(b),d.Lb.ah("background",b)};h.R2=function(d,f,b,e,h,g,q,r){var k=d.A(),y=f.a,t=a.m.ca(y);if(!b)return null;b=new a.J(y,b,e.x,e.y);y=k.titleStyle;h&&h.titleStyle?y=new a.j(h.titleStyle):h&&k._sectionTitleStyle&&(y=k._sectionTitleStyle);b.tb(y);return a.ea.Xc(b,e.b,Infinity,f)?(t&&b.qa(e.x+e.b-b.rc().b),k.isLayout?f.removeChild(b):
(f={id:q,button:r},f.isCollapsible=h&&("on"==h.collapsible||1==h.collapsible),d.Qb().Yb(b,new a.Sg(b.Dm(),null,null,f)),g&&d.RTa({text:b,T4a:h&&h.titleHalign?h.titleHalign:k.titleHalign})),b):null};h.WFa=function(d,f,b,e,l){var g=d.A();null==g.symbolWidth&&null==g.symbolHeight?(g.symbolWidth=h.tAa,g.symbolHeight=h.tAa):(null==g.symbolWidth?g.symbolWidth=g.symbolHeight:null==g.symbolHeight&&(g.symbolHeight=g.symbolWidth),g.symbolWidth=parseInt(g.symbolWidth),g.symbolHeight=parseInt(g.symbolHeight));
for(var q=w.Bh(d,g.layout.sectionGapHeight),r=w.Bh(d,g.layout.titleGapHeight),k=w.Bh(d,g.layout.sectionGapWidth),y=h.sXa(d),g="vertical"!=g.orientation,t=null,x=e.clone(),C,D=0;D<b.length;D++){var v=l.concat([D]),z="off"==b[D].expanded||0==b[D].expanded?r:q;g?(C=h.PFa(d,f,b[D],x,y),C.b>x.b?(x.b<e.b&&(e.y+=C.f+z,e.f-=C.f+z),C=C.b<=e.b?h.PFa(d,f,b[D],e,y):h.YFa(d,f,b[D],e,y,v,!0),e.y+=C.f+z,e.f-=C.f+z,x=e.clone()):(x.b-=C.b+k,a.m.ca(d.a)||(x.x+=C.b+k))):(C=h.YFa(d,f,b[D],e,y,v,!1),e.y+=C.f+z,e.f-=C.f+
z);t=t?t.rl(C):C}return t};h.nVa=function(d,f,b,e,l,g,q,r,k,y,t){var x=h.zka(d,e,l+"Enabled",g,q),C=h.zka(d,e,l+"Over",g,q);e=h.zka(d,e,l+"Down",g,q);d=new a.va(d,x,C,e,null,k,y,t);f=E.Yb([d],f,b,r,null,!1);d.ug("button");f.Gxa();return d};h.zka=function(d,f,b,e,l){var g=a.m.ca(d)?"RTL":"";d=new a.Image(d,f[b+g]?f[b+g]:f[b],e,l,h.gl,h.gl);d.ec();return d};h.YFa=function(d,f,b,e,l,g,q){if(b){var r=d.A(),k=w.Bh(d,r.layout.symbolGapWidth),y=w.Bh(d,r.layout.rowGap),t=w.Bh(d,r.layout.columnGap),x=d.a,
C=a.m.ca(x);e=e.clone();"off"!=r.scrolling&&(e.f=Infinity);var D,v="on"==b.collapsible||1==b.collapsible,z;if(v){D=C?e.x+e.b-h.gl:e.x;if(!r.isLayout){var m="off"==b.expanded||0==b.expanded;z=m?"closed":"open";var m=a.I.Ka(a.I.ua,m?"EXPAND":"COLLAPSE",null),A=d.Qb();z=h.nVa(x,d,b,r._resources,z,D,e.y,m,g,A.sva,A);f.B(z)}D=new a.U(D,e.y,h.gl,h.gl);x=w.Bh(d,r.layout.symbolGapWidth);C||(e.x+=h.gl+x);e.b-=h.gl+x}x=(x=h.R2(d,f,b.title,e,b,!v&&1>=g.length,g,z))?x.rc():new a.U(C?e.x+e.b:e.x,e.y,0,0);x=D?
x.rl(D):x;if(!b.items&&!b.sections||"off"==b.expanded||0==b.expanded)return x;0<x.f&&(v=w.Bh(d,r.layout.titleGapHeight),e.y+=x.f+v,e.f-=x.f+v);b.sections&&(g=h.WFa(d,f,b.sections,e,g),x=x.rl(g));if(!b.items)return x;v=h.OUa(d,e,l,b.items,q);q=v.numCols;g=v.numRows;v=v.width;D=e.y;if(0==g||0==q)return x;z=Math.min(q*(v+t)-t,e.b);x=x.rl(new a.U(C?e.x+e.b-z:e.x,e.y,z,g*(l+y)-y));if(r.isLayout)return x;r=v-r.symbolWidth-k;k=0;z=1;m=b.items.length;for(A=0;A<m&&(h.L_(d,f,b.items[A],e,r,l,A),e.y+=l+y,k++,
k===g&&z!==q&&(e.y=D,e.b-=v+t,C||(e.x+=v+t),k=0,z++),k!==g);A++);return x}};h.PFa=function(d,f,b,e,l){if(b){var g=d.A(),q=g.symbolWidth,r=w.Bh(d,g.layout.symbolGapWidth),k=w.Bh(d,g.layout.columnGap),y=w.Bh(d,g.layout.titleGapWidth),t=b.items.length,x=a.m.ca(d.a),C=e.clone(),D=h.R2(d,f,b.title,e,b,!1),v=D?D.rc():new a.U(x?e.x+e.b:e.x,e.y,0,0);if(!b.items)return v;0<v.b&&(C.b-=v.b+y,x||(C.x+=v.b+y));var y=[],z=e.b-C.b,m,A;for(A=0;A<t;A++)m=b.items[A],m=Math.ceil(a.ea.DV(d.a,m.text,g.textStyle)),z+=
m+q+r+k,y.push(m);0<t&&(z-=k);v=new a.U(x?e.x+e.b-z:e.x,e.y,z,Math.max(l,v.f));if(g.isLayout||z>e.b)return f.removeChild(D),v;for(A=0;A<t;A++)m=b.items[A],h.L_(d,f,m,C,y[A],l,A),e=y[A]+q+r,C.b-=e+k,x||(C.x+=e+k);return v}};h.OUa=function(d,f,b,e,h){for(var g=d.A(),q=100<a.Af.oV(d),r=0,k=0;k<e.length;k++){var y=e[k];q?(y=new a.J(d.a,y.text),y.tb(g.textStyle),y=a.ea.Ai(y).b):y=a.ea.DV(d.a,y.text,g.textStyle);y>r&&(r=y)}q=g.symbolWidth;y=w.Bh(d,g.layout.symbolGapWidth);k=w.Bh(d,g.layout.rowGap);d=w.Bh(d,
g.layout.columnGap);r=Math.ceil(q+y+r);h?(h=Math.min(Math.max(Math.floor((f.b+d)/(r+d)),1),e.length),b=Math.min(Math.floor((f.f+k)/(b+k)),Math.ceil(e.length/h)),h=Math.ceil(e.length/b),b=Math.ceil(e.length/h)):Infinity==f.f?(h=1,b=e.length):(b=Math.min(Math.floor((f.f+k)/(b+k)),e.length),h=Math.ceil(e.length/b),b=Math.ceil(e.length/h));f=Math.min(r,(f.b-d*(h-1))/h);return f<q?{width:0,numCols:0,numRows:0}:{width:f,numCols:h,numRows:b}};h.sXa=function(d){var f=d.A(),b=new a.J(d.a,"Test");b.tb(f.textStyle);
b.pg();b=a.ea.Ai(b).f;d=f.symbolHeight+w.Bh(d,f.layout.symbolGapHeight);return Math.ceil(Math.max(b,d))};h.L_=function(d,f,b,e,l,g){var q=d.A(),r=d.a,k=a.m.ca(r),y=q.symbolWidth,t=w.Bh(d,q.layout.symbolGapWidth),x=k?e.x+e.b-y:e.x,C=k?e.x+e.b-y-t:e.x+y+t,D=h.zVa(d,x,e.y,g,b),v=b.text,z;v&&(z=h.AVa(f,l,v,q.textStyle))&&(z.qa(C),a.ea.IQ(z,e.y+g/2),k&&z.kh());f.B(D);e=new a.Rect(r,k?C-l-h.EZ:x-h.EZ,e.y-h.EZ,y+t+l+2*h.EZ,g+2*h.EZ);e.ec();q=q.hideAndShowBehavior;"none"!=q&&"off"!=q&&e.setCursor("pointer");
f.B(e);f=[e,D];null!=z&&f.push(z);z=E.Yb(f,d,b,null!=z?z.Dm():null,b.shortDesc,h.TXa(d,b));h.lca(h.Bba(b),d)&&(D.qs(z.Gb()),D.Xa().Kc());if("none"!=q&&"off"!=q||null!=b.shortDesc)e.ug("img"),z.Gxa()};h.TXa=function(a,f){return"on"==f.drilling?!0:"off"==f.drilling?!1:"on"==a.A().drilling};h.AVa=function(d,f,b,e){b=new a.J(d.a,b);b.tb(e);return b=a.ea.Xc(b,f,Infinity,d)?b:null};h.zVa=function(d,f,b,e,l){var g=d.A(),q=d.a,r=null!=l.type?l.type:l.symbolType;l.markerShape||(l.markerShape=g._markerShape);
l.color||(l.color=g._color);l.lineWidth||(l.lineWidth="lineWithMarker"==r?h.lia:g._lineWidth);var k=g.symbolWidth,g=g.symbolHeight,y=b+e/2,t=f+k/2;"line"==r?q=h.ACa(q,f,b,k,e,l):"lineWithMarker"==r?(q=h.ACa(q,f,b,k,e,l),h.lca(h.Bba(l),d)||q.B(h.Bz(d,t,y,k*h.OAa,g*h.OAa,l))):"image"==r?q=h.Bka(d,f,b,k,g,e,l):"_verticalBoxPlot"==r?(g=Math.max(4*Math.round(g/4),4),q=new a.ba(q),q.B(h.Bz(d,t,y+g/4,k,g/2,h.h$(l,"q2"))),q.B(h.Bz(d,t,y-g/4,k,g/2,h.h$(l,"q3")))):"_horizontalBoxPlot"==r?(f=a.m.ca(q),k=Math.max(4*
Math.round(k/4),4),f=k/4*(f?1:-1),q=new a.ba(q),q.B(h.Bz(d,t+f,y,k/2,g,h.h$(l,"q2"))),q.B(h.Bz(d,t-f,y,k/2,g,h.h$(l,"q3")))):q=h.Bz(d,t,y,k,g,l);return q};h.Bka=function(d,f,b,e,h,g,q){return new a.yc(d.a,f+e/2,b+g/2,e,h,null,q.source)};h.Bz=function(d,f,b,e,h,g){var q=d.a,r=d.A();d=g.markerShape;var k=g.markerColor?g.markerColor:g.color,y=g.markerStyle||g.markerSvgStyle?g.markerStyle||g.markerSvgStyle:g.style||g.svgStyle,t=g.markerClassName||g.markerSvgClassName?g.markerClassName||g.markerSvgClassName:
g.className||g.svgClassName,x=g.pattern;x&&"none"!=x?(e=new a.V(q,d,r.skin,0,0,e,h,null,null,!0),e.Ea(new a.gb(x,k,"#FFFFFF")),e.rb(f,b)):(e=new a.V(q,d,r.skin,f,b,e,h,null,null,!0),e.ab(k));g.borderColor&&e.wc(g.borderColor,null,g._borderWidth?g._borderWidth:1);"square"!=d&&"rectangle"!=d||e.dd(!0);e.Kc(t).Xa(y);return e};h.ACa=function(d,f,b,e,h,g){b+=h/2;d=new a.Hb(d,f,b,f+e,b);f=new a.na(g.color,1,g.lineWidth);e=g.lineStyle;"dashed"==e?f.Im(a.sb.uC(e),"4,2,4"):"dotted"==e&&f.Im(a.sb.uC(e),"2");
d.Kc(g.className||g.svgClassName).Xa(g.style||g.svgStyle);d.Ga(f);d.dd(!0);return d};h.h$=function(a,f){return{markerShape:"rectangle",color:a._boxPlot[f+"Color"],pattern:a._boxPlot["_"+f+"Pattern"],className:a._boxPlot[f+"ClassName"]||a._boxPlot[f+"svgClassName"],style:a._boxPlot[f+"Style"]||a._boxPlot[f+"svgStyle"]}};h.Bba=function(a){var f=null;return f=a.categories&&0<a.categories.length?a.categories[0]:a.id?a.id:a.text};h.lca=function(d,f){var b=f.A().hiddenCategories;return!b||0>=b.length?!1:
-1!==a.Z.Zb(b,d)};a.M(a,"Legend",a.Af);a.M(a.Af,"newInstance",a.Af.newInstance);a.M(a.Af.prototype,"destroy",a.Af.prototype.vc);a.M(a.Af.prototype,"getAutomation",a.Af.prototype.mh);a.M(a.Af.prototype,"getPreferredSize",a.Af.prototype.Zu);a.M(a.Af.prototype,"highlight",a.Af.prototype.fe);a.M(a.Af.prototype,"render",a.Af.prototype.ha);a.M(x.prototype,"getDomElementForSubId",x.prototype.Yg);a.M(x.prototype,"getItem",x.prototype.getItem);a.M(x.prototype,"getSection",x.prototype.n4a);a.M(x.prototype,
"getTitle",x.prototype.Ly)})(dvt);
  return dvt;
});
