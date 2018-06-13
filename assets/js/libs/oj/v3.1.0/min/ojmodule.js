/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore","knockout","promise"],function(a,g){a.Rt={};a.Rt.td={viewPath:"text!views/",viewSuffix:".html",modelPath:"viewModels/",initializeMethod:"initialize",disposeMethod:"dispose",activatedHandler:"handleActivated",attachedHandler:"handleAttached",detachedHandler:"handleDetached",bindingsAppliedHandler:"handleBindingsApplied",deactivatedHandler:"handleDeactivated",transitionCompletedHandler:"handleTransitionCompleted"};o_("ModuleBinding.defaults",a.Rt.td,a);a.Rt.Qta="oj:blank";(function(){function c(b,
c,e,f,h,k,l){var n=c.canAnimate;if(null==n||n.call(c,b)){var s,t;if(n=c.prepareAnimation.call(c,b))s=n.newViewParent,t=n.oldViewParent;var D=s||e;t&&t!==e?d(f,t):D===e&&k(null);D!==e&&g.virtualElements.setDomNodeChildren(D,[]);h(D);var C=Array.prototype.slice.call(D.childNodes),J=!1,E=function(){J||(J=!0,e!==D&&(m(e,C),a.Components&&(p(C,a.Components.mg),p(C,a.Components.kf))))},B=k.bind(null,t);b.newViewParent=s;b.oldViewParent=t;b.oldViewNodes=f;b.removeOldView=B;b.insertNewView=E;var H=function(){B();
E();l()};return c.animate.call(c,b).then(H,function(){H();a.C.error("ojModule animation promise was rejected")})}}function b(a,b,c){b=b||a;var d=[];c&&a===b&&(c.parentNode.removeChild(c),d.push(c));g.virtualElements.setDomNodeChildren(b,d)}function d(a,b){a.forEach(function(a){b.appendChild(a)})}function e(a,b,c){if(a&&a[b]){var d={element:c[0],valueAccessor:c[1]};2<c.length&&(d.viewModel=c[2],3<c.length&&(d["boolean"===typeof c[3]?"fromCache":"cachedNodes"]=c[3]));return g.ignoreDependencies(a[b],
a,[d])}}function f(b,c,d){if(null!=b&&(c=a.Rt.td[c],null!=c&&b&&(c=b[c],"function"===typeof c))){var e=void 0;d&&(e={element:d[0],valueAccessor:d[1]},2<d.length&&(e["boolean"===typeof d[2]?"fromCache":"cachedNodes"]=d[2]));return g.ignoreDependencies(c,b,[e])}}function h(a,b,c){var d=[];for(a=g.virtualElements.firstChild(a);null!=a&&a!=c;a=a.nextSibling)a!=b&&d.push(a);return d}function k(a,b){var c=[],d=g.virtualElements.firstChild(a);l(d,b,function(a){c.push(a)});return c}function l(a,b,c){for(;null!=
a;){var d=g.virtualElements.nextSibling(a),e=a.nodeType;a===b||1!==e&&8!==e||c(a);a=d}}function m(a,b){for(var c=b.length-1;0<=c;c--)g.virtualElements.prepend(a,b[c])}function p(a,b){if(b)for(var c=0;c<a.length;c++)b(a[c])}function t(a,b){if("string"===typeof a)a=g.utils.parseHtmlFragment(a);else if(window.DocumentFragment?a instanceof DocumentFragment:a&&11===a.nodeType)a=g.utils.arrayPushAll([],a.childNodes);else if(Array.isArray(a))a=g.utils.arrayPushAll([],a);else throw b(),"The View ("+a+") has an unsupported type";
return a}function s(b,c){b=b?b:require;return new Promise(function(d,e){b([c],function(a){d(a)},function(b){a.C.error("ojModule failed to load "+c);e(b)})})}function n(a){return a?new Promise(function(b){a.then(b,b)}):a}g.bindingHandlers.ojModule={init:function(r,q,u,v,w){function y(a){if(a!=J)throw N;}function x(a){f(a,"disposeMethod",[r,q])}function z(){H&&(H(),H=null)}var A,G,D={},C,J=-1,E,B,H,F;g.utils.domNodeDisposal.addDisposeCallback(r,function(){x(A);for(var a=Object.keys(D),b=0;b<a.length;b++)x(D[a[b]].Rn);
z()});var N=Error("Promise cancelled because ojModule is fetching new View and ViewModel"),L=r;8===r.nodeType&&(L=r.parentElement,g.virtualElements.setDomNodeChildren(r,[]),B=r.nextSibling);g.computed(function(){J++;H||(H=a.Context.getContext(L).Ne().Ld({description:"ojModule binding on a node with the Id "+r.id+"is loading the module. Binding evaluator: "+q.toString()}));var u=0===J,v=g.utils.unwrapObservable,O=v(q()),Y,Z,ga,da,S,ia,V,la,fa,ea,aa,U,I;"string"===typeof O?Y=O:(Y=v(O.name),Z=v(O.viewName),
ga=v(O.params),da=v(O.viewModelFactory),S=v(O.createViewFunction),ia=v(O.cacheKey),V=v(O.lifecycleListener),la=v(O.animation),U=v(O.view),I=v(O.viewModel),fa=v(O.require));null==fa||fa instanceof Function||(aa=fa.viewPath,ea=fa.modelPath,fa=fa.instance);Z=null==Z?Y:Z;var M=a.Rt.Qta===Z,v=e(V,"activated",[r,q]),K,W;if(M)K=Promise.resolve([]),W=Promise.resolve(null);else{var X=null==ia?null:D[ia];null!=X&&(delete D[ia],K=Promise.resolve(X.view),W=Promise.resolve(X.Rn))}null==K&&null!=U&&(K=Promise.resolve(U));
if(null==W&&(null!=I?W=Promise.resolve(I):null!=da&&(W=g.ignoreDependencies(da.createViewModel,da,[ga,q])),null==W&&null!=Y&&(null==ea&&(ea=a.Rt.td.modelPath),W=s(fa,ea+Y)),null!=W&&(W=W.then(function(a,b){y(a);return b="function"===typeof b?new b(ga):f(b,"initializeMethod",[r,q])||b}.bind(null,J)),null==K&&null!=S&&(K=W.then(function(a,b){y(a);if(null==b)throw z(),"createViewFunction option cannot be used when the ViewModel is null";var c=b[S];if(null==c)throw z(),"function specified by the createViewFunction option was not found on the ViewModel";
return c.call(b)}.bind(null,J)))),null==K))if(null!=Z)null==aa&&(aa=a.Rt.td.viewPath),K=s(fa,aa+Z+a.Rt.td.viewSuffix);else throw z(),Error("View name or view instance must be specified");if(null==K)throw z(),Error("ojModule is missing a View");var Q;null!=W&&(Q=W.then(function(a,b){y(a);return f(b,"activatedHandler",[r,q])}.bind(null,J)));Promise.all([K,W,v,Q,G]).then(function(s,v){if(s==J){var y=v[0];if(null==y)throw z(),"The module's View was resolved to null";var H=t(y,z),T=v[1],L=!1,N,I=h(r,E,
B),K=k(r,E);null==C||F||(L=!0,N=I,E||(E=document.createElement("div"),E.className="oj-helper-module-cache",g.virtualElements.prepend(r,E)));var O=!1,y=function(c){O||(O=!0,L?d(I,E):K.forEach(function(a){g.cleanNode(a)}),b(r,c||r,E),u||(e(V,"detached",[r,q,A,N]),f(A,"detachedHandler",[r,q,N]),e(V,"deactivated",[r,q,A]),f(A,"deactivatedHandler",[r,q])),L?(p(N,a.Components?a.Components.lw:null),D[C]={Rn:A,view:N}):x(A),A=T,C=ia,F=M)},Q=function(b){b=b||r;m(b,H);var c=null!=X;c&&p(H,a.Components?a.Components.Gt:
null);e(V,"attached",[b,q,T,c]);f(T,"attachedHandler",[b,q,c]);if(!c){var d=w.createChildContext(T,void 0,function(a){a.$module=T;a.$params=ga});l(H[0],E,function(a){g.applyBindings(d,a)});e(V,"bindingsApplied",[b,q,T]);f(T,"bindingsAppliedHandler",[b,q])}},R=function(){e(V,"transitionCompleted",[r,q,T]);f(T,"transitionCompletedHandler",[r,q]);z()};if(null!=la){var S=c({node:r,valueAccessor:q,isInitial:u,oldViewModel:A,newViewModel:T},la,r,I,Q,y,R);G=n(S)}else G=void 0;G||(y(null),Q(null),R())}}.bind(null,
J),function(b,c){c!==N&&null!=c&&(z(),a.C.error(c))}.bind(null,J))},null,{disposeWhenNodeIsRemoved:r});return{controlsDescendantBindings:!0}}};g.virtualElements.allowedBindings.ojModule=!0})()});