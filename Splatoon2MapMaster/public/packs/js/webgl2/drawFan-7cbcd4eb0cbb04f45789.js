var Packs = typeof Packs === "object" ? Packs : {}; Packs["webgl2/drawFan"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/webgl2/drawFan.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/webgl2/drawFan.js":
/*!************************************************!*\
  !*** ./app/javascript/packs/webgl2/drawFan.js ***!
  \************************************************/
/*! exports provided: exec */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exec", function() { return exec; });


var vertexShaderSource = "#version 300 es\n\nprecision highp float;\n\n// an attribute is an input (in) to a vertex shader.\n// It will receive data from a buffer\nin vec2 a_position;\nin vec2 a_centerFrom;\nin vec2 a_centerTo;\nin float a_radiusMin;\nin float a_radiusMax;\n\n// Used to pass in the resolution of the canvas\nuniform vec2 u_resolution;\n\nout vec2 v_resolution;\nout vec2 v_centerFrom;\nout vec2 v_centerTo;\nout float v_radiusMin;\nout float v_radiusMax;\n\n// all shaders have a main function\nvoid main() {\n  vec2 clipSpace = a_position / u_resolution * 2.0 - 1.0;\n  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\n  v_resolution = u_resolution;\n  v_radiusMin = a_radiusMin;\n  v_radiusMax = a_radiusMax;\n  v_centerFrom = a_centerFrom;\n  v_centerTo = a_centerTo;\n}\n";
var fragmentShaderSource = "#version 300 es\n\n#define PI 3.14159265359\n\n// fragment shaders don't have a default precision so we need\n// to pick one. highp is a good default. It means \"high precision\"\nprecision highp float;\n\n// the texCoords passed in from the vertex shader.\nin vec2 v_resolution;\nin vec2 v_centerFrom;\nin vec2 v_centerTo;\nin float v_radiusMin;\nin float v_radiusMax;\n\n// we need to declare an output for the fragment shader\nout vec4 outColor;\n\nvoid main() {\n  //outColor = texture(u_image, v_texCoord).bgra;\n\n  float x = gl_FragCoord.x;\n  float y = v_resolution[1] - gl_FragCoord.y;\n  float dx1 = x - v_centerFrom[0];\n  float dy1 = y - v_centerFrom[1];\n  float d1 = sqrt(dx1 * dx1 + dy1 * dy1);\n  if ( v_radiusMin < d1 && d1 < v_radiusMax )\n  {\n    float dx2 = v_centerTo[0] - v_centerFrom[0];\n    float dy2 = v_centerTo[1] - v_centerFrom[1];\n    float d2 = sqrt(dx2 * dx2 + dy2 * dy2);\n    float rad = acos( ( dx1 * dx2 + dy1 * dy2 ) / ( d1 * d2 ) );\n    if ( rad * 18.0 <= 3.5 * PI )\n    {\n      outColor = vec4(0, 1, 0, 0.5);\n    }\n    else\n    {\n      discard;\n    }\n  }\n  else\n  {\n    discard;\n  }\n}\n";
function exec(from, to, r) {
  render(from, to, [6, r * 20]);
}

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader)); // eslint-disable-line

  gl.deleteShader(shader);
  return undefined;
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program)); // eslint-disable-line

  gl.deleteProgram(program);
  return undefined;
}

function resizeCanvasToDisplaySize(canvas) {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  var displayWidth = canvas.clientWidth;
  var displayHeight = canvas.clientHeight; // Check if the canvas is not the same size.

  var needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;

  if (needResize) {
    // Make the canvas the same size
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }

  return needResize;
}

function render(from, to, r) {
  // Get A WebGL context

  /** @type {HTMLCanvasElement} */
  var canvas = document.querySelector("#look_for_canvas");
  var gl = canvas.getContext("webgl2", {
    preserveDrawingBuffer: true
  });

  if (!gl) {
    return;
  } // setup GLSL program


  var vShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  var program = createProgram(gl, vShader, fShader); // look up where the vertex data needs to go.

  var positionLocation = gl.getAttribLocation(program, "a_position");
  var centerFromLocation = gl.getAttribLocation(program, "a_centerFrom");
  var centerToLocation = gl.getAttribLocation(program, "a_centerTo");
  var radiusMinLocation = gl.getAttribLocation(program, "a_radiusMin");
  var radiusMaxLocation = gl.getAttribLocation(program, "a_radiusMax"); // lookup uniforms

  var resolutionLocation = gl.getUniformLocation(program, "u_resolution"); // Create a vertex array object (attribute state)

  var vao = gl.createVertexArray(); // and make it the one we are currently working with

  gl.bindVertexArray(vao); // Create a buffer and put a single pixel space rectangle in
  // it (2 triangles)

  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // Turn on the attribute

  gl.enableVertexAttribArray(positionLocation);
  gl.enableVertexAttribArray(centerFromLocation);
  gl.enableVertexAttribArray(centerToLocation);
  gl.enableVertexAttribArray(radiusMinLocation);
  gl.enableVertexAttribArray(radiusMaxLocation); // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  //gl.vertexAttribPointer(location, size, type, normalize, stride, offset);
  // ユニフォームの方がよさげだが

  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 8 * 4, 0);
  gl.vertexAttribPointer(centerFromLocation, 2, gl.FLOAT, false, 8 * 4, 8);
  gl.vertexAttribPointer(centerToLocation, 2, gl.FLOAT, false, 8 * 4, 16);
  gl.vertexAttribPointer(radiusMinLocation, 1, gl.FLOAT, false, 8 * 4, 24);
  gl.vertexAttribPointer(radiusMaxLocation, 1, gl.FLOAT, false, 8 * 4, 28);
  resizeCanvasToDisplaySize(gl.canvas); // Tell WebGL how to convert from clip space to pixels

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height); // Clear the canvas

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Tell it to use our program (pair of shaders)

  gl.useProgram(program); // Bind the attribute/buffer set we want.

  gl.bindVertexArray(vao); // Pass in the canvas resolution so we can convert from
  // pixels to clipspace in the shader

  gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height); // Bind the position buffer so gl.bufferData that will be called
  // in setRectangle puts data in the position buffer

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // Set a rectangle the same size as the image.

  setFan(gl, from, to, r); // Draw the rectangle.

  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 6;
  gl.drawArrays(primitiveType, offset, count);
}

function setFan(gl, from, to, r) {
  var x1 = from[0] - r[1];
  var x2 = from[0] + r[1];
  var y1 = from[1] - r[1];
  var y2 = from[1] + r[1];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x1, y1, from[0], from[1], to[0], to[1], r[0], r[1], x2, y1, from[0], from[1], to[0], to[1], r[0], r[1], x1, y2, from[0], from[1], to[0], to[1], r[0], r[1], x1, y2, from[0], from[1], to[0], to[1], r[0], r[1], x2, y1, from[0], from[1], to[0], to[1], r[0], r[1], x2, y2, from[0], from[1], to[0], to[1], r[0], r[1]]), gl.STATIC_DRAW);
}

/***/ })

/******/ });
//# sourceMappingURL=drawFan-7cbcd4eb0cbb04f45789.js.map