$r.package("app").Class("SectionContainer").extends("Component")(function(){

    this.skinClass = "app.SectionContainerSkinSmall";

    var _menuDataProvider;

    this.get("menuDataProvider", function(){

        return _menuDataProvider
    })
    this.set("menuDataProvider", function(value){

        _menuDataProvider = value;
    })

    var _selectedMenuItem = null;
    this.get("selectedMenuItem", function(){

        return _selectedMenuItem
    })
    this.set("selectedMenuItem", function(value){

        _selectedMenuItem = value;
        if(_selectedMenuItem !== null)
        {
            this.currentState = _selectedMenuItem.state;
        }

        if(this.sectionHeaderLabel)
        {
            this.sectionHeaderLabel.textContent = _selectedMenuItem.label;
        }
    })


    this.sectionHeaderLabel = null;

    this.skinParts = [{id:"sectionHeaderLabel", required:false}]

    this.partAdded = function(partName,instance){
        this.super.partAdded(partName,instance);

        if(instance === this.sectionHeaderLabel)
        {
            if(_selectedMenuItem)
                this.sectionHeaderLabel.textContent = _selectedMenuItem.label;
        }

    }



});
