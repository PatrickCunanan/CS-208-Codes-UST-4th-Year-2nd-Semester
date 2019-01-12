document.addEventListener("DOMContentLoaded", start);
var gl;

function createCube(adder){
	var cube = {};
	var ready= false; 

	cube.vertices = [
	//	x, 	  y,	z

	//1st face
		-0.5, -0.5, -0.5,
		0.5, -0.5, -0.5,
		0.5, 0.5, -0.5,
		0.5, 0.5, -0.5,
		-0.5, 0.5, -0.5,
		-0.5, -0.5, -0.5,

	//2nd face
		-0.5, -0.5, 0.5,
		0.5, -0.5, 0.5,
		0.5, 0.5, 0.5,
		0.5, 0.5, 0.5,
		-0.5, 0.5, 0.5,
		-0.5, -0.5, 0.5,

	//3rd face
		-0.5, 0.5, 0.5,
		-0.5, 0.5, -0.5,
		-0.5, -0.5, -0.5,
		-0.5, -0.5, -0.5,
		-0.5, -0.5, 0.5,
		-0.5, 0.5, 0.5,

	// 4th face
		0.5, 0.5, 0.5,
		0.5, 0.5, -0.5,
		0.5, -0.5, -0.5,
		0.5, -0.5, -0.5,
		0.5, -0.5, 0.5,
		0.5, 0.5, 0.5,

	// 5th face
		-0.5, -0.5, -0.5,
		0.5, -0.5, -0.5,
		0.5, -0.5, 0.5,
		0.5, -0.5, 0.5,
		-0.5, -0.5, 0.5,
		-0.5, -0.5, -0.5,

	// 6th face
		-0.5, 0.5, -0.5,
		0.5, 0.5, -0.5,
		0.5, 0.5, 0.5,
		0.5, 0.5, 0.5,
		-0.5, 0.5, 0.5,
		-0.5, 0.5, -0.5
	];	

	cube.textureCoordinates = [

		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		1.0, 1.0,
		0.0, 1.0,
		0.0, 0.0,

		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		1.0, 1.0,
		0.0, 1.0,
		0.0, 0.0,

		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,
		0.0, 1.0,
		0.0, 0.0,
		1.0, 0.0,

		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,
		0.0, 1.0,
		0.0, 0.0,
		1.0, 0.0,

		0.0, 1.0,
		1.0, 1.0,
		1.0, 0.0,
		1.0, 0.0,
		0.0, 0.0,
		0.0, 1.0,

		0.0, 1.0,
		1.0, 1.0,
		1.0, 0.0,
		1.0, 0.0,
		0.0, 0.0,
		0.0, 1.0

	];

	cube.textureCoordinatesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cube.textureCoordinatesBuffer);

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.textureCoordinates), gl.STATIC_DRAW);

	cube.texture1 = gl.createTexture();
	cube.texture1.image = new Image();
	cube.texture1.image.src = "tex1.jpg";

	cube.texture2 = gl.createTexture();
	cube.texture2.image = new Image();
	cube.texture2.image.src = "tex2.jpg";

	cube.texture3 = gl.createTexture();
	cube.texture3.image = new Image();
	cube.texture3.image.src = "tex3.jpg";

	cube.texture1.image.onload = function(){
		gl.bindTexture(gl.TEXTURE_2D, cube.texture1);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, cube.texture1.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); //gl.NEAREST
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		ready = true;
	}

	cube.texture2.image.onload = function(){
		gl.bindTexture(gl.TEXTURE_2D, cube.texture2);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, cube.texture2.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); //gl.NEAREST
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		ready = true;
	}

	cube.texture3.image.onload = function(){
		gl.bindTexture(gl.TEXTURE_2D, cube.texture3);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, cube.texture3.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); //gl.NEAREST
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		ready = true;
	}
	// cube.vertices = cube.vertices.map(function(element){
	// 	return element + adder;
	// })

	// Create buffer to GPU
	cube.positionBuffer = gl.createBuffer();

	// to allow positionBuffer to communicate with the GPU
	gl.bindBuffer(gl.ARRAY_BUFFER, cube.positionBuffer);

	// to transfer data from CPU to GPU
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	// to create colors
	cube.verticesColors = [];

	var faceColors = [
		[0.6, 0.0, 0.0, 0.6], //front
		[0.0, 0.6, 0.0, 0.6], //back
		[0.2, 0.0, 0.6, 0.6], //top
		[0.6, 0.3, 0.0, 0.6], //bottom
		[0.6, 0.0, 0.3, 0.6], //right
		[0.0, 0.3, 0.6, 0.6] //left
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

	// for vertex buffer
	cube.positionAttributeLocation = gl.getAttribLocation(cube.shaderProgram, "position");
	gl.enableVertexAttribArray(cube.positionAttributeLocation);
	gl.bindBuffer(gl.ARRAY_BUFFER, cube.positionBuffer);
	gl.vertexAttribPointer(cube.positionAttributeLocation, 3, gl.FLOAT, false, 0 ,0);

	cube.textureCoordinatesAttributeLocation = gl.getAttribLocation(cube.shaderProgram, "textureCoordinate");
	gl.enableVertexAttribArray(cube.textureCoordinatesAttributeLocation);
	gl.bindBuffer(gl.ARRAY_BUFFER, cube.textureCoordinatesBuffer);
	gl.vertexAttribPointer(cube.textureCoordinatesAttributeLocation, 2, gl.FLOAT, false, 0 ,0);

	// cube.colorAttributeLocation = gl.getAttribLocation(cube.shaderProgram, "color");
	// gl.enableVertexAttribArray(cube.colorAttributeLocation);
	// gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexColorBuffer);
	// gl.vertexAttribPointer(cube.colorAttributeLocation, 4, gl.FLOAT, false, 0 ,0);

	cube.modelMatrix = mat4.create();
	cube.modelMatrixLocation = gl.getUniformLocation(cube.shaderProgram, "modelMatrix");

	gl.useProgram(cube.shaderProgram);

	texloc = gl.getUniformLocation(cube.shaderProgram, "sampler0");	
	gl.uniform1i(texloc, 0);
	texloc = gl.getUniformLocation(cube.shaderProgram, "sampler1");
	gl.uniform1i(texloc, 1);
	texloc = gl.getUniformLocation(cube.shaderProgram, "sampler2");
	gl.uniform1i(texloc, 2);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, cube.texture1);	
	
	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, cube.texture2);

	gl.activeTexture(gl.TEXTURE2);
	gl.bindTexture(gl.TEXTURE_2D, cube.texture3);
	

	return cube;
}

