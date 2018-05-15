(() => {

  /* ------------------------
    DropDown
  ------------------------ */
  var DropDown = function($){
    // 必要な情報を定義する
    var _targetMenu,
        _openMenu,
        _menu,
        _trigger,
        _bg,
        _fadeIn,
        _fadeOut,
        _showMenu,
        _hideMenu,
        _showSetting,
        _hideSetting,
        _toggle,
        _checkWindow,
        _bgHide,
        _scroll,
        _scrollOn,
        _scrollOff,
        _clickTarget,
        _clickCount,
        _resize,
        _init = function(){
          _targetMenu = $('.js-DropdownMenu');
          _openMenu = $('.js-Dropdown-openMenu');
          _menu = $('.js-Dropdown-menu');
          _trigger = $('.js-Dropdown-trigger');
          _bg = $('.js-Dropdown-bg');
          _toggle();
          _checkWindow();
          _resize();
        }
        _resize = function(){
          $(window).on('resize', function(){
            _checkWindow();
          })
        }
        _checkWindow = function(){
          var $window_width = $(window).width();
          var $window_height = window.innerHeight;
          var breakpoint = 899;
          var _clickTarget = $('.js-Dropdown-openMenu');
          if($window_width < 899){
            _targetMenu.css('left', '-200%');
          }else{
            _targetMenu.css({
              'left': '0',
              'height': $window_height
            });

          }
        }
        _toggle = function(){
          _openMenu.on( 'click', function(){
            if($(this).hasClass('is-open')){
              _hideMenu();
            }else{
              _showMenu();
              _bgHide();
            }

          }).css('cursor', 'pointer');

        }

        _showMenu = function(){
          var $window_width = $(window).width();
          var $window_height = window.innerHeight;
          _targetMenu.css({
            'left': '0',
            'height': $window_height
          });
          $("body").css({
            "overflow": "hidden",
            "height": "100%"
          });
          _bg.show();
        }

        _hideMenu = function(){
          var $window_width = $(window).width();
          var $window_height = window.innerHeight;

          _targetMenu.css({
            'left': '-200%'
          });
          $("body").css({
            "overflow": "",
            "height": "auto"
          });
          $(".js-chatroom-body").css("overflow-y", "scroll");
          _bg.hide();
        }

        _bgHide = function(){
          var clickEventType　=　((window.ontouchstart!==null)?'click':'touchstart');
          _bg.on( clickEventType, function(){
            _hideMenu();
          });
        }
    return _init;

  }(jQuery);
  DropDown();

  /* ------------------------
    Modal
  ------------------------ */
  var Modal = function($){

    // 必要な情報を定義する
    var _modal = $('.js-Modal'),
        _modalBg = _modal.find('.js-Modal-bg'),
        _modalViewBody = _modal.find('.js-ModalView-body'),
        _modalViewOpen = _modal.find('.js-ModalView-open'),
        _modalEditTemplateBody = _modal.find('.js-ModalEditTemplate-body'),
        _modalEditTemplateOpen = _modal.find('.js-ModalEditTemplate-open'),
        _modalClose = _modal.find('.js-Modal-close'),
        _open,
        _close,
        _scrollStop,
        _scrollStart,
        _position,
        _init = function(){
          if(_modal.length == 0){
            return false;
          }
          _open();
          _close();
        }
        _open = function(){
          _modalViewOpen.on('click', function(e){
            var count = _modalViewOpen.index(this);
            _modalViewBody.fadeIn();
            _modalBg.fadeIn();
            _scrollStop();
            var posY = _modalViewBody.height();
            _position(posY, _modalViewBody);
          });
          _modalEditTemplateOpen.on('click', function(e){
            var count = _modalEditTemplateOpen.index(this);
            _modalEditTemplateBody.fadeIn();
            _modalBg.fadeIn();
            _scrollStop();
            var posY = _modalEditTemplateBody.height();
            _position(posY, _modalEditTemplateBody);
          });
        }
        _close = function(){
          _modalClose.on('click', function(){
            _modalViewBody.fadeOut();
            _modalBg.fadeOut();
            _scrollStart();
          });
          _modalClose.on('click', function(){
            _modalEditTemplateBody.fadeOut();
            _modalBg.fadeOut();
            _scrollStart();
          });
          _modalBg.on('click', function(){
            _modalViewBody.fadeOut();
            _modalEditTemplateBody.fadeOut();
            _modalBg.fadeOut();
            _scrollStart();
          });
        }
        _scrollStop = function(){
          $('body').addClass('js-no-scroll');
        }
        _scrollStart = function(){
          $('body').removeClass('js-no-scroll');
        }
        _position = function(posY, target){
          var windowHeight = $(window).height();
          if(windowHeight/2 > posY){
            target.css({
              'top':'50%',
              'margin-top': - posY/2
            });
          }
        }

    return _init;

  }(jQuery);

  Modal();


  /* ------------------------
    MediaPreview
  ------------------------ */
  var MediaPreview = function($){
    // 必要な情報を定義する
    var _file = $('.js-MediaPreview'),
        _target = $('.js-MediaPreviewTarget'),
        _init = function(){
          if(!_target){
            return false;
          }

          _file.on('change',function(){
            var file = $(this).prop('files')[0];
            if(!file.type.match('image.*')){
                return;
            }
            var fileReader = new FileReader();
            fileReader.onloadend = function() {
              _target.find('img').attr('src', fileReader.result);
            }
            fileReader.readAsDataURL(file);


            // var src = $(this).val();
            // console.log(src);
            // _target.find('img').attr('src', src);
          })
        }

    return _init;

  }(jQuery);

  MediaPreview();



  /* ------------------------
    Expand
  ------------------------ */
  var Expand = function($){
    // 必要な情報を定義する
    var _target = $('.js-Expand'),
        _button = $('.js-ExpandButton'),
        _body = $('.js-ExpandBody'),
        _init = function(){
          if(!_target){
            return false;
          }
          _body.hide();
          _button.on('click', function(){
            var count = _button.index(this);
            if( $(this).hasClass('is-open')){
              $(this).removeClass('is-open');
            }else{
              $(this).addClass('is-open');
            }
            _body.eq(count).toggle(300);
          });
        }

    return _init;

  }(jQuery);

  Expand();

  /* ------------------------
    Noticetip
  ------------------------ */
  var Tooltip = function($){
    // 必要な情報を定義する
    var _targetNotice = $('.js-Noticetip'),
        _tipNotice = $('.js-NoticetipTrigger'),
        _targetMessage = $('.js-Messagetip'),
        _tipMessage = $('.js-MessagetipTrigger'),
        _targetAcount = $('.js-Acounttip'),
        _tipAcount = $('.js-AcounttipTrigger'),
        _clickNotice,
        _clickMessage,
        _clickAcount,
        _init = function(){
          _targetNotice.hide();
          _targetMessage.hide();
          _targetAcount.hide();
          _clickNotice();
          _clickMessage();
          _clickAcount();
        }
        _clickNotice = function(){
          _tipNotice.on('click', function(){
            _targetNotice.toggle(200,function(){
              $(this).css('margin-top','5px');
            });
            _targetMessage.hide();
            _targetAcount.hide();
          })
        }
        _clickMessage = function(){
          _tipMessage.on('click', function(){
            _targetMessage.toggle(200,function(){
              $(this).css('margin-top','5px');
            });
            _targetNotice.hide();
            _targetAcount.hide();
          })
        }
        _clickAcount = function(){
          _tipAcount.on('click', function(){
            _targetAcount.toggle(200,function(){
              $(this).css('margin-top','5px');
            });
            _targetNotice.hide();
            _targetMessage.hide();
          })
        }

    return _init;

  }(jQuery);

  Tooltip();

  /* ------------------------
    ImagePreview
  ------------------------ */
  var ImagePreview = function($){

    var _init = function(){
      if(!$('#js-imagePreview')){
        return false;
      }
      $('#js-imagePreview').change(function () {
        console.log(this.files.length)
        if (!this.files.length) {
          return;
        }
        var file = $(this).prop('files')[0];
        var fr = new FileReader();
        $(this).find('.js-ImagePreviewTarget').css('background-image', 'none');
        fr.onload = function() {
          $(this).find('.js-ImagePreviewTarget').css('background-image', 'url(' + fr.result + ')');
        }
        fr.readAsDataURL(file);
        $(this).find(".js-imagePreviewBox img").css('opacity', 0);
      });
    }

    return _init;

  }(jQuery);

  ImagePreview();

  /* ------------------------
    AddCareer
  ------------------------ */
  var AddCareer = function($){

    var _button = $('.js-AddCareer-open'),
        _block = $('.js-AddCareer'),
        _target = $('.js-AddCareer-target'),
        _delete = $('.js-AddCareer-delete'),
        _clickEvent,
        _deleteEvent,
        _init = function(){
          if(!_block){
            return false;
          }
          _clickEvent();
          _deleteEvent();
        }
        _clickEvent = function(){
          _button.on('click', function(){
            _target.append('<div class="Form_careerItem js-AddCareer"><input type="text" placeholder="株式会社〇〇〇" class="Form_input"><textarea placeholder="これまでの職場での業務内容や、役割などを明確に記入しましょう。" class="Form_textarea"></textarea><div class="Form_button Form_button-delete js-AddCareer-delete">削除する</div></diV>')
            _delete = $('.js-AddCareer-delete');
            _block = $('.js-AddCareer');
            _deleteEvent();
          })
        }
        _deleteEvent = function(){
          $('.js-AddCareer-delete').on('click', function(){
            _delete = $('.js-AddCareer-delete');
            _block = $('.js-AddCareer');
            var count = _delete.index(this);
            _block.eq(count).remove();
          })
        }

    return _init;

  }(jQuery);

  AddCareer();

})()
