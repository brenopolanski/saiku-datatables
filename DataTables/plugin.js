/**
 * Saiku UI with DataTables plug-in for jQuery - v0.1.0
 *
 * Made by Breno Polanski <breno.polanski@gmail.com>
 * Under MIT License
 */
var DataTables = Backbone.View.extend({
	initialize: function(args) {
		// Keep track of parent workspace
		this.workspace = args.workspace;

		// Maintain `this` in callbacks
		_.bindAll(this, 'listener_datatables', 'datatables');

		// Listen to result event
		this.workspace.bind('query:result', this.listener_datatables);
	},

    listener_datatables: function() {
        return _.delay(this.datatables, 1000);
    },

	datatables: function() {
		$('table').attr('id', 'plugin-datatables');

		$('#plugin-datatables').DataTable({
			paging: false,
			ordering:  false
		});
	}
});

 /**
  * Start Plugin
  */
Saiku.events.bind('session:new', function() {

	// The DataTables Content Delivery Network (CDN)
	// loadJS('http://cdn.datatables.net/1.10.2/js/jquery.dataTables.min.js');

	loadJS('js/saiku/plugins/DataTables/js/jquery.dataTables.js');

	function new_workspace(args) {
		if (typeof args.workspace.dataTables === 'undefined') {
			args.workspace.dataTables = new DataTables({ workspace: args.workspace });
		}
	}

	// Add new tab content
	for (var i = 0, len = Saiku.tabs._tabs.length; i < len; i += 1) {
		var tab = Saiku.tabs._tabs[i];
		new_workspace({
			workspace: tab.content
		});
	}

	// New workspace
	Saiku.session.bind('workspace:new', new_workspace);
});
