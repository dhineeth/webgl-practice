export class ShaderUtil {
  static domShaderSrc(elemID) {
    var elm = <any>document.getElementById(elemID);
    if (!elm || elm.text == "") {
      console.log(elemID + " shader not found for this ID");
    }
  }

  static getShaderSrc(shaderID) {}

  static createShader(gl: WebGL2RenderingContext, src: any, type: any) {
    let shader: WebGLShader | null = <WebGLShader>gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    // Get error if shader failed to compile
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(
        "Error compiling shader : " + src,
        gl.getShaderInfoLog(shader)
      );
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  static createProgram(
    gl: WebGL2RenderingContext,
    vShader: any,
    fShader: any,
    doValidate
  ) {
    let prog: WebGLProgram = <WebGLProgram>gl.createProgram();
    gl.attachShader(prog, vShader);
    gl.attachShader(prog, fShader);
    gl.linkProgram(prog);

    // Check if successfull
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(
        "Error creating shader program ",
        gl.getProgramInfoLog(prog)
      );
      gl.deleteProgram(prog);
      return null;
    }

    if (doValidate) {
      gl.validateProgram(prog);
      if (!gl.getProgramParameter(prog, gl.VALIDATE_STATUS)) {
        console.error("Error validating program", gl.getProgramInfoLog(prog));
        gl.deleteProgram(prog);
      }
    }

    // Can delete the shaders since the program has been made
    gl.detachShader(prog, vShader);
    gl.detachShader(prog, fShader);
    gl.deleteShader(vShader);
    gl.deleteShader(fShader);

    return prog;
  }
}
