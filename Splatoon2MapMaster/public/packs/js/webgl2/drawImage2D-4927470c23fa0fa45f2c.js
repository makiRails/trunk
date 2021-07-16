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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/webgl2/drawImage2D.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/webgl2/drawImage2D.js":
/*!****************************************************!*\
  !*** ./app/javascript/packs/webgl2/drawImage2D.js ***!
  \****************************************************/
/*! exports provided: drawImage2D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawImage2D", function() { return drawImage2D; });


var vertexShaderSource = "#version 300 es\n\n// an attribute is an input (in) to a vertex shader.\n// It will receive data from a buffer\nin vec2 a_position;\nin vec2 a_texCoord;\n\n// Used to pass in the resolution of the canvas\nuniform vec2 u_resolution;\n\n// Used to pass the texture coordinates to the fragment shader\nout vec2 v_texCoord;\n\n// all shaders have a main function\nvoid main() {\n\n  // convert the position from pixels to 0.0 to 1.0\n  vec2 zeroToOne = a_position / u_resolution;\n\n  // convert from 0->1 to 0->2\n  vec2 zeroToTwo = zeroToOne * 2.0;\n\n  // convert from 0->2 to -1->+1 (clipspace)\n  vec2 clipSpace = zeroToTwo - 1.0;\n\n  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\n\n  // pass the texCoord to the fragment shader\n  // The GPU will interpolate this value between points.\n  v_texCoord = a_texCoord;\n}\n";
var fragmentShaderSource = "#version 300 es\n\n// fragment shaders don't have a default precision so we need\n// to pick one. highp is a good default. It means \"high precision\"\nprecision highp float;\n\n// our texture\nuniform sampler2D u_image;\n\n// the texCoords passed in from the vertex shader.\nin vec2 v_texCoord;\n\n// we need to declare an output for the fragment shader\nout vec4 outColor;\n\nvoid main() {\n  //outColor = texture(u_image, v_texCoord).bgra;\n  outColor = texture(u_image, v_texCoord);\n}\n";
function drawImage2D(filepath) {
  var image = new Image();
  image.src = filepath; //"<%= image_path('area_map/gangaze.png') %>";

  image.addEventListener('load', function () {
    render(image);
  });
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

function render(image) {
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

  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  var texCoordAttributeLocation = gl.getAttribLocation(program, "a_texCoord"); // lookup uniforms

  var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  var imageLocation = gl.getUniformLocation(program, "u_image"); // Create a vertex array object (attribute state)

  var vao = gl.createVertexArray(); // and make it the one we are currently working with

  gl.bindVertexArray(vao); // Create a buffer and put a single pixel space rectangle in
  // it (2 triangles)

  var positionBuffer = gl.createBuffer(); // Turn on the attribute

  gl.enableVertexAttribArray(positionAttributeLocation); // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)

  var size = 2; // 2 components per iteration

  var type = gl.FLOAT; // the data is 32bit floats

  var normalize = false; // dont normalize the data

  var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position

  var offset = 0; // start at the beginning of the buffer

  gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset); // provide texture coordinates for the rectangle.

  var texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]), gl.STATIC_DRAW); // Turn on the attribute

  gl.enableVertexAttribArray(texCoordAttributeLocation); // Tell the attribute how to get data out of texCoordBuffer (ARRAY_BUFFER)

  var size = 2; // 2 components per iteration

  var type = gl.FLOAT; // the data is 32bit floats

  var normalize = false;
  var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position

  var offset = 0; // start at the beginning of the buffer

  gl.vertexAttribPointer(texCoordAttributeLocation, size, type, normalize, stride, offset); // Create a texture.

  var texture = gl.createTexture(); // make unit 0 the active texture uint
  // (ie, the unit all other texture commands will affect

  gl.activeTexture(gl.TEXTURE0 + 0);
  gl.bindTexture(gl.TEXTURE_2D, texture); // Set the parameters so we don't need mips and so we're not filtering
  // and we dont repeat at the edges

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST); // Upload the image into the texture.

  var mipLevel = 0; // the largest mip

  var internalFormat = gl.RGBA; // format we want in the texture

  var srcFormat = gl.RGBA; // format of data we are supplying

  var srcType = gl.UNSIGNED_BYTE; // type of data we are supplying

  gl.texImage2D(gl.TEXTURE_2D, mipLevel, internalFormat, srcFormat, srcType, image);
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

  setRectangle(gl, 0, 0, image.width, image.height); // Draw the rectangle.

  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 6;
  gl.drawArrays(primitiveType, offset, count);
}

function setRectangle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]), gl.STATIC_DRAW);
}

/***/ })

/******/ });
//# sourceMappingURL=drawImage2D-4927470c23fa0fa45f2c.js.map