define(["can/model"],function(){return can.Model.extend("BaseModel",{get:function(){return this.findOne(-1)},getAll:function(e){return this.findAll(e)},loadModels:function(e){var n=can.Deferred(),t=this;return C.jsonajax(e).done(function(e){var r=t.models(e);n.resolve(r)}),n.promise()},getOne:function(e){var n=new $.Deferred;return this.getAll().done(function(t){n.resolve(t.getOne(e))}),n.promise()}},{changedAttributes:function(){var e={},n=this.serialize();for(var t in n){var r=n[t],i=this._backupStore[t];can.Object.same(r,i)||(e[t]=r)}return e}})});