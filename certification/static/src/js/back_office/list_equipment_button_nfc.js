/*odoo.define('hr_expense.expenses.tree', function (require) {
"use strict";
    var ListController = require('web.ListController');
    var ListView = require('web.ListView');
    var DocumentUploadMixin = require('hr_expense.documents.upload.mixin');
    var viewRegistry = require('web.view_registry');

    var ExpensesListController = ListController.extend(DocumentUploadMixin, {
        buttons_template: 'ExpensesListView.buttons',
        events: _.extend({}, ListController.prototype.events, {
            'click .o_button_upload_expense': '_onUpload',
            'change .o_expense_documents_upload .o_form_binary_form': '_onAddAttachment',
        }),
    });

    var ExpensesListView = ListView.extend({
        config: _.extend({}, ListView.prototype.config, {
            Controller: ExpensesListController,
        }),
    });

    viewRegistry.add('hr_expense_tree', ExpensesListView);
});

odoo.define('account.bills.tree', function (require) {
"use strict";
    var core = require('web.core');
    var ListController = require('web.ListController');
    var ListView = require('web.ListView');
    var UploadBillMixin = require('account.upload.bill.mixin');
    var viewRegistry = require('web.view_registry');

    var BillsListController = ListController.extend(UploadBillMixin, {
        buttons_template: 'BillsListView.buttons',
        events: _.extend({}, ListController.prototype.events, {
            'click .o_button_upload_bill': '_onUpload',
            'change .o_vendor_bill_upload .o_form_binary_form': '_onAddAttachment',
        }),
    });

    var BillsListView = ListView.extend({
        config: _.extend({}, ListView.prototype.config, {
            Controller: BillsListController,
        }),
    });

    viewRegistry.add('account_tree', BillsListView);
});

odoo.define('crm.leads.tree', function (require) {
"use strict";
    var ListController = require('web.ListController');
    var ListView = require('web.ListView');

    var KanbanController = require('web.KanbanController');
    var KanbanView = require('web.KanbanView');

    var viewRegistry = require('web.view_registry');

    function renderGenerateLeadsButton() {
        if (this.$buttons) {
            var self = this;
            var lead_type = self.initialState.getContext()['default_type'];
            this.$buttons.on('click', '.o_button_generate_leads', function () {
                self.do_action({
                    name: 'Generate Leads',
                    type: 'ir.actions.act_window',
                    res_model: 'crm.iap.lead.mining.request',
                    target: 'new',
                    views: [[false, 'form']],
                    context: {'is_modal': true, 'default_lead_type': lead_type},
                });
            });
        }
    }

    var LeadMiningRequestListController = ListController.extend({
        willStart: function() {
            var self = this;
            var ready = this.getSession().user_has_group('sales_team.group_sale_manager')
                .then(function (is_sale_manager) {
                    if (is_sale_manager) {
                        self.buttons_template = 'LeadMiningRequestListView.buttons';
                    }
                });
            return Promise.all([this._super.apply(this, arguments), ready]);
        },
        renderButtons: function () {
            this._super.apply(this, arguments);
            renderGenerateLeadsButton.apply(this, arguments);
        }
    });

    var LeadMiningRequestListView = ListView.extend({
        config: _.extend({}, ListView.prototype.config, {
            Controller: LeadMiningRequestListController,
        }),
    });

    var LeadMiningRequestKanbanController = KanbanController.extend({
        willStart: function() {
            var self = this;
            var ready = this.getSession().user_has_group('sales_team.group_sale_manager')
                .then(function (is_sale_manager) {
                    if (is_sale_manager) {
                        self.buttons_template = 'LeadMiningRequestKanbanView.buttons';
                    }
                });
            return Promise.all([this._super.apply(this, arguments), ready]);
        },
        renderButtons: function () {
            this._super.apply(this, arguments);
            renderGenerateLeadsButton.apply(this, arguments);
        }
    });

    var LeadMiningRequestKanbanView = KanbanView.extend({
        config: _.extend({}, KanbanView.prototype.config, {
            Controller: LeadMiningRequestKanbanController,
        }),
    });

    viewRegistry.add('crm_iap_lead_mining_request_tree', LeadMiningRequestListView);
    viewRegistry.add('crm_iap_lead_mining_request_kanban', LeadMiningRequestKanbanView);
});*/



