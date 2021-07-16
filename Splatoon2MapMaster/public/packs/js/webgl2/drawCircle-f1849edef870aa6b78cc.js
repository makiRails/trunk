var RenderModule =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/webgl2/drawCircle.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/webgl2/drawCircle.js":
/*!***************************************************!*\
  !*** ./app/javascript/packs/webgl2/drawCircle.js ***!
  \***************************************************/
/*! exports provided: drawCircle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawCircle", function() { return drawCircle; });


var vertexShaderSource = "#version 300 es\n\n// an attribute is an input (in) to a vertex shader.\n// It will receive data from a buffer\nin vec2 a_position;\nin vec2 a_center;\nin float a_radius;\n\n// Used to pass in the resolution of the canvas\nuniform vec2 u_resolution;\n\nout vec2 v_resolution;\nout vec2 v_center;\nout vec2 v_radius;\n\n// all shaders have a main function\nvoid main() {\n  vec2 clipSpace = a_position / u_resolution * 2.0 - 1.0;\n  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\n  v_resolution = u_resolution;\n  v_radius = a_radius;\n  v_center = a_center;\n}\n";
var fragmentShaderSource = "#version 300 es\n\n// fragment shaders don't have a default precision so we need\n// to pick one. highp is a good default. It means \"high precision\"\nprecision highp float;\n\n// the texCoords passed in from the vertex shader.\nin vec2 v_point;\nin vec2 v_center;\nin float v_radius;\n\n// we need to declare an output for the fragment shader\nout vec4 outColor;\n\nvoid main() {\n  //outColor = texture(u_image, v_texCoord).bgra;\n  float dx = gl_FragCoord.x - v_center[0]\n  float dy = (resolution[1] - gl_FragCoord.y) - v_center[1]\n  float distance = sqrt(dx * dx + dy * dy);\n  if (distance < v_radius)\n    outColor = vec4(0, 1, 0, 0.4);\n  else\n    discard;\n}\n";
function drawCircle(x, y) {
  render(x, y);
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

function render(x, y) {
  // Get A WebGL context

  /** @type {HTMLCanvasElement} */
  var canvas = document.querySelector("#canvas");
  var gl = canvas.getContext("webgl2");

  if (!gl) {
    return;
  } // setup GLSL program


  var vShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  var program = createProgram(gl, vShader, fShader); // look up where the vertex data needs to go.

  var positionLocation = gl.getAttribLocation(program, "a_position");
  var centerLocation = gl.getAttribLocation(program, "a_center");
  var radiusLocation = gl.getAttribLocation(program, "a_radius"); // lookup uniforms

  var resolutionLocation = gl.getUniformLocation(program, "u_resolution"); // Create a vertex array object (attribute state)

  var vao = gl.createVertexArray(); // and make it the one we are currently working with

  gl.bindVertexArray(vao); // Create a buffer and put a single pixel space rectangle in
  // it (2 triangles)

  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // Turn on the attribute

  gl.enableVertexAttribArray(positionLocation);
  gl.enableVertexAttribArray(centerLocation);
  gl.enableVertexAttribArray(radiusLocation); // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  //gl.vertexAttribPointer(location, size, type, normalize, stride, offset);

  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.vertexAttribPointer(centerLocation, 2, gl.FLOAT, false, 0, 6 * 4);
  gl.vertexAttribPointer(radiusLocation, 1, gl.FLOAT, false, 0, 6 * 4 + 4 * 2);
  resizeCanvasToDisplaySize(gl.canvas); // Tell WebGL how to convert from clip space to pixels

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height); // Clear the canvas

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Tell it to use our program (pair of shaders)

  gl.useProgram(program); // Bind the attribute/buffer set we want.

  gl.bindVertexArray(vao); // Pass in the canvas resolution so we can convert from
  // pixels to clipspace in the shader

  gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height); // Tell the shader to get the texture from texture unit 0

  gl.uniform1i(imageLocation, 0); // Bind the position buffer so gl.bufferData that will be called
  // in setRectangle puts data in the position buffer

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // Set a rectangle the same size as the image.

  setCircle(gl, x, y, 3); // Draw the rectangle.

  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 6;
  gl.drawArrays(primitiveType, offset, count);
}

function setRectangle(gl, x, y, r) {
  var x1 = x - r;
  var x2 = x + r;
  var y1 = y - r;
  var y2 = y + r;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]), gl.STATIC_DRAW);
}

/***/ })

/******/ });
//# sourceMappingURL=drawCircle-f1849edef870aa6b78cc.js.map