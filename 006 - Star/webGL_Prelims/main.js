document.addEventListener("DOMContentLoaded", start);
var gl;

function createCube(adder){
	var cube = {};

	cube.vertices = [
	//	x, 	  y,	z

	//1st face BACK 
		-0.5, -0.5, -0.5,
		0.5, -0.5, -0.5,
		0.5, 0.5, -0.5,
		0.5, 0.5, -0.5,
		-0.5, 0.5, -0.5,
		-0.5, -0.5, -0.5,

	//BACK
		-0.5, -0.5, -0.5,
		0.0, 0.0, -2.3,
		0.5, -0.5, -0.5,

		-0.5, -0.5, -0.5,
		0.0, 0.0, -2.3,
		-0.5, 0.5, -0.5,

		-0.5, 0.5, -0.5,
		0.0, 0.0, -2.3,
		0.5, 0.5, -0.5,

		0.5, 0.5, -0.5,
		0.0, 0.0, -2.3,
		0.5, -0.5, -0.5,

	//2nd face FRONT
		-0.5, -0.5, 0.5,
		0.5, -0.5, 0.5,
		0.5, 0.5, 0.5,
		0.5, 0.5, 0.5,
		-0.5, 0.5, 0.5,
		-0.5, -0.5, 0.5,

	//BACK
		-0.5, -0.5, 0.5,
		0.0, 0.0, 2.3,
		0.5, -0.5, 0.5,

		-0.5, -0.5, 0.5,
		0.0, 0.0, 2.3,
		-0.5, 0.5, 0.5,

		-0.5, 0.5, 0.5,
		0.0, 0.0, 2.3,
		0.5, 0.5, 0.5,

		0.5, 0.5, 0.5,
		0.0, 0.0, 2.3,
		0.5, -0.5, 0.5,

	//3rd face LEFT
		-0.5, 0.5, 0.5,
		-0.5, 0.5, -0.5,
		-0.5, -0.5, -0.5,
		-0.5, -0.5, -0.5,
		-0.5, -0.5, 0.5,
		-0.5, 0.5, 0.5,

	//LEFT TRIANGLE
		-0.5, 0.5, 0.5,
		-2.3, 0.0, 0.0,
		-0.5, -0.5, 0.5,

		-0.5, 0.5, 0.5, 
		-2.3, 0.0, 0.0,
		-0.5, 0.5, -0.5,

		-0.5, 0.5, -0.5,
		-2.3, 0.0, 0.0,
		-0.5, -0.5, -0.5,

		-0.5, -0.5, -0.5,	
		-2.3, 0.0, 0.0,
		-0.5, -0.5, 0.5,

	// 4th face RIGHT
		0.5, 0.5, 0.5,
		0.5, 0.5, -0.5,
		0.5, -0.5, -0.5,
		0.5, -0.5, -0.5,
		0.5, -0.5, 0.5,
		0.5, 0.5, 0.5,

	//RIGHT TRIANGLE
		0.5, 0.5, 0.5,
		2.3, 0.0, 0.0,
		0.5, -0.5, 0.5,

		0.5, 0.5, 0.5, 
		2.3, 0.0, 0.0,
		0.5, 0.5, -0.5,

		0.5, 0.5, -0.5,
		2.3, 0.0, 0.0,
		0.5, -0.5, -0.5,

		0.5, -0.5, -0.5,	
		2.3, 0.0, 0.0,
		0.5, -0.5, 0.5,

	// 5th face BOTTOM
		-0.5, -0.5, -0.5,
		0.5, -0.5, -0.5,
		0.5, -0.5, 0.5,
		0.5, -0.5, 0.5,
		-0.5, -0.5, 0.5,
		-0.5, -0.5, -0.5,

	//BOTTOM TRIANGLE
		//BACK
		-0.5, -0.5, -0.5,
		0.0, -2.3, 0.0,
		0.5, -0.5, -0.5,

		//FRONT
		-0.5, -0.5, 0.5,
		0.0, -2.3, 0.0,
		0.5, -0.5, 0.5,

		//LEFT
		-0.5, -0.5, 0.5,
		0.0, -2.3, 0.0,
		-0.5, -0.5, -0.5,

		//RIGHT
		0.5, -0.5, 0.5,
		0.0, -2.3, 0.0,
		0.5, -0.5, -0.5,

	// 6th face TOP
		-0.5, 0.5, -0.5,
		0.5, 0.5, -0.5,
		0.5, 0.5, 0.5,
		0.5, 0.5, 0.5,
		-0.5, 0.5, 0.5,
		-0.5, 0.5, -0.5,

	//TOP TRIANGLE
		//BACK
		-0.5, 0.5, -0.5,
		0.0, 2.3, 0.0,
		0.5, 0.5, -0.5,

		//FRONT
		-0.5, 0.5, 0.5,
		0.0, 2.3, 0.0,
		0.5, 0.5, 0.5,

		//LEFT
		-0.5, 0.5, 0.5,
		0.0, 2.3, 0.0,
		-0.5, 0.5, -0.5,

		//RIGHT
		0.5, 0.5, 0.5,
		0.0, 2.3, 0.0,
		0.5, 0.5, -0.5,
	];	
	cube.positionBuffer = gl.createBuffer();

	gl.bindBuffer(gl.ARRAY_BUFFER, cube.positionBuffer);

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	cube.verticesColors = [];

	var faceColors = [
		[1.1, 0.2, 0.3, 1.0],
		[0.4, 1.5, 0.6, 1.0],
		[0.7, 0.8, 1.9, 1.0],
		[1.1, 1.2, 0.3, 1.0],
		[1.4, 0.5, 1.6, 1.0],
		[0.7, 1.8, 1.9, 1.0]
	];

	faceColors.forEach(function(color){
		for (var i = 0; i < 6; i++) {
			cube.verticesColors = cube.verticesColors.concat(color);
		}
	});

	cube.vertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.verticesColors), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	cube.vertexShader = getAndCompileShader("vertexShader");
	cube.fragmentShader = getAndCompileShader("fragmentShader");

	cube.shaderProgram = gl.createProgram();

	gl.attachShader(cube.shaderProgram, cube.vertexShader);
	gl.attachShader(cube.shaderProgram, cube.fragmentShader);

	gl.linkProgram(cube.shaderProgram);

	gl.useProgram(cube.shaderProgram);

	cube.vao = gl.createVertexArray();
	gl.bindVertexArray(cube.vao);

	cube.positionAttributeLocation = gl.getAttribLocation(cube.shaderProgram, "position");
	gl.enableVertexAttribArray(cube.positionAttributeLocation);
	gl.bindBuffer(gl.ARRAY_BUFFER, cube.positionBuffer);
	gl.vertexAttribPointer(cube.positionAttributeLocation, 3, gl.FLOAT, false, 0 ,0);
	cube.modelMatrix = mat4.create();
	cube.modelMatrixLocation = gl.getUniformLocation(cube.shaderProgram, "modelMatrix");

	return cube;
}

