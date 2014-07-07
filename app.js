
//skins for small Screens
$r.package("app").skins(

        {skinClass:'AppSkinSmall', skinURL:"appSkinSmall.html"},
        {skinClass:'SectionContainerSkinSmall', skinURL:"views/base/sectionContainerSkinSmall.html"}
)

$r.package("app").skins(

        {skinClass:'AppSkin', skinURL:"appSkin.html"},
        {skinClass:'MenuItemRendererSkin', skinURL:"views/base/menuItemRendererSkin.html"},
        {skinClass:'SectionContainerSkin', skinURL:"views/base/sectionContainerSkin.html"},
        {skinClass:'AboutMeSectionSkin', skinURL:"views/sections/aboutMeSectionSkin.html"},
        {skinClass:'MyWorkSectionSkin', skinURL:"views/sections/myWorkSectionSkin.html"},
        {skinClass:'ResumeSectionSkin', skinURL:"views/sections/resumeSectionSkin.html"}
)

$r.Application("profileWebsite", function(){

    var menuDataProvider= [{state:'aboutme',label:'About Me', hash:"#aboutme"},
        {state:'mywork',label:'My Work', hash:"#mywork"},
        {state:'resume',label:'Resume', hash:"#resume"}]

    var isTouchDevice = $r.supportsTouch;

    //binding functions so the have this as context
    var handleMenuSelectionChanged = this.bind(handleMenuSelectionChangedFn),
            handleHamburgerClicked = this.bind(handleHamburgerClickedFn),
            handleResize = this.bind(handleResizeFn),
            toggleOpenState = this.bind(toggleOpenStateFn),
            handleSectionContainerClicked = this.bind(handleSectionContainerClickedFn),
            locationHashChanged = this.bind(locationHashChangedFn)

    this.mainMenu = null;
    this.sectionContainer = null;
    this.hamburger = null;
    this.sectionHeaderLabel = null;

    this.skinParts = [{id:"mainMenu", required:false},
        {id:"sectionHeaderLabel", required:false},
        {id:"sectionContainer", required:false},
        {id:"hamburger", required:false}];


    var _selectedMenuItem = null;

    this.init = function(){

        this.super.init();
        this.skinClass = "";

        window.addEventListener("resize", handleResize);

        _selectedMenuItem = getSelectedMenuItemBasedOnHash(window.location.hash);

        if(_selectedMenuItem === null)
        {
            _selectedMenuItem = menuDataProvider[0];
            window.location.hash = _selectedMenuItem.hash;
        }

        window.onhashchange = this.bind(locationHashChanged, this);


    }

    this.initialize = function(){
        this.super.initialize();
        var event = new $r.Event("resize");
        window.dispatchEvent(event.getEventObject());

    }


    this.partAdded = function(partName, instance){
        this.super.partAdded(partName,instance)

        if(instance === this.mainMenu)
        {
            this.mainMenu.dataProvider = new $r.Collection(menuDataProvider);
            this.mainMenu.selectedItem = _selectedMenuItem
            this.mainMenu.addEventListener($r.IndexChangeEvent.CHANGE, handleMenuSelectionChanged);
        }

        if(instance === this.sectionContainer)
        {
            this.sectionContainer.menuDataProvider = new $r.Collection(menuDataProvider);
            this.sectionContainer.selectedMenuItem = _selectedMenuItem;
            if(isTouchDevice)
                this.sectionContainer.addEventListener("touchstart", handleSectionContainerClicked)
            else
                this.sectionContainer.addEventListener("click", handleSectionContainerClicked)
        }

        if(instance === this.hamburger)
        {
            if(isTouchDevice)
            {
                this.hamburger.addEventListener("touchstart", handleHamburgerClicked)
            }
            else
               this.hamburger.addEventListener("click", handleHamburgerClicked)
        }

        if(instance === this.sectionHeaderLabel)
        {
            if(_selectedMenuItem)
            {
                this.sectionHeaderLabel.textContent = _selectedMenuItem.label;
            }
        }


    }

    function locationHashChangedFn(){

        if(_selectedMenuItem && _selectedMenuItem.hash !== window.location.hash)
        {
           var tempSelectedMenuItem =  getSelectedMenuItemBasedOnHash(window.location.hash);

            if(tempSelectedMenuItem !== null)
            {
                this.mainMenu.selectedItem = tempSelectedMenuItem;
                handleMenuSelectionChanged();
            }
        }
    }

    function handleSectionContainerClickedFn(event){

        this.currentState = "";
    }

    function handleResizeFn(event){
        if(this[0].offsetWidth <= 1024)
        {
            this.skinClass = "app.AppSkinSmall";
        }
        else
        {
            this.skinClass = "app.AppSkin";
        }
    }

    function handleHamburgerClickedFn(event){

        toggleOpenState();

    }
    function handleMenuSelectionChangedFn(event){

        _selectedMenuItem = this.mainMenu.selectedItem;
        this.sectionContainer.selectedMenuItem = _selectedMenuItem;

        if(this.hasState("sidebaropen") && this.currentState == "sidebaropen")
        {
            this.currentState = "";
        }

        if(this.sectionHeaderLabel && _selectedMenuItem)
            this.sectionHeaderLabel.textContent = _selectedMenuItem.label;

        window.location.hash = _selectedMenuItem.hash;

    }

    function toggleOpenStateFn(){


        if(this.hasState("sidebaropen"))
        {
            if(this.currentState === "sidebaropen")
                this.currentState = "";
            else
                this.currentState = "sidebaropen"
        }
    }

    function getSelectedMenuItemBasedOnHash(hash){

        for(var i=0; i< menuDataProvider.length; i++)
        {
            if(menuDataProvider[i].hash === hash)
            {
                return menuDataProvider[i];
            }
        }

        return null;
    }

})