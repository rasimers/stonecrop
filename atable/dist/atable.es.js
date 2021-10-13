import{reactive as e,computed as t,defineComponent as n,inject as o,withDirectives as a,openBlock as l,createBlock as r,toDisplayString as d,createCommentVNode as i,renderSlot as s,vShow as c,ref as p,watch as u,resolveDynamicComponent as f,withKeys as m,withScopeId as w,pushScopeId as g,popScopeId as h,createVNode as b,Fragment as x,renderList as v,createTextVNode as I,provide as y,nextTick as $,resolveComponent as T}from"vue";var D,C=new Uint8Array(16);function E(){if(!D&&!(D="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return D(C)}var A=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function R(e){return"string"==typeof e&&A.test(e)}for(var N=[],k=0;k<256;++k)N.push((k+256).toString(16).substr(1));function V(e,t,n){var o=(e=e||{}).random||(e.rng||E)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,t){n=n||0;for(var a=0;a<16;++a)t[n+a]=o[a];return t}return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(N[e[t+0]]+N[e[t+1]]+N[e[t+2]]+N[e[t+3]]+"-"+N[e[t+4]]+N[e[t+5]]+"-"+N[e[t+6]]+N[e[t+7]]+"-"+N[e[t+8]]+N[e[t+9]]+"-"+N[e[t+10]]+N[e[t+11]]+N[e[t+12]]+N[e[t+13]]+N[e[t+14]]+N[e[t+15]]).toLowerCase();if(!R(n))throw TypeError("Stringified UUID is invalid");return n}(o)}class O{constructor(t,n=[],o=[],a={},l={},r={}){this.id=void 0===t?V():t,this.rows=o,this.columns=e(n),this.config=e(a),this.table=void 0===l?e(this.createTableObject(o)):l,this.display=this.createDisplayObject(r),this.modal=e({visible:!1,rowIndex:void 0,colIndex:void 0,event:void 0})}createTableObject(e){let t={};for(let[n,o]of this.rows.entries())for(let[a,l]of this.columns.entries())t[`${a}:${n}`]=e[n][this.columns[a].name];return t}createDisplayObject(t){let n={modified:!1};if(void 0!==t&&t.hasOwnProperty("0:0"))return t;void 0!==t&&t.hasOwnProperty("default")&&(n=t.default);let o=new Set;for(let e=this.rows.length-1;e>=0;e--){let t=this.rows[e];t.parent&&o.add(t.parent),n[e]={modified:!1,open:null===t.parent||void 0===t.parent,isParent:!!o.has(e),parent:t.parent,isRoot:null===t.parent||void 0===t.parent,indent:t.indent||null,childrenOpen:!1}}return e(n)}get zeroColumn(){return!(!this.config.numberedRows&&!this.config.treeView)}get numberedRowWidth(){t((()=>String(Math.ceil(this.rows.length/100)+1)+"ch"))}cellData(e,t){return this.table[`${t}:${e}`]}setCellData(e,t,n){return this.table[`${t}:${e}`]!==n&&(this.display[`${t}:${e}`].modified=!0),this.table[`${t}:${e}`]=n,this.table[`${t}:${e}`]}toggleRowExpand(e){if(this.config.treeView){this.display[e].childrenOpen=!this.display[e].childrenOpen;for(let t=this.rows.length-1;t>=0;t--)this.display[t].parent===e&&(this.display[t].open=!this.display[t].open,this.display[t].childrenOpen&&this.toggleRowExpand(t))}}}const M=n({name:"ARow",props:{row:{type:Object,required:!0,default:()=>({})},rowIndex:{type:Number,required:!0,default:0},tableid:{type:String,required:!0,default:()=>{}}},setup(e,t){const n=o(e.tableid);return{TableData:n,getRowExpandSymbol:function(){return n.config.treeView?n.display[e.rowIndex].isRoot&&!n.display[e.rowIndex].childrenOpen?"+":n.display[e.rowIndex].isRoot&&n.display[e.rowIndex].childrenOpen?"-":n.display[e.rowIndex].isParent&&!n.display[e.rowIndex].childrenOpen?"+":n.display[e.rowIndex].isParent&&n.display[e.rowIndex].childrenOpen?"-":"":""},toggleRowExpand:function(e){n.toggleRowExpand(e)},rowVisible:function(){return!n.config.treeView||(!!n.display[e.rowIndex].isRoot||n.display[e.rowIndex].open)}}}});M.render=function(e,t,n,o,p,u){return a((l(),r("tr",null,[e.TableData.config.numberedRows?(l(),r("td",{key:0,style:{width:"TableData.numberedRowWidth","text-align":"center","background-color":"var(--brand-color)",color:"var(--header-text-color)","font-weight":"bold","border-color":"var(--header-border-color)","user-select":"none"}},d(e.rowIndex+1),5)):i("",!0),e.TableData.config.treeView?(l(),r("td",{key:1,style:{width:"2ch","text-align":"center","background-color":"var(--brand-color)",color:"var(--header-text-color)","font-weight":"bold","border-color":"var(--header-border-color)","user-select":"none"},onClick:t[1]||(t[1]=t=>e.toggleRowExpand(e.rowIndex))},d(e.getRowExpandSymbol()),5)):i("",!0),e.TableData.config.numberedRows||e.TableData.config.treeView?i("",!0):s(e.$slots,"indexCell",{key:2}),s(e.$slots,"default")],512)),[[c,e.rowVisible()]])};const P=n({name:"ACell",props:{colIndex:{type:Number,required:!0,default:0},rowIndex:{type:Number,required:!0,default:0},tableid:{type:String,required:!0,default:()=>{}}},setup(e,n){const a=o(e.tableid);let l=p(!1);const r=t((t=>void 0!==a.columns[e.colIndex].format?a.columns[e.colIndex].format(a.cellData(e.rowIndex,e.colIndex)):a.cellData(e.rowIndex,e.colIndex))),d=t((()=>void 0!==a.columns[e.colIndex].align?a.columns[e.colIndex].align.toLowerCase():"center")),i=t((()=>void 0!==a.columns[e.colIndex].width?a.columns[e.colIndex].width:"40ch"));let s="";return u(l,(()=>{console.log(s)})),{TableData:a,updateData:function(t){t&&(void 0===a.columns[e.colIndex].component&&a.setCellData(e.rowIndex,e.colIndex,t.target.innerHTML),l=!0)},displayValue:r,handleInput:function(t){return void 0!==a.columns[e.colIndex].mask&&console.log("masking function"),a.columns[e.colIndex].hasOwnProperty("component")&&f(a.columns[e.colIndex].component)&&(a.modal.component=this.$root.$.appContext.components[a.columns[e.colIndex].component],a.modal.visible=!0,a.modal.colIndex=e.colIndex,a.modal.rowIndex=e.rowIndex,a.modal.event=t,a.modal.parent=this),t},cellModified:l,textAlign:d,cellWidth:i,onFocus:function(e){s=e.target.innerText},onChange:function(e){e.target.innerHTML!==s&&(s=e.target.innerText,e.target.dispatchEvent(new Event("change")),l=!0),console.log(l)},getIndent:function(e,t){return t&&0===e&&t>0?1*t+"ch":"inherit"}}}}),q=w("data-v-1072492f")(((e,t,n,o,a,d)=>{var i;return l(),r("td",{ref:"colIndex + ':' + rowIndex",contenteditable:!0===e.TableData.columns[e.colIndex].edit,tabindex:0,spellcheck:!1,style:{"text-align":e.textAlign,width:e.cellWidth,"background-color":!1===e.cellModified?"inherit":"var(--cell-modified-color)","font-weight":!1===e.cellModified?"inherit":"bold","padding-left":e.getIndent(e.colIndex,null==(i=e.TableData.display[e.rowIndex])?void 0:i.indent)},onFocus:t[1]||(t[1]=t=>e.onFocus(t)),onPaste:t[2]||(t[2]=t=>e.onChange(t)),onBlur:t[3]||(t[3]=t=>e.onChange(t)),onInput:t[4]||(t[4]=t=>e.onChange(t)),onKeydown:[t[5]||(t[5]=m(((...t)=>e.$parent.$parent.enterNav&&e.$parent.$parent.enterNav(...t)),["enter"])),t[6]||(t[6]=m(((...t)=>e.$parent.$parent.tabNav&&e.$parent.$parent.tabNav(...t)),["tab"])),t[7]||(t[7]=m(((...t)=>e.$parent.$parent.endNav&&e.$parent.$parent.endNav(...t)),["end"])),t[8]||(t[8]=m(((...t)=>e.$parent.$parent.homeNav&&e.$parent.$parent.homeNav(...t)),["home"])),t[9]||(t[9]=m(((...t)=>e.$parent.$parent.downArrowNav&&e.$parent.$parent.downArrowNav(...t)),["down"])),t[10]||(t[10]=m(((...t)=>e.$parent.$parent.upArrowNav&&e.$parent.$parent.upArrowNav(...t)),["up"])),t[11]||(t[11]=m(((...t)=>e.$parent.$parent.leftArrowNav&&e.$parent.$parent.leftArrowNav(...t)),["left"])),t[12]||(t[12]=m(((...t)=>e.$parent.$parent.rightArrowNav&&e.$parent.$parent.rightArrowNav(...t)),["right"]))],onClick:t[13]||(t[13]=(...t)=>e.handleInput&&e.handleInput(...t)),innerHTML:e.displayValue},null,44,["contenteditable","innerHTML"])}));P.render=q,P.__scopeId="data-v-1072492f";const S=n({name:"ATableHeader",props:{columns:{type:Array,required:!0},config:{type:Object,default:()=>({})},tableid:{type:String,required:!0,default:()=>{}}},setup:(e,t)=>({TableData:o(e.tableid)})}),L=w("data-v-28265d49");g("data-v-28265d49");const H={key:0},_={tabindex:"-1"};h();const z=L(((e,t,n,o,a,c)=>e.columns.length?(l(),r("thead",H,[b("tr",_,[e.TableData.zeroColumn?(l(),r("th",{key:0,style:{"min-width":e.TableData.numberedRowWidth}},null,4)):i("",!0),(l(!0),r(x,null,v(e.columns,((t,n)=>(l(),r("th",{key:n,tabindex:"-1",style:{"text-align":void 0!==t.align?t.align.toLowerCase():"center","min-width":void 0!==t.width?t.width:"40ch"}},[s(e.$slots,"default",{},(()=>[I(d(void 0!==t.label?t.label:String.fromCharCode(n+97).toUpperCase()),1)]),{},!0)],4)))),128))])])):i("",!0)));S.render=z,S.__scopeId="data-v-28265d49";const j={name:"ATableModal",props:{event:{type:MouseEvent,required:!1},colIndex:{type:Number,required:!1,default:0},rowIndex:{type:Number,required:!1,default:0},tableid:{type:String,required:!1,default:()=>{}}},data:()=>({modal:{left:"",top:"",width:"",parent:""},isVisible:!1}),methods:{handleInput(e){e.stopPropagation()},clickOutside(e){console.log("click outside"),this.modal.parent.contains(e.target)?e.stopPropagation():(console.log("click outside"),this.isVisible=!1),e.target.blur()}},watch:{event(){if(console.log("event",this.$props.event),void 0!==this.$props.event){this.isVisible=!0;const e=this.$props.event.target.getBoundingClientRect();this.modal.left=e.left+"px",this.modal.top=e.top+e.height+"px",this.modal.width=e.width+"px",this.modal.parent=this.$props.event.target,window.addEventListener("click",this.clickOutside)}}}},K=w("data-v-8ff36780")(((e,t,n,o,d,i)=>a((l(),r("div",{ref:"amodal",class:"amodal",style:{left:d.modal.left,top:d.modal.top,width:d.modal.width},tabindex:"-1",onClick:t[1]||(t[1]=(...e)=>i.handleInput&&i.handleInput(...e)),onInput:t[2]||(t[2]=(...e)=>i.handleInput&&i.handleInput(...e))},[s(e.$slots,"default",{},void 0,!0)],36)),[[c,d.isVisible]])));j.render=K,j.__scopeId="data-v-8ff36780";const W=n({name:"ATable",components:{ATableModal:j,ARow:M,ATableHeader:S,ACell:P},props:{columns:{type:Array,required:!0},rows:{type:Array,required:!1,default:()=>[]},config:{type:Object,default:()=>({})},tableid:{type:String,default:()=>{}}},setup(e,t){let n=new O(e.id,e.columns,e.rows,e.config);y(n.id,n);function o(e){const t=e.target.cellIndex,o=e.target.parentElement.rowIndex,a=e.target.parentElement.parentElement;let l;a.rows.length!==o?(l=a.rows[o].cells[t],!0===n.config.treeView&&!1===n.display[o].open&&n.toggleRowExpand(o-1)):l=e.target,$((function(){l.focus()}))}function a(e){const t=e.target.cellIndex,o=e.target.parentElement.rowIndex,a=e.target.parentElement.parentElement;let l;1!==o?(l=a.rows[o-2].cells[t],!0===n.config.treeView&&!1===n.display[o-2].open&&n.toggleRowExpand(n.display[o-2].parent)):l=e.target,$((function(){l.focus()}))}function l(e){let t;const o=e.target.cellIndex,a=e.target.parentElement.rowIndex,l=e.target.parentElement.parentElement;l.rows[a-1].cells.length-1===o?l.rows.length===a?t=l.rows[0].cells[!0===n.zeroColumn?1:0]:(t=l.rows[a].cells[!0===n.zeroColumn?1:0],!0===n.config.treeView&&!1===n.display[a].open&&n.toggleRowExpand(a-1)):t=l.rows[a-1].cells[o+1],$((function(){t.focus()}))}function r(e){let t;const o=e.target.cellIndex,a=e.target.parentElement.rowIndex,l=e.target.parentElement.parentElement;if(o===(!0===n.zeroColumn?1:0)){if(1===a)return;t=l.rows[a-2].cells[l.rows[a-2].cells.length-1],n.toggleRowExpand(a-2)}else t=l.rows[a-1].cells[o-1];t.focus()}var d=p({event:void 0,colIndex:void 0,rowIndex:void 0,component:"",tableid:n.id});return{TableData:n,v4:V,formatCell:function(e,t,o){let a;if(e?a=e.target.cellIndex+(!0===n.zeroColumn?-1:0):t&&o&&(a=n.columns.indexOf(t)),t||!("format"in n.columns[a]))return o&&"format"in t?t.format(o):(o&&t.type.toLowerCase(),o);e.target.innerHTML=n.columns[a].format(e.target.innerHTML)},enterNav:function(e){e.preventDefault(),e.stopPropagation(),!0===e.shiftKey?a(e):o(e)},tabNav:function(e){e.preventDefault(),e.stopPropagation(),!0===e.shiftKey?r(e):l(e)},downArrowNav:function(e){!0!==e.shiftKey&&(e.preventDefault(),e.stopPropagation(),o(e))},upArrowNav:function(e){!0!==e.shiftKey&&(e.preventDefault(),e.stopPropagation(),a(e))},leftArrowNav:function(e){!0!==e.shiftKey&&(e.preventDefault(),e.stopPropagation(),r(e))},rightArrowNav:function(e){!0!==e.shiftKey&&(e.preventDefault(),e.stopPropagation(),l(e))},homeNav:function(e){let t;const o=e.target.cellIndex,a=e.target.parentElement.rowIndex,l=e.target.parentElement.parentElement;o!==(!0===n.config.numberedRows?1:0)&&(t=l.rows[a-1].cells[!0===n.zeroColumn?1:0],t.focus())},endNav:function(e){let t;const o=e.target.cellIndex,a=e.target.parentElement.rowIndex,l=e.target.parentElement.parentElement;l.rows[a-1].cells.length-1!==o&&(t=l.rows[a-1].cells[n.columns.length-(!0===n.zeroColumn?0:1)],t.focus())},prevCell:r,nextCell:l,upCell:a,downCell:o,moveCursorToEnd:function(e){e.focus(),document.execCommand("selectAll",!1,null),document.getSelection().collapseToEnd()},modal:d}}}),U=w("data-v-4413ae5c");g("data-v-4413ae5c");const F={class:"atable"};h();const B=U(((e,t,n,o,a,d)=>{const i=T("ATableHeader"),c=T("ACell"),p=T("ARow"),u=T("ATableModal");return l(),r("table",F,[s(e.$slots,"tableheader",{},(()=>[b(i,{columns:e.TableData.columns,config:e.TableData.config,tableid:e.TableData.id},null,8,["columns","config","tableid"])]),{},!0),b("tbody",null,[(l(!0),r(x,null,v(e.TableData.rows,((t,n)=>(l(),r(p,{key:t.id||e.v4(),row:t,rowIndex:n,tableid:e.TableData.id},{default:U((()=>[(l(!0),r(x,null,v(e.TableData.columns,((t,o)=>(l(),r(c,{key:o,tableid:e.TableData.id,col:t,tabindex:"0",spellcheck:"false",rowIndex:n,colIndex:o+Number(!0===e.TableData.zeroColumn?0:-1),style:{"text-align":void 0!==t.align?t.align.toLowerCase():"center","min-width":void 0!==t.width?t.width:"40ch"}},null,8,["tableid","col","rowIndex","colIndex","style"])))),128))])),_:2},1032,["row","rowIndex","tableid"])))),128))]),s(e.$slots,"footer",{},void 0,!0),b(u,{colIndex:e.TableData.modal.colIndex,rowIndex:e.TableData.modal.rowIndex,event:e.TableData.modal.event,tableid:e.TableData.id,style:{"{border":"1px solid var(--brand-color)"}},{default:U((()=>[(l(),r(f(e.TableData.modal.component),{colIndex:e.TableData.modal.colIndex,rowIndex:e.TableData.modal.rowIndex,event:e.TableData.modal.event,tableid:e.TableData.id},null,8,["colIndex","rowIndex","event","tableid"]))])),_:1},8,["colIndex","rowIndex","event","tableid"])])}));W.render=B,W.__scopeId="data-v-4413ae5c";var G={install:function(e,t){e.component("ATable",W),e.component("ATableHeader",S),e.component("ATableModal",j)}};export{G as default};