function start(){
	console.log("Now Running");

	const canvas = document.getElementById("renderCanvas");
	gl = canvas.getContext("webgl2");

	var cube = createCube();

	var uniformcolorsArray = [];

	var color = vec4.fromValues(0.1, 0.2, 0.3, 1.0);
	uniformcolorsArray.push(color);

	color = vec4.fromValues(0.4, 0.5, 0.6, 1.0);
	uniformcolorsArray.push(color)

	color = vec4.fromValues(0.7, 0.8, 0.9, 1.0);
	uniformcolorsArray.push(color);

	var offsetVector= vec3.fromValues(0,0,0);
	var offsetVector1= vec3.fromValues(-5,0,5);
	
	gl.useProgram(cube.shaderProgram);

	requestAnimationFrame(runRenderLoop);

	var viewMatrix = mat4.create();
	var projectionMatrix = mat4.create();

	mat4.perspective(projectionMatrix, 115 * Math.PI / 270.0, canvas.width / canvas.height, 0.1, 15);

	var viewMatrixLocation = gl.getUniformLocation(cube.shaderProgram, "viewMatrix");
	var projectionMatrixLocation = gl.getUniformLocation(cube.shaderProgram, "projectionMatrix");

	gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);

	var colorsUniformArrayLocation0 = gl.getUniformLocation(cube.shaderProgram, "colorsUniformArray[0]");
	var colorsUniformArrayLocation1 = gl.getUniformLocation(cube.shaderProgram, "colorsUniformArray[1]");

	var offsetUniformLocation = gl.getUniformLocation(cube.shaderProgram, "offsets");

	var timeUniformLocation = gl.getUniformLocation(cube.shaderProgram, "time");

	var angleY = 0;
	var angleX = 0.3;

	var currentTime = 0;

	function runRenderLoop(){
		gl.clearColor(0.2, 0.2, 0.3, 1);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.enable(gl.DEPTH_TEST);
		mat4.identity(cube.modelMatrix);

		mat4.translate(cube.modelMatrix, cube.modelMatrix, [0,3,-10]); //x,y,z
		mat4.rotateY(cube.modelMatrix, cube.modelMatrix, angleY*2.5);
		mat4.rotateX(cube.modelMatrix, cube.modelMatrix, angleX);
		
		gl.uniformMatrix4fv(cube.modelMatrixLocation, false, cube.modelMatrix);
		gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
		gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);

		gl.uniform4fv(colorsUniformArrayLocation0, uniformcolorsArray[0]);
		gl.uniform4fv(colorsUniformArrayLocation1, uniformcolorsArray[1]);

		gl.uniform3fv(offsetUniformLocation, offsetVector);

		gl.uniform1f(timeUniformLocation, currentTime);

		gl.useProgram(cube.shaderProgram);
		gl.bindVertexArray(cube.vao);
		gl.drawArrays(gl.TRIANGLES, 0, 108);
		gl.drawArraysInstanced(gl.TRIANGLES, 0, 108, 3)

		angleY += 0.025;
		angleX += 0.025;
		currentTime += 0.005;
		
		mat4.identity(cube.modelMatrix);

		mat4.translate(cube.modelMatrix, cube.modelMatrix, [5,3,-10]); //x,y,z
		mat4.rotateY(cube.modelMatrix, cube.modelMatrix, angleY*-2.5);
		
		gl.uniformMatrix4fv(cube.modelMatrixLocation, false, cube.modelMatrix);
		gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
		gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);

		gl.uniform4fv(colorsUniformArrayLocation0, uniformcolorsArray[0]);
		gl.uniform4fv(colorsUniformArrayLocation1, uniformcolorsArray[1]);

		gl.uniform3fv(offsetUniformLocation, offsetVector);

		gl.uniform1f(timeUniformLocation, currentTime);

		gl.useProgram(cube.shaderProgram);
		gl.bindVertexArray(cube.vao);
		gl.drawArrays(gl.TRIANGLES, 0, 108);
		gl.drawArraysInstanced(gl.TRIANGLES, 0, 108, 3)

		angleY += 0.025;
		angleX += 0.025;
		currentTime += 0.005;

		mat4.identity(cube.modelMatrix);

		mat4.translate(cube.modelMatrix, cube.modelMatrix, [-5,3,-10]); //x,y,z
		mat4.rotateY(cube.modelMatrix, cube.modelMatrix, angleY*2.5);
		
		gl.uniformMatrix4fv(cube.modelMatrixLocation, false, cube.modelMatrix);
		gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
		gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);

		gl.uniform4fv(colorsUniformArrayLocation0, uniformcolorsArray[0]);
		gl.uniform4fv(colorsUniformArrayLocation1, uniformcolorsArray[1]);

		gl.uniform3fv(offsetUniformLocation, offsetVector);

		gl.uniform1f(timeUniformLocation, currentTime);

		gl.useProgram(cube.shaderProgram);
		gl.bindVertexArray(cube.vao);
		gl.drawArrays(gl.TRIANGLES, 0, 108);
		gl.drawArraysInstanced(gl.TRIANGLES, 0, 108, 3)

		angleY -= 0.025;
		angleX += 0.025;
		currentTime += 0.005;
		
		mat4.identity(cube.modelMatrix);

		mat4.translate(cube.modelMatrix, cube.modelMatrix, [0,-3,-10]); //x,y,z
		mat4.rotateY(cube.modelMatrix, cube.modelMatrix, angleY* .5);
		
		gl.uniformMatrix4fv(cube.modelMatrixLocation, false, cube.modelMatrix);
		gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
		gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);

		gl.uniform4fv(colorsUniformArrayLocation0, uniformcolorsArray[0]);
		gl.uniform4fv(colorsUniformArrayLocation1, uniformcolorsArray[1]);

		gl.uniform3fv(offsetUniformLocation, offsetVector1);

		gl.uniform1f(timeUniformLocation, currentTime);

		gl.useProgram(cube.shaderProgram);
		gl.bindVertexArray(cube.vao);
		gl.drawArrays(gl.TRIANGLES, 0, 108);
		gl.drawArraysInstanced(gl.TRIANGLES, 0, 108, 3)

		angleY += 0.025;
		angleX += 0.025;
		currentTime += 0.005;

		requestAnimationFrame(runRenderLoop);
	}

}

function getAndCompileShader(id){
	var shader;
	let shaderElement = document.getElementById(id);

	let shaderText = shaderElement.text.trim();

	if(id === "vertexShader"){
		shader = gl.createShader(gl.VERTEX_SHADER);

	}else if(id === "fragmentShader"){
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