 document.addEventListener("DOMContentLoaded",start);
 var gl;
 
 function start(){
	 console.log("Now running");
	 
	 var canvas = document.getElementById("renderCanvas");
	 gl = canvas.getContext("webgl2");
	 
	 var vertices = [
	    //front face
		.5,.75,.25, 
		.925,0,.25, 
		.5,-.75,.25,  
		-.5,.75,.25,
		-.925,0,.25, 
		-.5,-.75,.25,
		.5,.75,.25,
		.5,-.75,.25,
		-.5,.75,.25, 
		-.5,-.75,.25,
		.5,-.75,.25,
		-.5,.75,.25,
		
		//back face
		.5,.75,-.25, 
		.925,0,-.25, 
		.5,-.75,-.25,  
		-.5,.75,-.25,
		-.925,0,-.25, 
		-.5,-.75,-.25,
		.5,.75,-.25,
		.5,-.75,-.25,
		-.5,.75,-.25, 
		-.5,-.75,-.25,
		.5,-.75,-.25,
		-.5,.75,-.25,
		
		//side1
		.925,0,.25,
		.925,0,-.25,
		.5,-.75,-.25,
		.5,-.75,-.25,		
		.5,-.75,.25,
		.925,0,.25,
		
		//side2
		-.925,0,.25,
		-.925,0,-.25,
		-.5,-.75,-.25,
		-.5,-.75,-.25,		
		-.5,-.75,.25,
		-.925,0,.25,
		
		//side3
		-.925,0,.25,
		-.925,0,-.25,
		-.5,.75,-.25,
		-.5,.75,-.25,		
		-.5,.75,.25,
		-.925,0,.25,
		
		//side4
		.925,0,.25,
		.925,0,-.25,
		.5,.75,-.25,
		.5,.75,-.25,		
		.5,.75,.25,
		.925,0,.25,

		//side5
		-.5,.75,.25,
		-.5,.75,-.25,
		.5,.75,-.25,
		.5,.75,-.25,
		.5,.75,.25,
		-.5,.75,.25,

		//side6
		-.5,-.75,.25,
		-.5,-.75,-.25,
		.5,-.75,-.25,
		.5,-.75,-.25,
		.5,-.75,.25,
		-.5,-.75,.25
	 ];
	 
	 var positionBuffer = gl.createBuffer();
	 gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices),gl.STATIC_DRAW);
	 
	 var colors = [];
	 
	 var faceColors = [
		[1.25,.75,.5,1],
		[.5,1.75,.25,1],
		[.75,0,1.3,1],
		[1.2,.5,1.7,1],
		[1.2,1.8,.25,1],
		[1.25,.75,.5,1],
		[.5,1.75,.25,1],
		[.75,0,1.3,1],
		[1.2,.5,1.7,1],
		[1.2,1.8,.25,1]
	 ];
	 
	 faceColors.forEach(function(color){
		 for(var i =0; i<12;i++){
			 colors = colors.concat(color);
		 }
	 })
	 
	 var colorBuffer = gl.createBuffer();
	 gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors),gl.STATIC_DRAW);
	 
	 
	 var vertexShader = getAndCompileShader("vertexShader");
	 var fragmentShader = getAndCompileShader("fragmentShader");
	 var shaderProgram = gl.createProgram();
	 
	 gl.attachShader(shaderProgram,vertexShader);
	 gl.attachShader(shaderProgram,fragmentShader);
	 gl.linkProgram(shaderProgram);
	 
	 if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
		 alert("Could not link shaders");
	 }
	 gl.useProgram(shaderProgram);
	 
	 var vao = gl.createVertexArray();
	 gl.bindVertexArray(vao);
	 
	 var positionAttributeLocation = gl.getAttribLocation(shaderProgram, "position");
	gl.enableVertexAttribArray(positionAttributeLocation);
	 
	 gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	 gl.vertexAttribPointer(positionAttributeLocation,3,gl.FLOAT,false,0,0)
	 
	 var colorAttributeLocation = gl.getAttribLocation(shaderProgram, "color");
	gl.enableVertexAttribArray(colorAttributeLocation);
	 
	 gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	 gl.vertexAttribPointer(colorAttributeLocation,4,gl.FLOAT,false,0,0)
	 
	 requestAnimationFrame(runRenderLoop);
	 
	 var modelMatrix = mat4.create();
	 var viewMatrix = mat4.create();
	 var projectionMatrix = mat4.create();
	 
	 mat4.perspective(projectionMatrix, 30 * Math.PI / 180, canvas.width / canvas.height,0.1,10);
	 
	 var modelMatrixLocation = gl.getUniformLocation(shaderProgram,"modelMatrix");
	 var viewMatrixLocation = gl.getUniformLocation(shaderProgram,"viewMatrix");
	 var projectionMatrixLocation = gl.getUniformLocation(shaderProgram,"projectionMatrix");
	 
	 gl.uniformMatrix4fv(projectionMatrixLocation,false,projectionMatrix);
	 
	 var angle = 0;
	 
	 function runRenderLoop(){
		 gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFER_BIT);
		 gl.clearColor(.25,.25,.25,1);
		 gl.enable(gl.DEPTH_TEST);
		 
		 mat4.identity(modelMatrix);
		 
		 mat4.translate(modelMatrix,modelMatrix,[0,0,-9]);
		 mat4.rotateY(modelMatrix,modelMatrix, angle);
		 mat4.rotateX(modelMatrix,modelMatrix, 0.5);
		 
		 angle += 0.05;
		 
		 gl.uniformMatrix4fv(modelMatrixLocation,false,modelMatrix);
		 gl.uniformMatrix4fv(viewMatrixLocation,false,viewMatrix);
		 gl.uniformMatrix4fv(projectionMatrixLocation,false,projectionMatrix);
		 
		 gl.useProgram(shaderProgram);
		 gl.bindVertexArray(vao);
		 gl.drawArrays(gl.TRIANGLES,0,60);
		 
		 requestAnimationFrame(runRenderLoop);
	 }
 }
 
 function getAndCompileShader(id){
	 var shader;
	 var shaderElement = document.getElementById(id);
	 var shaderText = shaderElement.text.trim();
	 
	 if(id === "vertexShader"){
		 shader = gl.createShader(gl.VERTEX_SHADER);
	 }
	 else if (id ==="fragmentShader"){
		 shader = gl.createShader(gl.FRAGMENT_SHADER);
	 }
	 gl.shaderSource(shader, shaderText);
	 gl.compileShader(shader);
	 if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
		 alert(gl.getShaderInfoLog(shader));
		 return null;
	 }
	 return shader;
 }