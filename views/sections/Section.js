$r.package("app").Class("Section").extends("Component")(function(){

    this.skinClass = "app.SectionSkin";
    var _headerText = "";

    this.set("headerText", function(value){

        _headerText = value;

        if(this.sectionHeaderLabel)
        {
            this.sectionHeaderLabel.textContent = _headerText;
        }

    })

    this.get("headerText", function(){

        return _headerText;
    })

    this.sectionHeaderLabel = null;

    this.skinParts = [{id:"sectionHeaderLabel", required:false},
        {id:"sectionHeaderLabel", required:false}]

    this.partAdded = function(partName,instance){
        this.super.partAdded(partName,instance);

        if(instance === this.sectionHeaderLabel)
        {
            this.sectionHeaderLabel.textContent = _headerText;
        }

    }

})