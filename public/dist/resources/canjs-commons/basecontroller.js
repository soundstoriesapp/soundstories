define(["can","canjs-commons/functions","jquery","can/construct/super"],function(e,n,t){return e.Control.extend({},{init:function(e,n){},render:function(){var e=this;return this._preRenderPhase().done(function(){e._postRenderPhase()})},_preRenderPhase:function(){var r=this,o=(r.element,t.Deferred()),i=r.getData(r.options)||{};return t.when(n.dfdMap(i)).done(function(n){return r.element?(e.extend(r.options,n),r.options=new e.Map(r.options),void t.when(r.preRender(r.options)).done(function(){o.resolve()})):void o.fail()}).fail(function(){o.fail()}),o.promise()},_postRenderPhase:function(){var e=this,n=this.element;n.html(e.template(e.options)),e.postRender(e.options),n.addClass("controller"),n.trigger("rendered")},reRender:function(){return this.render()},getData:function(){return{}},preRender:function(e){},postRender:function(e){},destroy:function(){this.element&&this.element.removeClass("controller"),this._super()}})});