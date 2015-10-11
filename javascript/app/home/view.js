// # HomeView

define(function (require) {
    'use strict';

    // @includes
    var $           = require('jquery');
    var Dispatcher  = require('dispatcher');
    var Marionette  = require('backbone.marionette');
    var TweenMax    = require('tweenmax');

    // @components
    var Store       = require('home/store');
    var Template    = require('requireText!home/template.html');

    // @children
    var HomeViewHero = require('home/view/hero');

    // CLASS //////////////////////////////////////////////////////////////////
    var HomeView = Marionette.LayoutView.extend({

        name : 'HomeView',

        template: _.template(Template),

        initialize : function(){

            this.$el.attr('id', this.name + '_el');

            this.model = Store;

            this.addModelEvents();
        },

        onAttach : function(){

            this.$window = $(window);

            this.addWindowEvents();

            Dispatcher.dispatch({action:'module:opened:home'});
        },

        onDestroy : function(){

            Dispatcher.dispatch({action:'module:closed:home'});
        },

        // REGIONS ////////////////////////////////////////////////////////////
        regions : {

            'hero' : '#page-home-hero'
        },

        // MODEL EVENTS ///////////////////////////////////////////////////////
        addModelEvents : function(){

            var _this = this;

            for (var evt in this.modelEvents){
                this.listenTo( this.model, evt,  this[ this.modelEvents[evt] ] );
            }
        },

        modelEvents: {
            'render:children' : 'onRenderChildren'
        },

        onRenderChildren : function(){

            if (this.getRegion('hero')) {
                this.showChildView('hero', new HomeViewHero());
            }
        },

        // UI EVENTS //////////////////////////////////////////////////////////

        addWindowEvents : function(){
            var _this = this;

            this.$window.on('resize', function(){ _this.onResize(); });
        },

        events: {},

        onResize : function(){

            /*var _this = this;

            this.$el.css({
                width : _this.$window.width(),
                height: _this.$window.height()
            });*/
        }


    });

    return HomeView;
});