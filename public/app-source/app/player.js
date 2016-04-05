
define([
        
        
         'can/model'
         
         ], function() {
	
can.Model('Player',{
		
	},{
		
		progress : '',
		
		setStory : function(story){
			if(this.story){
				if(this.story._id == story._id){
					return;
				}
				this.story.clearPlaying();
			}
			this.attr('story', story);
			var audio = this.audio;
			
			audio.pause();
			audio.setAttribute('src', '/mp3/' + story._id);
			audio.load();

			
		},
		
		setTime : function(percent){
			var audio =  this.audio;
			var newTime = audio.duration * percent / 100;
			
			
			this.audio.currentTime = newTime;
		},
		
		playStory : function(story){
			this.setStory(story);
			this.play();
		},
		play : function(){
			this.story.attr('playing', true);
			this.audio.play();
			
			
		},
		pause : function(){
			this.story.attr('playing', false);
			this.audio.pause()
		},
		initPlayer : function(){
			var self = this;
			var audio = $('.audioplayer').get(0);
			this.audio = audio;
			audio.addEventListener('timeupdate', function(evt) {
				self.story.setTime(audio.currentTime, audio.duration);
				
				//console.log(audio.currentTime + " " + audio.duration);
			});
			
		}
	})
	
});