function start(){
	console.log("Now Running");

	const canvas = document.getElementById("renderCanvas");
	gl = canvas.getContext("webgl2");

	var cube = createCube();

	var uniformcolorsArray = [];

	var color = vec4.fromValues(1,0,0,0.7);
	uniformcolorsArray.push(color);

	color = vec4.fromValues(0,1,0,0.7);
	uniformcolorsArray.push(color)

	color = vec4.fromValues(0,0,1,0.7);
	uniformcolorsArray.push(color);

	var offsetVector= vec3.fromValues(-2,0,2);

	gl.useProgram(cube.shaderProgram);

	requestAnimationFrame(runRenderLoop);

	// var modelMatrix = mat4.create();
	var viewMatrix = mat4.create();
	var projectionMatrix = mat4.create();

	mat4.perspective(projectionMatrix, 55 * Math.PI / 180.0, canvas.width / canvas.height, 0.1, 15);

	// var modelMatrixLocation = gl.getUniformLocation(shaderProgram, "modelMatrix");
	var viewMatrixLocation = gl.getUniformLocation(cube.shaderProgram, "viewMatrix");
	var projectionMatrixLocation = gl.getUniformLocation(cube.shaderProgram, "projectionMatrix");

	gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);

	var colorsUniformArrayLocation0 = gl.getUniformLocation(cube.shaderProgram, "colorsUniformArray[0]");
	var colorsUniformArrayLocation1 = gl.getUniformLocation(cube.shaderProgram, "colorsUniformArray[1]");
	var colorsUniformArrayLocation2 = gl.getUniformLocation(cube.shaderProgram, "colorsUniformArray[2]");

	var offsetUniformLocation = gl.getUniformLocation(cube.shaderProgram, "offsets");

	var timeUniformLocation = gl.getUniformLocation(cube.shaderProgram, "time");

	var angleY = 0;
	var angleX = 0;

	var currentTime = 0.05;

	function runRenderLoop(){
		gl.clearColor(0,1,1,0.5);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.enable(gl.DEPTH_TEST);

		// 1st
		mat4.identity(cube.modelMatrix);

		mat4.translate(cube.modelMatrix, cube.modelMatrix, [0,0,-5]); //x,y,z
		mat4.rotateY(cube.modelMatrix, cube.modelMatrix, angleY);
		mat4.rotateX(cube.modelMatrix, cube.modelMatrix, angleX);
		
		gl.uniformMatrix4fv(cube.modelMatrixLocation, false, cube.modelMatrix);
		gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
		gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);

		gl.uniform4fv(colorsUniformArrayLocation0, uniformcolorsArray[0]);
		gl.uniform4fv(colorsUniformArrayLocation1, uniformcolorsArray[1]);
		gl.uniform4fv(colorsUniformArrayLocation2, uniformcolorsArray[2]);

		gl.uniform3fv(offsetUniformLocation, offsetVector);

		gl.uniform1f(timeUniformLocation, currentTime);

		gl.useProgram(cube.shaderProgram);
		gl.bindVertexArray(cube.vao);
		gl.drawArrays(gl.TRIANGLES, 0, 36);
		gl.drawArraysInstanced(gl.TRIANGLES, 0, 36, 3)

		angleY += 0.025;
		angleX += 0.025;
		currentTime += 0.05;
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