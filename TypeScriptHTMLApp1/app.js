/// <reference path="knockout.d.ts"/>
/// <reference path="jquery.d.ts" />
var ViewModels;
(function (ViewModels) {
    var ItemViewModel = (function () {
        function ItemViewModel(name) {
            this.Name = ko.observable(name);
        } //constructor
        return ItemViewModel;
    })();
    ViewModels.ItemViewModel = ItemViewModel;
    var MainViewModel = (function () {
        function MainViewModel() {
            var _this = this;
            this.SelectedItem = ko.observable();
            this.Items = ko.computed({
                owner: this,
                read: function () {
                    return _this.get_items();
                }
            });
        }
        //TODO: replace this with knockout.mapping plugin transforms
        MainViewModel.prototype.convert_from_model = function (items_model) {
            var arr = new Array();
            var owner = this;
            items_model.forEach(function (item) {
                var d = new ItemViewModel(item.name);
                arr.push(d);
            });
            return arr;
        };
        MainViewModel.prototype.get_items = function () {
            var items = [{ "name": "AAAA" }, { "name": "BBBB" }, { "name": "CCCC" }, { "name": "DDDD" }];
            var items_c = this.convert_from_model(items);
            return items_c;
        };
        MainViewModel.prototype.SetCurrent = function (item) {
            this.SelectedItem(item);
        };
        return MainViewModel;
    })();
    ViewModels.MainViewModel = MainViewModel;
})(ViewModels || (ViewModels = {}));
window.onload = function () {
    ko.applyBindings(new ViewModels.MainViewModel());
};
//# sourceMappingURL=app.js.map