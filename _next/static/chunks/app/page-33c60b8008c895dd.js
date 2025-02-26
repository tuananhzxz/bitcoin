(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{566:(e,t,i)=>{Promise.resolve().then(i.bind(i,7821))},6793:(e,t)=>{"use strict";function i(){return null}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i}}),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7821:(e,t,i)=>{"use strict";i.d(t,{default:()=>p});var n=i(5155),r=i(4004),s=i(2115);let a=["1m","5m","15m","30m","1h","4h","1d","1w","1M"],o="https://api.binance.com/api/v3",l=async(e,t,i,n,r)=>{try{t(!0);let s=await fetch("".concat(o,"/klines?symbol=BTCUSDT&interval=").concat(e,"&limit=500"));if(!s.ok)throw Error("Network response was not ok");let a=await s.json(),l=c(a);if((null==n?void 0:n.current)&&(null==r?void 0:r.current)&&(n.current.setData(l.candlestick),r.current.setData(l.volume)),l.candlestick.length>0){let e=l.candlestick[l.candlestick.length-1];i(e.close.toString())}t(!1)}catch(e){console.error("Error fetching chart data:",e),t(!1)}},c=e=>{let t=[],i=[];return e.forEach(e=>{let n=e[0]/1e3;t.push({time:n,open:parseFloat(e[1]),high:parseFloat(e[2]),low:parseFloat(e[3]),close:parseFloat(e[4])}),i.push({time:n,value:parseFloat(e[5]),color:parseFloat(e[4])>=parseFloat(e[1])?"#26a69a":"#ef5350"})}),{candlestick:t,volume:i}},h=async(e,t)=>{try{let i=await fetch("".concat(o,"/ticker/price?symbol=BTCUSDT"));if(!i.ok)throw Error("Network response was not ok");let n=await i.json();e(parseFloat(n.price).toFixed(2));let r=new Date;r.setMinutes(r.getMinutes()-1);let s=await fetch("".concat(o,"/klines?symbol=BTCUSDT&interval=1m&limit=2&endTime=").concat(r.getTime()));if(s.ok){let e=await s.json();e.length>0&&t(parseFloat(e[0][4]).toFixed(2))}}catch(e){console.error("Error fetching current price:",e)}};var u=i(6793),d=i.n(u);let p=()=>{let e=(0,s.useRef)(null),[t,i]=(0,s.useState)(!0),[o,c]=(0,s.useState)("1h"),[u,p]=(0,s.useState)(""),[m,g]=(0,s.useState)(""),[v,f]=(0,s.useState)(!1),b=(0,s.useRef)(null),_=(0,s.useRef)(null),x=(0,s.useRef)(null);return(0,s.useEffect)(()=>{if(!e.current)return;if(b.current)try{b.current.remove(),b.current=null}catch(e){console.error("Error removing chart in cleanup:",e)}let i={layout:{background:{type:r.mE.Solid,color:t?"#151924":"#ffffff"},textColor:t?"#d9d9d9":"#333333"},width:e.current.clientWidth,height:500,crosshair:{mode:r._q.Normal},grid:{vertLines:{color:t?"rgba(70, 70, 70, 0.5)":"rgba(220, 220, 220, 0.5)"},horzLines:{color:t?"rgba(70, 70, 70, 0.5)":"rgba(220, 220, 220, 0.5)"}},timeScale:{rightOffset:12,barSpacing:10,fixLeftEdge:!0,lockVisibleTimeRangeOnResize:!0,rightBarStaysOnScroll:!0,borderColor:t?"#333333":"#D6DCDE",timeVisible:!0,secondsVisible:o.includes("m")}};try{let t=(0,r.R9)(e.current,i);b.current=t,_.current=t.addSeries(r.HD,{upColor:"#26a69a",downColor:"#ef5350",borderVisible:!1,wickUpColor:"#26a69a",wickDownColor:"#ef5350"}),x.current=t.addSeries(r.Ej,{color:"#26a69a",priceFormat:{type:"volume"},priceScaleId:"volume"}),t.priceScale("volume").applyOptions({scaleMargins:{top:.7,bottom:0}}),l(o,f,p,_,x)}catch(e){console.error("Error creating chart:",e)}let n=()=>{e.current&&b.current&&b.current.applyOptions({width:e.current.clientWidth})};return window.addEventListener("resize",n),()=>{if(window.removeEventListener("resize",n),b.current)try{b.current.remove(),b.current=null}catch(e){console.error("Error removing chart in cleanup:",e)}}},[t,o]),(0,n.jsxs)("div",{className:"min-h-screen ".concat(t?"bg-gray-900 text-white":"bg-white text-gray-800"),children:[(0,n.jsxs)(d(),{children:[(0,n.jsx)("title",{children:"Bitcoin Chart | Next.js & TypeScript"}),(0,n.jsx)("meta",{name:"description",content:"Bitcoin price chart with candlestick and volume analysis"}),(0,n.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,n.jsxs)("main",{className:"container mx-auto px-4 py-8",children:[(0,n.jsx)("h1",{className:"text-3xl font-bold mb-6 text-center",children:"Bitcoin Price Chart"}),(0,n.jsxs)("div",{className:"mb-6 flex flex-wrap items-center justify-between gap-4",children:[(0,n.jsx)("button",{onClick:()=>i(!t),className:"px-4 py-2 rounded-md ".concat(t?"bg-gray-200 text-gray-800":"bg-gray-800 text-white"),children:t?"\uD83C\uDF1E Light Mode":"\uD83C\uDF19 Dark Mode"}),(0,n.jsx)("div",{className:"flex flex-wrap gap-2",children:a.map(e=>(0,n.jsx)("button",{onClick:()=>c(e),className:"px-3 py-1 rounded-md ".concat(o===e?t?"bg-blue-600 text-white":"bg-blue-500 text-white":t?"bg-gray-700 text-gray-300":"bg-gray-200 text-gray-700"),children:e},e))}),(0,n.jsx)("button",{onClick:()=>{h(p,g)},className:"px-4 py-2 rounded-md ".concat(t?"bg-green-600 text-white":"bg-green-500 text-white"),children:"Get Current Price And Price 1 Minute Ago"})]}),(u||m)&&(0,n.jsxs)("div",{className:"mb-6 grid grid-cols-1 md:grid-cols-2 gap-4",children:[u&&(0,n.jsxs)("div",{className:"p-4 rounded-md ".concat(t?"bg-gray-800":"bg-gray-100"),children:[(0,n.jsx)("h3",{className:"text-lg font-semibold mb-1",children:"Current Price"}),(0,n.jsxs)("p",{className:"text-2xl font-bold",children:["$",u]})]}),m&&(0,n.jsxs)("div",{className:"p-4 rounded-md ".concat(t?"bg-gray-800":"bg-gray-100"),children:[(0,n.jsx)("h3",{className:"text-lg font-semibold mb-1",children:"Price 1 Minute Ago"}),(0,n.jsxs)("p",{className:"text-2xl font-bold",children:["$",m]}),u&&m&&(0,n.jsx)("p",{className:"text-sm mt-1 ".concat(parseFloat(u)>parseFloat(m)?"text-green-500":parseFloat(u)<parseFloat(m)?"text-red-500":""),children:parseFloat(u)>parseFloat(m)?"▲ +".concat((parseFloat(u)-parseFloat(m)).toFixed(2)," (+").concat(((parseFloat(u)-parseFloat(m))/parseFloat(m)*100).toFixed(2),"%)"):parseFloat(u)<parseFloat(m)?"▼ ".concat((parseFloat(u)-parseFloat(m)).toFixed(2)," (").concat(((parseFloat(u)-parseFloat(m))/parseFloat(m)*100).toFixed(2),"%)"):"No change"})]})]}),v&&(0,n.jsxs)("div",{className:"flex justify-center items-center mb-4",children:[(0,n.jsx)("div",{className:"animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"}),(0,n.jsx)("span",{className:"ml-2",children:"Loading data..."})]}),(0,n.jsx)("div",{ref:e,className:"w-full h-[500px] rounded-lg overflow-hidden ".concat(t?"bg-gray-800":"bg-gray-100")}),(0,n.jsx)("p",{className:"text-sm text-center mt-4 text-gray-500",children:"2025 Created Tuan Anh Do"})]})]})}},1054:(e,t,i)=>{"use strict";function n(e){var t=e.width,i=e.height;if(t<0)throw Error("Negative width is not allowed for Size");if(i<0)throw Error("Negative height is not allowed for Size");return{width:t,height:i}}function r(e,t){return e.width===t.width&&e.height===t.height}i.d(t,{Dv:()=>o,zE:()=>r,Ej:()=>n,vb:()=>h});var s=function(){function e(e){var t=this;this._resolutionListener=function(){return t._onResolutionChanged()},this._resolutionMediaQueryList=null,this._observers=[],this._window=e,this._installResolutionListener()}return e.prototype.dispose=function(){this._uninstallResolutionListener(),this._window=null},Object.defineProperty(e.prototype,"value",{get:function(){return this._window.devicePixelRatio},enumerable:!1,configurable:!0}),e.prototype.subscribe=function(e){var t=this,i={next:e};return this._observers.push(i),{unsubscribe:function(){t._observers=t._observers.filter(function(e){return e!==i})}}},e.prototype._installResolutionListener=function(){if(null!==this._resolutionMediaQueryList)throw Error("Resolution listener is already installed");var e=this._window.devicePixelRatio;this._resolutionMediaQueryList=this._window.matchMedia("all and (resolution: ".concat(e,"dppx)")),this._resolutionMediaQueryList.addListener(this._resolutionListener)},e.prototype._uninstallResolutionListener=function(){null!==this._resolutionMediaQueryList&&(this._resolutionMediaQueryList.removeListener(this._resolutionListener),this._resolutionMediaQueryList=null)},e.prototype._reinstallResolutionListener=function(){this._uninstallResolutionListener(),this._installResolutionListener()},e.prototype._onResolutionChanged=function(){var e=this;this._observers.forEach(function(t){return t.next(e._window.devicePixelRatio)}),this._reinstallResolutionListener()},e}(),a=function(){function e(e,t,i){var r;this._canvasElement=null,this._bitmapSizeChangedListeners=[],this._suggestedBitmapSize=null,this._suggestedBitmapSizeChangedListeners=[],this._devicePixelRatioObservable=null,this._canvasElementResizeObserver=null,this._canvasElement=e,this._canvasElementClientSize=n({width:this._canvasElement.clientWidth,height:this._canvasElement.clientHeight}),this._transformBitmapSize=null!=t?t:function(e){return e},this._allowResizeObserver=null===(r=null==i?void 0:i.allowResizeObserver)||void 0===r||r,this._chooseAndInitObserver()}return e.prototype.dispose=function(){var e,t;if(null===this._canvasElement)throw Error("Object is disposed");null===(e=this._canvasElementResizeObserver)||void 0===e||e.disconnect(),this._canvasElementResizeObserver=null,null===(t=this._devicePixelRatioObservable)||void 0===t||t.dispose(),this._devicePixelRatioObservable=null,this._suggestedBitmapSizeChangedListeners.length=0,this._bitmapSizeChangedListeners.length=0,this._canvasElement=null},Object.defineProperty(e.prototype,"canvasElement",{get:function(){if(null===this._canvasElement)throw Error("Object is disposed");return this._canvasElement},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"canvasElementClientSize",{get:function(){return this._canvasElementClientSize},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"bitmapSize",{get:function(){return n({width:this.canvasElement.width,height:this.canvasElement.height})},enumerable:!1,configurable:!0}),e.prototype.resizeCanvasElement=function(e){this._canvasElementClientSize=n(e),this.canvasElement.style.width="".concat(this._canvasElementClientSize.width,"px"),this.canvasElement.style.height="".concat(this._canvasElementClientSize.height,"px"),this._invalidateBitmapSize()},e.prototype.subscribeBitmapSizeChanged=function(e){this._bitmapSizeChangedListeners.push(e)},e.prototype.unsubscribeBitmapSizeChanged=function(e){this._bitmapSizeChangedListeners=this._bitmapSizeChangedListeners.filter(function(t){return t!==e})},Object.defineProperty(e.prototype,"suggestedBitmapSize",{get:function(){return this._suggestedBitmapSize},enumerable:!1,configurable:!0}),e.prototype.subscribeSuggestedBitmapSizeChanged=function(e){this._suggestedBitmapSizeChangedListeners.push(e)},e.prototype.unsubscribeSuggestedBitmapSizeChanged=function(e){this._suggestedBitmapSizeChangedListeners=this._suggestedBitmapSizeChangedListeners.filter(function(t){return t!==e})},e.prototype.applySuggestedBitmapSize=function(){if(null!==this._suggestedBitmapSize){var e=this._suggestedBitmapSize;this._suggestedBitmapSize=null,this._resizeBitmap(e),this._emitSuggestedBitmapSizeChanged(e,this._suggestedBitmapSize)}},e.prototype._resizeBitmap=function(e){var t=this.bitmapSize;r(t,e)||(this.canvasElement.width=e.width,this.canvasElement.height=e.height,this._emitBitmapSizeChanged(t,e))},e.prototype._emitBitmapSizeChanged=function(e,t){var i=this;this._bitmapSizeChangedListeners.forEach(function(n){return n.call(i,e,t)})},e.prototype._suggestNewBitmapSize=function(e){var t=this._suggestedBitmapSize,i=n(this._transformBitmapSize(e,this._canvasElementClientSize)),s=r(this.bitmapSize,i)?null:i;null===t&&null===s||null!==t&&null!==s&&r(t,s)||(this._suggestedBitmapSize=s,this._emitSuggestedBitmapSizeChanged(t,s))},e.prototype._emitSuggestedBitmapSizeChanged=function(e,t){var i=this;this._suggestedBitmapSizeChangedListeners.forEach(function(n){return n.call(i,e,t)})},e.prototype._chooseAndInitObserver=function(){var e=this;if(!this._allowResizeObserver){this._initDevicePixelRatioObservable();return}new Promise(function(e){var t=new ResizeObserver(function(i){e(i.every(function(e){return"devicePixelContentBoxSize"in e})),t.disconnect()});t.observe(document.body,{box:"device-pixel-content-box"})}).catch(function(){return!1}).then(function(t){return t?e._initResizeObserver():e._initDevicePixelRatioObservable()})},e.prototype._initDevicePixelRatioObservable=function(){var e=this;if(null!==this._canvasElement){var t=l(this._canvasElement);if(null===t)throw Error("No window is associated with the canvas");this._devicePixelRatioObservable=new s(t),this._devicePixelRatioObservable.subscribe(function(){return e._invalidateBitmapSize()}),this._invalidateBitmapSize()}},e.prototype._invalidateBitmapSize=function(){if(null!==this._canvasElement){var e,t,i=l(this._canvasElement);if(null!==i){var r,s=null!==(t=null===(e=this._devicePixelRatioObservable)||void 0===e?void 0:e.value)&&void 0!==t?t:i.devicePixelRatio,a=this._canvasElement.getClientRects(),o=void 0!==a[0]?n({width:Math.round((r=a[0]).left*s+r.width*s)-Math.round(r.left*s),height:Math.round(r.top*s+r.height*s)-Math.round(r.top*s)}):n({width:this._canvasElementClientSize.width*s,height:this._canvasElementClientSize.height*s});this._suggestNewBitmapSize(o)}}},e.prototype._initResizeObserver=function(){var e=this;null!==this._canvasElement&&(this._canvasElementResizeObserver=new ResizeObserver(function(t){var i=t.find(function(t){return t.target===e._canvasElement});if(i&&i.devicePixelContentBoxSize&&i.devicePixelContentBoxSize[0]){var r=i.devicePixelContentBoxSize[0],s=n({width:r.inlineSize,height:r.blockSize});e._suggestNewBitmapSize(s)}}),this._canvasElementResizeObserver.observe(this._canvasElement,{box:"device-pixel-content-box"}))},e}();function o(e,t){if("device-pixel-content-box"===t.type)return new a(e,t.transform,t.options);throw Error("Unsupported binding target")}function l(e){return e.ownerDocument.defaultView}var c=function(){function e(e,t,i){if(0===t.width||0===t.height)throw TypeError("Rendering target could only be created on a media with positive width and height");if(this._mediaSize=t,0===i.width||0===i.height)throw TypeError("Rendering target could only be created using a bitmap with positive integer width and height");this._bitmapSize=i,this._context=e}return e.prototype.useMediaCoordinateSpace=function(e){try{return this._context.save(),this._context.setTransform(1,0,0,1,0,0),this._context.scale(this._horizontalPixelRatio,this._verticalPixelRatio),e({context:this._context,mediaSize:this._mediaSize})}finally{this._context.restore()}},e.prototype.useBitmapCoordinateSpace=function(e){try{return this._context.save(),this._context.setTransform(1,0,0,1,0,0),e({context:this._context,mediaSize:this._mediaSize,bitmapSize:this._bitmapSize,horizontalPixelRatio:this._horizontalPixelRatio,verticalPixelRatio:this._verticalPixelRatio})}finally{this._context.restore()}},Object.defineProperty(e.prototype,"_horizontalPixelRatio",{get:function(){return this._bitmapSize.width/this._mediaSize.width},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"_verticalPixelRatio",{get:function(){return this._bitmapSize.height/this._mediaSize.height},enumerable:!1,configurable:!0}),e}();function h(e,t){var i=e.canvasElementClientSize;if(0===i.width||0===i.height)return null;var n=e.bitmapSize;if(0===n.width||0===n.height)return null;var r=e.canvasElement.getContext("2d",t);return null===r?null:new c(r,i,n)}}},e=>{var t=t=>e(e.s=t);e.O(0,[426,441,517,358],()=>t(566)),_N_E=e.O()}]);