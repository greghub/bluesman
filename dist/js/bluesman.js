(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Bluesman = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GuitarBuffer =
/*#__PURE__*/
function () {
  function GuitarBuffer(context, urls) {
    _classCallCheck(this, GuitarBuffer);

    this.context = context;
    this.urls = urls;
    this.buffer = [];
    this.iteration = 0;
    this.progressBar = document.querySelector('.progress');
  }

  _createClass(GuitarBuffer, [{
    key: "loadSound",
    value: function loadSound(url, index) {
      var _this = this;

      var request = new XMLHttpRequest();
      request.open('get', url, true);
      request.responseType = 'arraybuffer';
      var thisBuffer = this;

      request.onload = function () {
        // Safari doesn't support promise based syntax
        thisBuffer.context.decodeAudioData(request.response, function (buffer) {
          thisBuffer.buffer[index] = buffer;
          thisBuffer.updateProgress(thisBuffer.urls.length);

          if (index === thisBuffer.urls.length - 1) {
            GuitarBuffer.finishLoading();

            _this.context.resume();
          }
        });
      };

      request.send();
    }
  }, {
    key: "getBuffer",
    value: function getBuffer() {
      var _this2 = this;

      this.urls.forEach(function (url, index) {
        _this2.loadSound(url, index);
      });
    }
  }, {
    key: "updateProgress",
    value: function updateProgress(total) {
      this.iteration = this.iteration + 1;
      this.progressBar.style.width = "".concat(this.iteration / total * 100, "%");
    }
  }, {
    key: "getSound",
    value: function getSound(index) {
      return this.buffer[index];
    }
  }], [{
    key: "finishLoading",
    value: function finishLoading() {
      document.querySelector('.loading').style.opacity = '0';
      document.querySelector('.loading').style.height = '0';
      document.querySelector('.notes').style.height = 'auto';
      document.querySelector('.notes').style.opacity = '1';
    }
  }]);

  return GuitarBuffer;
}();

var _default = GuitarBuffer;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Guitar =
/*#__PURE__*/
function () {
  function Guitar(context, buffer) {
    _classCallCheck(this, Guitar);

    this.context = context;
    this.buffer = buffer;
  }

  _createClass(Guitar, [{
    key: "setup",
    value: function setup() {
      this.gainNode = this.context.createGain();
      this.source = this.context.createBufferSource();
      this.source.buffer = this.buffer;
      this.source.connect(this.gainNode);
      this.gainNode.connect(this.context.destination);
      this.gainNode.gain.setValueAtTime(0.8, this.context.currentTime);
    }
  }, {
    key: "play",
    value: function play() {
      this.setup();
      this.source.start(this.context.currentTime);
    }
  }, {
    key: "stop",
    value: function stop() {
      var ct = this.context.currentTime + 0.5;
      this.gainNode.gain.exponentialRampToValueAtTime(0.001, ct);
      this.source.stop(ct);
    }
  }]);

  return Guitar;
}();

var _default = Guitar;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

module.exports = require('./main').default;

},{"./main":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _buffer = _interopRequireDefault(require("./buffer"));

var _guitar = _interopRequireDefault(require("./guitar"));

var _sounds = _interopRequireDefault(require("./sounds"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!window.AudioContext && !window.webkitAudioContext) {
  document.querySelector('.start-btn').style.display = 'none';
  document.querySelector('.no-audio').style.display = 'block';
}

var context = new (window.AudioContext || window.webkitAudioContext)();
var buffer = new _buffer.default(context, _sounds.default);
var guitar = null;
var preset = 0;

function playGuitar() {
  var index = Number(this.dataset.note) + preset;
  guitar = new _guitar.default(context, buffer.getSound(index));
  guitar.play();
}

function stopGuitar() {
  guitar.stop();
}

var startBtn = document.querySelector('.start-btn');
startBtn.addEventListener('click', function () {
  startBtn.style.display = 'none';
  buffer.getBuffer();
});
var buttons = document.querySelectorAll('.notes .note');
buttons.forEach(function (button) {
  button.addEventListener('mouseenter', playGuitar.bind(button));
  button.addEventListener('mouseleave', stopGuitar);
});
var audio = document.querySelector('audio');
var play = document.querySelector('.play');
var rewind = document.querySelector('.rewind');
var circle = document.querySelector('.circle');

function playTrack() {
  play.querySelector('.pause-icon').style.display = 'block';
  play.querySelector('.play-icon').style.display = 'none';
}

function pauseTrack() {
  play.querySelector('.pause-icon').style.display = 'none';
  play.querySelector('.play-icon').style.display = 'block';
}

audio.addEventListener('pause', pauseTrack);
audio.addEventListener('play', playTrack);
play.addEventListener('click', function () {
  if (audio.paused) {
    audio.play();
    playTrack();
  } else {
    audio.pause();
    pauseTrack();
  }
});
rewind.addEventListener('click', function () {
  audio.currentTime = 0;
});
circle.addEventListener('click', function () {
  preset = preset === 0 ? 15 : 0;
  circle.classList.toggle('rock');
});
audio.addEventListener('ended', function () {
  pauseTrack();
});
var _default = _guitar.default;
exports.default = _default;

},{"./buffer":1,"./guitar":2,"./sounds":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var sounds = ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/G4.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/A4.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/C5.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/D5.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/E5.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/G5.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/A5.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/C6.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/D6.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/D%236.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/E6.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/G6.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/A6.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/C7.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/D7.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_G4.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_A4.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_C5.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_D5.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_E5.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_G5.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_A5.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_C6.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_D6.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_D%236.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_E6.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_G6.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_A6.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_C7.mp3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_D7.mp3'];
var _default = sounds;
exports.default = _default;

},{}]},{},[3])(3)
});
