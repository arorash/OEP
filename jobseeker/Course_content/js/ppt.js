



(function ($, window) {
    $.fn.ppt = function(options) {
        var _this = this;
        var $this = $(this);
        var i = 1;
        var count1 = sessionStorage.getItem("count1");
        return this.each(function() {
            var defaultValue = {
                activeIndex: 0,
                width: 692,
                height: 450,
                tipsTitle: 'Loading...',
                imageUrl: [{
                    src: 'content/CybersecurityPPT/CybersecurityPPT_0000001.jpg'
                }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000002.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000003.jpg'
                    }, {
                    
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000004.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000005.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000006.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000007.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000008.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000009.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000010.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000011.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000012.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000013.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000014.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000015.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000016.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000017.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000018.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000019.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000020.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000021.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000022.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000023.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000024.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000025.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000026.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000027.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000028.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000029.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000030.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000031.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000032.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000033.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000034.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000035.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000036.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000037.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000038.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000039.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000040.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000041.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000042.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000043.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000044.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000045.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000046.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000047.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000048.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000049.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000050.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000051.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000052.jpg'
                    }, {
                        src: 'content/CybersecurityPPT/CybersecurityPPT_0000053.jpg'
                    },]
            }

            _this.opt = $.extend(defaultValue, options || {});
            _this.isFull = false;
            _this.screenW = window.screen.width;
            _this.screenH = window.screen.height;

            
            _this.initTransW = 0;
            _this.initExitScreenW = 0;
            _this.initExitScreenH = 0;

            _this.intiDom = function() {
                _this.pptContent = $('<div class="ppt_content"></div>').css({
                    width: _this.opt.width,
                    height: _this.opt.height
                }).appendTo($this);
                _this.pptTips = $('<div class="tips-info">' + _this.opt.tipsTitle + '</div>').appendTo(_this.pptContent);
                _this.pptConfig = $('<div class="ppt_config"></div>').appendTo(_this.pptContent);
                _this.pptProgress = $('<div class="ppt_progress"></div>').appendTo(_this.pptConfig);
                _this.pptFull = $('<i class="icon-fullscreen full_ppt"></i>').appendTo(_this.pptConfig);
                _this.pptPrev = $('<i class="icon-left ppt_prev"></i>').appendTo(_this.pptProgress);
                _this.pptProgressDetail = $('<div class="ppt_progress_detail"></div>').appendTo(_this.pptProgress);
                _this.pptCurrentIndex = $('<span class="current">' + (_this.opt.activeIndex + 1) + '</span>').appendTo(_this.pptProgressDetail);
                _this.pptSplitOf = $('<span class="p_center"> of </span>').appendTo(_this.pptProgressDetail);
                _this.pptLength = $('<span class="length">' + _this.opt.imageUrl.length + '</span>').appendTo(_this.pptProgressDetail);
                _this.pptNext = $('<i class="icon-right ppt_next"></i>').appendTo(_this.pptProgress);
                _this.pptImageList = $('<div class="ptt_image_lists"></div>').css({
                    width: _this.opt.width * _this.opt.imageUrl.length,
                    height: _this.opt.height
                }).appendTo(_this.pptContent);
                for (var i = 0; i < _this.opt.imageUrl.length; i++) {
                    $('<img class="ppt_list" src=' + _this.opt.imageUrl[i].src + '>').css({
                        width: _this.opt.width,
                        height: _this.opt.height
                    }).appendTo(_this.pptImageList);
                }
            }


            _this.initEvent = function() {
                _this.pptPrev.on('click', function () {
                    if (i > 1) {
                        i = i - 1;
                    }
                    _this.opt.activeIndex--;
                    _this.opt.activeIndex = _this.opt.activeIndex < 0 ? 0 : _this.opt.activeIndex
                    _this.translateInfo(_this.opt.activeIndex)
                })
                _this.pptNext.on('click', function () {
                    
                    i = i + 1;
                    if (i <= _this.opt.imageUrl.length) {
                        if (i > count1) {
                            count1 = i;
                            $.ajax({
                                type: "POST",
                                url: "../courses_c.aspx/incr_count1",
                                data: "{'user_id':'" + sessionStorage.getItem("user__id") + "','count1':'" + i + "'}",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (msg) {

                                },
                                error: function (msg) {
                                    alert("error");
                                }
                            });

                        }
                    }
                    else {
                        i = i - 1;
                    }
                    _this.opt.activeIndex++;
                    _this.opt.activeIndex = _this.opt.activeIndex > _this.opt.imageUrl.length - 1 ? _this.opt.imageUrl.length - 1 : _this.opt.activeIndex
                    _this.translateInfo(_this.opt.activeIndex)
                })
                _this.pptFull.on('click', function() {
                    if (_this.isFull) {
                        _this.exitFullscreen();
                    } else {
                        _this.initExitScreenW = _this.pptContent.width();
                        _this.initExitScreenH = _this.pptContent.height();
                        _this.launchFullScreen(_this.pptContent[0]);
                    }
                })

                _this.screenChangeEvent()
            }

            _this.translateInfo = function(index, width) {
                // var initwidth = 0
                // if(_this.isIE910) {
                //  var IEWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
                //  initwidth = IEWidth
                // }
                // initwidth = _this.isFull ? _this.screenW : this.opt.width
                var initwidth = width ? width : _this.initTransW || this.opt.width
                _this.initTransW = initwidth
                var trans = initwidth * index * -1
                _this.pptImageList.css({
                    '-webkit-transform': 'translate(' + trans + 'px, 0)',
                    '-moz-transform': 'translate(' + trans + 'px, 0)',
                    '-ms-transform': 'translate(' + trans + 'px, 0)',
                    transform: 'translate(' + trans + 'px, 0)'
                })
                _this.pptCurrentIndex.text(index + 1);
            }

            
            _this.setSize = function(width, height, isfull) {
                
                // _this.initExitScreenW = _this.pptContent.width();
                // _this.initExitScreenH = _this.pptContent.height();
                if (!isfull) {
                    
                    _this.initExitScreenW = _this.pptContent.width();
                    _this.initExitScreenH = _this.pptContent.height();
                }

                _this.initTransW = height ? height : _this.initTransW
                var transWidth = width
                _this.pptContent.css({
                    width: width,
                    height: height
                })
                _this.pptImageList.css({
                    width: width * _this.opt.imageUrl.length,
                    height: height
                })

                _this.pptImageList.find('img').css({
                    width: width,
                    height: height
                })
                _this.initTransW = height

              
                _this.translateInfo(this.opt.activeIndex, transWidth);
            }

            _this.setPPTImage = function(data) {
                _this.opt.imageUrl = data
                _this.pptLength.text(data.length)
                _this.pptImageList.children().remove();
                for (var i = 0; i < data.length; i++) {
                    $('<img class="ppt_list" src=' + data[i].src + '>').css({
                        width: _this.pptContent.width(),
                        height: _this.pptContent.height()
                    }).appendTo(_this.pptImageList);
                }
                this.opt.activeIndex = 0
                _this.setSize(_this.pptContent.width(), _this.pptContent.height())
            }

            _this.launchFullScreen = function(element) {
                if (_this.isIE910) {
                    this.launchFullScreenIE11L();
                } else {
                    
                    if (element.requestFullscreen) {
                        element.requestFullscreen()
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen()
                    } else if (element.webkitRequestFullscreen) {
                        element.webkitRequestFullscreen()
                    } else if (element.msRequestFullscreen) {
                        element.msRequestFullscreen()
                    }
                    _this.launchFullScreenStyle(element)
                }
            }

            _this.launchFullScreenIE11L = function() {
                _this.updateFullScreenState(true, true)
                var IEHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
                var IEWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
                _this.pptContent.addClass('ie-fullscreen')
                document.body.style.overflow = 'hidden'
                _this.setSize(IEWidth, IEHeight, true)
            }

            
            _this.launchFullScreenStyle = function(element) {
                _this.updateFullScreenState(true)
                _this.setSize(_this.screenW, _this.screenH, true)
            }

            _this.updateFullScreenState = function(bool, iebool) {
                _this.isFull = bool || false
                    
                var iconClassName = _this.isFull ? 'full_ppt icon-canclefullscreen' : 'full_ppt icon-fullscreen'
                 
                var title = _this.isFull ? '取消全屏' : '全屏'
                _this.pptFull.attr('class', iconClassName)
                _this.pptFull.attr('title', title)
                   
                var PPTClassName = _this.isFull ? 'ppt_content full' : 'ppt_content'

                PPTClassName = iebool ? PPTClassName + ' ie-fullscreen' : PPTClassName
                _this.pptContent.attr('class', PPTClassName)
            }

            _this.exitFullscreen = function() {
                if (this.isIE910) {
                    // this.isFull = true
                    this.exitFullscreenIE11L();
                } else if (_this.browserV.indexOf('IE11') >= 0) {
                    
                    this.exitFullScreenStyle()
                } else {
                    
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.mozExitFullScreen) {
                        document.mozExitFullScreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                }
            }

            _this.exitFullscreenIE11L = function() {
                _this.updateFullScreenState(false)
                _this.pptContent.removeClass('ie-fullscreen')
                _this.setSize(_this.initExitScreenW, _this.initExitScreenH)
                document.body.style.overflow = 'auto'
            }

            _this.exitFullScreenStyle = function() {
                if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                _this.updateFullScreenState(false)
                _this.setSize(_this.initExitScreenW, _this.initExitScreenH)
            }

            
            _this.screenChangeEvent = function(element) {
                var _this = this
                if (_this.browserV.indexOf('IE11') >= 0) {
                    document.onkeyup = function(e) {
                        var keyNum = window.event ? e.keyCode : e.which
                        if (keyNum === 27 && _this.isFull) {
                            
                            _this.exitFullScreenStyle()
                        }
                    }
                } else if (_this.isIE910) {
                    document.onkeyup = function(e) {
                        var keyNum = window.event ? e.keyCode : e.which
                        if (keyNum === 27 && _this.isFull) {
                          
                            _this.exitFullscreenIE11L()
                        }
                    }
                } else {
                    var eventList = ['webkitfullscreenchange', 'mozfullscreenchange', 'fullscreenchange', 'msfullscreenchange']
                    for (var i = 0; i < eventList.length; i++) {
                        document.addEventListener(eventList[i], function(e) {
                            
                            var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement

                            
                            var isFullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen || document.msIsFullScreen

                            if (!fullscreenElement) {
                                if (_this.pptContent.hasClass('full')) {
                                    _this.exitFullScreenStyle()
                                }
                            }
                        })
                    }
                }
            }

            _this.browserVersion = function() {
                var userAgent = navigator.userAgent,
                    rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
                    rFirefox = /(firefox)\/([\w.]+)/,
                    rOpera = /(opera).+version\/([\w.]+)/,
                    rChrome = /(chrome)\/([\w.]+)/,
                    rSafari = /version\/([\w.]+).*(safari)/;
                var browser;
                var version;
                var ua = userAgent.toLowerCase();

                function uaMatch(ua) {
                    var match = rMsie.exec(ua);
                    if (match != null) {
                        return {
                            browser: "IE",
                            version: match[2] || "0"
                        };
                    }
                    var match = rFirefox.exec(ua);
                    if (match != null) {
                        return {
                            browser: match[1] || "",
                            version: match[2] || "0"
                        };
                    }
                    var match = rOpera.exec(ua);
                    if (match != null) {
                        return {
                            browser: match[1] || "",
                            version: match[2] || "0"
                        };
                    }
                    var match = rChrome.exec(ua);
                    if (match != null) {
                        return {
                            browser: match[1] || "",
                            version: match[2] || "0"
                        };
                    }
                    var match = rSafari.exec(ua);
                    if (match != null) {
                        return {
                            browser: match[2] || "",
                            version: match[1] || "0"
                        };
                    }
                    if (match != null) {
                        return {
                            browser: "",
                            version: "0"
                        };
                    }
                }
                var browserMatch = uaMatch(userAgent.toLowerCase());
                if (browserMatch.browser) {
                    browser = browserMatch.browser;
                    version = browserMatch.version;
                }
                return browser + version
            }

            _this.browserV = _this.browserVersion()
            _this.isIE910 = (_this.browserV.indexOf('IE10') >= 0 || _this.browserV.indexOf('IE9') >= 0)
            _this.intiDom();
            _this.initEvent();
        })
    }
})(jQuery, window);