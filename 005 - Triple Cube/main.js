document.addEventListener("DOMContentLoaded", start);
var gl;
var ready = false;

function createCube(){
	var cube = {};

	cube.vertices = [
		//1st 6
		-0.5, -0.5, -0.5,
		 0.5, -0.5, -0.5,
		 0.5,  0.5, -0.5,
		 0.5,  0.5, -0.5,
		-0.5,  0.5, -0.5,
		-0.5, -0.5, -0.5,
		
		//2nd 6
		-0.5, -0.5, 0.5,
		 0.5, -0.5, 0.5,
		 0.5,  0.5, 0.5,
		 0.5,  0.5, 0.5,
		-0.5,  0.5, 0.5,
		-0.5, -0.5, 0.5,
		
		//3rd 6
		-0.5,  0.5,  0.5,
		-0.5,  0.5, -0.5,
		-0.5, -0.5, -0.5,
		-0.5, -0.5, -0.5,
		-0.5, -0.5,  0.5,
		-0.5,  0.5,  0.5,
		
		//4th 6
		0.5,  0.5,  0.5,
		0.5,  0.5, -0.5,
		0.5, -0.5, -0.5,
		0.5, -0.5, -0.5,
		0.5, -0.5,  0.5,
		0.5,  0.5,  0.5,
		
		//5th 6
		-0.5, -0.5, -0.5,
		 0.5, -0.5, -0.5,
		 0.5, -0.5, 0.5,
		 0.5, -0.5, 0.5,
		-0.5, -0.5, 0.5,
		-0.5, -0.5, -0.5,
		
		//6th 6
		-0.5, 0.5, -0.5,
		 0.5, 0.5, -0.5,
		 0.5, 0.5, 0.5,
		 0.5, 0.5, 0.5,
		-0.5, 0.5, 0.5,
		-0.5, 0.5, -0.5,
	];

	cube.textureCoordinates = [

		0,0,
		1,0,
		1,1,
		1,1,
		0,1,
		0,0,

		0,0,
		1,0,
		1,1,
		1,1,
		0,1,
		0,0,

		1,0,
		1,1,
		0,1,
		0,1,
		0,0,
		1,0,

		1,0,
		1,1,
		0,1,
		0,1,
		0,0,
		1,0,

		0,1,
		1,1,
		1,0,
		1,0,
		0,0,
		0,1,

		0,1,
		1,1,
		1,0,
		1,0,
		0,0,
		0,1
	];
		
		cube.textureCoordinatesBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, cube.textureCoordinatesBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.textureCoordinates), gl.STATIC_DRAW);

		cube.texture1 = gl.createTexture();
		cube.texture1.image = new Image();
		cube.texture1.image.src = "C:\\Users\\Patrick Cunanan\\Documents\\School Files\\4th Year, 2nd Semester\\CS 208\\005 - Triple Cube\\texture.jpg";

		cube.texture1.image.onload = function() {
			gl.bindTexture(gl_TEXTURE_2D, cube.texture1);
			gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl,RGB, gl.UNSIGNED_BYTE,cube.texture1.image);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
			ready = true;
		}

		cube.positionBuffer = gl.createBuffer();
		//to allow the triangleVertexPositionBuffer to communicate to GPU
		gl.bindBuffer(gl.ARRAY_BUFFER, cube.positionBuffer);
		
		//to transfer the data from the CPU to GPU
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.vertices),gl.STATIC_DRAW);
		
		//to create colors
		cube.colors = []
		
		//create var for face colors
		
		var faceColors = [
		[1.0, 0.0, 0.0, 1.0], //front face
		[0.0, 1.0, 0.0, 1.0], //back face
		[0.0, 0.0, 1.0, 1.0], //top face
		[1.0, 1.0, 0.0, 1.0], //bottom face
		[1.0, 0.0, 1.0, 1.0], //right face
		[0.0, 1.0, 1.0, 1.0] //left face
		];
		
		faceColors.forEach(function(color) {
			for (var i = 0; i < 6; i++) {
				cube.colors = cube.colors.concat(color);
			}
		});
		
	cube.colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cube.colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.colors),gl.STATIC_DRAW);
	

	cube.vertexShader = getAndCompileShader("vertexShader");
	cube.fragmentShader = getAndCompileShader("fragmentShader");
	cube.shaderProgram = gl.createProgram();
	
	gl.attachShader(cube.shaderProgram,cube.vertexShader);
	gl.attachShader(cube.shaderProgram,cube.fragmentShader);
	
	gl.linkProgram(cube.shaderProgram);
		if(!gl.getProgramParameter(cube.shaderProgram, gl.LINK_STATUS)){
			alert("COULD NOT LINK THE 2 SHADERS");
			
		}
	gl.useProgram(cube.shaderProgram);
	
	//collector between faces
	cube.vao = gl.createVertexArray();
	gl.bindVertexArray(cube.vao);
	
	//for cube vertex buffer
	cube.positionAttributeLocation = gl.getAttribLocation(cube.shaderProgram,"position");
	gl.enableVertexAttribArray(cube.positionAttributeLocation);
	gl.bindBuffer(gl.ARRAY_BUFFER, cube.positionBuffer);
	//gl.vertexAttribPointer(positionAttributeLocation,SIZE,TYPE,NORMALIZE,STRIDE,LOCATION);
	gl.vertexAttribPointer(cube.positionAttributeLocation,3,gl.FLOAT,false,0,0);
	
	//for color buffer
	cube.colorAttributeLocation = gl.getAttribLocation(cube.shaderProgram,"color");
	gl.enableVertexAttribArray(cube.colorAttributeLocation);
	gl.bindBuffer(gl.ARRAY_BUFFER, cube.colorBuffer);
	gl.vertexAttribPointer(cube.colorAttributeLocation,4,gl.FLOAT,false,0,0);


	//for texture buffer
	cube.textureAttributeLocation = gl.getAttribLocation(cube.shaderProgram,"textureCoordinate");
	gl.enableVertexAttribArray(cube.textureAttributeLocation);
	gl.bindBuffer(gl.ARRAY_BUFFER, cube.textureBuffer);
	gl.vertexAttribPointer(cube.textureAttributeLocation,2,gl.FLOAT,false,0,0);

	cube.modelMatrix = mat4.create();
	cube.modelMatrixLocation = gl.getUniformLocation(cube.shaderProgram, "modelMatrix");

	cube.smaplerUniformLocation = gl.UniformLocation(cube.shaderProgram,"sampler0");

	gl.useProgram(cube,shaderProgram);
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, cube.texture1);
	gl.uniform1i(smaplerUniformLocation,0);

	return cube;
}

