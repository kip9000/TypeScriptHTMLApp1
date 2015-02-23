/// <reference path="knockout.d.ts"/>
/// <reference path="jquery.d.ts" />

module ViewModels {
    export class ItemViewModel {
        public Name: KnockoutObservable<string>;

        constructor(name: string) {
            this.Name = ko.observable(name);
        }//constructor
    }

    export class MainViewModel {
        public SelectedItem: KnockoutObservable<ItemViewModel>;
        public Items: KnockoutComputed<Array<ItemViewModel>>;

        constructor() {
            this.SelectedItem = ko.observable<ItemViewModel>();
            this.Items = ko.computed({
                owner: this,
                read: () => {
                    return this.get_items();
                }
            });
        }

        //TODO: replace this with knockout.mapping plugin transforms
        private convert_from_model(items_model) {
            var arr = new Array<ItemViewModel>();
            var owner = this;
            items_model.forEach(function (item) {
                var d = new ItemViewModel(item.name);
                arr.push(d);
            });
            return arr;
        }

        private get_items(): Array<ItemViewModel> {
            var items = [{ "name": "AAAA" }, { "name": "BBBB" }, { "name": "CCCC" }, { "name": "DDDD" }];

            var items_c = this.convert_from_model(items);
            return items_c;
        }

        public SetCurrent(item: ItemViewModel) {
            this.SelectedItem(item);
        }
    }
}

window.onload = () => {
    ko.applyBindings(new ViewModels.MainViewModel());
};