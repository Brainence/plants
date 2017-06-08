var mainmenu = '<div data-role="panel" id="main-menu-panel"  data-display="push" data-theme="a"> <h2 class="menu-header">Plants</h2><ul class="list-group"><a href="#page_plants" class="menu-button"><li class="list-group-item orange-list-item">List of plants</li></a><a class="menu-button" ng-click="ScanQR()"><li class="list-group-item orange-list-item">Scan QR</li></a><a href="#page_about" class="menu-button"><li class="list-group-item orange-list-item">About</li></a></ul> </div>';

$(document).one('pagebeforecreate', function () {
    $.mobile.pageContainer.append(mainmenu);
    $("#main-menu-panel").panel();
});

$(document).on("pageinit", "#demo-page", function() {
    $(document).on("swipeleft swiperight", "#index", function(e) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ($.mobile.activePage.jqmData("panel") !== "open") {
            if (e.type === "swipeleft") {
                $("#right-panel").panel("open");
            } else if (e.type === "swiperight") {
                $("#left-panel").panel("open");
            }
        }
    });
});