import * as gli from "./lib/gl";
import { ShaderUtil } from "./lib/shaders";
import { vSimpleShader, fSimpleShader } from "./shaders";
import "./css/style.scss";

var gl: WebGL2RenderingContext;
window.addEventListener("load", function () {
  console.log("tst");
});
gl = gli.getGlInstance().fSetSize(500, 500).fClear();
let vShader = <WebGLShader>(
  ShaderUtil.createShader(gl, vSimpleShader, gl.VERTEX_SHADER)
);
let fShader = <WebGLShader>(
  ShaderUtil.createShader(gl, fSimpleShader, gl.FRAGMENT_SHADER)
);
let shaderProgram = <WebGLProgram>(
  ShaderUtil.createProgram(gl, vShader, fShader, true)
);

// get location of uniforms and attributes
gl.useProgram(shaderProgram);
var aPositionLoc = gl.getAttribLocation(shaderProgram, "a_position"),
  uPointSizeLoc = gl.getUniformLocation(shaderProgram, "uPointSize");
gl.useProgram(null);

// Set up data buffers
let aVerts = new Float32Array([0, 0, 0, 0.5, 0.5, 0]);
let buffVerts = gl.createBuffer();

// bind the buffers
gl.bindBuffer(gl.ARRAY_BUFFER, buffVerts);
gl.bufferData(gl.ARRAY_BUFFER, aVerts, gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

// Set up for drawing
gl.useProgram(shaderProgram);
gl.uniform1f(uPointSizeLoc, 50.0);

//how its down without VAOs
gl.bindBuffer(gl.ARRAY_BUFFER, buffVerts); //Tell gl which buffer we want to use at the moment
gl.enableVertexAttribArray(aPositionLoc); //Enable the position attribute in the shader
gl.vertexAttribPointer(aPositionLoc, 3, gl.FLOAT, false, 0, 0); //Set which buffer the attribute will pull its data from
gl.bindBuffer(gl.ARRAY_BUFFER, null); //Done setting up the buffer

gl.drawArrays(gl.POINTS, 0, 2); //Draw the points