/*odoo.define('critt.equipment.tree', function (require) {
"use strict";
    var ListController = require('web.ListController');
    var ListView = require('web.ListView');
    var viewRegistry = require('web.view_registry');

    function renderGenerateTestUrl() {
        if (this.$buttons) {
            var self = this;
            this.$buttons.on('click', '.o_button_generate_test_url', function () {
                self.do_action({
                    'type': 'ir.actions.act_url',
                    'name': "Démarrer questionnaire",
                    'target': 'self',
                    'url': 'http://localhost:8069/test_reussi'
                });
            });
        }
    }

    var EquipmentListController = ListController.extend({
        willStart: function() {

            var self = this;
            var ready = this.getSession() //.user_has_group('sales_team.group_sale_manager')
                .then(function (is_sale_manager) {
                    if (is_sale_manager) {
                        self.buttons_template = 'EquipmentListView.buttons';
                    }
                });
            self.buttons_template = 'EquipmentListView.buttons';

            return Promise.all([this._super.apply(this, arguments), true]);
        },
        renderButtons: function () {

            this._super.apply(this, arguments);
            renderGenerateTestUrl.apply(this, arguments);
        }
    });

    var EquipmentListView = ListView.extend({
        config: _.extend({}, ListView.prototype.config, {
            Controller: EquipmentListController,
        }),
    });

    viewRegistry.add('vue_equipement_tree', EquipmentListView);



});*/

/*
odoo.define('certification.vue_equipement_tree', function (require){
"use strict";

var core = require('web.core');
var ListView = require('web.ListView');
var QWeb = core.qweb;
alert('p');
ListView.include({

        render_buttons: function($node) {
        alert('render');
                var self = this;
                this._super($node);
                    this.$buttons.find('.o_button_generate_test_url').click(this.proxy('tree_view_action'));
        },

        tree_view_action: function () {
             alert('action');
        this.do_action({
                 'type': 'ir.actions.act_url',
                'name': "Démarrer questionnaire",
                'target': 'self',
                'url': 'http://localhost:8069/test_reussi'
        });
        return { 'type': 'ir.actions.client','tag': 'reload', } }

});

});


$( document ).ready(function() {

});*/

//Cherche et ferme la webcam
function stopStreamedVideo(video){
    let stream = video.srcObject;
    let tracks = stream.getTracks();

    tracks.forEach(function(track){
        track.stop();
    });

    video.srcObject = null;
}
function addNfcModal(){
        console.log(window.location.href.indexOf('model=critt.equipment&view_type=list'));
        if(window.location.href.indexOf('model=critt.equipment&view_type=list') != -1){
                setTimeout(function(){
                        $('#scan_qr_for_list').remove();
                        $('.o_control_panel').find('.o_cp_left').find('.o_list_buttons').append('<button id="scan_qr_for_list" type="button" class="btn btn-secondary">Scan QR</button>');

                        $('#scan_qr_for_list').click(function(){
                            var video = $('#qrCodeModal').find('video')[0];
                            console.log('show modal');
                            $modalContent = $('<div></div>');
                            /*$modalContent.load( '/certification/static/src/nfcModal.html', function() {*/
                            $modalContent.load( '/certification/static/src/qrCodeModal.html', function() {
                                    $('body').append($modalContent.html());
                                    $('#qrCodeModal').modal('show');
                                    $('#qr_error').html('');
                                    $('#qrCodeOrigin').val('bo');
                                    $(window).resize();

                                    $('#qrCodeModalClose').click(function(){
                                          var video = $('#qrCodeModal').find('video')[0];
                                          stopStreamedVideo(video);
                                          $('#qrCodeModal').remove();
                                          $('.modal-backdrop').remove();
                                    });

                            });


                        });
                }, 1500);
        }
}

$( document ).ready(function() {
        window.addEventListener('hashchange', function() {
                addNfcModal();
        });
        addNfcModal();

        $(window).resize(function(){
            console.log('qrCodeModal resize BO');
            if($('#qrCodeModal').length > 0){
                var windowWidth = $(window).width();
                console.log(windowWidth);
                $('#qrCodeModal').css('width', windowWidth * .80 + 'px');
                $('#qrCodeModal').css('left', ((windowWidth * .20) / 2) + 'px');
                $('#qrCodeModal').css('top', '10%');
                $('#qrCodeModal').css('height', 'auto');
            }
            if($('#messageModalClose').length > 0){
                var windowWidth = $(window).width();
                console.log(windowWidth);
                $('#messageModalClose').css('width', windowWidth * .80 + 'px');
                $('#messageModalClose').css('left', ((windowWidth * .20) / 2) + 'px');
                $('#messageModalClose').css('top', '10%');
                $('#messageModalClose').css('height', 'auto');
            }

        });
});
