"use strict";	
var vertexShaderSource = `#version 300 es

precision highp float;

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;
in vec2 a_centerFrom;
in vec2 a_centerTo;
in float a_radiusMin;
in float a_radiusMax;

// Used to pass in the resolution of the canvas
uniform vec2 u_resolution;

out vec2 v_resolution;
out vec2 v_centerFrom;
out vec2 v_centerTo;
out float v_radiusMin;
out float v_radiusMax;

// all shaders have a main function
void main() {
  vec2 clipSpace = a_position / u_resolution * 2.0 - 1.0;
  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
  v_resolution = u_resolution;
  v_radiusMin = a_radiusMin;
  v_radiusMax = a_radiusMax;
  v_centerFrom = a_centerFrom;
  v_centerTo = a_centerTo;
}
`;

var fragmentShaderSource = `#version 300 es

#define PI 3.14159265359

// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

// the texCoords passed in from the vertex shader.
in vec2 v_resolution;
in vec2 v_centerFrom;
in vec2 v_centerTo;
in float v_radiusMin;
in float v_radiusMax;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  //outColor = texture(u_image, v_texCoord).bgra;

  float x = gl_FragCoord.x;
  float y = v_resolution[1] - gl_FragCoord.y;
  float dx1 = x - v_centerFrom[0];
  float dy1 = y - v_centerFrom[1];
  float d1 = sqrt(dx1 * dx1 + dy1 * dy1);
  if ( v_radiusMin < d1 && d1 < v_radiusMax )
  {
    float dx2 = v_centerTo[0] - v_centerFrom[0];
    float dy2 = v_centerTo[1] - v_centerFrom[1];
    float d2 = sqrt(dx2 * dx2 + dy2 * dy2);
    float rad = acos( ( dx1 * dx2 + dy1 * dy2 ) / ( d1 * d2 ) );
    if ( rad * 18.0 <= 3.5 * PI )
    {
      outColor = vec4(0, 1, 0, 0.3);
    }
    else
    {
      discard;
    }
  }
  else
  {
    discard;
  }
}
`;

export function exec(from, to, r) {
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

function render(from, to, r) {

 // Get A WebGL context
  /** @type {HTMLCanvasElement} */
  var canvas = document.querySelector("#look_for_canvas");
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
  var centerFromLocation        = gl.getAttribLocation(program, "a_centerFrom");
  var centerToLocation          = gl.getAttribLocation(program, "a_centerTo");
  var radiusMinLocation         = gl.getAttribLocation(program, "a_radiusMin");
  var radiusMaxLocation         = gl.getAttribLocation(program, "a_radiusMax");

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
  gl.enableVertexAttribArray(centerFromLocation);
  gl.enableVertexAttribArray(centerToLocation);
  gl.enableVertexAttribArray(radiusMinLocation);
  gl.enableVertexAttribArray(radiusMaxLocation);

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  //gl.vertexAttribPointer(location, size, type, normalize, stride, offset);
  // ユニフォームの方がよさげだが
  gl.vertexAttribPointer(positionLocation,     2, gl.FLOAT, false, 8 * 4, 0);
  gl.vertexAttribPointer(centerFromLocation,   2, gl.FLOAT, false, 8 * 4, 8);
  gl.vertexAttribPointer(centerToLocation,     2, gl.FLOAT, false, 8 * 4, 16);
  gl.vertexAttribPointer(radiusMinLocation,    1, gl.FLOAT, false, 8 * 4, 24);
  gl.vertexAttribPointer(radiusMaxLocation,    1, gl.FLOAT, false, 8 * 4, 28);

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
  setFan(gl, from, to, r);

  // Draw the rectangle.
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
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1, from[0], from[1], to[0], to[1], r[0], r[1],
     x2, y1, from[0], from[1], to[0], to[1], r[0], r[1],
     x1, y2, from[0], from[1], to[0], to[1], r[0], r[1],
     x1, y2, from[0], from[1], to[0], to[1], r[0], r[1],
     x2, y1, from[0], from[1], to[0], to[1], r[0], r[1],
     x2, y2, from[0], from[1], to[0], to[1], r[0], r[1]
  ]), gl.STATIC_DRAW);
}
