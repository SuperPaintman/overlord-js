/*! Overlord-js | Author: SuperPaintman | Site: FlatDev.ru */
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.overlord=e()}}(function(){return function e(n,r,t){function o(f,u){if(!r[f]){if(!n[f]){var l="function"==typeof require&&require;if(!u&&l)return l(f,!0);if(i)return i(f,!0);throw new Error("Cannot find module '"+f+"'")}var a=r[f]={exports:{}};n[f][0].call(a.exports,function(e){var r=n[f][1][e];return o(r?r:e)},a,a.exports,e,n,r,t)}return r[f].exports}for(var i="function"==typeof require&&require,f=0;f<t.length;f++)o(t[f]);return o}({1:[function(e,n,r){"use strict";var t;t=function(e,n,r){return null==r&&(r=!1),function(){var t,o,i,f,u,l,a,s,c,g,d,h,p,v,m,w,y;for(f=n?n:void 0,u=l=0,g=e.length;g>l;u=++l){if(v=e[u],null!=(null!=v?v.func:void 0)&&(v["function"]=v.func),null==(null!=v?v.args:void 0))throw new Error(u+1+" overload hasn't arguments");if(null==(null!=v?v["function"]:void 0))throw new Error(u+1+" overload hasn't function");if(i=!0,m=v.args,o=m[0],c=m[m.length-1],p="..."===c?v.args.slice(0,-1):v.args,p.length===arguments.length||arguments.length>0&&"..."===c||0===arguments.length&&"..."===o){if(i)for(u=a=0,d=p.length;d>a&&(y=p[u],y.constructor!==String||"any"!==y.toLowerCase());u=++a)if(arguments[u]&&arguments[u].constructor!==y){i=!1;break}if(i&&null!=(null!=v?v.check:void 0))for(w=v.check,u=s=0,h=w.length;h>s;u=++s)if(t=w[u],t instanceof RegExp){if(!t.test(arguments[u])){i=!1;break}}else if(t instanceof Function){if(!t(arguments[u])){i=!1;break}}else if(arguments[u]!==t){i=!1;break}}else i=!1;if(i){f=v["function"];break}}return f||r?f.apply(this,arguments):void 0}},n.exports=t},{}]},{},[1])(1)});