$(document).ready(function(){
	var $block = $('#slide-show-img'),
		$slides = $('ul.list', $block),
		_width = $block.width(),
		$li = $('li', $slides),
		_animateSpeed = 600,
		timer,_showSpeed = 3000, _stop = false; //加入計時器，輪播時間及控制開關

	//產生li選項
	var _str = '';
		for(var i=0, j=$li.length; i<j; i++){
			_str +='<li class="playerControl_' + (i+1) + '"></li>';
		}
	//產生ul並把li選項加到其中
	var $playerControl = $('<ul class="playerControl"></ul>').html(_str).appendTo($slides.parent()).css('left', function(){
							return (_width - $(this).width()) / 2;  //把.playerControl移到置中位置
							});

	var $playerControlLi = $playerControl.find('li').click(function(){
		var $this = $(this);
			$this.addClass('current').siblings('.current').removeClass('current');

			clearTimeout(timer);
			$slides.stop().animate({
				left: _width * $this.index() * -1
			},
			 _animateSpeed, function(){
				if(!_stop) timer = setTimeout(move, _showSpeed);
			});

			return false;
		}).eq(0).click().end();

		//滑鼠移入時
		$block.hover(function(){
			_stop = true;
			clearTimeout(timer);
		},
		function(){
			//滑鼠移出時，開啟開關及計時器
			_stop = false;
			timer = setTimeout(move, _showSpeed);
		});

		function move(){
			var _index = $('.current').index();
			$playerControlLi.eq((_index+1) % $playerControlLi.length).click();
		}

});