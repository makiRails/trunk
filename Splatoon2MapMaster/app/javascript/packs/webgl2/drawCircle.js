"use strict";	
var vertexShaderSource = `#version 300 es

precision highp float;

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;
in vec2 a_center;
in float a_radius;

// Used to pass in the resolution of the canvas
uniform vec2 u_resolution;

out vec2 v_resolution;
out vec2 v_center;
out float v_radius;

// all shaders have a main function
void main() {
  vec2 clipSpace = a_position / u_resolution * 2.0 - 1.0;
  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
  v_resolution = u_resolution;
  v_radius = a_radius;
  v_center = a_center;
}
`;

var fragmentShaderSource = `#version 300 es

// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

// the texCoords passed in from the vertex shader.
in vec2 v_resolution;
in vec2 v_center;
in float v_radius;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  //outColor = texture(u_image, v_texCoord).bgra;
  float x = gl_FragCoord.x;
  float y = v_resolution[1] - gl_FragCoord.y;
  float dx = v_center[0] - x;
  float dy = v_center[1] - y;
  float distance = sqrt(dx * dx + dy * dy);
  if (distance < v_radius)
    outColor = vec4(0, 1, 0, 0.3);
  else
    discard;
}
`;

export function exec(center) {
    render(center[0], center[1]);
}

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));  // eslint-disable-line
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

  console.log(gl.getProgramInfoLog(program));  // eslint-disable-line
  gl.deleteProgram(program);
  return undefined;
}

function resizeCanvasToDisplaySize(canvas) {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth  = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;
 
  // Check if the canvas is not the same size.
  const needResize = canvas.width  !== displayWidth ||
                     canvas.height !== displayHeight;
 
  if (needResize) {
    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
 
  return needResize;
}

function render(x, y) {

 // Get A WebGL context
  /** @type {HTMLCanvasElement} */
  var canvas = document.querySelector("#player_canvas");
  var gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true, premultipliedAlpha: false });
  if (!gl) {
    return;
  }

  // setup GLSL program
  var vShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  var program = createProgram(gl, vShader, fShader);

  // look up where the vertex data needs to go.
  var positionLocation          = gl.getAttribLocation(program, "a_position");
  var centerLocation            = gl.getAttribLocation(program, "a_center");
  var radiusLocation            = gl.getAttribLocation(program, "a_radius");

  // lookup uniforms
  var resolutionLocation = gl.getUniformLocation(program, "u_resolution");

  // Create a vertex array object (attribute state)
  var vao = gl.createVertexArray();

  // and make it the one we are currently working with
  gl.bindVertexArray(vao);

  // Create a buffer and put a single pixel space rectangle in
  // it (2 triangles)
  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Turn on the attribute
  gl.enableVertexAttribArray(positionLocation);
  gl.enableVertexAttribArray(centerLocation);
  gl.enableVertexAttribArray(radiusLocation);

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  //gl.vertexAttribPointer(location, size, type, normalize, stride, offset);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 5 * 4, 0);
  gl.vertexAttribPointer(centerLocation,   2, gl.FLOAT, false, 5 * 4, 8);
  gl.vertexAttribPointer(radiusLocation,   1, gl.FLOAT, false, 5 * 4, 16);

  resizeCanvasToDisplaySize(gl.canvas);

  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  // Bind the attribute/buffer set we want.
  gl.bindVertexArray(vao);

  // Pass in the canvas resolution so we can convert from
  // pixels to clipspace in the shader
  gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

  // Bind the position buffer so gl.bufferData that will be called
  // in setRectangle puts data in the position buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Set a rectangle the same size as the image.
  setCircle(gl, x, y, 3);

  // Draw the rectangle.
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 6;
  gl.drawArrays(primitiveType, offset, count);
}

function setCircle(gl, x, y, r) {
  var x1 = x - r;
  var x2 = x + r;
  var y1 = y - r;
  var y2 = y + r;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1, x, y, r,
     x2, y1, x, y, r,
     x1, y2, x, y, r,
     x1, y2, x, y, r,
     x2, y1, x, y, r,
     x2, y2, x, y, r
  ]), gl.STATIC_DRAW);
}
