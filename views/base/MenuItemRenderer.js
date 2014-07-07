$r.package("app").Class("MenuItemRenderer").extends("ListItemRenderer")(function(){

    this.skinClass = "app.MenuItemRendererSkin";

    this.menuLabel = null;
    this.skinParts = [{id:"menuLabel", required:false}]

    this.set("data", function(value){

        if(value !== null)
        {
            this.super.data  = value;
            if(this.menuLabel)
                this.menuLabel.textContent = value.label;
        }
    })

    this.partAdded = function(partName, instance)
    {
        "use strict";
        if(instance === this.menuLabel)
        {
            if(this.data)
                this.menuLabel.textContent = this.data.label;
        }
    }

});