function start(){
	console.log("Now Running");
	
	
	var canvas = document.getElementById("renderCanvas");
	gl = canvas.getContext("webgl2");
	
	var cube = createCube();

	var uniformColorsArray = [];

	var color = vec4.fromValues(1,0,0,1);
	uniformColorsArray.push(color);

	color = vec4.fromValues(0,1,0,1);
	uniformColorsArray.push(color);

	color = vec4.fromValues(0,0,1,1);
	uniformColorsArray.push(color);

	console.log(uniformColorsArray);

	var offsetVector = vec3.fromValues(-2,0,2);

	gl.useProgram(cube.shaderProgram);


	//gl.bindBuffer(gl.ARRAY_BUFFER,triangleVertexPositionAndColorBuffer);
	//gl.vertexAttribPointer(positionAttributeLocation,3,gl.FLOAT,false,7* 4,0);
	//gl.vertexAttribPointer(colorAttributeLocation,4,gl.FLOAT,false,7* 4,3*4);
	
	//render until you close the Browser
	requestAnimationFrame(runRenderLoop);
	
	//new variable for moving object
	//mat4 came from the glmatrix library
	
	var viewMatrix = mat4.create();
	var projectionMatrix = mat4.create();
	
	//set the camera requirements
	//projectionMatrix = titingnan ng camera, angle, scale depending on the size of monitor, zoom in, zoom out
	mat4.perspective(projectionMatrix, 45 * Math.PI / 180.0, canvas.width / canvas.height, 0.1, 10);
	
	//connect the matrices in index.html
	
	
	var viewMatrixLocation = gl.getUniformLocation(cube.shaderProgram, "viewMatrix");
	
	var projectionMatrixLocation = gl.getUniformLocation(cube.shaderProgram, "projectionMatrix");
	
	//input, scaling, output
	gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
	

	var colorsUniformArrayLocation0 = gl.getUniformLocation(cube.shaderProgram, "colorsUniformArray[0]");
	var colorsUniformArrayLocation1 = gl.getUniformLocation(cube.shaderProgram, "colorsUniformArray[1]");
	var colorsUniformArrayLocation2 = gl.getUniformLocation(cube.shaderProgram, "colorsUniformArray[2]");
	var offsetUniformLocation = gl.getUniformLocation(cube.shaderProgram, "offsets");

	var timeUniformLocation = gl.getUniformLocation(cube.shaderProgram, "time");
	//to move the model matrix
	var angle = 0;
	var angle2 = 0;
	var angle3 = 0;
	var angle2 = 0;
	
	var currentTime = 0.1;

	function runRenderLoop(){
		gl.clearColor(0, 0.70, 0.93, 1);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.enable(gl.DEPTH_TESsT);
		
		// 1st
		mat4.identity(cube.modelMatrix);
		mat4.translate(cube.modelMatrix, cube.modelMatrix,[0,0,-7]); //change color, one of the parameters refers to the speed of movement
		mat4.rotateY(cube.modelMatrix, cube.modelMatrix, angle);
		
		angle += 0.01;
		currentTime += 0.1;

		gl.uniformMatrix4fv(cube.modelMatrixLocation, false, cube.modelMatrix);
		gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
		gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
		
		gl.uniform4fv(colorsUniformArrayLocation0, uniformColorsArray[0]);
		gl.uniform4fv(colorsUniformArrayLocation1, uniformColorsArray[1]);
		gl.uniform4fv(colorsUniformArrayLocation2, uniformColorsArray[2]);

		gl.uniform3fv(offsetUniformLocation, offsetVector);

		gl.uniform1f(timeUniformLocation, currentTime);

		gl.useProgram(cube.shaderProgram);
		gl.bindVertexArray(cube.vao);
		gl.drawArrays(gl.TRIANGLES, 0, 36);

		gl.drawArraysInstanced(gl.TRIANGLES, 0, 36, 3);

		requestAnimationFrame(runRenderLoop);
		
	}
}	
	function getAndCompileShader(id){
	
		var shader;
		var shaderElement = document.getElementById(id);
		var shaderText = shaderElement.text.trim();
	
		if(id == 'vertexShader'){
			shader = gl.createShader(gl.VERTEX_SHADER);
		}
		else if (id == 'fragmentShader'){
			shader = gl.createShader(gl.FRAGMENT_SHADER);
		}	
	
		//TO COMPILE OUR SHADERS
		gl.shaderSource(shader, shaderText);
		gl.compileShader(shader);
		
		if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
			alert(gl.getShaderInfoLog(shader));
			return null;
		}
		return shader;
	}
