document.addEventListener("DOMContentLoaded", start); //start is a function   
var gl;

function start(){
	console.log("Now Running");

	var canvas = document.getElementById("renderCanvas");
	///specify the version of webGL used
	gl = canvas.getContext("webgl2");
	
	//to create vertices and colors
	var squareVerticesAndColors = [
		0.75, 0.75, 0,		 1, 1, 0.5, 1,
		-0.75, 0.75, 0, 	 0, 1, 0.5, 0.5, 
		0.75, -0.75, 0,		 0.5, 0, .25, .25,
		-0.75, -0.75, 0, 	 1, 0, 1, 0.5];
	var squareVertexpositionAndColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexpositionAndColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareVerticesAndColors), gl.STATIC_DRAW);
	
	
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
	
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexpositionAndColorBuffer);
	
	gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 7*4, 0);
	gl.vertexAttribPointer(colorAttributeLocation, 4, gl.FLOAT, false, 7 * 4, 3 * 4);
	
	//render until you close the browser
	requestAnimationFrame(runRenderLoop);
	
	function runRenderLoop(){
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.clearColor(.25, .4, .5, 1);
		
		//to draw a triangle
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
		
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


