document.addEventListener("DOMContentLoaded", start); //start is a function   
var gl;

function start(){
	console.log("Now Running");

	var canvas = document.getElementById("renderCanvas");
	///specify the version of webGL used
	gl = canvas.getContext("webgl2");
	
	var triangleVertices = [
	1.0, 0.0, -1.0,
	0.0, 1.0, 0.0,
	-1.0, -1.0, 0.0 ];  // x, y, z       *code to determine how these lines are treated to be added later*

	//you have to transfer these vertices to GPU thus,
	//you need to create a buffer to GPU
	var triangleVertexPositionBuffer = gl.createBuffer();
	
	//to allow the triangleVertexPositionBuffer to communicate with the GPU
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
	
	//to transfer the data from the CPU to GPU
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
	
	//to create  colors
    //rgb colors are used
	var triangleColors = [
		1.0, 0.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		0.0, 0.0, 1.0, 1.0];
		
    var triangleVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleColors), gl.STATIC_DRAW);
	
	//to create vertices and colors
	var triangleVerticesAndColors = [
		1.0, 0.0, -1.0, 1.0, 0.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 
		-1.0, -1.0, 0.0, 0.0, 0.0, 1.0, 1.0];
	var triangleVertexpositionAndColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexpositionAndColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVerticesAndColors), gl.STATIC_DRAW);
	
	
	var vertexShader = getAndCompileShader("vertexShader");
	var fragmentShader = getAndCompileShader("fragmentShader");
	var shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	
	gl.linkProgram(shaderProgram);
	
	if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
		alert("Could not link shaders");
		
		
	}
	
	gl.useProgram(shaderProgram);
	
	
	//For vertex buffer
	var positionAttributeLocation = gl.getAttribLocation(shaderProgram, "position");
	gl.enableVertexAttribArray(positionAttributeLocation);
	
	
	//for color buffer
	var colorAttributeLocation = gl.getAttribLocation(shaderProgram, "color");
	gl.enableVertexAttribArray(colorAttributeLocation);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexpositionAndColorBuffer);
	
	gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 7 * 4, 0);
	gl.vertexAttribPointer(colorAttributeLocation, 4, gl.FLOAT, false, 7 * 4, 3 * 4);
	
	//render until you close the browser
	requestAnimationFrame(runRenderLoop);
	
	function runRenderLoop(){
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.clearColor(1, 0, 0, 1);
		
		//to draw a triangle
		gl.drawArrays(gl.TRIANGLES, 0, 3);
		
		requestAnimationFrame(runRenderLoop);
	}
}
	
function getAndCompileShader(id){
	var shader;
	var shaderElement = document.getElementById(id); //id must only be fragmentShader or vertexShader
	
	var shaderText = shaderElement.text.trim();  //use of .trim is a must!!!
	
	if(id === "vertexShader"){
			shader = gl.createShader(gl.VERTEX_SHADER);
	}
	else if (id === "fragmentShader"){
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


