export function getGlInstance(canvasID: any = "glCanvas") {
  let canvas = <any>document.getElementById(canvasID);
  let gl = canvas.getContext("webgl2");
  if (!gl) {
    console.error("Webgl context is not available");
    return null;
  }
  console.log(gl);
  // set the clear color
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  gl.fClear = function () {
    this.clear(this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT);
    return this;
  };

  gl.fSetSize = function (w: any, h: any) {
    console.log("setting canvas size");
    this.canvas.style.width = w + "px";
    this.canvas.style.height = h + "px";
    this.canvas.width = w;
    this.canvas.height = h;
    //when updating the canvas size, must reset the viewport of the canvas
    //else the resolution webgl renders at will not change
    this.viewport(0, 0, w, h);
    return this;
  };

  // to create the array buffer to store vertices, etc.
  gl.createArrayBuffer = function (floatAry, isStatic = true) {
    let buffer = this.createBuffer();
    this.bindBuffer(this.ARRAY_BUFFER, buffer);
    this.bufferData(
      this.ARRAY_BUFFER,
      floatAry,
      isStatic ? this.STATIC_DRAW : this.DYNAMIC_DRAW
    );
  };

  return gl;
}
