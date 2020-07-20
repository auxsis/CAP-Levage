
/*$( document ).ready(function() {

    $('.o_searchview_input').val('01');
    $('.o_searchview_input').change();
});
*/

/*
odoo.define('custom_treeview_colors.ListView', function(require) {
   "use strict";

   var listView = require ('web.ListView');

console.log('pouet');
console.log($('.o_searchview_input'));
});

odoo.certification = function (instance) {
    instance.web.list.columns.add('field.my_widget', 'instance.certification.my_widget');
    instance.certification.my_widget = instance.web.list.Column.extend({
        _format: function (row_data, options) {
            res = this._super.apply(this, arguments);
            console.log('res: ' + res);
            //return "<font color='#ff0000'>" +res+"</font>";
            return 'toto';
        }
    });
    //
    //here you can add more widgets if you need, as above...
    //
};*/



/*odoo.certification  = function(instance) {

    instance.certification.FieldStatut = instance.web.form.AbstractField.extend({

        init: function() {
            this._super.apply(this, arguments);
            this.set("value", "");
        },

        render_value: function() {
            val       = this.get("value");
            console.log('val: ' + val);
            //minutes   = val % 60;
            //hours     = Math.round((val - minutes) / 60);


 this.$el.text(val + ' pouet');
            //this.$el.text(hours + "h" +  minutes);
        },

    });

    instance.web.form.widgets.add('my_widget', 'instance.certification.FieldStatut');
};*/