var Song = Backbone.Model.extend({

  localStorage: new Backbone.LocalStorage("songs-backbone"),

  defaults: function(){
    return {
      title: "The Best Song Ever",
      artist: "Tenacious D",
      starred: false
    }
  },

  toggle: function(){
    this.save({starred: !this.get("starred")})
  }

})

var Album = Backbone.Collection.extend({

  model: Song,

  localStorage: new Backbone.LocalStorage("albums-backbone")

})

var SongView = Backbone.View.extend({
  
  tagName: "li",

  template: _.template($("#song-show-template").html()),

  editTemplate: _.template($("#song-edit-template").html()),

  events: {
    "click #save"   : "saveSong",
    "click #edit"   : "editSong"
  }, 

  initialize: function(){
    this.render();
  },

  render: function(){
    this.$el.html( this.editTemplate({song: this.model}) )
  },

  saveSong: function(){
    that = this
    this.model.save({title: that.$("#title").val(), artist:  that.$("#artist").val()});
    this.$el.html( this.template({song: this.model}) )
  },

  editSong: function(){
    this.$el.html( this.editTemplate({song: this.model}) )
  }

})


var albumView = Backbone.View.extend({

  events: {
    "click #remove" : "removeItem",
    "click #add-song"  : "addSong"
  },

  initialize: function(){
    this.render();
  },

  render: function(){
    var template = _.template( $("#album-template").html(), {} );
    $(this.$el).html( template );
    this.addSong()
  },

  removeItem: function(e){
    $(e.currentTarget).parent().remove()
  },

  addSong: function(){
    var songView = new SongView({model: new Song})
    this.$(".album").append(songView.$el)
  }

})

$(document).ready(function(){
  new albumView({el: $("#container")});
})
